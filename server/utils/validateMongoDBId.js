const mongoose = require("mongoose")
const path = require("path")
const {logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const validateMongoDbId = (id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        logEvents(`This id is invalid`, "validMongoDbIdError.txt")
    }
}
module.exports = validateMongoDbId;