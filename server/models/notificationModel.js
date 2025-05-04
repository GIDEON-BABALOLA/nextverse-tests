const mongoose = require("mongoose")
const notificationSchema  = new mongoose.Schema({
user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The user receiving the notification
    required: true,
},
category : {
    type: String,
    enum : ["story", "profile", "note"],
    required: true
},
type : {
    type: String,
    enum : ["like", "comment", "follow", "bookmark", "share"],
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
actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The user who performed the action (liked, commented, followed)
    required: true,
  },
  categoryReference: {
    type: String,
    required: true,
    enum: ["Story", "User"] // actual Mongoose model names
  }  
},
{
    timestamps : true
}
)
notificationSchema.statics.createStoryNotification = async function(userId, storyId, type, message, actor){
    const notification = new this({
        user: userId, // The recipient
        category: "story",
        categoryReference: "Story",
        type: type,
        message: message,
        referenceId: storyId, // The story that was liked
        actor : actor
      });
    
      await notification.save();
}
notificationSchema.statics.createProfileNotification = async function(userId, followerId, type, message, actor){
    const notification = new this({
        user: userId, // The recipient
        category: "profile",
        categoryReference: "User",
        type: type,
        message: message,
        referenceId: followerId, // The user who followed
        actor : actor
      });
    
      await notification.save();
      console.log("Profile notification created!");
}  

module.exports = mongoose.model('Notification', notificationSchema);