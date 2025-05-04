const path = require("path")
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { reportError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const Report = require(path.join(__dirname, "..", "models", "reportModel.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const { userError, emailError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const { sendReportEmail } = require(path.join(__dirname, "..", "utils", "Email.js"))
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
console.log(userToBeReported)
if(req.user._id.toString() == userToBeReported._id.toString()){
    throw new reportError("You Cannot Report Your Account", 400)
}
await sendReportEmail(req.user.email, req.user.username, userToBeReported.username, `${category[0].toUpperCase() + category.slice(1)}`, process.env.LITENOTE_REPORT_EMAIL_OPENED)
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
    }
    else if(error instanceof userError){
        return res.status(error.statusCode).json({ message : error.message})
    }
    else if(error instanceof emailError){
        return res.status(error.statusCode).json({ message : error.message})
    }
    else{
        return res.status(500).json({message : "Internal Server Error"})
    }
}
}
const getAllReports = async(req, res) => {
    const { page, limit} = req.query;
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    console.log(pageInt, limitInt)
    const skip = (pageInt - 1) * limit;
try{
    const reports = await Report.find()
    .populate("userId", "picture bio username email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitInt)
    .lean()
    const cleanReports = reports
    .filter(story => {
        // Remove stories with empty objects, null or undefined values, and null/undefined _id
        return Object.keys(story).length > 0 && 
               story._id != null && 
               !Object.values(story).includes(null) && 
               !Object.values(story).includes(undefined);
      });
    const reportCount = await Report.countDocuments(
        {   userId: { $exists: true, $ne: null } }
    );
    console.log(reportCount)
    return res.status(200).json({message : "Successfully Retrieved All Reports", reports : cleanReports, reportCount : reportCount})
}
catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "getAllReportsError.txt", "reportError")
    if(error instanceof reportError){
        return res.status(error.statusCode).json({ message : error.message})
    }
    else if(error instanceof userError){
        return res.status(error.statusCode).json({ message : error.message})
    }
    else{
        return res.status(500).json({message : "Internal Server Error"})
    }
}
}
const getAllReportsStatistics = async(req, res) => {
    try{
        const totalReports = await Report.countDocuments();
        const clearedReports = await Report.countDocuments({ status : "closed"})
        const openedReports =  await Report.countDocuments({ status : "opened"})
        const pendingReports = await Report.countDocuments({ status : "pending"})
        console.log(openedReports)
        res.status(200).json({
            message : "Successfully Retrieved Report Statistics",
            totalReports : totalReports,
            clearedReports : clearedReports,
            openedReports : openedReports,
            pendingReports : pendingReports
        })
    }
    catch(error){
console.log(error)
logEvents(`${error.name}: ${error.message}`, "getAllReportsStatisticsError.txt", "reportError")
if(error instanceof reportError){
    return res.status(error.statusCode).json({ message : error.message})
}
else if(error instanceof userError){
    return res.status(error.statusCode).json({ message : error.message})
}
else{
    return res.status(500).json({message : "Internal Server Error"})
}
    }
}
const updateReport = async(req, res) => {
    const { status, username, category } = req.body;
    const { id } = req.params;
    try{
        let emailTemplate;

if (status === "opened") {
  emailTemplate = process.env.LITENOTE_REPORT_EMAIL_OPENED;
} else if (status === "pending") {
  emailTemplate = process.env.LITENOTE_REPORT_EMAIL_PENDING;
} else if (status === "closed") {
  emailTemplate = process.env.LITENOTE_REPORT_EMAIL_CLOSED;
}
        await sendReportEmail(req.user.email, req.user.username, username, `${category[0].toUpperCase() + category.slice(1)}`, emailTemplate)
        const updatedReport =  await Report.findByIdAndUpdate(id, { status : status},
            {
                new : true
            })
            const totalReports = await Report.countDocuments();
            const clearedReports = await Report.countDocuments({ status : "closed"})
            const openedReports =  await Report.countDocuments({ status : "opened"})
            const pendingReports = await Report.countDocuments({ status : "pending"})
            res.status(200).json({
                message: "Successfully Updated Report",
                report: updatedReport,
                counts: {
                  totalReports,
                  clearedReports,
                  openedReports,
                  pendingReports
                }
              });
              
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "updateReportError.txt", "reportError")
        if(error instanceof reportError){
            return res.status(error.statusCode).json({ message : error.message})
        }
        else if(error instanceof userError){
            return res.status(error.statusCode).json({ message : error.message})
        }
        else if(error instanceof emailError){
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
        }  
    }
}
module.exports = {
    createReport,
    getAllReports,
    getAllReportsStatistics,
    updateReport
}