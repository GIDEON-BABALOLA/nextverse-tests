const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const fs = require('fs');
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const Admin = require(path.join(__dirname, "..", "models", "adminModel.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const Story = require(path.join(__dirname, "..", "models", "storyModel.js"))
const { adminError, cloudinaryError, validatorError, emailError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const _ = require('lodash');
const jwt = require("jsonwebtoken")
const { validateEmail, validatePassword } = require(path.join(__dirname, "..", "utils", "validator.js"))
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const  { cloudinaryUpload, cloudinaryDelete, cloudinarySingleDelete } = require(path.join(__dirname, "..", "utils", "cloudinary.js"))
const { adminConfirmationArray, hashAdminEmail }= require(path.join(__dirname, "..", "config", "adminConfig.js"))
const { avatars } = require(path.join(__dirname, "..", "data", "avatars"))
//Admin Registration
const duplicateUsername = async (req, res) => {
    const { username } = req.body;
    try{
const existingAdmin = await Admin.findOne({ username })
if(existingAdmin){
    throw new adminError("Username Already Exists", 400)
}
return res.status(200).json({message : "Username is available"})
    }catch(error){
        if (error instanceof adminError) {
            return res.status(error.statusCode).json({ message : error.message})
        }
             else{
         return res.status(500).json({message : "Internal Server Error"})
         }
    }
}





const signupAdmin = async (req, res) => {
try{
const { username, email, password, mobile} = req.body;
let profilePicture
if(!username || !email || !password || !mobile){
    throw new adminError("Please Fill In All The Fields", 400)
}
await validateEmail(email)
await validatePassword(password)
const adminEmails = process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
const isAdmin = adminEmails.includes(email)
if(!isAdmin){
    throw new adminError("You Are Not An Administrator", 401)
}
const foundAdmin = await Admin.findOne({email : email})
const foundMobile = await Admin.findOne({mobile : mobile})
if(foundAdmin && foundAdmin.status == false){
    return  res.status(200).json({ message : "Success, Check Your Email To Verify Your Account"})
  }
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
const otp = otpGenerator(4)
const token = crypto.randomBytes(32).toString("hex")
const verificationToken = crypto.createHash("sha256").update(token).digest("hex")
const minute = 5
let values = {
    code : otp,
    token : token,
    email : email,
    minute : minute,
    frontendUrl : process.env.LITENOTE_FRONTEND_URL,
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
const newAdmin = await Admin.create({ 
    username,
    email,
    bio : "writer",
    password :  hashedPassword,
    mobile,
    ipAddress : req.header('x-forwarded-for') || req.socket.remoteAddress,
    picture : profilePicture
})
const time = Date.now() + minute * 60 * 1000 //5 minutes //saved five minutes ahead in the future
await newAdmin.createVerificationToken(otp, verificationToken, time);
await newAdmin.save()
res.status(201).json({ message : "Success, Check Your Email To Verify Your Account"})
}catch(error){
    console.log(error)
logEvents(`${error.name}: ${error.message}`, "registerAdminError.txt", "adminError")
    if (error instanceof adminError) {
       return res.status(error.statusCode).json({ message : error.message})
    }
    else if(error instanceof validatorError){
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

const verifyAdminRegistration = async (req, res) => {
try{
const { token, email, otp } = req.body;
const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
const admin = await Admin.findOne({
    verificationToken : hashedToken,
    email : email,
    verificationTokenExpires : { $gt : Date.now()}
})
if(!admin){
    throw new adminError("OTP Has Expired, Click On Resend Verification Link", 404)
}
if(parseInt(otp) !== parseInt(admin.verificationCode)){
    throw new adminError("Wrong OTP, Pls Enter the correct One-time-passsword", 400)
}
admin.verificationToken = null;
admin.verificationCode = null;
admin.verificationTokenExpires = null;
admin.status = true;
await admin.save()
return res.status(201).json({message : "Account Verification Successfull, Go To Login"})
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "verifyAdminRegistrationError.txt", "adminError")
    if (error instanceof adminError) {
        return  res.status(error.statusCode).json({ message : error.message})
     }
     else{
        return res.status(500).json({message : "Internal Server Error"})
        }
}
}
const resendAdminVerification = async (req, res) => {
    try{
        const { email } = req.body;
        const admin = await Admin.findOne({email : email})
        if(!admin){
            throw new adminError("Your Have Not Yet Registered Your Account", 400)
        }
        const minute = 5
        const token = crypto.randomBytes(32).toString("hex")
        const otp = otpGenerator(4)
        const verificationToken = crypto.createHash("sha256").update(token).digest("hex")
        const time = Date.now() + minute * 60 * 1000 //5 minutes //saved five minutes ahead in the future
        let values = {
           code : otp,
           token : token,
           email : email,
           minute : minute,
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
admin.verificationToken = verificationToken;
admin.verificationCode = otp;
admin.verificationTokenExpires = time;
await admin.save()
return res.status(201).json({ message : "Success, Check Your Email To Verify Your Account, Another Link has been sent"})
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "resendAdminVerificationError.txt", "adminError")
        if (error instanceof adminError) {
            return  res.status(error.statusCode).json({ message : error.message})
         }else if(error instanceof emailError){
            return  res.status(error.statusCode).json({ message : error.message})
         }
         else{
            return res.status(500).json({message : "Internal Server Error"})
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
const adminEmails = process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
const isAdmin = adminEmails.includes(email)
if(!isAdmin){
    throw new adminError("You Are Not An Administrator", 401)
}
const foundAdmin = await Admin.findOne({email : email})
.select("-refreshToken -verificationCode -verificationToken -verificationTokenExpires -ipAddress")
.lean()
if(!foundAdmin){
    throw new adminError("Your Account Does Not Exist", 404)
}
if(foundAdmin.status === false){
    throw new userError("Your Account Has Not Yet Been Verified", 400)
}
const match = await bcrypt.compare(password, foundAdmin.password)
if(foundAdmin && match){
    const id = foundAdmin?._id.toString()
    const refreshToken = generateRefreshToken(id, foundAdmin.role)
    await Admin.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
    res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 7, sameSite : "None",  secure : true })
    //Seven Day Refresh Token
    res.status(201).json({
        admin : {...foundAdmin, accessToken : generateAccessToken(id, foundAdmin.role)},
        message : "Successfully Logged In User"
    })
}
else{
    throw new adminError("Invalid Credentials", 401)
}
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "loginAdminError.txt", "adminError")
    if (error instanceof adminError) {
       return  res.status(error.statusCode).json({ message : error.message})
    }
    else if(error instanceof validatorError){
        return  res.status(error.statusCode).json({ message : error.message})  
    }
    else{
        return res.status(500).json({message : "Internal Server Error"})
        }
}
}

//To Get The Current Admin
const getCurrentAdmin = async  (req, res) => {
    try{
if(req.user == null){
            throw new adminError("Your Account Does Not Exist", 404);
}
const { id } = req.user
validateMongoDbId(id)
const admin = await Admin.findById(id)
.select("-refreshToken -verificationCode -verificationToken -verificationTokenExpires -ipAddress -password -followers -following -bookmarks")
.lean()
if(!admin){
    throw new adminError("You Are Not Logged In", 401)
}
res.status(200).json(admin)
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getCurrentAdminError.txt", "adminError")
        if (error instanceof adminError) {
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
const getAnAdmin = async (req, res) => {
    const { id } = req.params;
try{
    let query;
    query = Admin.findOne({_id : id}).select("-refreshToken")
    if(req.query.fields){
        const fields = req.query.fields.split(",").join(" ")
        query = query.select(fields)
    
    }
const gotAdmin = await query
if(!gotAdmin){
    throw new adminError(`This admin does not exist`, 400)
}
res.status(200).json(gotAdmin);
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "getAnAdminError.txt", "adminError")
    if(error instanceof adminError){
        return res.status(error.statusCode).json({ message : error.message})
    }else{
        return res.status(500).json({message : "Internal Server Error"})
    }
}
}

 const getAdminProfile = async  (req, res) => {
    const username = req.query.username;
    try{
        if(!username){
            throw new userError("Your Account Does Not Exist", 404)
        }

const admin = await Admin.findOne({ username: username })
.select("-refreshToken -verificationCode -verificationToken -verificationExpires -ipAddress -password -stories -following -followers -bookmarks")
.lean()
if(!admin){
    throw new adminError("Your Account Does Not Exist", 401)
}
const totalStories =  await Story.countDocuments({userId : req.user._id}) || 0
const exists = await Admin.exists({
    email: req.user.email,
    "following.follows" : admin._id
});
const isFollowing = !!exists;
    res.status(200).json({admin :  {...admin, totalStories : totalStories}, isFollowing : isFollowing}) 
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getAdminProfileError.txt", "adminError")
        if (error instanceof adminError) {
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
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
            res.clearCookie("refreshToken", {httpOnly: true, sameSite : "None",  secure  : true })
            return res.status(204).json({message : "Successfully Logged Out", "success" : true})
        }
        admin.refreshToken = ""
        await admin.save();      
        res.clearCookie("refreshToken", {httpOnly: true,  sameSite : "None", secure : true })
        return res.status(204).json({message : "Successfully Logged Out now", "success" : true})
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "logoutAdminError.txt", "adminError")
        if (error instanceof adminError) {
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
//To Create A Admin Refresh Token
const adminRefreshToken = async (req, res) => {
    try{
        if(req.user == null){
            throw new adminError("Your Account Does Not Exist", 404)
        }
        const cookies = req.cookies;
        if(!cookies?.refreshToken){
            throw new adminError("Please Login Again , No RefreshToken In Cookies", 401)
        }
        const refreshToken = cookies.refreshToken;
        const foundAdmin = await Admin.findOne({refreshToken})
        if(!foundAdmin){
            throw new adminError("No RefreshToken In Database", 400)
        }
        const id = foundAdmin._id.toString();
        jwt.verify(refreshToken, process.env.LITENOTE_JWT_TOKEN_SECRET, (err, decoded) => {
            if(err || id !== decoded.id){
                throw new adminError("Wrong refresh token, because it has expired", 404)
            }
            const accessToken = generateAccessToken(id, decoded.role)
            res.status(201).json({accessToken : accessToken})
        })
        
    }catch(error){
        console.log(error)
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
    let query;
    query = await User.find()
    //Pagination, for different pages
const page = req.query.page;
const limit = req.query.limit;
const skip = (page - 1) * limit;
query = query.skip(skip).limit(limit);
    if(req.query.fields){
        const fields = req.query.fields.split(",").join(" ")
        query = query.select(fields)
    
    }
const gotUsers = await query.lean();
const userCount = await User.countDocuments();
if(!gotUsers){
    throw new adminError("No User Has Been Registered For Your Application", 204)
}
res.status(200).json({ users : gotUsers, userCount : userCount })
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
    getTotalNumberOfUsers,
    duplicateUsername,
    verifyAdminRegistration,
    resendAdminVerification,
    getAnAdmin,
    getAdminProfile
}