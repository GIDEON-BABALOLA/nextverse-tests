const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const fs = require('fs');
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const Designer = require(path.join(__dirname, "..", "models", "designerModel.js"))
const { designerError, cloudinaryError, validatorError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const _ = require('lodash');
const jwt = require("jsonwebtoken")
const { validateEmail, validatePassword, validateURL } = require(path.join(__dirname, "..", "utils", "validator.js"))
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const  { cloudinaryUpload, cloudinaryDesignerDelete } = require(path.join(__dirname, "..", "utils", "cloudinary.js"))
const { designerConfirmationArray, hashDesignerEmail }= require(path.join(__dirname, "..", "config", "designerConfig.js"))
const { avatars } = require(path.join(__dirname, "..", "data", "avatars"))

const signupDesigner = async (req, res) => {
    const { username, email, password, mobile, instagram, linkedin, twitter, title} = req.body;
try{
    //
    let profilePicture
if(!username || !email || !password || !mobile || !instagram || !twitter || !title || !linkedin ){
    throw new designerError("Please Fill In All The Fields", 400)
}
await validateEmail(email)
await validatePassword(password)
const validations = await Promise.all([validateURL(instagram), validateURL(twitter), validateURL(linkedin) ])
const isValidURL = validations.every(Boolean)
if(!isValidURL){
    throw new validatorError("Pls Enter A Valid Link To Your Social Media Account", 400)
}
const hashedText = hashDesignerEmail(email)
const isDesigner = designerConfirmationArray.includes(hashedText)
if(!isDesigner){
    throw new designerError("You Are Not A Designer For Litenote", 401)
}
const foundDesigner = await Designer.findOne({email : email})
const foundMobile = await Designer.findOne({mobile : mobile})
if(foundDesigner) {
    throw new designerError("Designer Already Exists", 400)
}
if(foundMobile){
    throw new designerError("Phone Number Has Been Used", 400)
}
if(req.file){
    if(req.file.size > 2000000){
        fs.unlinkSync(req.file.path) //delete the image from server
        throw new userError("Image size too large (max 2MB)", 400)
    }
    const  picture = await cloudinaryUpload(req.file.path, `Designer/${email}`)
    profilePicture = picture.url
    fs.unlinkSync(req.file.path) //delete the image from server
}else{
    profilePicture = avatars[Math.floor((Math.random() * 50) + 1)]
}

const hashedPassword = await bcrypt.hash(password, 10);
const newDesigner = await Designer.create({
    username,
    email,
    password :  hashedPassword,
    mobile,
    ipAddress : req.header('x-forwarded-for') || req.socket.remoteAddress,
    picture : profilePicture,
    title : title,
    socials : { instagram : instagram, twitter : twitter, linkedin : linkedin}
})
res.status(201).json(newDesigner)
}catch(error){
logEvents(`${error.name}: ${error.message}`, "registerdesignerError.txt", "designerError")
    if (error instanceof designerError) {
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

const loginDesigner = async (req, res) => {
try{
const { email, password } = req.body;
if(!email || !password){
    throw new designerError("Please Provide An Email And A Password", 400)
}
await validateEmail(email)
await validatePassword(password)
const hashedText = hashDesignerEmail(email)
const isDesigner = designerConfirmationArray.includes(hashedText)
if(!isDesigner){
    throw new designerError("You Are Not A Designer For Litenote", 401)
}
const foundDesigner = await Designer.findOne({email : email})
if(!foundDesigner){
    throw new designerError("You Are Not A Designer", 404)
}
const match = await bcrypt.compare(password, foundDesigner.password)
if(foundDesigner && match){
    const id = foundDesigner?._id.toString()
    const refreshToken = generateRefreshToken(id, foundDesigner.role)
    await Designer.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
    res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 3, sameSite : "None", /* secure : true */})
    //Three Day Refresh Token
    res.status(201).json({
        id : foundDesigner?._id,
        username : foundDesigner?.username,
        email : foundDesigner?.email,
        accessToken : generateAccessToken(id, foundDesigner.role),
        password : foundDesigner?.password,
        picture : foundDesigner?.picture,
    })
}
else{
    throw new designerError("Invalid Credentials", 401)
}
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "logindesignerError.txt", "designerError")
    if (error instanceof designerError) {
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

const getCurrentDesigner = async  (req, res) => {
    try{
const { id } = req.user
validateMongoDbId(id)
const designer = await Designer.findById(id)
if(!designer){
    throw new designerError("You Are Not Logged In", 401)
}
 const newDesigner = _.omit(designer.toObject(), "refreshToken")
res.status(200).json(newDesigner)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "getCurrentdesignerError.txt", "designerError")
        if (error instanceof designerError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}

const logoutDesigner = async (req, res) => {
    const cookies = req.cookies
    try{
        if(!cookies?.refreshToken){
            throw new designerError("You Are Not Logged In", 401)
        }
        const refreshToken = cookies.refreshToken;
        const designer = await Designer.findOne({refreshToken})
        if(!designer){
            res.clearCookie("refreshToken", {httpOnly: true, sameSite : "None"  /*secure  : true */})
            return res.status(204).json({message : "Successfully Logged Out", "success" : true})
        }
        designer.refreshToken = ""
        await designer.save();      
        res.clearCookie("refreshToken", {httpOnly: true,  sameSite : "None", /*secure : true */})
        return res.status(204).json({message : "Successfully Logged Out now", "success" : true})
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "logoutdesignerError.txt", "designerError")
        if (error instanceof designerError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}

const designerRefreshToken = async (req, res) => {
    try{
        const cookies = req.cookies;
        if(!cookies?.refreshToken){
            throw new designerError("Please Login Again To, No RefreshToken In Cookies", 401)
        }
        const refreshToken = cookies.refreshToken;
        const foundDesigner = await Designer.findOne({refreshToken})
        if(!foundDesigner){
            throw new designerError("No RefreshToken In Database", 400)
        }
        const id = foundDesigner._id.toString();
        jwt.verify(refreshToken, process.env.LITENOTE_JWT_TOKEN_SECRET, (err, decoded) => {
            if(err || id !== decoded.id){
                throw new designerError("Wrong refresh token, because it has expired", 404)
            }
            const accessToken = generateAccessToken(id, decoded.role)
            res.status(201).json({accessToken : accessToken})
        })
        
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "designerRefreshTokenError.txt", "designerError")
        if (error instanceof designerError) {
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}

const uploadDesignerPicture = async (req, res) => {
    try{
    const { _id } = req.user
    validateMongoDbId(_id)
    const designer =  await Designer.findOne({_id : _id})
    if(!req.file){
        throw new designerError("Pls Choose An Image To Upload", 400)
    }
    if(req.file.size > 2000000){
        fs.unlinkSync(req.file.path) //delete the image from server
        throw new designerError("Image size too large (max 2MB)", 400)
    }
    if(designer.picture.length > 0){
        const publicId = designer.picture.split("/").slice(-3).join("/").split(".").slice(0, 2).join("")
        await cloudinarySingleDelete(publicId.replace("%", "@").replace("com", ".com").replace("40", ""), 
        designer.email)
    }
    const picture = await cloudinaryUpload(req.file.path, `Designer/${designer.email}`)
    /* Always Note To Use req.file for one picture and req.files for multiple pictures*/
    /*And note req.file is an object while req.files is an array */
    fs.unlinkSync(req.file.path) //delete the image from server
    designer.picture = picture.url;
    await designer.save()
    const newDesigner = _.omit(designer.toObject(), "refreshToken")
    res.status(200).json(newDesigner)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "uploadDesignerPictureError.txt", "designerError")
        if (error instanceof cloudinaryError) {
            return res.status(error.statusCode).json({ error : error.message})
        }else if(error instanceof designerError){
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
        }
}
const updateDesigner = async (req, res) => {
    const { username, mobile, title, instagram, twitter, linkedin} = req.body
    const { _id } = req.user;
try{
    if(!Object.keys(req.body).length === 0 || !Object.values(req.body).length === 0){
        throw new designerError("Enter The Details You Want To Update", 400)
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
const updatedDesigner =  await Designer.findByIdAndUpdate(_id, {
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
    const newDesigner = _.omit(updatedDesigner.toObject(), "refreshToken")
    res.status(201).json(newDesigner)
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "UpdatedesignerError.txt", "designerError")
    if (error instanceof designerError) {
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
const deleteDesigner = async (req, res) => {
    try{
        if(req.user == null){
            throw new designerError("Your Account Does Not Exist", 404)
        }
        const foundDesigner = await Designer.findOne({_id: req.user._id})
        if(foundDesigner.picture.length > 0){
            await cloudinaryDesignerDelete(foundDesigner.email)
        }
        if(!foundDesigner){
            throw new designerError("Designer Does Not Exist", 404)
        }
        await foundDesigner.deleteOne()
        const newDesigner = _.omit(foundDesigner.toObject(), "refreshToken")
        res.status(200).json(newDesigner)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "deletedesignerError.txt", "designerError")
         if(error instanceof designerError){
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
const getAllDesigners = async(req, res) => {
    let query
    try{
    query = Designer.find()
//Pagination, for different pages
const page = req.query.page;
const limit = req.query.limit
const skip = (page - 1) * limit
query = query.skip(skip).limit(limit)
if(req.query.page){
    const developerCount = await Designer.countDocuments();
    if(skip >= developerCount){
        throw new designerError( "This page does not exist",404)
    }
}
const allDevelopers = await query
res.status(200).json(allDevelopers)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "getAllDesignersError.txt", "designerError")
        if(error instanceof designerError){
           return res.status(error.statusCode).json({ error : error.message})
       }else{
           return res.status(500).json({error : "Internal Server Error"})
       }  
    }
}
module.exports = {
    signupDesigner,
    loginDesigner,
    logoutDesigner,
    uploadDesignerPicture,
    designerRefreshToken,
    getCurrentDesigner,
    deleteDesigner,
    updateDesigner,
    getAllDesigners
}