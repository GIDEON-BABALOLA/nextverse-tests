const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const fs = require('fs');
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const { userError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const _ = require('lodash');
const jwt = require("jsonwebtoken")
const { validateEmail, validatePassword } = require(path.join(__dirname, "..", "utils", "validator.js"))
const { cloudinaryError, validatorError } = require("../utils/customError");
const { otpGenerator } = require(path.join(__dirname, "..", "utils", "otpGenerator.js"))
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const  {cloudinaryUpload, cloudinaryDelete, cloudinarySingleDelete } = require(path.join(__dirname, "..", "utils", "cloudinary.js"))
const { generateEmailContent, sendEmail} = require(path.join(__dirname, "..", "utils", "Email.js"))
const { avatars } = require(path.join(__dirname, "..", "data", "avatars"))
//User Registration
const duplicateUsername = async (req, res) => {
    try{
const { username } = req.body;
const existingUser = await User.findOne({ username })
if(existingUser){
    throw new userError("Username Already Exists", 400)
}
return res.status(200).json({message : "Username is available"})
    }catch(error){
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
             else{
         return res.status(500).json({error : "Internal Server Error"})
         }
    }
}
const signupUser = async (req, res) => {
try{
const { username, email, password, mobile} = req.body;
let profilePicture
if(!username || !email || !password || !mobile){
    throw new userError("Please Fill In All The Fields", 400)
}
await validateEmail(email)
await validatePassword(password)
const foundUser = await User.findOne({email : email})
const foundMobile = await User.findOne({mobile : mobile})
if(foundUser) {
    throw new userError("User Already Exists", 400)
}
if(foundMobile){
    throw new userError("Phone Number Has Been Used", 400)
}
if(req.file){
    if(req.file.size > 2000000){
        fs.unlinkSync(req.file.path) //delete the image from server
        throw new userError("Image size too large (max 2MB)", 400)
    }
    const  picture = await cloudinaryUpload(req.file.path, `User/${email}`)
    profilePicture = picture.url
    fs.unlinkSync(req.file.path) //delete the image from server
}else{
    profilePicture = avatars[Math.floor((Math.random() * 30) + 1)]
}


const hashedPassword = await bcrypt.hash(password, 10);
// let values = {username, litenoteLogo : process.env.LITENOTE_LOGO, frontendUrl : process.env.LITENOTE_FRONTEND_URL};
// const emailContent = await generateEmailContent(values, path.join(__dirname, "..", "views", "welcomeEmail.ejs"));
// const data = {
//   to: email,
//   subject: 'Litenote Signup Successful',
//   html: emailContent,
//   text: 'Lightnote Signup Successful'
// };
// await sendEmail(data)
/* Always Note To Use req.file for one picture and req.files for multiple pictures*/
/*And note req.file is an object while req.files is an array */
const newUser = await User.create({ 
    username, 
    email, 
    password :  hashedPassword,
    mobile : mobile, 
    ipAddress : req.header('x-forwarded-for') || req.socket.remoteAddress,
    picture : profilePicture
 })
 const verificationToken = await newUser.createVerificationToken();
 await newUser.save()
 let values = {
    username : username,
    verificationToken : verificationToken,
    userId : newUser._id.toString(),
    litenoteLogo : process.env.LITENOTE_LOGO,
    frontendUrl : process.env.LITENOTE_FRONTEND_URL
};
 const emailContent = await generateEmailContent(
values,
path.join(__dirname, "..", "views", "confirmEmail.ejs")
)
const data = {
  to: email,
  subject: 'Verify Your Account',
  html: emailContent,
  text: 'Litenote Needs To Confirm Your Email Address'
};
await sendEmail(data)
res.status(201).json(newUser)
}catch(error){
    console.log(error)
logEvents(`${error.name}: ${error.message}`, "registerUserError.txt", "userError")
    if (error instanceof userError) {
       return  res.status(error.statusCode).json({ error : error.message})
    }
    else if(error instanceof validatorError){
        return  res.status(error.statusCode).json({ error : error.message})  
    }
        else{
    return res.status(500).json({error : "Internal Server Error"})
    }
}
}
const verifyUserRegistration = async (req, res) => {

}
//User Logging in
const loginUser = async (req, res) => {
try{
const { email, password} = req.body;
if(!email || !password){
    throw new userError("Please Provide An Email And A Password", 400)
}
await validateEmail(email)
await validatePassword(password)
const foundUser = await User.findOne({email : email})
if(!foundUser){
    throw new userError("User Does Not Exist", 404)
}
const match = await bcrypt.compare(password, foundUser.password)
if(foundUser && match){
    const id = foundUser?._id.toString()
    const refreshToken = generateRefreshToken(id, foundUser.role)
    await User.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
    res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 3, sameSite : "None", /* secure : true */})
    //Three Day Refresh Token
    res.status(201).json({
        id : foundUser?._id,
        username : foundUser?.username,
        email : foundUser?.email,
        accessToken : generateAccessToken(id, foundUser.role),
        password : foundUser?.password,
        picture : foundUser?.picture,
        mobile : foundUser?.mobile
    })
}
else{
    throw new userError("Invalid Credentials", 401)
}
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "loginUserError.txt", "userError")
    if (error instanceof userError) {
       return  res.status(error.statusCode).json({ error : error.message})
    }else if(error instanceof validatorError){
        return  res.status(error.statusCode).json({ error : error.message})  
    }
    else{
        return res.status(500).json({error : "Internal Server Error"})
        }
}
}

