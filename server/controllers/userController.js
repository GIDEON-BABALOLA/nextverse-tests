const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const fs = require('fs');
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const mongoose = require("mongoose")
const { generateAccessToken, generateRefreshToken} = require(path.join(__dirname, "..", "config", "tokenConfig.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const Story = require(path.join(__dirname, "..", "models", "storyModel.js"))
const Notification = require(path.join(__dirname, "..", "models", "notificationModel.js"))
const { userError, cloudinaryError, validatorError, notificationError,  emailError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const _ = require('lodash');
const jwt = require("jsonwebtoken")
const { validateEmail, validatePassword } = require(path.join(__dirname, "..", "utils", "validator.js"))

const { Console } = require("console");
const { otpGenerator } = require(path.join(__dirname, "..", "utils", "otpGenerator.js"))
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const  {cloudinaryUpload, cloudinaryDelete, cloudinarySingleDelete, cloudinaryCheckIfFolderExists } = require(path.join(__dirname, "..", "utils", "cloudinary.js"))
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
            return res.status(error.statusCode).json({ message : error.message})
        }
             else{
         return res.status(500).json({message : "Internal Server Error"})
         }
    }
}













const signupUser = async (req, res) => {
try{
const { username, email, password, mobile} = req.body
let profilePicture
if(!username || !email || !password || !mobile){
    throw new userError("Please Fill In All The Fields", 400)
}
await validateEmail(email)
await validatePassword(password)
const foundUser = await User.findOne({email : email})
const foundMobile = await User.findOne({mobile : mobile})
if(foundUser && foundUser.status == false){
  return  res.status(200).json({ message : "Success, Check Your Email To Verify Your Account"})
}
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
const newUser = await User.create({ 
    username, 
    email, 
    bio : "writer",
    password :  hashedPassword,
    mobile : mobile, 
    ipAddress : req.header('x-forwarded-for') || req.socket.remoteAddress,
    picture : profilePicture
 })
 const time = Date.now() + minute * 60 * 1000 //5 minutes //saved five minutes ahead in the future
await newUser.createVerificationToken(otp, verificationToken, time);
await newUser.save()
res.status(201).json({ message : "Success, Check Your Email To Verify Your Account"})
}catch(error){
    console.log(error)
logEvents(`${error.name}: ${error.message}`, "registerUserError.txt", "userError")
    if (error instanceof userError) {
       return  res.status(error.statusCode).json({ message : error.message})
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

















const verifyUserRegistration = async (req, res) => {
try{
const { token, email, otp } = req.body;
const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
const user = await User.findOne({
    verificationToken : hashedToken,
    email : email,
    verificationTokenExpires : { $gt : Date.now()}
})
if(!user){
    throw new userError("OTP Has Expired, Click On Resend Verification Link", 404)
}
if(parseInt(otp) !== parseInt(user.verificationCode)){
    throw new userError("Wrong OTP, Pls Enter the correct One-time-passsword", 400)
}
user.verificationToken = null;
user.verificationCode = null;
user.verificationTokenExpires = null;
user.status = true;
await user.save()
return res.status(201).json({message : "Account Verification Successfull, Go To Login"})

}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "verifyUserRegistrationError.txt", "userError")
    if (error instanceof userError) {
        return  res.status(error.statusCode).json({ message : error.message})
     }
     else{
        return res.status(500).json({message : "Internal Server Error"})
        }
}
}



























const resendUserVerification = async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({email : email})
        if(!user){
            throw new userError("Your Have Not Yet Registered Your Account", 400)
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
user.verificationToken = verificationToken;
user.verificationCode = otp;
user.verificationTokenExpires = time;
await user.save()
return res.status(201).json({ message : "Success, Check Your Email To Verify Your Account, Another Link has been sent"})
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "resendUserVerificationError.txt", "userError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
         }else if(error instanceof emailError){
            return  res.status(error.statusCode).json({ message : error.message})
         }
         else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}

























