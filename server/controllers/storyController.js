const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const fs = require('fs');
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const Admin = require(path.join(__dirname, "..", "models", "adminModel.js"))
const Story = require(path.join(__dirname, "..", "models", "storyModel.js"))
const _ = require('lodash');
const slugify = require("slugify")
const { cloudinaryError, userError } = require("../utils/customError");
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const  {cloudinaryUpload, cloudinaryDelete, cloudinarySingleDelete } = require(path.join(__dirname, "..", "utils", "cloudinary.js"))
const { countWordsAndEstimateReadingTime } = require(path.join(__dirname, "..", "utils", "countWordsAndEstimateReadingTime.js"))
const month = ["january", "febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// To Create A New Story
const createStory = async(req, res) => {
    const datetime = new Date()
    console.log(`${month[datetime.getMonth()]} ${datetime.getDate()} ${datetime.getFullYear()}`)
    const { id } = req.user
    validateMongoDbId(id)
    const defaultCategory = [
 "fiction", "non-fiction", "romance", "adventure", "memoir", "technology"    
]
    const {title, caption, content,  category } = req.body
try{
    if(!title || !caption || !content || !category){
        throw new userError("Please Fill In All The Fields", 400)
    }
    const isValidCategory = defaultCategory.includes(category)
    if(!isValidCategory){
        throw new userError(`You Cannot Create A Story With The Category ${category}`, 400)
    }
    const foundStory = await Story.findOne({slug : slugify(req.body.title)})
    if(foundStory){
     throw new userError("Pls Kindly Choose Another Title, This title Has already Been Taken", 400)
    }
    if(req.files.length === 0){
        throw new userError("Pls Choose An Image To Upload", 400)
    }
    if(req.files.length > 2){
        throw new userError("You are only allowed to upload Two Pictures", 400)
    }else if(req.files.length < 2){
        console.log(req.files)
    throw new userError("Pls Upload Two Images For This Story", 400)
    }
    if(!title  || !caption ||!content || !category){
        throw new userError("Please Fill In All The Fields", 400)
    }
const uploader =  (path) => cloudinaryUpload(path, `Story/${req.user.email}`)
const urls = []
for( const file of req.files){
    const { path, size } = file;
    if(size > 2000000){
        fs.unlinkSync(path) //delete the image from server
        throw new userError("Image size too large (max 2MB)", 400)
    }
const newPath = await uploader(path)
urls.push(newPath.url)
console.log(path, "davies")
fs.unlinkSync(path)
}
//number of words in the story
// According to research, the average reading speed for adults is around 200-250 words per minute, but this can vary depending on factors such as age and reading experience.
const time = countWordsAndEstimateReadingTime(content)

    const newStory = {
        author : req.user.username,
        avatar : req.user.picture,
        userId : id,
        title : title,
        slug : slugify(title),
        caption,
        content : content,
        category,
        picture : urls,
        estimatedReadingTime : time,
        date : { month : month[datetime.getMonth()], year :datetime.getFullYear(), day : datetime.getDate()} 
    }
    const story = await Story.create(newStory)
    switch (req.user.role) {
        case "user":
            await User.createstory(req.user._id, story._id);
            break;
        case "admin":
            await Admin.createstory(req.user._id, story._id);
    }
    const {estimatedReadingTime, date, ...rest} = newStory
    res.status(201).json({...rest, estimatedReadingTime :`${time.minutes} minutes ${time.seconds} seconds read`,
    date : `${month[datetime.getMonth()]} ${datetime.getDate()} ${datetime.getFullYear()}`
 })
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "createStoryError.txt", "storyError")
    if (error instanceof userError) {
        return  res.status(error.statusCode).json({ error : error.message})
    } else if(error instanceof cloudinaryError){
        for(const file of req.files){
            const { path } = file
            fs.unlinkSync(path)
        }
        return  res.status(error.statusCode).json({ error : error.message})
    }
     else{
        return res.status(500).json({error : "Internal Server Error"})
        }
}
}
//To Upload The Story Picture
const uploadNow = async(req, res) => {
    console.log("dave")
    try{
        console.log(req.file)
        if(!req.file){
            throw new userError("Pls Choose a video, or multiple videos To Upload, maximum of two", 400)
        }
        res.status(200).json({"message" : "success"})
    }catch(error){
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ error : error.message})
        } else if(error instanceof cloudinaryError){
            return  res.status(error.statusCode).json({ error : error.message})
        }
         else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