//To Get The Current User
const getCurrentUser = async  (req, res) => {
    try{
        if(req.user == null){
            throw new userError("Your Account Does Not Exist", 404)
        }
const { id } = req.user
validateMongoDbId(id)
const user = await User.findById(id)
if(!user){
    throw new userError("You Are Not Logged In", 401)
}
 const newUser = _.omit(user.toObject(), "refreshToken")
res.status(200).json(newUser)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "getCurrentUserError.txt", "userError")
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
//To Logout A User Logged In
const logoutUser = async (req, res) => {
    const cookies = req.cookies
    try{
        if(!cookies?.refreshToken){
            throw new userError("You Are Not Logged In", 401)
        }
        const refreshToken = cookies.refreshToken;
        const user = await User.findOne({refreshToken})
        if(!user){
            res.clearCookie("refreshToken", {httpOnly: true, sameSite : "None"  /*secure  : true */})
            return res.status(204).json({message : "Successfully Logged Out", "success" : true})
        }
        user.refreshToken = ""
        await user.save();      
        res.clearCookie("refreshToken", {httpOnly: true,  sameSite : "None", /*secure : true */})
        return res.status(204).json({message : "Successfully Logged Out now", "success" : true})
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "logoutUserError.txt", "userError")
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
//To Create A User Refresh Token
const userRefreshToken = async (req, res) => {
    try{
        if(req.user == null){
            throw new userError("Your Account Does Not Exist", 404)
        }
        const cookies = req.cookies;
        if(!cookies?.refreshToken){
            throw new userError ("Please Login Again To, No RefreshToken In Cookies", 401)
        }
        const refreshToken = cookies.refreshToken;
        const foundUser = await User.findOne({refreshToken})
        if(!foundUser){
            throw new userError("No RefreshToken In Database", 400)
        }
        const id = foundUser._id.toString();
        jwt.verify(refreshToken, process.env.LIGHTNOTE_JWT_TOKEN_SECRET, (err, decoded) => {
            if(err || id !== decoded.id){
                throw new userError("Wrong refresh token, because it has expired", 404)
            }
            const accessToken = generateAccessToken(id, decoded.role)
            res.status(201).json({accessToken : accessToken})
        })
        
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "userRefreshTokenError.txt", "userError")
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
//This is to upload a user picture
const uploadUserPicture = async (req, res) => {
    try{
        console.log(req.user)
        if(req.user == null){
            throw new userError("Your Account Does Not Exist", 404)
        }
    const { _id } = req.user
    validateMongoDbId(_id)
    const user =  await User.findOne({_id : _id})
    if(!req.file){
        throw new userError("Pls Choose An Image To Upload", 400)
    }
    if(req.file.size > 2000000){
        fs.unlinkSync(req.file.path) //delete the image from server
        throw new userError("Image size too large (max 2MB)", 400)
    }
    if(user.picture.length > 0){
        const publicId = user.picture.split("/").slice(-3).join("/").split(".").slice(0, 2).join("")
        await cloudinarySingleDelete(publicId.replace("%", "@").replace("com", ".com").replace("40", ""), 
        user.email)
    }
    const picture = await cloudinaryUpload(req.file.path, `User/${user.email}`)
    /* Always Note To Use req.file for one picture and req.files for multiple pictures*/
    /*And note req.file is an object while req.files is an array */
    fs.unlinkSync(req.file.path) //delete the image from server
    user.picture = picture.url;
    await user.save()
    const newUser = _.omit(user.toObject(), "refreshToken")
    res.status(200).json(newUser)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "uploadUserProfileError.txt", "userError")
        if (error instanceof cloudinaryError) {
            return res.status(error.statusCode).json({ error : error.message})
        }else if(error instanceof userError){
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
        }
}
//This Is To update A User
const updateUser = async (req, res) => {
try{
    if(req.user == null){
        throw new userError("Your Account Does Not Exist", 404)
    }
    if(!Object.keys(req.body).length === 0 || !Object.values(req.body).length === 0){
        throw new userError("Enter The Details You Want To Update", 400)
    }
    const { _id } = req.user;
    validateMongoDbId(_id)
const id = _id.toString();
    const updatedUser =  await User.findByIdAndUpdate(id, {
username:req.body.username,
mobile : req.body.mobile,
    },
    {
        new : true
    })
    const newUser = _.omit(updatedUser.toObject(), "refreshToken")
    res.status(201).json(newUser)
}catch(error){
    logEvents(`${error.name}: ${error.stack}`, "UpdateAUserError.txt", "user")
    if (error instanceof userError) {
        return res.status(error.statusCode).json({ error : error.message})
    }
    else{
        return res.status(500).json({error : "Internal Server Error"})
        }
}
}
const deleteUser = async (req, res) => {
    try{
        if(req.user == null){
            throw new userError("Your Account Does Not Exist", 404)
        }
        const user = await User.findOneAndDelete({_id: req.user._id})
        if(user.picture.length > 0){
            await cloudinaryDelete(user.email)
        }
        if(!user){
            throw new userError("User Does Not Exist", 404)
        }
        const newUser = _.omit(user.toObject(), "refreshToken")
        res.status(200).json(newUser)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "deleteUserError.txt", "userError")
         if(error instanceof userError){
            return res.status(error.statusCode).json({ error : error.message})
        }else{
            return res.status(500).json({error : "Internal Server Error"})
        }
    }
}
const followUser = async (req, res) => {
    try{
        const { _id } = req.user;
        const { email } = req.body;
        if(!email){
            throw new userError("What is the email of the user you want to follow", 400)
        }
        const userToBeFollowed = await User.findOne({email})
        let alreadyFollowed = userToBeFollowed.followers.find((userId) => userId.followedby.toString() === _id.toString())
        if(!alreadyFollowed){
            const user =  await User.followuser(_id, userToBeFollowed._id) //This has been configured in the users model
            return  res.status(201).json(user)
        }
        res.status(200).json(userToBeFollowed)

    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "followUserError.txt", "userError")
        if(error instanceof userError){
           return res.status(error.statusCode).json({ error : error.message})
       }else{
           return res.status(500).json({error : "Internal Server Error"})
       }   
    }
}
const unfollowUser = async(req, res) => {
    try{
        const { _id } = req.user;
        const { email } = req.body;
        if(!email){
            throw new userError("What is the email of the user you want to follow", 400)
        }
        const userToBeUnFollowed = await User.findOne({email})
        let alreadyFollowed = userToBeUnFollowed.followers.find((userId) => userId.followedby.toString() === _id.toString())
        if(alreadyFollowed){
           const user =  await User.unfollowuser(_id, userToBeUnFollowed._id)//This has been configured in the users model
          return  res.status(201).json(user)
        }
        res.status(200).json(userToBeUnFollowed)
    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "unfollowUserError.txt", "userError")
        if(error instanceof userError){
           return res.status(error.statusCode).json({ error : error.message})
       }else{
           return res.status(500).json({error : "Internal Server Error"})
       }  
    }
}
module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    uploadUserPicture,
    userRefreshToken,
    getCurrentUser,
    deleteUser,
    updateUser,
    followUser,
    unfollowUser,
    duplicateUsername
}