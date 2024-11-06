const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const fs = require('fs');
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const Admin = require(path.join(__dirname, "..", "models", "adminModel.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const { adminError, cloudinaryError, validatorError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const _ = require('lodash');
const jwt = require("jsonwebtoken")
const { validateEmail, validatePassword } = require(path.join(__dirname, "..", "utils", "validator.js"))
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const  { cloudinaryUpload, cloudinaryDelete, cloudinarySingleDelete } = require(path.join(__dirname, "..", "utils", "cloudinary.js"))
const { adminConfirmationArray, hashAdminEmail }= require(path.join(__dirname, "..", "config", "adminConfig.js"))
const { avatars } = require(path.join(__dirname, "..", "data", "avatars"))
//Admin Registration
const signupAdmin = async (req, res) => {
try{
    //
    let profilePicture
const { username, email, password, mobile} = req.body;
if(!username || !email || !password || !mobile){
    throw new adminError("Please Fill In All The Fields", 400)
}
await validateEmail(email)
await validatePassword(password)
const hashedText = hashAdminEmail(email)
console.log(hashedText)
const isAdmin = adminConfirmationArray.includes(hashedText)
if(!isAdmin){
    throw new adminError("You Are Not An Administrator", 401)
}
const foundAdmin = await Admin.findOne({email : email})
const foundMobile = await Admin.findOne({mobile : mobile})
if(foundAdmin) {
    throw new adminError("Admin Already Exists", 400)
}
if(foundMobile){
    throw new adminError("Phone Number Has Been Used", 400)
}
if(req.file){
    if(req.file.size > 2000000){
        fs.unlinkSync(req.file.path) //delete the image from server
        throw new userError("Image size too large (max 2MB)", 400)
    }
    const  picture = await cloudinaryUpload(req.file.path, `Admin/${email}`)
    profilePicture = picture.url
    fs.unlinkSync(req.file.path) //delete the image from server
}else{
    profilePicture = avatars[Math.floor((Math.random() * 50) + 1)]
}

const hashedPassword = await bcrypt.hash(password, 10);
const newAdmin = await Admin.create({ username,
     email,
    password :  hashedPassword,
    mobile,
    ipAddress : req.header('x-forwarded-for') || req.socket.remoteAddress,
    picture : profilePicture
})
res.status(201).json(newAdmin)
}catch(error){
logEvents(`${error.name}: ${error.message}`, "registerAdminError.txt", "adminError")
    if (error instanceof adminError) {
       return res.status(error.statusCode).json({ error : error.message})
    }
    else if(error instanceof validatorError){
        return  res.status(error.statusCode).json({ error : error.message})  
    }
    else{
    return res.status(500).json({error : "Internal Server Error"})
    }
}
}
//Admin Logging in
const loginAdmin = async (req, res) => {
try{
const { email, password } = req.body;
if(!email || !password){
    throw new adminError("Please Provide An Email And A Password", 400)
}
await validateEmail(email)
 await validatePassword(password)
const foundAdmin = await Admin.findOne({email : email})
if(!foundAdmin){
    throw new adminError("Admin Does Not Exist", 404)
}
const match = await bcrypt.compare(password, foundAdmin.password)
if(foundAdmin && match){
    const id = foundAdmin?._id.toString()
    const refreshToken = generateRefreshToken(id, foundAdmin.role)
    await Admin.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
    res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 3, sameSite : "None", /* secure : true */})
    //Three Day Refresh Token
    res.status(201).json({
        id : foundAdmin?._id,
        username : foundAdmin?.username,
        email : foundAdmin?.email,
        accessToken : generateAccessToken(id, foundAdmin.role),
        password : foundAdmin?.password,
        picture : foundAdmin?.picture,
    })
}
else{
    throw new adminError("Invalid Credentials", 401)
}
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "loginAdminError.txt", "adminError")
    if (error instanceof adminError) {
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

//To Get The Current Admin
const getCurrentAdmin = async  (req, res) => {
    try{
const { id } = req.user
validateMongoDbId(id)
const admin = await Admin.findById(id)
if(!admin){
    throw new adminError("You Are Not Logged In", 401)
}
 const newAdmin = _.omit(admin.toObject(), "refreshToken")
res.status(200).json(newAdmin)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "getCurrentAdminError.txt", "adminError")
        if (error instanceof adminError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
//To Logout A Admin Logged In
const logoutAdmin = async (req, res) => {
    const cookies = req.cookies
    try{
        if(!cookies?.refreshTokea){
            throw new adminError("You Are Not Logged In", 401)
        }
        const refreshToken = cookies.refreshToken;
        const admin = await Admin.findOne({refreshToken})
        if(!admin){
            res.clearCookie("refreshToken", {httpOnly: true, sameSite : "None"  /*secure  : true */})
            return res.status(204).json({message : "Successfully Logged Out", "success" : true})
        }
        admin.refreshToken = ""
        await admin.save();      
        res.clearCookie("refreshToken", {httpOnly: true,  sameSite : "None", /*secure : true */})
        return res.status(204).json({message : "Successfully Logged Out now", "success" : true})
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "logoutAdminError.txt", "adminError")
        if (error instanceof adminError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
//To Create A Admin Refresh Token
const adminRefreshToken = async (req, res) => {
    try{
        const cookies = req.cookies;
        if(!cookies?.refreshToken){
            throw new adminError ("Please Login Again To, No RefreshToken In Cookies", 401)
        }
        const refreshToken = cookies.refreshToken;
        const foundAdmin = await Admin.findOne({refreshToken})
        if(!foundAdmin){
            throw new adminError("No RefreshToken In Database", 400)
        }
        const id = foundAdmin._id.toString();
        jwt.verify(refreshToken, process.env.LIGHTNOTE_JWT_TOKEN_SECRET, (err, decoded) => {
            if(err || id !== decoded.id){
                throw new adminError("Wrong refresh token, because it has expired", 404)
            }
            const accessToken = generateAccessToken(id, decoded.role)
            res.status(201).json({accessToken : accessToken})
        })
        
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "adminRefreshTokenError.txt", "adminError")
        if (error instanceof adminError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
//This is to upload a admin picture
const uploadAdminPicture = async (req, res) => {
    try{
    const { _id } = req.user
    validateMongoDbId(_id)
    const admin =  await Admin.findOne({_id : _id})
    if(!req.file){
        throw new adminError("Pls Choose An Image To Upload", 400)
    }
    if(req.file.size > 2000000){
        fs.unlinkSync(req.file.path) //delete the image from server
        throw new adminError("Image size too large (max 2MB)", 400)
    }
    if(admin.picture.length > 0){
        const publicId = admin.picture.split("/").slice(-3).join("/").split(".").slice(0, 2).join("")
        await cloudinarySingleDelete(publicId.replace("%", "@").replace("com", ".com").replace("40", ""), 
        admin.email)
    }
    const picture = await cloudinaryUpload(req.file.path, `Admin/${admin.email}`)
    /* Always Note To Use req.file for one picture and req.files for multiple pictures*/
    /*And note req.file is an object while req.files is an array */
    fs.unlinkSync(req.file.path) //delete the image from server
    admin.picture = picture.url;
    await admin.save()
    const newAdmin = _.omit(admin.toObject(), "refreshToken")
    res.status(200).json(newAdmin)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "uploadAdminProfileError.txt", "adminError")
        if (error instanceof cloudinaryError) {
            return res.status(error.statusCode).json({ error : error.message})
        }else if(error instanceof adminError){
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
        }
}
//This Is To update A Admin
const updateAdmin = async (req, res) => {
try{
    console.log(Object.keys(req.body).length)
    if(!Object.keys(req.body).length === 0 || !Object.values(req.body).length === 0){
        throw new adminError("Enter The Details You Want To Update", 400)
    }
    const { _id } = req.user;
    validateMongoDbId(_id)
const id = _id.toString();

    const updatedAdmin =  await Admin.findByIdAndUpdate(id, {
username:req.body.username,
mobile : req.body.mobile,
    },
    {
        new : true
    })
    const newAdmin = _.omit(updatedAdmin.toObject(), "refreshToken")
    res.status(201).json(newAdmin)
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "UpdateAAdminError.txt", "adminError")
    if (error instanceof adminError) {
        return res.status(error.statusCode).json({ error : error.message})
    }
    else{
        return res.status(500).json({error : "Internal Server Error"})
        }
}
}
const deleteAdmin = async (req, res) => {
    try{
        if(req.user == null){
            throw new adminError("Your Account Does Not Exist", 404)
        }
        const admin = await Admin.findOneAndDelete({_id: req.user._id})
        if(admin.picture.length > 0){
            await cloudinaryDelete(admin.email)
        }
        if(!admin){
            throw new adminError("Admin Does Not Exist", 404)
        }
        const newAdmin = _.omit(admin.toObject(), "refreshToken")
        res.status(200).json(newAdmin)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "deleteAdminError.txt", "adminError")
         if(error instanceof adminError){
            return res.status(error.statusCode).json({ error : error.message})
        }else{
            return res.status(500).json({error : "Internal Server Error"})
        }
    }
}
//like to ban or delete a users account
const adminDeleteUser = async(req, res) => {
    try{
        const { email } = req.params
const user = await User.findOne({ email : email})
if(!user){
    throw new adminError(`The User with email ${email} does not exist`, 404)
}
const userToBeDeleted = await User.findOneAndDelete({_id : user._id})
const newUser = _.omit(userToBeDeleted.toObject(), "refreshToken")
res.status(200).json(newUser)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "adminDeleteUserError.txt", "adminError")
        if(error instanceof adminError){
            return res.status(error.statusCode).json({ error : error.message})
        }else{
            return res.status(500).json({error : "Internal Server Error"})
        }
    }
}
const getAllUsers = async (req, res) => {
try{
const gotUsers = await User.find()
if(!gotUsers){
    throw new adminError("No User Has Been Registered For Your Application", 204)
}
const usersToBeSent = gotUsers.map((user) => {
    return _.omit(user.toObject(), "refreshToken")
})
res.status(200).json(usersToBeSent)
}
catch(error){
    logEvents(`${error.name}: ${error.message}`, "getAllUsersError.txt", "adminError")
    if(error instanceof adminError){
        return res.status(error.statusCode).json({ error : error.message})
    }else{
        return res.status(500).json({error : "Internal Server Error"})
    }
}
}
const getAUser = async (req, res) => {
    const { email } = req.params;
try{
const gotUser = await User.findOne( { email : email})
if(!gotUser){
    throw new adminError(`The user with email ${email} does not exist`, 400)
}
const newUser = _.omit(gotUser.toObject(), "refreshToken")
res.status(200).json(newUser);
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "getAUserError.txt", "adminError")
    if(error instanceof adminError){
        return res.status(error.statusCode).json({ error : error.message})
    }else{
        return res.status(500).json({error : "Internal Server Error"})
    }
}
}
const getTotalNumberOfUsers  = async(req, res) => {
try{
const totalCount = await User.countDocuments()
res.status(200).json({ users : totalCount, message : `The total number of users using the litenote application are ${totalCount}`})
}catch(error){

}
}
module.exports = {
    signupAdmin,
    loginAdmin,
    logoutAdmin,
    uploadAdminPicture,
    adminRefreshToken,
    getCurrentAdmin,
    deleteAdmin,
    updateAdmin,
    adminDeleteUser,
    getAllUsers,
    getAUser,
    getTotalNumberOfUsers
}