const uploadStoryPicture = async (req, res) => {
    const { id } = req.params
    try{
        validateMongoDbId(id)
        if(!id){
            throw new userError("Pls Enter The Id Of The Story You Want To View", 400)   
        }
    const story =  await Story.findById(id)
    if(!story){
        throw new userError("This Story Does Not Exist", 404)
    }
    if(!req.files){
        throw new userError("Pls Choose An Image, or multiple Images To Upload, maximum of two", 400)
    }
    if(req.files.length > 2){
        throw new userError("You are only allowed to upload Two Pictures", 400)
    }else if(req.files.length < 2){
    throw new userError("Pls Upload Two Images For This Story", 400)
    }
    const uploader = (path) => cloudinaryUpload(path, `Story/${req.user.email}/`)
        //current picture means picture stored in the cloud
    if(story.picture.length !== 0){
        const firstPicture = story.picture[0].split("/").slice(-3).join("/").split(".").slice(0, 2).join("")
        const secondPicture = story.picture[1].split("/").slice(-3).join("/").split(".").slice(0, 2).join("")
        await cloudinarySingleDelete(firstPicture.replace("%", "@").replace("com", ".com").replace("40", ""), req.user.email) 
        await cloudinarySingleDelete(secondPicture.replace("%", "@").replace("com", ".com").replace("40", ""), req.user.email) 
    }
    const urls = []
    for( const file of req.files){
        const { path, size } = file;
        if(size > 2000000){
            fs.unlinkSync(path) //delete the image from server
            throw new userError("Image size too large (max 2MB)", 400)
        }
    const newPath = await uploader(path)
    urls.push(newPath.url)
    fs.unlinkSync(path)
    console.log("letsgo")
    }
    const updatedStory = await Story.findByIdAndUpdate(
        id,
        { $set: { picture: urls } },
        { new: true, useFindAndModify: false }
      );
    res.status(200).json(updatedStory)
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "uploadStoryPictureError.txt", "storyError")
        if (error instanceof cloudinaryError) {
            return res.status(error.statusCode).json({ error : error.message})
        }else if(error instanceof userError){
            return res.status(error.statusCode).json({ error : error.message})
        }
        else{
            return res.status(500).json({error : "Internal Server Error"})
            }
        }
}
//To Get A Story
const getAStory = async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
try{
if(!id){
    throw new userError("Pls Enter The Id Of The Story You Want To View", 400)
}
const foundStory = await Story.findById(id)
if(!foundStory){
    throw new userError("This Story Does Not Exist", 404)
}
res.status(200).json(foundStory)
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "getAStoryError.txt", "storyError")
    if (error instanceof userError) {
    return  res.status(error.statusCode).json({ error : error.message})
    }
     else{
    return res.status(500).json({error : "Internal Server Error"})
        }
}
}
const getAllStories = async (req, res) => {
    try{
        //filtering
const queryObj = {...req.query}
const excludeFields = ["page", "sort", "limit", "fields"]
excludeFields.forEach((el) => delete queryObj[el])
   // Handle date filtering specifically
   let dateFilter = {};
   if (queryObj.year) {
       dateFilter['date.year'] = queryObj.year;
       delete queryObj.year;
   }
   if (queryObj.month) {
       dateFilter['date.month'] = queryObj.month;
       delete queryObj.month;
   }
   if (queryObj.day) {
       dateFilter['date.day'] = queryObj.day;
       delete queryObj.day;
   }
let queryString;
queryString = JSON.stringify(queryObj)
queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
let query;
 // Combine the query object and date filter
query = Story.find({...JSON.parse(queryString), ...dateFilter})
//Sorting, arrangement of the data you want 
if(req.query.sort){
    const sortBy = req.query.sort.split(",").join(" ")
    query = query.sort(sortBy)
}else{
query = query.sort("-createdAt")
}
// Limiting, ensure that some fields from the stories are not sent
if(req.query.fields){
    const fields = req.query.fields.split(",").join(" ")
    query = query.select(fields)

}else{
query = query.select("-__v")
}
//Pagination, for different pages
const page = req.query.page;
const limit = req.query.limit
const skip = (page - 1) * limit
query = query.skip(skip).limit(limit)
if(req.query.page){
    const storyCount = await Story.countDocuments();
    if(skip >= storyCount){
        throw new userError( "This page does not exist",404)
    }
}
const allStories = await query
res.status(200).json(allStories)
}catch(error){
    logEvents(`${error.name}: ${error.message}`, "getAStoryError.txt", "storyError")
    if (error instanceof userError) {
    return  res.status(error.statusCode).json({ error : error.message})
    }
     else{
    return res.status(500).json({error : "Internal Server Error"})
        }
}
}
const getPopularStories = async (req, res) => {
try{

}catch(error){
    logEvents(`${error.name}: ${error.message}`, "getPopularStories.txt", "storyError")
    if (error instanceof userError) {
    return  res.status(error.statusCode).json({ error : error.message})
    }
     else{
    return res.status(500).json({error : "Internal Server Error"})
        }
} 
}

