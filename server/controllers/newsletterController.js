const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const fs = require('fs');
const Newsletter = require(path.join(__dirname, "..", "models", "newsletterModel.js"))
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const {  userError } = require("../utils/customError");
const subScribeToNewsletter = async (req, res) => {
    const { email, options } = req.body;
    const defaultOptions =  [
        'adventure',
        'romance',
        'fiction',
        'nonFiction', 
        'liteNoteUpdates', 
        "weeklyUpdates"
        ]
    try{
        if(!email || !options ||options.length == 0){
            throw new userError("Pls Select A Category To Subscribe To", 400)
        }
        options.map((option) => {
            if(!defaultOptions.includes(option)){
        throw new userError(`You Cannot Subscribe To The Category ${option}`, 400)
            }
        })
        const subscribedUser = await Newsletter.findOne({ email : email})
if(subscribedUser){
  const mapper = options.map((option) => {
        if(subscribedUser.category.includes(option)){
            return true
        }
    })
const allTrue = mapper.every((val) => val === true)
if(allTrue){
        throw new userError("You Have Subscribed To All This Options Before", 400)
   
}
const dataToBeInputed = new Set([...options, ...subscribedUser.category])
subscribedUser.category = Array.from(dataToBeInputed)
await subscribedUser.save()
}else{
        const newSubscriber = await Newsletter.create({
            email : email,
            category : options
        })
        await Newsletter.create(newSubscriber)
       const updateUser = await User.findOne({email : email})
       if(updateUser){
        updateUser.newsletter = true;
        await updateUser.save()
       }
    }
return res.status(201).json({message : "You Have Successfully Subscribed To Our Newsletter "})
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "subScribeToNewsletterError.txt", "newsletterError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
const unSubscribeFromNewsletter = async (req, res) => {
    const { email } = req.body;
    try{
        if(!email){
            throw new userError("Pls Provide Your Email", 400)
        }
        const subscribedUser = await Newsletter.findOne({email : email})
        if(!subscribedUser){
            throw new userError("You Have Not Signed Up To Our Newsletter Before", 400)
        }
        await Newsletter.findOneAndDelete(subscribedUser.id);
        const registeredUser = await User.findOne({email : email})
        if(registeredUser){
            registeredUser.newsletter = false;
            await registeredUser.save()
        }
        return res.status(200).json({message : "You Have Successfully Unsubscribed To Our Newsletter"})
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "unScribeToNewsletterError.txt", "newsletterError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
const getSubscribedUsers = async (req, res) => {
    try{
const allSubscribedUsers = await Newsletter.find()
return res.status(200).json(allSubscribedUsers)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "getSubscribedUsersError.txt", "newsletterError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
module.exports = {
    subScribeToNewsletter,
    unSubscribeFromNewsletter,
    getSubscribedUsers
}