//User Logging in
const loginUser = async (req, res) => {
try{
const { email, password } = req.body;
if(!email || !password){
    throw new userError("Please Provide An Email And A Password", 400)
}
await validateEmail(email)
await validatePassword(password)
const foundUser = await User.findOne({email : email})
.select("-refreshToken -verificationCode -verificationToken -verificationTokenExpires -ipAddress")
.lean()
if(!foundUser){
    throw new userError("Your Account Does Not Exist", 404)
}
if(foundUser.status === false){
    throw new userError("Your Account Has Not Yet Been Verified", 400)
}
const match = await bcrypt.compare(password, foundUser.password)
if(foundUser && match){
    const id = foundUser?._id.toString()
    const refreshToken = generateRefreshToken(id, foundUser.role)
    await User.findByIdAndUpdate(id, {refreshToken : refreshToken}, { new : true})
    res.cookie("refreshToken", refreshToken, { httpOnly : true, maxAge: 60 * 60 * 1000 * 24 * 7, sameSite : "None",  secure : true })
    //Seven Day Refresh Token
    res.status(201).json({
        user : {...foundUser, accessToken : generateAccessToken(id, foundUser.role)},
        message : "Successfully Logged In User"
    })
 }
else{
    throw new userError("Invalid Credentials", 401)
}
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "loginUserError.txt", "userError")
    if (error instanceof userError) {
       return  res.status(error.statusCode).json({ message : error.message})
    }else if(error instanceof validatorError){
        return  res.status(error.statusCode).json({ message : error.message})  
    }
    else{
        return res.status(500).json({message : "Internal Server Error"})
        }
}
}