//To Update A Story
const updateAStory = async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try{
        if(Object.keys(req.body).length === 0){
            throw new userError("Pls Enter The Values You Want To Update", 400)
        }
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        if(!id){
            throw new userError("Pls Enter The Id Of The Story You Want To View", 400)
        }
const updateStory = await Story.findByIdAndUpdate(id, req.body, {new : true});
if(!updateStory){
    throw new userError("The Story You Want To Update Does Not Exist", 404)
}
res.status(201).json(updateStory)
    }
    catch(error){
    logEvents(`${error.name}: ${error.message}`, "updateAStoryError.txt", "storyError")
    if (error instanceof userError) {
        console.log("gidiboy")
    return  res.status(error.statusCode).json({ error : error.message})
    }
    else{
    return res.status(500).json({error : "Internal Server Error"})
    }
    }

}
const commentAStory = async (req, res) => {
    const { id } = req.params;  // The story ID
    const { comment } = req.body;  // The comment text
    validateMongoDbId(id);  // Ensure the ID is a valid MongoDB ObjectID
    try {
        const story = await Story.findById(id);
        // Add the comment to the story using static method
        const commentedStory = await story.addComment( comment, req.user._id);
        
        // Respond with the updated story
        res.status(201).json(commentedStory);
    } catch (error) {
        console.log(error);
        logEvents(`${error.name}: ${error.message}`, "addCommentToStoryError.txt", "storyError");

        if (error instanceof userError) {
            return res.status(error.statusCode).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

const likeAStory = async(req, res) => {
    const { id } = req.params
    validateMongoDbId(id);
try{
    const story = await Story.findById(id);
  // Add the like to the story using static method
 const likedStory = await story.addLike(id, req.user._id);
        
  // Respond with the updated story
  res.status(201).json(likedStory);
}catch(error){
    console.log(error);
    logEvents(`${error.name}: ${error.message}`, "addLikeToStoryError.txt", "storyError");

    if (error instanceof userError) {
        return res.status(error.statusCode).json({ error: error.message });
    } else {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
}
//To Bookmark A Story
const bookmarkAStory = async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try{
const storyToBeBookmarked = await Story.findById(id)
if(!storyToBeBookmarked){
    throw new userError("This story does not exist", 400)
}
switch (req.user.role) {
    case "user":
        await User.bookmarkStory(req.user._id, storyToBeBookmarked._id)
        break;
    case "admin":
        await Admin.bookmarkStory(req.user._id, storyToBeBookmarked._id)
}
res.status(201).json(storyToBeBookmarked)
    }catch(error){

        logEvents(`${error.name}: ${error.message}`, "bookmarkAStoryError.txt", "storyError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ error : error.message})
            }
             else{
            return res.status(500).json({error : "Internal Server Error"})
 }
    }
}
const unBookmarkAStory = async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const storyToBeUnbookmarked = await Story.findById(id);
        if(!storyToBeUnBookmarked){
            throw new userError("This story does not exist", 400)
        }
        switch (req.user.role) {
            case "user":
                await User.unbookmarkStory(req.user._id, storyToBeUnbookmarked._id);
                break;
            case "admin":
                await Admin.unbookmarkStory(req.user._id, storyToBeUnbookmarked._id);
        }
        res.status(201).json(storyToBeUnbookmarked);
    } catch (error) {
        logEvents(`${error.name}: ${error.message}`, "unbookmarkAStoryError.txt", "storyError");
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

//To Delete A Story
const deleteAStory = async(req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try{
        if(!id){
            throw userError("Pls Enter The Id Of The Story You Want To Delete", 400)
        }
const deletedStory = await Story.findOneAndDelete(id);
if(!deletedStory){
    throw new userError("This Story Does Not Exist", 404)
}
res.status(200).json(deletedStory)
    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "deleteAStoryError.txt", "storyError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ error : error.message})
            }
             else{
            return res.status(500).json({error : "Internal Server Error"})
                }
    }
}
module.exports = {
    createStory,
    getAStory,
    getAllStories,
    updateAStory,
    deleteAStory,
    uploadStoryPicture,
    bookmarkAStory,
    unBookmarkAStory,
    likeAStory,
    commentAStory,
    uploadNow
}
