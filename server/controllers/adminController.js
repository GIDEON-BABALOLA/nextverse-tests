const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { otpGenerator } = require(path.join(__dirname, "..", "utils", "otpGenerator.js"))
const fs = require('fs');
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const Admin = require(path.join(__dirname, "..", "models", "adminModel.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const Story = require(path.join(__dirname, "..", "models", "storyModel.js"))
const { adminError, cloudinaryError, validatorError, emailError, notificationError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const _ = require('lodash');
const jwt = require("jsonwebtoken")
const { validateEmail, validatePassword } = require(path.join(__dirname, "..", "utils", "validator.js"))
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const  { cloudinaryUpload, cloudinaryDelete, cloudinarySingleDelete, cloudinaryCheckIfFolderExists } = require(path.join(__dirname, "..", "utils", "cloudinary.js"))
const { generateEmailContent, sendEmail} = require(path.join(__dirname, "..", "utils", "Email.js"))
const { avatars } = require(path.join(__dirname, "..", "data", "avatars"))
//Admin Registration
const duplicateUsername = async (req, res) => {
    const { username } = req.body;
    try{
const existingAdmin = await Admin.findOne({ username })
const existingUser = await User.findOne({ username })
if(existingAdmin){
    throw new adminError("Username Already Exists", 400)
}
if(existingUser){
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
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
//This is to upload a admin picture
const uploadAdminPicture = async (req, res) => {
    try{
        if(req.user == null){
            throw new userError("Your Account Does Not Exist", 404)
        }
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
    res.status(200).json({message : "Picture Successfully Updated", picture : picture.url})
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "uploadAdminProfileError.txt", "adminError")
        if (error instanceof cloudinaryError) {
            return res.status(error.statusCode).json({ message : error.message})
        }else if(error instanceof adminError){
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
        }
}
//This Is To update A Admin
const updateAdmin = async (req, res) => {
    const attributesThatCanBeUpdated = [
        "username", "mobile", "password", "bio", "picture",   
       ]
try{
    if(req.user == null){
        throw new adminError("Your Account Does Not Exist", 404)
    }
    if(Object.keys(req.body).length === 0){
        throw new userError("Enter The Details You Want To Update", 400)
    }
    const { _id } = req.user;
    validateMongoDbId(_id)
const id = _id.toString();
for(const key in req.body){
    const value = req.body[key]
    if (req.body.hasOwnProperty(key)) {
        const isValidCategory = attributesThatCanBeUpdated.includes(key)
        if(!isValidCategory){
           throw new userError(`You cannot update your ${key}`, 400)
        }
        if (!value) {
            throw new userError(`Pls Enter The Values You Want To Update`, 400)
        }
        if(key == "password"){
            await validatePassword(value)
            const hashedPassword = await bcrypt.hash(value, 10);
            req.body.password =  hashedPassword
        }
        if(key == "username"){
            const existingUser = await Admin.findOne({ username: value });
            if (existingUser && existingUser._id.toString() !== id) {
                throw new userError("Username is already taken", 400);
            }
  
        }
        if(key == "mobile"){
            const existingUser = await User.findOne({ mobile: value });
            const existingAdmin = await Admin.findOne({ mobile: value });
            
            const isUserConflict = existingUser && existingUser._id.toString() !== id;
            const isAdminConflict = existingAdmin && existingAdmin._id.toString() !== id;
            
            if (isUserConflict || isAdminConflict) {
              throw new userError("Phone number is already in use", 400);
            }
        }
    }
}
    const updatedAdmin =  await Admin.findByIdAndUpdate(id, req.body,
    {
        new : true
    }).select("-refreshToken -verificationCode -verificationToken -verificationTokenExpires -ipAddress -password -followers -following -bookmarks")
    res.status(200).json({message : "Admin Successfully Updated", user : updatedAdmin})
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.stack}`, "UpdateAnAdminError.txt", "user")
    if (error instanceof adminError) {
        return res.status(error.statusCode).json({ message : error.message})
    }
    else if(error instanceof validatorError){
        return res.status(error.statusCode).json({message : error.message})
    }
    else{
        return res.status(500).json({message : "Internal Server Error"})
        }
}
}
const deleteAdmin = async (req, res) => {
    try{

        if(req.user == null){
            throw new adminError("Your Account Does Not Exist", 404)
        }
        const oldAdmin = await Admin.findOneAndDelete({_id: req.user._id})
        const cloudinaryExists =  await cloudinaryCheckIfFolderExists("Admin", oldAdmin.email)
        if(oldAdmin.picture.length > 0 && cloudinaryExists){
            await cloudinaryDelete(oldAdmin.email)
        }
        if(!oldAdmin){
            throw new adminError("Your Account Does Not Exist", 404)
        }
        res.status(200).json({message : "Successfully Deleted Your Account", admin : oldAdmin})
    }catch(error){
        console.log(error);
        logEvents(`${error.name}: ${error.message}`, "deleteAdminError.txt", "adminError")
         if(error instanceof adminError){
            return res.status(error.statusCode).json({ message : error.message})
        }
        else if(error instanceof cloudinaryError){
            return res.status(error.statusCode).json({message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
        }
    }
}

const followUser = async (req, res) => {
    try{
        const { _id } = req.user;
        const { email } = req.body;
        if(!email){
            throw new adminError("What is the email of the user you want to follow", 400)
        }
        if(email == req.user.email){
            throw new adminError("You Cannot Follow Yourself On This Platform", 400)
        }
        let personToBeFollowed, followModel;
        const userToBeFollowed = await User.findOne({email})
        const adminToBeFollowed = await Admin.findOne({email})
        if(userToBeFollowed){
           personToBeFollowed = userToBeFollowed
           followModel = User
        }
        else if(adminToBeFollowed){
            personToBeFollowed = adminToBeFollowed
            followModel = Admin
        }
        else{
            throw new adminError("This User Does Not Exist", 400)
        }
        let alreadyFollowed = personToBeFollowed.followers.find((userId) => userId.followedby.toString() === _id.toString())
        if(!alreadyFollowed){
            await followModel.followuser(_id, personToBeFollowed._id) //This has been configured in the admin model
            await Notification.createProfileNotification(
            personToBeFollowed._id,
            req.user._id,
            "follow",
            `${req.user.username} just followed you`, 
            req.user._id
        
        )
        return res.status(200).json({ message: "Successfully Followed This User." });                             
        }
         res.status(200).json({ message: "You already follow this user." });           
         
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "followAdminError.txt", "adminError")
        if(error instanceof adminError){
           return res.status(error.statusCode).json({ message : error.message})
       }
           else if(error instanceof notificationError){
               return res.status(error.statusCode).json({ message: error.message });
           }
       else{
           return res.status(500).json({message : "Internal Server Error"})
       }   
    }
}
const unfollowUser = async(req, res) => {
    try{
        const { _id } = req.user;
        const { email } = req.body;
        if(!email){
            throw new adminError("What is the email of the user you want to follow", 400)
        }
        if(email === req.user.email){
            throw new adminError("You Cannot UnFollow Yourself On This Platform", 400)
        }
        let personToBeUnFollowed, unFollowModel;
        const userToBeUnFollowed = await User.findOne({email})
        const adminToBeUnFollowed = await Admin.findOne({email})
        if(userToBeUnFollowed){
            personToBeUnFollowed = userToBeUnFollowed
            unFollowModel = User
         }
         else if(adminToBeUnFollowed){
             personToBeUnFollowed = adminToBeUnFollowed
             unFollowModel = Admin
         }
         else{
             throw new adminError("This User Does Not Exist", 400)
         }
        let alreadyFollowed = personToBeUnFollowed.followers.find((userId) => userId.followedby.toString() === _id.toString())
        if(alreadyFollowed){
            await unFollowModel.unfollowuser(_id, personToBeUnFollowed._id)//This has been configured in the admin model
            return  res.status(200).json({ message : "Successfully Unfollowed User"})            

        }
        res.status(200).json({ message : "Successfully Unfollowed User"})
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "unfollowAdminError.txt", "adminError")
        if(error instanceof adminError){
           return res.status(error.statusCode).json({ message : error.message})
       }else{
           return res.status(500).json({message : "Internal Server Error"})
       }  
    }
}
const getAllUsers = async (req, res) => {
    const { page, limit } = req.query;
    try{
    const skip = (page - 1) * limit;
    const gotUsers = await User.find().select("following");
    if(!gotUsers){
        throw new userError("No User Has Been Registered For Your Application", 204)
    }
    let alreadyFollowedId = [];
    const userCount = await User.countDocuments();
    req.user.following.map((user) => {
        alreadyFollowedId.push(user.follows)
    })
    const newUsersToFollow = await Admin.find({
        _id: { $nin: alreadyFollowedId },
    })
        .skip(skip)
        .limit(limit)
        .select("email username picture bio")
        .lean(); // Use lean if you want plain JavaScript objects    
    const usersToBeSent = newUsersToFollow
    .filter((user) => user.email !== req.user.email)
    res.status(200).json({ users : usersToBeSent, count : userCount, currentCount : newUsersToFollow.length})         
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getAllUsersError.txt", "adminError")
        if(error instanceof adminError){
            return res.status(error.statusCode).json({ message : error.message})
        }else{
            return res.status(500).json({message : "Internal Server Error"})
        }
    }
    }
  const getAdminBookmarks = async (req, res) => {
        const { page, limit } = req.query;
        try{
        const skip = (page - 1) * limit;
        const bookmarkedStories = await Story.find({
            'bookmarks.bookmarkBy': req.user._id
          })
            .sort({ createdAt: -1 }) // Newest first
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate("adminId", "picture username email bio")
            .lean();
    const bookmarksCount = await Story.countDocuments({"bookmarks.bookmarkBy" : req.user._id})
   const enrichedBookmarks = bookmarkedStories.map((story) => ({
    ...story,
    picture : story.picture[Math.floor(Math.random() * story.picture.length)],
    isLiked: story.likes.some((like) => like.likedBy.toString() == req.user._id.toString()),
    isBookmarked : story.bookmarks.some((bookmark) => bookmark.bookmarkBy.toString() == req.user._id.toString())
  }));
    res.status(200).json({ bookmarks : enrichedBookmarks, count : bookmarksCount})           


        }
        catch(error){
            console.log(error)
            logEvents(`${error.name}: ${error.message}`, "getAdminBookmarksError.txt", "adminError")
            if(error instanceof adminError){
                return res.status(error.statusCode).json({ message : error.message})
            }else{
                return res.status(500).json({message : "Internal Server Error"})
            }
        }
        }
    const getUserStories = async (req, res) => {
            const { page, limit } = req.query;
            const { username } = req.params
            console.log(page, limit)
            try{
                const skip = (page - 1) * limit;
                let  selectedId, roleId
                const foundUser = await User.findOne({username : username})
                const foundAdmin = await Admin.findOne({username : username})
                if(foundUser){
                 selectedId = foundUser._id
                 roleId = "userId"
                }
                else if(foundAdmin){
                 selectedId = foundAdmin._id
                 roleId = "adminId"
                }
                else{
                    throw new adminError("This User Does Not Exist", 400)
                }
                const query = {}
                query[roleId] = selectedId
                const stories =  await Story.find(query)
                .select("-content")
                .populate(roleId, "username picture")
                .sort({ createdAt: -1 }) // Newest first
                .skip(parseInt(skip))
                .limit(parseInt(limit))
                .lean()
                const enrichedStories = stories.map((story) => ({
                    ...story,
                    picture : story?.picture[Math.floor(Math.random() * story?.picture?.length)],
                    isLiked: story?.likes?.some((like) => like.likedBy.toString() == req.user._id.toString()),
                    isBookmarked : story.bookmarks.some((bookmark) => bookmark.bookmarkBy.toString() == req.user._id.toString())
                  }));
                const storiesCount = await Story.countDocuments(query) || 0;
                res.status(200).json({stories : enrichedStories, count : storiesCount})
            }
            catch(error){
                console.log(error)
                logEvents(`${error.name}: ${error.message}`, "getUserStoriesError.txt", "userError")
                if(error instanceof adminError){
                    return res.status(error.statusCode).json({ message : error.message})
                }else{
                    return res.status(500).json({message : "Internal Server Error"})
                }
            }
        }
             const getCurrentAdminStories = async (req, res) => {
                        const { page, limit } = req.query;
                        console.log(page, limit)
                        try{
                        const skip = (page - 1) * limit;
                        const stories = await Story.find({adminId: req.user._id})
                        .select("-content")
                        .sort({ createdAt: -1 }) // Newest first
                        .skip(parseInt(skip))
                        .limit(parseInt(limit))
                        .populate("userId", "picture username email bio")
                        .lean()
                   const storiesCount =  await Story.countDocuments({adminId: req.user._id}) || 0;
                   const cleanedStories = stories.filter(story => {
                    // Remove stories with empty objects, null or undefined values, and null/undefined _id
                    return Object.keys(story).length > 0 && 
                           story._id != null && 
                           !Object.values(story).includes(null) && 
                           !Object.values(story).includes(undefined);
                  });
                   const enrichedStories = cleanedStories.map((story) => ({
                    ...story,
                    picture : story?.picture[Math.floor(Math.random() * story?.picture?.length)],
                    isLiked: story?.likes?.some((like) => like.likedBy.toString() == req.user._id.toString()),
                    isBookmarked : story.bookmarks.some((bookmark) => bookmark.bookmarkBy.toString() == req.user._id.toString())
                  }));
                    res.status(200).json({ stories : enrichedStories, count : storiesCount})          
            
                 
                        }
                        catch(error){
                            console.log(error)
                            logEvents(`${error.name}: ${error.message}`, "getCurrentAdminStoriesError.txt", "adminError")
                            if(error instanceof adminError){
                                return res.status(error.statusCode).json({ message : error.message})
                            }else{
                                return res.status(500).json({message : "Internal Server Error"})
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
const getAllUsersByAdmin = async (req, res) => {
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
    getAllUsersByAdmin,
    getTotalNumberOfUsers,
    duplicateUsername,
    verifyAdminRegistration,
    resendAdminVerification,
    getAnAdmin,
    getAdminProfile,
    followUser,
    unfollowUser,
    getAllUsers,
    getAdminBookmarks,
    getUserStories,
    getCurrentAdminStories
}