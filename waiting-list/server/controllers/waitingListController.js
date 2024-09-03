const path = require("path")
const validator = require("validator")
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents")) 
const WaitingList = require(path.join(__dirname, "..", "models", "waitingListModel.js"))
const { waitingListError } = require(path.join(__dirname, "..", "utils", "customError"))
const month = ["january", "febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const subscribeToWaitingList = async (req, res) => {
        try{
const { email } = req.body;
const adminEmails = ["gideonbabalola69@gmail.com", "favouradigundamilare@gmail.com"]
if(adminEmails.includes(email)){
    return res.status(200).json({message : "admin"})
}
if(!email){
    throw new waitingListError("Please Enter Your Email", 400)
}
const isValid = validator.isEmail(email)
if(!isValid){
    throw new waitingListError("Please Enter A Valid Email", 400)
}
const subscribedUser = await WaitingList.findOne({email : email})
if(subscribedUser){
    throw new waitingListError("You Have Already Subscribed To Our Newsletter", 400)
}
const dateTime  =  new Date() 
const newSubscriber = await WaitingList.create({
    email : email,
    date : `${month[dateTime.getMonth()]} ${dateTime.getDate()} ${dateTime.getFullYear()}`
})
    res.status(201).json({subscriber : newSubscriber})

}catch(error){
    logEvents(`${error.name}: ${error.message}`, "subscribeToWaitingListError.txt", "waitingListError")
    if (error instanceof waitingListError) {
        return  res.status(error.statusCode).json({ message : error.message})
     }else{
        return res.status(500).json({message : "Internal Server Error"})
     }
    }
}
const getWaitingList = async (req, res) => {
    try{
         // Convert page and limit to integers
    const pageInt = parseInt(req.query.page, 10);
    const limitInt = parseInt(req.query.limit, 10);

    // Calculate the number of documents to skip
    const skip = (pageInt - 1) * limitInt;
        const waitingList = await WaitingList.find()
        .limit(limitInt)
        .skip(skip)
        .exec();
        const storyCount = await WaitingList.countDocuments();
if(req.query.page){
    if(skip >= storyCount){
        throw new waitingListError( "This page does not exist",404)
    }
}

    res.status(200).json({waitingList : waitingList, waitingListNumber : storyCount })
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "getWaitingListError.txt", "waitingListError")
        if (error instanceof waitingListError) {
            return  res.status(error.statusCode).json({ message : error.message})
         }else{
            return res.status(500).json({message : "Internal Server Error"})
         }
    }
}
const deleteUserFromWaitingList = async (req, res) => {
    const { email } = req.params
    try{
        const subscribedUser = await WaitingList.findOne({email : email})
if(!subscribedUser){
    throw new waitingListError("You Have Not Subscribed To Our Newsletter", 400)
}
const deletedUser = await WaitingList.findOneAndDelete({ email })

res.status(204).json(deletedUser)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "getWaitingListError.txt", "waitingListError")
        if (error instanceof waitingListError) {
            return  res.status(error.statusCode).json({ message : error.message})
         }else{
            return res.status(500).json({message : "Internal Server Error"})
         }
    }
}
module.exports = {
    subscribeToWaitingList,
    getWaitingList,
    deleteUserFromWaitingList
}