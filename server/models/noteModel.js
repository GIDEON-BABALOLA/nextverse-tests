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
}, {
    timestamps : true,
    autoIndex: false
});
//Export the model
module.exports = mongoose.model('Note', noteSchema);