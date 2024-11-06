const mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
const developerSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    title : {
      type : String,
      required : true     
    },
    socials : {
        instagram: {
            type: String,
            required: true
        },
        twitter: {
            type: String,
            required: true
        },
        linkedin: {
            type: String,
            required: true
        }
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
        type:String,
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
        default : "developer",
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
developerSchema.statics.followuser = async function(developerId, followId){
  const follower  =    await this.findByIdAndUpdate(followId, {
        $push: { followers: { followedby: developerId } },
      }, { new : true})
    const following  =  await this.findByIdAndUpdate(developerId, {
        $push: { following: { follows: followId } },

      }, {new : true});
    const updatedFollower = await this.findByIdAndUpdate(follower._id, new update(follower), { new: true });
    await this.findByIdAndUpdate(following._id, new update(following), { new: true });
return updatedFollower
    
}
developerSchema.statics.unfollowuser = async function(developerId, followId){
   const follower = await this.findByIdAndUpdate(followId, {
        $pull: { followers: { followedby: developerId } },
      }, {new : true});
    const following =  await this.findByIdAndUpdate(developerId, {
        $pull: { following: { follows: followId } },
      }, { new : true});
      const updatedFollower = await this.findByIdAndUpdate(follower._id, new update(follower), { new: true });
      await this.findByIdAndUpdate(following._id, new update(following), { new: true });
  return updatedFollower
}
developerSchema.statics.createstory = async function(developerId, storyId){
     await this.findByIdAndUpdate(developerId, {
        $push: { stories: { storyId: storyId } },
      }, { new : true})
    }
developerSchema.statics.bookmarkStory = async function(developerId, bookmarkId){
        const developer = await this.findById(developerId)
      let alreadyBookmarked = developer.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString())
      if(alreadyBookmarked){
        return;
      }else{
        await this.findByIdAndUpdate(developerId, {
            $push: { bookmarks: { bookmarkId: bookmarkId } },
          }, { new : true})
        }
      }
developerSchema.statics.unbookmarkStory = async function(developerId, bookmarkId){
        const developer = await this.findById(developerId);
        let alreadyBookmarked = developer.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString());
        if(!alreadyBookmarked){
            return;
        } else {
            await this.findByIdAndUpdate(developerId, {
                $pull: { bookmarks: { bookmarkId: bookmarkId } },
            }, { new: true });
        }
    }
    
module.exports = mongoose.model('Developer', developerSchema);