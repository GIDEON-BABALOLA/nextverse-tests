const isProduction = process.env.NODE_ENV === "production";
const path = require("path");
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
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  maxAge: 60 * 60 * 1000 * 24 * 7, // 7 days
  sameSite: "None",
  secure: true,
  ...(isProduction && { domain: ".litenote.app" })
});
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
const googleCallback = async (req, res) => {
  const { credential } = req.body;
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
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  maxAge: 60 * 60 * 1000 * 24 * 7, // 7 days
  sameSite: "None",
  secure: true,
  ...(isProduction && { domain: ".litenote.app" })
});
    return res.redirect(process.env.FRONTEND_URL)
    //Seven Day Refresh Token
    //     res.status(201).json({
    //     user : {...user.toObject(), accessToken : generateAccessToken(id, user.role)},
    //     message: isNewUser ? "Successfully Signed Up User" : `Welcome Back ${user.username}`
    // })
     
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

    module.exports = {
        googleAuthentication,
        googleCallback
    }

    