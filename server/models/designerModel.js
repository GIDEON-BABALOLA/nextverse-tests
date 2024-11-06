const mongoose = require('mongoose'); 
const designerSchema = new mongoose.Schema({
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
        default : "designer",
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
designerSchema.statics.followuser = async function(designerId, followId){
  const follower  =    await this.findByIdAndUpdate(followId, {
        $push: { followers: { followedby: designerId } },
      }, { new : true})
    const following  =  await this.findByIdAndUpdate(designerId, {
        $push: { following: { follows: followId } },

      }, {new : true});
    const updatedFollower = await this.findByIdAndUpdate(follower._id, new update(follower), { new: true });
    await this.findByIdAndUpdate(following._id, new update(following), { new: true });
return updatedFollower
    
}
designerSchema.statics.unfollowuser = async function(designerId, followId){
   const follower = await this.findByIdAndUpdate(followId, {
        $pull: { followers: { followedby: designerId } },
      }, {new : true});
    const following =  await this.findByIdAndUpdate(designerId, {
        $pull: { following: { follows: followId } },
      }, { new : true});
      const updatedFollower = await this.findByIdAndUpdate(follower._id, new update(follower), { new: true });
      await this.findByIdAndUpdate(following._id, new update(following), { new: true });
  return updatedFollower
}
designerSchema.statics.createstory = async function(designerId, storyId){
     await this.findByIdAndUpdate(designerId, {
        $push: { stories: { storyId: storyId } },
      }, { new : true})
    }
designerSchema.statics.bookmarkStory = async function(designerId, bookmarkId){
        const designer = await this.findById(designerId)
      let alreadyBookmarked = designer.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString())
      if(alreadyBookmarked){
        return;
      }else{
        await this.findByIdAndUpdate(designerId, {
            $push: { bookmarks: { bookmarkId: bookmarkId } },
          }, { new : true})
        }
      }
designerSchema.statics.unbookmarkStory = async function(designerId, bookmarkId){
        const designer = await this.findById(designerId);
        let alreadyBookmarked = designer.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString());
        if(!alreadyBookmarked){
            return;
        } else {
            await this.findByIdAndUpdate(designerId, {
                $pull: { bookmarks: { bookmarkId: bookmarkId } },
            }, { new: true });
        }
    }
    
module.exports = mongoose.model('designer', designerSchema);