const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const waitingListSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    date : {
        type : String,
        required : true,
    }
});

//Export the model
module.exports = mongoose.model('WaitingList', waitingListSchema);