//To Get The Current User
const getCurrentUser = async  (req, res) => {
    try{
        if(req.user == null){
            throw new userError("Your Account Does Not Exist", 404);
        }
const { id } = req.user
validateMongoDbId(id)
const user = await User.findById(id)
.select("-refreshToken -verificationCode -verificationToken -verificationTokenExpires -ipAddress -password -followers -following -bookmarks")
.lean()
if(!user){
    throw new userError("You Are Not Logged In", 401)
}
    res.status(200).json(user)
    }catch(error){
console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getCurrentUserError.txt", "userError")
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
const getAUser = async (req, res) => {
    const { id } = req.params;
try{
    let query;
    query = User.findOne({_id : id}).select("-refreshToken")
    if(req.query.fields){
        const fields = req.query.fields.split(",").join(" ")
        query = query.select(fields)
    
    }
const gotUser = await query
if(!gotUser){
    throw new userError(`This user does not exist`, 400)
}
res.status(200).json(gotUser);
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "getAUserError.txt", "userError")
    if(error instanceof userError){
        return res.status(error.statusCode).json({ message : error.message})
    }else{
        return res.status(500).json({message : "Internal Server Error"})
    }
}
}
 const getUserProfile = async  (req, res) => {
    const username = req.query.username;
    try{
        if(!username){
            throw new userError("Your Account Does Not Exist", 404)
        }

const user = await User.findOne({ username: username })
.select("-refreshToken -verificationCode -verificationToken -verificationExpires -ipAddress -password -stories -following -followers -bookmarks")
.lean()
if(!user){
    throw new userError("Your Account Does Not Exist", 401)
}
const totalStories =  await Story.countDocuments({userId : req.user._id}) || 0
const exists = await User.exists({
    email: req.user.email,
    "following.follows" : user._id
});
const isFollowing = !!exists;
    res.status(200).json({user :  {...user, totalStories : totalStories}, isFollowing : isFollowing}) 
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getUserProfileError.txt", "userError")
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
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
            res.clearCookie("refreshToken", {httpOnly: true, sameSite : "None" , secure  : true })
            return res.status(204).json({message : "Successfully Logged Out", "success" : true})
        }
        user.refreshToken = ""
        await user.save();      
        res.clearCookie("refreshToken", {httpOnly: true,  sameSite : "None", secure : true })
        return res.status(204).json({message : "Successfully Logged Out now", "success" : true})
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "logoutUserError.txt", "userError")
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
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
            throw new userError ("Please Login Again , No RefreshToken In Cookies", 401)
        }
        const refreshToken = cookies.refreshToken;
        const foundUser = await User.findOne({refreshToken})
        if(!foundUser){
            throw new userError("No RefreshToken In Database", 400)
        }
        const id = foundUser._id.toString() 
        jwt.verify(refreshToken, process.env.LITENOTE_JWT_TOKEN_SECRET, (err, decoded) => {
            if(err || id !== decoded.id){
                throw new userError("Wrong refresh token, because it has expired", 404)
            }
            const accessToken = generateAccessToken(id, decoded.role)
            res.status(201).json({accessToken : accessToken})
        })
        
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "userRefreshTokenError.txt", "userError")
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
//This is to upload a user picture
const uploadUserPicture = async (req, res) => {
    try{

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
    res.status(200).json({message : "Picture Successfully Updated", picture : picture.url})
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "uploadUserProfileError.txt", "userError")
        if (error instanceof cloudinaryError) {
            return res.status(error.statusCode).json({ message : error.message})
        }else if(error instanceof userError){
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
            }
        }
}
//This Is To update A User
const updateUser = async (req, res) => {
    console.log(req.body, "Gidiboy")
    const attributesThatCanBeUpdated = [
        "username", "mobile", "password", "bio", "picture",   
       ]
try{
    if(req.user == null){
        throw new userError("Your Account Does Not Exist", 404)
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
            const existingUser = await User.findOne({ username: value });
            if (existingUser && existingUser._id.toString() !== id) {
                throw new userError("Username is already taken", 400);
            }
  
        }
        if(key == "mobile"){
            const existingUser = await User.findOne({ mobile: value });
            if (existingUser && existingUser._id.toString() !== id) {
                throw new userError("Phone number is already in use", 400);
            }
        }
    }
}
    const updatedUser =  await User.findByIdAndUpdate(id, req.body,
    {
        new : true
    }).select("-refreshToken -verificationCode -verificationToken -verificationTokenExpires -ipAddress -password -followers -following -bookmarks")
    res.status(200).json({message : "User Successfully Updated", user : updatedUser})
}catch(error){
    logEvents(`${error.name}: ${error.stack}`, "UpdateAUserError.txt", "user")
    if (error instanceof userError) {
        return res.status(error.statusCode).json({ message : error.message})
    }
    else if(error instanceof validatorError){
        return res.status(error.statusCode).json({error : error.message})
    }
    else{
        return res.status(500).json({message : "Internal Server Error"})
        }
}
}
const deleteUser = async (req, res) => {
    try{

        if(req.user == null){
            throw new userError("Your Account Does Not Exist", 404)
        }
        const oldUser = await User.findOneAndDelete({_id: req.user._id})
        const cloudinaryExists =  await cloudinaryCheckIfFolderExists("User", oldUser.email)
        console.log(cloudinaryExists)
        if(oldUser.picture.length > 0 && cloudinaryExists){
            await cloudinaryDelete(oldUser.email)
        }
        if(!oldUser){
            throw new userError("Your Account Does Not Exist", 404)
        }
        res.status(200).json({message : "Successfully Deleted Your Account", user : oldUser})
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "deleteUserError.txt", "userError")
         if(error instanceof userError){
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
            throw new userError("What is the email of the user you want to follow", 400)
        }
        if(email == req.user.email){
            throw new userError("You Cannot Follow Yourself On This Platform", 400)
        }
        const userToBeFollowed = await User.findOne({email})
        let alreadyFollowed = userToBeFollowed.followers.find((userId) => userId.followedby.toString() === _id.toString())
        if(!alreadyFollowed){
            const user =  await User.followuser(_id, userToBeFollowed._id) //This has been configured in the users model
            await Notification.createProfileNotification(
            userToBeFollowed._id,
            req.user._id,
            "follow",
            `${req.user.username} just followed you`, 
            req.user._id
        
        )
            return  res.status(201).json(user)                   
                             
        }
            res.status(200).json(userToBeFollowed)               
         
    }catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "followUserError.txt", "userError")
        if(error instanceof userError){
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
            throw new userError("What is the email of the user you want to follow", 400)
        }
        if(email == req.user.email){
            throw new userError("You Cannot UnFollow Yourself On This Platform", 400)
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
    const gotUsers = await User.find();
    if(!gotUsers){
        throw new userError("No User Has Been Registered For Your Application", 204)
    }
    let alreadyFollowedId = [];
    const userCount = await User.countDocuments();
    req.user.following.map((user) => {
        alreadyFollowedId.push(user.follows)
    })
    // const newUsersToFollow = gotUsers.filter((user) => !alreadyFollowedId.includes(user._id.toString()))
    const newUsersToFollow = await User.find({
        _id: { $nin: alreadyFollowedId },
    })
        .skip(skip)
        .limit(limit)
        .lean(); // Use lean if you want plain JavaScript objects    
    const usersToBeSent = newUsersToFollow
    .filter((user) => user.email !== req.user.email)
    .map((user) => {
        return _.pick(user, "email", "username", "picture", "bio")
    })

        res.status(200).json({ users : usersToBeSent, count : userCount, currentCount : newUsersToFollow.length})         
    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "getAllUsersError.txt", "adminError")
        if(error instanceof userError){
            return res.status(error.statusCode).json({ message : error.message})
        }else{
            return res.status(500).json({message : "Internal Server Error"})
        }
    }
    }
    const getUserBookmarks = async (req, res) => {
        const { page, limit } = req.query;
        try{
        const skip = (page - 1) * limit;
        const bookmarkedStories = await Story.find({
            'bookmarks.bookmarkBy': req.user._id
          })
            .sort({ createdAt: -1 }) // Newest first
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate("userId", "picture username email bio")
            .lean();
    const bookmarksCount = await Story.countDocuments({"bookmarks.bookmarkBy" : req.user._id})
    console.log(bookmarksCount)
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
            logEvents(`${error.name}: ${error.message}`, "getUserBookmarksError.txt", "userError")
            if(error instanceof userError){
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
                const user = await User.findOne({username : username})
                const stories =  await Story.find({ userId: user._id })
                .select("-content")
                .populate("userId", "username picture")
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
                const storiesCount = await Story.countDocuments({ userId: user._id }) || 0;
                res.status(200).json({stories : enrichedStories, count : storiesCount})
            }
            catch(error){
                console.log(error)
                logEvents(`${error.name}: ${error.message}`, "getUserStoriesError.txt", "userError")
                if(error instanceof userError){
                    return res.status(error.statusCode).json({ message : error.message})
                }else{
                    return res.status(500).json({message : "Internal Server Error"})
                }
            }
        }
        const getCurrentUserStories = async (req, res) => {
            const { page, limit } = req.query;
            console.log(page, limit)
            try{
            const skip = (page - 1) * limit;
            const stories = await Story.find({userId: req.user._id})
            .select("-content")
            .sort({ createdAt: -1 }) // Newest first
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate("userId", "picture username email bio")
            .lean()
       const storiesCount =  await Story.countDocuments({userId: req.user._id}) || 0;
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
                logEvents(`${error.name}: ${error.message}`, "getCurrentUserStoriesError.txt", "userError")
                if(error instanceof userError){
                    return res.status(error.statusCode).json({ message : error.message})
                }else{
                    return res.status(500).json({message : "Internal Server Error"})
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
    duplicateUsername,
    verifyUserRegistration,
    getUserProfile,
    resendUserVerification,
    getAllUsers,
    getAUser,
    getUserBookmarks,
    getUserStories,
    getCurrentUserStories
}
