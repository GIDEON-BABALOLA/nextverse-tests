const path = require("path")
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { notificationError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const Notification = require(path.join(__dirname, "..", "models", "notificationModel.js"))
const getMyNotifications = async (req, res) => {
    const { page, limit, category } = req.query;
    const skip = (page - 1) * limit;
    try{
        const notifications = await Notification.find({ user: req.user._id, category : category })
        .populate("actor", "picture bio username")
        .populate("referenceId",  category == "profile" ? "picture bio username" : "title") // Populate user or story details
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        const cleanNotifications = notifications
        .filter(story => {
            // Remove stories with empty objects, null or undefined values, and null/undefined _id
            return Object.keys(story).length > 0 && 
                   story._id != null && 
                   !Object.values(story).includes(null) && 
                   !Object.values(story).includes(undefined);
          });
        // Extract the _id of the fetched notifications
        const notificationIds = cleanNotifications.map(n => n._id);

        // Update their 'isRead' field to true
        await Notification.updateMany(
        { _id: { $in: notificationIds }, isRead: false }, // Optional: only update unread ones
        { $set: { isRead: true } }
          );
          const storyNotificationCount = await Notification.countDocuments({
            user: req.user._id,
            category: "story",
            referenceId: { $exists: true, $ne: null } 
          });
          
          const profileNotificationCount = await Notification.countDocuments({
            user: req.user._id,
            category: "profile",
          });
        res.status(200).json({
            "message" : "Successfully Retreived Notifications",
            notifications : cleanNotifications,
            storyNotificationCount : storyNotificationCount,
            profileNotificationCount: profileNotificationCount,
            currentNotificationCount: category == "story" ? storyNotificationCount : profileNotificationCount
             
            })            


    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getMyNotificationsError.txt", "notificationError")
        if(error instanceof notificationError){
            return res.status(error.statusCode).json({ message : error.message})
        }else{
            return res.status(500).json({message : "Internal Server Error"})
        }
    }
}
const getNotificationsCount  = async (req, res) => {
    try{
        
const notificationsCount =  await Notification.countDocuments({ user: req.user._id, isRead : false })
res.status(200).json({"message" : "Successfully retreived Notification Count", notificationsCount : notificationsCount})

    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "ngetNotificationsCountError.txt", "notificationError")
        if(error instanceof notificationError){
            return res.status(error.statusCode).json({ message : error.message})
        }else{
            return res.status(500).json({message : "Internal Server Error"})
        }
    }
}
const getAllNotifications = async (req, res) => {
    const { page, limit, category } = req.query;
    const skip = (page - 1) * limit;
    try{
        const notifications = await Notification.find({ category : category })
        .populate("actor", "picture username")
        .populate({
            path: "referenceId", // will dynamically use refPath (e.g., 'Story', 'User')
            select: category == "profile" ? "picture bio username" : "title", // include all possible fields
            
          })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
        const cleanNotifications = notifications
        .filter(story => {
            // Remove stories with empty objects, null or undefined values, and null/undefined _id
            return Object.keys(story).length > 0 && 
                   story._id != null && 
                   !Object.values(story).includes(null) && 
                   !Object.values(story).includes(undefined);
          });
          console.log(cleanNotifications)
        res.status(200).json({message : "Successfully Retrieved All Notifications",  notifications : cleanNotifications })
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getAllNotificationsError.txt", "notificationError")
        if(error instanceof notificationError){
            return res.status(error.statusCode).json({ message : error.message})
        }else{
            return res.status(500).json({message : "Internal Server Error"})
        }
    }
}
module.exports = { 
getMyNotifications,
getNotificationsCount,
getAllNotifications
 }