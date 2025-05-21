const path = require("path");
const axios = require("axios")
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const CLIENT_ID = process.env.GOOGLE_AUTHENTICATION_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_AUTHENTICATION_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_AUTHENTICATION_REDIRECT_URI;
const { usernameGenerator } = require(path.join(__dirname, "..", "utils", "usernameGenerator.js"))
const { userError, cloudinaryError, validatorError, notificationError,  emailError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const FRONTEND_URL = process.env.FRONTEND_URL;
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { sendWelcomeEmail} = require(path.join(__dirname, "..", "utils", "Email.js"))
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const googleAuthentication = async (req, res) => {
  const { credential, context } = req.body;

    try{
    // Verify the ID token with Google's API
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_AUTHENTICATION_CLIENT_ID,
    });
const payload = ticket.getPayload();
const { email, given_name, family_name, picture, sub: googleId  } = payload;
const combinedName = [given_name || "", family_name || ""]
  .filter(Boolean)      
  .join("_");           
const nameToStore = combinedName || name || "Unknown User";
//check if user is an administrator
let role = "user";
const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [];
const isAdmin = adminEmails.includes(email);
if(isAdmin){
    role = "admin"
}
// Check if the user already exists in the database
let user = await User.findOne({ email: email });
let isNewUser = false;
const username = await usernameGenerator(nameToStore)
if (!user) {
  isNewUser = true;
  user = await User.create({
    username:  username,
    googleId,
    email,
    bio: "writer",
    verification: role === "admin",
    ipAddress: req.header("x-forwarded-for") || req.socket.remoteAddress,
    picture,
    role,
    authSource: ["google"],
    status: true,
  });
  await sendWelcomeEmail(email, given_name, process.env.LITENOTE_WELCOME_EMAIL);
}
else{
      if (!user.authSource.includes("google")) {
        user.googleId = googleId;
        user.picture = picture;
        user.authSource.push("google");
        await user.save();
      }
}

    const id = user?._id.toString()
    const refreshToken = generateRefreshToken(id, user.role)
    await User.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
    res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 7, sameSite : "None",  secure : true })
    //Seven Day Refresh Token
        res.status(201).json({
        user : {...user.toObject(), accessToken : generateAccessToken(id, user.role)},
        message: isNewUser ? "Successfully Signed Up User" : `Welcome Back ${user.username}`
    })

    }catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "thirdPartyAuthError.txt", "thirdPartyAuthError")
    if (error instanceof userError) {
       return  res.status(error.statusCode).json({ message : error.message})
    }else if(error instanceof validatorError){
        return  res.status(error.statusCode).json({ message : error.message})  
    }
    else if(error instanceof emailError){
        return  res.status(error.statusCode).json({ message : error.message})  
    }
    else{
        return res.status(500).json({message : "Internal Server Error"})
    }
}
    }
const redirectToGoogle = (req, res) => {
  const scope = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ].join(" ");

  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&access_type=offline&prompt=consent`;

  res.redirect(url);
};

const googleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");
  try {
    // Exchange code for tokens
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Get user info
    const { data: userInfo } = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { email, name, picture, id: googleId } = userInfo;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({
        username: name,
        email,
        picture,
        googleId,
        authSource: "google",
        role: "user",
        status: true,
      });
    }
    const id = user?._id.toString()
    const refreshToken = generateRefreshToken(id, user.role)
    await User.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
    res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 7, sameSite : "None",  secure : true })
    //Seven Day Refresh Token
    res.status(201).json({
        user : {...user, accessToken : generateAccessToken(id, user.role)},
        message : "Successfully Logged In User"
    })
  } catch (error) {
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "googleCallbackError.txt", "thirdPartyAuthError")
    if (error instanceof userError) {
       return  res.status(error.statusCode).json({ message : error.message})
    }else if(error instanceof validatorError){
        return  res.status(error.statusCode).json({ message : error.message})  
    }
    else if(error instanceof emailError){
        return  res.status(error.statusCode).json({ message : error.message})  
    }
    else{
        return res.status(500).json({message : "Internal Server Error"})
    }
  }
};

    module.exports = {
        googleAuthentication,
        redirectToGoogle,
        googleCallback
    }

    