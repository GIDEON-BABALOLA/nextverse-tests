const jwt = require("jsonwebtoken");
const path = require("path");
const rateLimit = require('express-rate-limit')
const { logEvents } = require(path.join(__dirname, "logEvents.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const Admin =  require(path.join(__dirname, "..", "models", "adminModel.js"))
const Developer = require(path.join(__dirname, "..", "models", "developerModel.js"))
const Designer = require(path.join(__dirname, "..", "models", "designerModel.js"))
const authMiddleware = async (req, res, next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer") || req.cookies.refreshToken){
    
      switch (true) {
       case req?.headers?.authorization?.startsWith("Bearer"):
          token = req.headers.authorization.split(" ")[1] 
          break;
        case req.cookies.refreshToken:
            token = req.cookies.refreshToken
       default:
          token = req.cookies.refreshToken
          break;
    }
    try{
        if(token){
            const decoded = jwt.verify(token, process.env.LIGHTNOTE_JWT_TOKEN_SECRET);

            switch (decoded?.role) {
                case "user":
                    const user = await User.findById(decoded?.id);
                    req.user = user;
                    break;
                    case "developer":
                    const  developer = await Developer.findById(decoded?.id);
                    req.user = developer;
                    break;
                    case "designer":
                    const designer = await Designer.findById(decoded?.id);
                    req.user = designer;
                    break;
                    case "admin":
                    const admin = await Admin.findById(decoded?.id);
                    req.user = admin;
                    break;
                default:
                console.log("No role is found for this user")
                    break;
            }
            next()
        }
    }catch(error){
        logEvents(`${error.name}:${error.message}`, "authenticationErrorLog.txt", "authError")
        console.log("Error in Authenticating users, the error is in authMiddleware")
        return res.status(401).json({"message": "Authentication token has expired", "success" : "false"})
    }
    //659efb572e740fbc683e648a
}else{
return res.status(401).json({"error" : "No Authorization token in the request headers, You are not logged in"})
}
} 
const bruteForceLimiter = rateLimit({
	windowMs:  60 * 1000, // 1 minutes
	limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	handler: (req, res, next, options) =>
		res.status(options.statusCode).json({message : "You Have Tried Incorrect Combinations Many Time, Pls Wait For A Minute"}),
})
const isAdministrator = async (req, res, next) => {
    if(req.user.role === "admin"){
        next()  
    }
    else{
        return res.status(404).json({"message" : "You are not an admin", "success": false})
    }
}
const isDeveloper = async (req, res, next) => {
    console.log(req.user)
    if(req.user && req.user.role === "developer"){
        next()  
    }
    else{
        return res.status(404).json({"message" : "You are not a Developer For Lightnote", "success": false})
    }
}
const isDesigner = async (req, res, next) => {
    
    if(req.user && req.user.role === "designer"){
        next()  
    }
    else{
        return res.status(404).json({"message" : "You are not a Product Designer For Lightnote", "success": false})
    }
}
const isUser = async (req, res, next) => {
    if(req.user && req.user.role === "user"){
        next()  
    }
    else{
        return res.status(404).json({"message" : "You are not a User", "success": false})
    }
}
module.exports = { authMiddleware, isAdministrator, isDeveloper, isDesigner, isUser, bruteForceLimiter }