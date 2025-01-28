const mongoose = require('mongoose'); // Erase if already required
const crypto = require("crypto")
const bcrypt = require("bcrypt")
// Declare the Schema of the Mongo model
const bookmarkSchema = new mongoose.Schema({
    bookmarkId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Story",
        required : true
    }
},
    {
        timestamps: { createdAt: true, updatedAt: false } // Enable createdAt, disable updatedAt
    })
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    bio : {
 type  : String,
    },
    status: {
        type : Boolean,
        required : true,
        default : false
    },
    verificationToken : {
        type : String,
        default : null
    },
    verificationCode : {
        type : Number,
        default : null
    },
    verificationTokenExpires : {
        type : Date,
        default : null
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
    newsletter : {
        type : Boolean,
        default : false
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
    notes : [
        {
            noteId : {type: mongoose.Schema.Types.ObjectId, ref : "Note"}
        }
    ],
        bookmarks : [bookmarkSchema]
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
userSchema.statics.createStory = async function(userId, storyId){
      await this.findByIdAndUpdate(userId, {
        $push: { stories: {
            
           $each :  [{storyId: storyId}],
           $position : 0, // Adds the new story at the beginning of the array
         } },
      }, { new : true})
    }
userSchema.statics.deleteStory = async function(userId, storyId){
            await this.findByIdAndUpdate(userId, {
                $pull: { stories: { storyId: storyId } },
            }, { new: true });
    }

userSchema.statics.bookmarkStory = async function(userId, bookmarkId){
    const user = await this.findById(userId)
  let alreadyBookmarked = user.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString())
  if(alreadyBookmarked){
    return;
  }else{
    await this.findByIdAndUpdate(userId, {
        $push: { bookmarks: {
            
           $each :  [{bookmarkId: bookmarkId}],
           $position : 0,
         } },
      }, { new : true})
    }
  }
  userSchema.statics.unbookmarkStory = async function(userId, bookmarkId){
    const user = await this.findById(userId);
    let alreadyBookmarked = user.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString());
    if(!alreadyBookmarked){
        return;
    } else {
        await this.findByIdAndUpdate(userId, {
            $pull: { bookmarks: { bookmarkId: bookmarkId } },
        }, { new: true });
    }
}
userSchema.methods.createVerificationToken = async function(otp, verificationToken, time) {
    this.verificationToken = verificationToken
    this.verificationTokenExpires = time
    this.verificationCode = otp
    return verificationToken;
}

// Object.assign({}, obj)
module.exports = mongoose.model('User', userSchema);



