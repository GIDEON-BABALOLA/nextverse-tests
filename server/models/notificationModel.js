const mongoose = require("mongoose")
const notificationSchema  = new mongoose.Schema({
user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The user receiving the notification
    required: true,
},
category : {
    type: String,
    enum : ["story", "profile"],
    required: true
},
type : {
    type: String,
    enum : ["like", "comment", "follow"],
    required: true
},
isRead : {
    type: Boolean,
    default : false
},
message: {
    type: String,
    required: true,
  },
referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "categoryReference", // Dynamic reference (User or Story)
  },
categoryReference: {
    type: String,
    enum: ["User", "Story"], // Determines which model referenceId belongs to
  },
actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The user who performed the action (liked, commented, followed)
    required: true,
  },
},
{
    timestamps : true
}
)
notificationSchema.statics.createStoryNotification = async function(userId, storyId, type, message, actor){
    const notification = new this({
        user: userId, // The recipient
        category: "story",
        type: type,
        message: message,
        referenceId: storyId, // The story that was liked
        categoryReference: "Story",
        actor : actor
      });
    
      await notification.save();
}
notificationSchema.statics.createProfileNotification = async function(userId, followerId, type, message, actor){
    const notification = new this({
        user: userId, // The recipient
        category: "profile",
        type: type,
        message: message,
        referenceId: followerId, // The user who followed
        categoryReference: "User",
        actor : actor
      });
    
      await notification.save();
      console.log("Profile notification created!");
}  
module.exports = mongoose.model('Notification', notificationSchema);