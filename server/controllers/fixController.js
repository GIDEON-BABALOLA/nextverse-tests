// controllers/DataMigrationController.js
const path = require("path");
const bcrypt = require("bcrypt")
const { avatars } = require(path.join(__dirname, "..", "data", "avatars"))
const Story = require(path.join(__dirname, "..", "models", "storyModel.js")); // Import your model
const User = require(path.join(__dirname, "..", "models", "userModel.js")); // Import your model
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const {  mockStories, mockPictures } = require(path.join(__dirname, "..", "data", "mockStories.js"))
const {  mockUsers } = require(path.join(__dirname, "..", "data", "mockUsers.js"))
const {  userError } = require("../utils/customError");
const slugify = require("slugify");
const { countWordsAndEstimateReadingTime } = require(path.join(__dirname, "..", "utils", "countWordsAndEstimateReadingTime.js"))
const fixDeveloperModel = async (req, res) =>{
  try{
    const docs = await Story.find({
      $or: [
        { totalViews: { $type: 'string' } },
        { totalComments: { $type: 'string' } },
        { totalBookmarks: { $type: 'string' } },
        { totalLikes: { $type: 'string' } },
      ],
    });
    for (const doc of docs) {
      doc.totalViews = Number(doc.totalViews);
      doc.totalComments = Number(doc.totalComments);
      doc.totalBookmarks = Number(doc.totalBookmarks);
      doc.totalLikes = Number(doc.totalLikes);
      await doc.save();

    }
    res.status(200).json({"message" : 'Data conversion completed successfully.'});
  }
  catch(error){
    logEvents(`${error.name}: ${error.message}`, "fixDeveloperModelError.txt", "fixError")
    res.status(500).json({"message" : 'Internal Server Error.'});
  }
}
const populateUsers = async(req, res) => {
  try{
    
for (let index = 0; index < mockUsers.length; index++) {
  profilePicture = avatars[Math.floor((Math.random() * 30) + 1)]
  const element = mockUsers[index];
  const foundUser = await User.findOne({email : element["email"]})
const foundMobile = await User.findOne({mobile : element["mobile"]})
if(foundUser) {
    throw new Error("User Already Exists", 400)
}
if(foundMobile){
  console.log(foundMobile)
    throw new Error("Phone Number Has Been Used", 400)
}
const hashedPassword = await bcrypt.hash(element["password"], 10);
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
    console.log(error)
logEvents(`${error.name}: ${error.message}`, "populateStoriesError.txt", "storyError")
res.status(500).json({"message" : 'Internal Server Error.'});
  }
}
const populateStories = async (req, res) => {
  try{
    const month = ["january", "febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    for (let index = 0, number =0; index < mockStories.length, number < mockPictures.length; index++, number++) {
      const element = mockStories[index];
      console.log(element)
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
    console.log(error)
logEvents(`${error.name}: ${error.message}`, "populateStoriesError.txt", "storyError")
res.status(500).json({"message" : 'Internal Server Error.'});
  }
}

module.exports = { fixDeveloperModel, populateStories, populateUsers }
