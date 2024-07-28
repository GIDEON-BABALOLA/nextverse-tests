const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    accessToken : {
        type:String
    },
    refreshToken : {
      type : String
    },
    picture : {
        type: String,
        default : ""
    },
    role : {
        type : String,
        default : "user",
        required : true,
        enum : [ "user", "developer", "admin", "designer"]
    },
    ipAddress : {
        type : String
    },
    verification : {
        type : Boolean,
        default : false
    },
    followers : [
        {
    followedby : {type : mongoose.Schema.Types.ObjectId, ref : "User"}
    }
    ],
    following : [
        {
    follows :  {type : mongoose.Schema.Types.ObjectId, ref : "User"}
    }
    ],
    totalfollowing : {
        type : Number,
        default : 0
    },
    
    totalfollowers : {
        type : Number,
        default : 0
    },
    stories : [
        {
    storyId :  {type : mongoose.Schema.Types.ObjectId, ref: "Story"}
        }
        ],
    bookmarks : [
        {
        bookmarkId :  {type : mongoose.Schema.Types.ObjectId, ref: "Story"}
        }
    ]
}, {
    timestamps : true
});
class update{
    constructor(params){
        this.totalfollowers = params.followers.length,
        this.totalfollowing = params.following.length
    }
}
userSchema.statics.followuser = async function(adminId, followId){
  const follower  =    await this.findByIdAndUpdate(followId, {
        $push: { followers: { followedby: adminId } },
      }, { new : true})
    const following  =  await this.findByIdAndUpdate(adminId, {
        $push: { following: { follows: followId } },

      }, {new : true});
    const updatedFollower = await this.findByIdAndUpdate(follower._id, new update(follower), { new: true });
    await this.findByIdAndUpdate(following._id, new update(following), { new: true });
return updatedFollower
    
}
userSchema.statics.unfollowuser = async function(adminId, followId){
   const follower = await this.findByIdAndUpdate(followId, {
        $pull: { followers: { followedby: adminId } },
      }, {new : true});
    const following =  await this.findByIdAndUpdate(adminId, {
        $pull: { following: { follows: followId } },
      }, { new : true});
      const updatedFollower = await this.findByIdAndUpdate(follower._id, new update(follower), { new: true });
      await this.findByIdAndUpdate(following._id, new update(following), { new: true });
  return updatedFollower
}
userSchema.statics.createstory = async function(adminId, storyId){
     await this.findByIdAndUpdate(adminId, {
        $push: { stories: { storyId: storyId} },
      }, { new : true})
    }
userSchema.statics.bookmarkStory = async function(userId, bookmarkId){
    const user = await this.findById(userId)
    console.log(user.bookmarks)
  let alreadyBookmarked = user.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString())
  console.log(alreadyBookmarked)
  if(alreadyBookmarked){
    return;
  }else{
    await this.findByIdAndUpdate(userId, {
        $push: { bookmarks: { bookmarkId: bookmarkId } },
      }, { new : true})
    }
  }
  userSchema.statics.unbookmarkStory = async function(userId, bookmarkId){
    const admin = await this.findById(userId);
    let alreadyBookmarked = admin.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString());
    if(!alreadyBookmarked){
        return;
    } else {
        await this.findByIdAndUpdate(userId, {
            $pull: { bookmarks: { bookmarkId: bookmarkId } },
        }, { new: true });
    }
}

// Object.assign({}, obj)
module.exports = mongoose.model('User', userSchema);



