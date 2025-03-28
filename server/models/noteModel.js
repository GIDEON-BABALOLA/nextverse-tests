const path = require("path")
const mongoose = require('mongoose'); // Erase if already required
const noteSchema = new mongoose.Schema({
    author:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    userId : {
        type : String,
        required : true
    },
    owners : [
            {
                userId : {type : mongoose.Schema.Types.ObjectId, ref : "User"}
            }
        ],
    sharedWith : {
            type : Number,
            default : 0
        },
        
}, {
    timestamps : true,
    autoIndex: false
});

//Export the model
noteSchema.statics.addNote = async function(userId, noteId, type){
    console.log(type)
    await this.findByIdAndUpdate(noteId, {
        $push: {
            owners: {
                $each: [{ userId: userId }],
                $position: 0, // Adds the new owner at the beginning of the array
            },
        },
        $inc: { sharedWith:  type == "creator" ? 0  : 1 }, // Increment shareWith by 1
    }, { new: true });
  }
noteSchema.statics.removeNote = async function(userId, noteId, type){
          await this.findByIdAndUpdate(noteId, {
              $pull: { owners: { userId: userId } },
              $inc : { sharedWith : type == "creator" ?  0 : -1 }
          }, { new: true });
  }
  module.exports = mongoose.model('Note', noteSchema);