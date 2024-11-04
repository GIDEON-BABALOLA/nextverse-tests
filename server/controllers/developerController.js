const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const fs = require('fs');
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const Developer = require(path.join(__dirname, "..", "models", "developerModel.js"))
const { developerError, cloudinaryError, validatorError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const _ = require('lodash');
const jwt = require("jsonwebtoken")
const { validateEmail, validatePassword, validateURL } = require(path.join(__dirname, "..", "utils", "validator.js"))
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const  { cloudinaryUpload, cloudinaryDeveloperDelete, cloudinarySingleDelete } = require(path.join(__dirname, "..", "utils", "cloudinary.js"))
const { developerConfirmationArray, hashDeveloperEmail }= require(path.join(__dirname, "..", "config", "developerConfig.js"))
const { avatars } = require(path.join(__dirname, "..", "data", "avatars"))

const signupDeveloper = async (req, res) => {
    const { username, email, password, mobile, instagram, linkedin, twitter, title} = req.body;
try{
    //
    let profilePicture
if(!username || !email || !password || !mobile || !instagram || !twitter || !title || !linkedin ){
    throw new developerError("Please Fill In All The Fields", 400)
}
await validateEmail(email)
await validatePassword(password)
const validations = await Promise.all([validateURL(instagram), validateURL(twitter), validateURL(linkedin) ])
const isValidURL = validations.every(Boolean)
if(!isValidURL){
    throw new validatorError("Pls Enter A Valid Link To Your Social Media Account", 400)
}
const hashedText = hashDeveloperEmail(email)
const isDeveloper = developerConfirmationArray.includes(hashedText)
if(!isDeveloper){
    throw new developerError("You Are Not A Developer For Litenote", 401)
}
const foundDeveloper = await Developer.findOne({email : email})
const foundMobile = await Developer.findOne({mobile : mobile})
if(foundDeveloper) {
    throw new developerError("Developer Already Exists", 400)
}
if(foundMobile){
    throw new developerError("Phone Number Has Been Used", 400)
}
if(req.file){
    if(req.file.size > 2000000){
        fs.unlinkSync(req.file.path) //delete the image from server
        throw new userError("Image size too large (max 2MB)", 400)
    }
    const  picture = await cloudinaryUpload(req.file.path, `Developer/${email}`)
    profilePicture = picture.url
    fs.unlinkSync(req.file.path) //delete the image from server
}else{
    profilePicture = avatars[Math.floor((Math.random() * 50) + 1)]
}

const hashedPassword = await bcrypt.hash(password, 10);
const newDeveloper = await Developer.create({
    username,
    email,
    password :  hashedPassword,
    mobile,
    ipAddress : req.header('x-forwarded-for') || req.socket.remoteAddress,
    picture : profilePicture,
    title : title,
    socials : { instagram : instagram, twitter : twitter, linkedin : linkedin}
})
res.status(201).json(newDeveloper)
}catch(error){
logEvents(`${error.name}: ${error.message}`, "registerDeveloperError.txt", "developerError")
    if (error instanceof developerError) {
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

const loginDeveloper = async (req, res) => {
try{
const { email, password } = req.body;
if(!email || !password){
    throw new developerError("Please Provide An Email And A Password", 400)
}
await validateEmail(email)
await validatePassword(password)
const hashedText = hashDeveloperEmail(email)
const isDeveloper = developerConfirmationArray.includes(hashedText)
if(!isDeveloper){
    throw new developerError("You Are Not A Developer For Litenote", 401)
}
const foundDeveloper = await Developer.findOne({email : email})
if(!foundDeveloper){
    throw new developerError("You Are Not A Developer", 404)
}
const match = await bcrypt.compare(password, foundDeveloper.password)
if(foundDeveloper && match){
    const id = foundDeveloper?._id.toString()
    const refreshToken = generateRefreshToken(id, foundDeveloper.role)
    await Developer.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
    res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 3, sameSite : "None", /* secure : true */})
    //Three Day Refresh Token
    res.status(201).json({
        id : foundDeveloper?._id,
        username : foundDeveloper?.username,
        email : foundDeveloper?.email,
        accessToken : generateAccessToken(id, foundDeveloper.role),
        password : foundDeveloper?.password,
        picture : foundDeveloper?.picture,
    })
}
else{
    throw new developerError("Invalid Credentials", 401)
}
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "loginDeveloperError.txt", "developerError")
    if (error instanceof developerError) {
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

const getCurrentDeveloper = async  (req, res) => {
    try{
const { id } = req.user
validateMongoDbId(id)
const developer = await Developer.findById(id)
if(!developer){
    throw new developerError("You Are Not Logged In", 401)
}
 const newDeveloper = _.omit(developer.toObject(), "refreshToken")
res.status(200).json(newDeveloper)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "getCurrentDeveloperError.txt", "developerError")
        if (error instanceof developerError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}

const logoutDeveloper = async (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    try{
        if(!cookies?.refreshToken){
            throw new developerError("You Are Not Logged In", 401)
        }
        const refreshToken = cookies.refreshToken;
        const developer = await Developer.findOne({refreshToken})
        if(!developer){
            res.clearCookie("refreshToken", {httpOnly: true, sameSite : "None"  /*secure  : true */})
            return res.status(204).json({message : "Successfully Logged Out", "success" : true})
        }
        developer.refreshToken = ""
        await developer.save();      
        res.clearCookie("refreshToken", {httpOnly: true,  sameSite : "None", /*secure : true */})
        return res.status(204).json({message : "Successfully Logged Out now", "success" : true})
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "logoutDeveloperError.txt", "developerError")
        if (error instanceof developerError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}

const developerRefreshToken = async (req, res) => {
    try{
        const cookies = req.cookies;
        if(!cookies?.refreshToken){
            throw new developerError("Please Login Again To, No RefreshToken In Cookies", 401)
        }
        const refreshToken = cookies.refreshToken;
        const foundDeveloper = await Developer.findOne({refreshToken})
        if(!foundDeveloper){
            throw new developerError("No RefreshToken In Database", 400)
        }
        const id = foundDeveloper._id.toString();
        jwt.verify(refreshToken, process.env.LIGHTNOTE_JWT_TOKEN_SECRET, (err, decoded) => {
            if(err || id !== decoded.id){
                throw new developerError("Wrong refresh token, because it has expired", 404)
            }
            const accessToken = generateAccessToken(id, decoded.role)
            res.status(201).json({accessToken : accessToken})
        })
        
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "developerRefreshTokenError.txt", "developerError")
        if (error instanceof developerError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}

const uploadDeveloperPicture = async (req, res) => {
    try{
    const { _id } = req.user
    validateMongoDbId(_id)
    const developer =  await Developer.findOne({_id : _id})
    if(!req.file){
        throw new developerError("Pls Choose An Image To Upload", 400)
    }
    if(req.file.size > 2000000){
        fs.unlinkSync(req.file.path) //delete the image from server
        throw new developerError("Image size too large (max 2MB)", 400)
    }
    if(developer.picture.length > 0){
        const publicId = developer.picture.split("/").slice(-3).join("/").split(".").slice(0, 2).join("")
        await cloudinarySingleDelete(publicId.replace("%", "@").replace("com", ".com").replace("40", ""), 
        developer.email)
    }
    const picture = await cloudinaryUpload(req.file.path, `Developer/${developer.email}`)
    /* Always Note To Use req.file for one picture and req.files for multiple pictures*/
    /*And note req.file is an object while req.files is an array */
    fs.unlinkSync(req.file.path) //delete the image from server
    developer.picture = picture.url;
    await developer.save()
    const newDeveloper = _.omit(developer.toObject(), "refreshToken")
    res.status(200).json(newDeveloper)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "uploadDeveloperPictureError.txt", "developerError")
        if (error instanceof cloudinaryError) {
            return res.status(error.statusCode).json({ error : error.message})
        }else if(error instanceof developerError){
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
        }
}
const updateDeveloper = async (req, res) => {
    const { username, mobile, title, instagram, twitter, linkedin} = req.body
    const { _id } = req.user;
try{
    if(!Object.keys(req.body).length === 0 || !Object.values(req.body).length === 0){
        throw new developerError("Enter The Details You Want To Update", 400)
    }
validateMongoDbId(_id)
const urlValidations = []
if (instagram) urlValidations.push(validateURL(instagram));
if (twitter) urlValidations.push(validateURL(twitter));
if (linkedin) urlValidations.push(validateURL(linkedin));
const validations = await Promise.all(urlValidations)
const isValidURL = validations.every(Boolean)
if(!isValidURL){
    throw new validatorError("Pls Enter A Valid Link To Your Social Media Account", 400)
}
const updatedDeveloper =  await Developer.findByIdAndUpdate(_id, {
username:username,
mobile : mobile,
title : title,
"socials.instagram" : instagram,
"socials.twitter" : twitter,
"socials.linkedin" : linkedin
    },
    {
        new : true
    })
    const newDeveloper = _.omit(updatedDeveloper.toObject(), "refreshToken")
    res.status(201).json(newDeveloper)
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "UpdateDeveloperError.txt", "developerError")
    if (error instanceof developerError) {
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
const deleteDeveloper = async (req, res) => {
    try{
        if(req.user == null){
            throw new developerError("Your Account Does Not Exist", 404)
        }
        const foundDeveloper = await Developer.findOne({_id: req.user._id})
        console.log(foundDeveloper.email)
        if(foundDeveloper.picture.length > 0){
            await cloudinaryDeveloperDelete(foundDeveloper.email)
        }
        if(!foundDeveloper){
            throw new developerError("Developer Does Not Exist", 404)
        }
        await foundDeveloper.deleteOne()
        const newDeveloper = _.omit(foundDeveloper.toObject(), "refreshToken")
        res.status(200).json(newDeveloper)
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "deleteDeveloperError.txt", "developerError")
         if(error instanceof developerError){
            return res.status(error.statusCode).json({ error : error.message})
        }
      else  if (error instanceof cloudinaryError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
        }
    }
}
module.exports = {
    signupDeveloper,
    loginDeveloper,
    logoutDeveloper,
    uploadDeveloperPicture,
    developerRefreshToken,
    getCurrentDeveloper,
    deleteDeveloper,
    updateDeveloper,
}