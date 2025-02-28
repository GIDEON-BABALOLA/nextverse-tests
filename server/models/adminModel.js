const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")
// Declare the Schema of the Mongo model
const adminSchema = new mongoose.Schema({
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
        default : "admin",
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
    notes : [
            {
        noteId :  {type : mongoose.Schema.Types.ObjectId, ref: "Note"}
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
adminSchema.statics.followuser = async function(adminId, followId){
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
adminSchema.statics.unfollowuser = async function(adminId, followId){
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
adminSchema.statics.createStory = async function(adminId, storyId){
    await this.findByIdAndUpdate(adminId, {
      $push: { stories: {
          
         $each :  [{storyId: storyId}],
         $position : 0, // Adds the new story at the beginning of the array
       } },
    }, { new : true})
  }
adminSchema.statics.deleteStory = async function(adminId, storyId){
        await this.findByIdAndUpdate(adminId, {
            $pull: { stories: { storyId: storyId } },
        }, { new: true });
}
adminSchema.statics.addNote = async function(email, noteId) {
    await this.findOneAndUpdate(
        { email: email }, 
        { 
            $push: { 
                notes: { 
                    $each: [{ noteId: noteId }],
                    $position: 0 
                } 
            }
        }, 
        { new: true }
    );
};

adminSchema.statics.removeNote = async function(email, noteId) {
    await this.findOneAndUpdate(
        { email: email }, 
        { 
            $pull: { notes: { noteId: noteId } }
        }, 
        { new: true }
    );
};

adminSchema.statics.bookmarkStory = async function(adminId, bookmarkId){
        const admin = await this.findById(adminId)
      let alreadyBookmarked = admin.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString())
      if(alreadyBookmarked){
        return;
      }else{
        await this.findByIdAndUpdate(adminId, {
            $push: { bookmarks: { bookmarkId: bookmarkId } },
          }, { new : true})
        }
      }
adminSchema.statics.unbookmarkStory = async function(adminId, bookmarkId){
        const admin = await this.findById(adminId);
        let alreadyBookmarked = admin.bookmarks.find((bookmark) => bookmark.bookmarkId.toString() === bookmarkId.toString());
        if(!alreadyBookmarked){
            return;
        } else {
            await this.findByIdAndUpdate(adminId, {
                $pull: { bookmarks: { bookmarkId: bookmarkId } },
            }, { new: true });
        }
    }
    
module.exports = mongoose.model('Admin', adminSchema);