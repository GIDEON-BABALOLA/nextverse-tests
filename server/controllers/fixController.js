// controllers/DataMigrationController.js
const path = require("path");
const bcryptjs = require("bcryptjs")
const { avatars } = require(path.join(__dirname, "..", "data", "avatars"))
const Story = require(path.join(__dirname, "..", "models", "storyModel.js"));
const User = require(path.join(__dirname, "..", "models", "userModel.js"));
const Developer = require(path.join(__dirname, "..", "models", "developerModel.js"));
const { userAttributes, developerAttributes, designerAttributes} = require(path.join(__dirname, "..", "data", "modelAttributes.js"))
const Designer = require(path.join(__dirname, "..", "models", "designerModel.js"));
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const {  mockStories, mockPictures } = require(path.join(__dirname, "..", "data", "mockStories.js"))
const {  mockUsers } = require(path.join(__dirname, "..", "data", "mockUsers.js"))
const {  userError,designerError, developerError } = require("../utils/customError");
const slugify = require("slugify");
const { countWordsAndEstimateReadingTime } = require(path.join(__dirname, "..", "utils", "countWordsAndEstimateReadingTime.js"))
const populateUsers = async(req, res) => {
  try{
    
for (let index = 0; index < mockUsers.length; index++) {
  profilePicture = avatars[Math.floor((Math.random() * 50) + 1)]
  const element = mockUsers[index];
  const foundUser = await User.findOne({email : element["email"]})
const foundMobile = await User.findOne({mobile : element["mobile"]})
if(foundUser) {
    throw new Error("User Already Exists", 400)
}
if(foundMobile){
    throw new Error("Phone Number Has Been Used", 400)
}
const hashedPassword = await bcryptjs.hash(element["password"], 10);
const newUser = {
  username : element["username"], 
  email : element["email"], 
  password :  hashedPassword,
  mobile : element["mobile"], 
  status : true,
  ipAddress : req.header('x-forwarded-for') || req.socket.remoteAddress,
  picture : profilePicture
}
 await User.create(newUser)
}
res.status(201).json({"message" : "Data Created Successfully"})
  }catch(error){
logEvents(`${error.name}: ${error.message}`, "populateStoriesError.txt", "storyError")
res.status(500).json({"message" : 'Internal Server Error.'});
  }
}
const populateStories = async (req, res) => {
  try{
    const month = ["january", "febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    for (let index = 0, number =0; index < mockStories.length, number < mockPictures.length; index++, number++) {
      const element = mockStories[index];
      const picture = mockPictures[index]
      const nextPicture = mockPictures[index + 1]
      const title = `${element["title"]}${index}`
      const foundStory = await Story.findOne({slug : slugify(title)})
      if(foundStory){
        throw new Error("Pls Kindly Choose Another Title, This title Has already Been Taken", 400)
       }
      const datetime = new Date()
      const time = countWordsAndEstimateReadingTime(element["content"])
      const newStory = {
        author : "Gideon Babalola",
        avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1716408705/Avatars/nqygbbqcueadblm4mxjo.jpg",
        userId : "6717ecc91ab5ded52d0fefc8",
        slug : slugify(title),
        title : element["title"],
        caption : element["caption"],
        content : element["content"],
        category: element["category"],
        picture : [picture, nextPicture],
        estimatedReadingTime : time,
        date : { month : month[datetime.getMonth()], year :datetime.getFullYear(), day : datetime.getDate()} 
    }
    await Story.create(newStory)
    }
    res.status(201).json({"message" : "Data Created Successfully"})

  }catch(error){
logEvents(`${error.name}: ${error.message}`, "populateStoriesError.txt", "storyError")
res.status(500).json({"message" : 'Internal Server Error.'});
  }
}
const fixDesignerModel = async (req, res) => {
  try {
    for(const key in req.body){
      if (req.body.hasOwnProperty(key)) {
        const isValidCategory = designerAttributes.includes(key)
        if(!isValidCategory){
           throw new designerError(`This attribute ${key} is not valid`, 400)
            }
        const value = req.body[key];
        const allDesigners = await Designer.find();
        for (let designer of allDesigners) {
          if (designer[key]) continue;
          await Designer.findByIdAndUpdate(designer._id, { [key]: value }, { new: true });
        }
    }
    }
    res.status(200).json({ message: "Data Updated successfully for all designers."});
  } catch (error) {
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "fixDesignerModelError.txt", "designerError");
    if(error instanceof designerError){
      return res.status(error.statusCode).json({ message : error.message})
  }else{
    return res.status(500).json({ message: "Internal Server Error." });
  }
  }
};
const fixDeveloperModel = async (req, res) => {
  try {
    for(const key in req.body){
      if (req.body.hasOwnProperty(key)) {
        const isValidCategory = developerAttributes.includes(key)
        if(!isValidCategory){
           throw new developerError(`This attribute ${key} is not valid`, 400)
            }
        const value = req.body[key];
        const allDevelopers = await Developer.find();
        for (let developer of allDevelopers) {
          if (developer[key]) continue;
          await Developer.findByIdAndUpdate(developer._id, { [key]: value }, { new: true });
        }
    }
    }
    res.status(200).json({ message: "Data Updated successfully for all developers."});
  } catch (error) {
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "fixDeveloperModelError.txt", "developerError");
    if(error instanceof developerError){
      return res.status(error.statusCode).json({ message : error.message})
  }else{
   return res.status(500).json({ message: "Internal Server Error." });
  }
  }
};

const fixUserModel = async (req, res) => {
  try {
    for(const key in req.body){
      if (req.body.hasOwnProperty(key)) {
        const isValidCategory = userAttributes.includes(key)
        if(!isValidCategory){
           throw new userError(`This attribute ${key} is not valid`, 400)
            }
        const value = req.body[key];
        const allUsers = await User.find();
        for (let user of allUsers) {
          if (user[key] == value) continue;
          await User.findByIdAndUpdate(user._id, { [key]: value }, { new: true });
        }
    }
    }
    res.status(200).json({ message: "Data Updated successfully for all users."});
  } catch (error) {
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "fixUserModelError.txt", "userError");
    if(error instanceof userError){
      return res.status(error.statusCode).json({ message : error.message})
  }else{
    return res.status(500).json({ message: "Internal Server Error." });
  }
  }
};

module.exports = { fixDeveloperModel, populateStories, populateUsers, fixUserModel, fixDesignerModel }



// // Get all storyIds from the User's stories
// const user = await User.findOne({ _id: req.user._id });

// // Find all storyIds in the User's stories
// const storyIds = user.stories.map(story => story.storyId);

// // Check if each storyId exists in the Story collection
// const existingStories = await Story.find({ _id: { $in: storyIds } }).select('_id');

// // Get an array of storyIds that exist in the Story collection
// const existingStoryIds = existingStories.map(story => story._id);

// // Remove the non-existing story references from the User model
// await User.updateOne(
//   { _id: req.user._id },
//   { $pull: { stories: { storyId: { $nin: existingStoryIds } } } }
// );
