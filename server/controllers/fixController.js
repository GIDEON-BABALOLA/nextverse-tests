// controllers/DataMigrationController.js
const path = require("path");
const Story = require(path.join(__dirname, "..", "models", "storyModel.js")); // Import your model
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const {  storyArray } = require(path.join(__dirname, "..", "data", "storyArray.js"))
const {  userError } = require("../utils/customError");
const slugify = require("slugify");
const { pictureArray } = require("../data/storyArray");
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
const populateStories = async (req, res) => {
  try{
    const month = ["january", "febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    for (let index = 0, number =0; index < storyArray.length, number < pictureArray.length; index++, number++) {
      const element = storyArray[index];
      console.log(element)
      const picture = pictureArray[index]
      const nextPicture = pictureArray[index + 1]
      const foundStory = await Story.findOne({slug : slugify(element["title"])})
      if(foundStory){
        throw new Error("Pls Kindly Choose Another Title, This title Has already Been Taken", 400)
       }
      const datetime = new Date()
      const time = countWordsAndEstimateReadingTime(element["content"])
      const newStory = {
        author : "Gideon Babalola",
        avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1716408705/Avatars/nqygbbqcueadblm4mxjo.jpg",
        userId : "6717ecc91ab5ded52d0fefc8",
        slug : slugify(`${element["title"]}index`),
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
//     for (const stor of storyArray) {
//       const foundStory = await Story.findOne({slug : slugify(stor["title"])})
//       if(foundStory){
//         throw new userError("Pls Kindly Choose Another Title, This title Has already Been Taken", 400)
//        }
//       const datetime = new Date()
//       const time = countWordsAndEstimateReadingTime(stor["content"])
//       const newStory = {
//         author : "Gideon Babalola",
//         avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1716408705/Avatars/nqygbbqcueadblm4mxjo.jpg",
//         userId : "6717ecc91ab5ded52d0fefc8",
//         slug : slugify(stor["title"]),
//         title : stor["title"],
//         caption : stor["caption"],
//         content : stor["content"],
//         category: stor["category"],
//         picture : ["https://res.cloudinary.com/dxbrs5gvb/image/upload/v1729686507/Story/nextverse74%40gmail.com/cvaotf291g99nbvbgm7i.png",
// "https://res.cloudinary.com/dxbrs5gvb/image/upload/v1729688891/Story/nextverse74%40gmail.com/iiur8piqkivszz2ypi5f.jpg"
//         ],
//         estimatedReadingTime : time,
//         date : { month : month[datetime.getMonth()], year :datetime.getFullYear(), day : datetime.getDate()} 
//     }
//     await Story.create(newStory)
//     }
    res.status(201).json({"message" : "Data Created Successfully"})

  }catch(error){
    console.log(error)
logEvents(`${error.name}: ${error.message}`, "populateStoriesError.txt", "storyError")
res.status(500).json({"message" : 'Internal Server Error.'});
  }
}

module.exports = { fixDeveloperModel, populateStories }
