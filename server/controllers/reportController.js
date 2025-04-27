const path = require("path")
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { reportError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const Report = require(path.join(__dirname, "..", "models", "reportModel.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const createReport = async (req, res) => {
const { category,  content, username } = req.body;
console.log(req.body)
const defaultCategory = [
    "harrasment or bullying",
    "hate speech",
    "fake account",
    "inappropriate content",
    "scam or fraud",
    "misinformation",
    "stolen content",
    "other"
  ]
try{
if(!defaultCategory.includes(category)){
    throw new reportError("Pls Enter A Correct Category", 400)
}
const userToBeReported = await User.findOne({username : username})
if(req.user._id.toString() == userToBeReported._id.toString()){
    throw new reportError("You Cannot Report Your Account", 400)
}
const newReport = await Report.create({ 
   category,
   content,
   userId: userToBeReported._id,
   status : "opened"
 })
 res.status(201).json({ message : "Report Successfully Created", report : newReport})
}
catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "createReportError.txt", "reportError")
    if(error instanceof reportError){
        return res.status(error.statusCode).json({ message : error.message})
    }else{
        return res.status(500).json({message : "Internal Server Error"})
    }
}
}
const getAllReports = async(req, res) => {
    const { page, limit} = req.query;
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const skip = (pageInt - 1) * limit;
try{
    const reports = await Report.find()
    .populate("userId", "picture bio username email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitInt)
    .lean()
    const reportCount = await Report.countDocuments();
    return res.status(200).json({message : "Successfully Retrieved All Reports", reports : reports, reportCount : reportCount})
}
catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "getAllReportsError.txt", "reportError")
    if(error instanceof notificationError){
        return res.status(error.statusCode).json({ message : error.message})
    }else{
        return res.status(500).json({message : "Internal Server Error"})
    }
}
}
const updateReport = async(req, res) => {
    try{

    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "updateReportError.txt", "reportError")
        if(error instanceof notificationError){
            return res.status(error.statusCode).json({ message : error.message})
        }else{
            return res.status(500).json({message : "Internal Server Error"})
        }  
    }
}
module.exports = {
    createReport,
    getAllReports
}