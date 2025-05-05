const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { rankStories } = require(path.join(__dirname, "..", "utils", "rankStories.js"))
const fs = require('fs');
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const Story = require(path.join(__dirname, "..", "models", "storyModel.js"))
const Notification = require(path.join(__dirname, "..", "models", "notificationModel.js"))
const _ = require('lodash');
const slugify = require("slugify")
const { cloudinaryError, userError, notificationError } = require("../utils/customError");
const { log } = require("console");
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const  {cloudinaryUpload, cloudinaryDelete, cloudinarySingleDelete } = require(path.join(__dirname, "..", "utils", "cloudinary.js"))
const { countWordsAndEstimateReadingTime } = require(path.join(__dirname, "..", "utils", "countWordsAndEstimateReadingTime.js"))
const month = ["january", "febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// To Create A New Story
const createStory = async(req, res) => {
    const datetime = new Date()
    const { id } = req.user
    const defaultCategory = [
 "fiction", "non-fiction", "romance", "adventure", "memoir", "technology"    
]
if(req.body.category == "nonfiction"){
    req.body.category = "non-fiction"
}
    const {title, content, category } = req.body
const cloudImages = JSON.parse(req.body.cloudImages)
try{
    if(!validateMongoDbId(id)){
        throw new userError("Pls enter a parameter recognized by the database", 400)
            }
    if(!title || !content || !category){
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
    const totalImages = req.files.length + cloudImages.length;
    if (totalImages === 0) {
        throw new userError("Please upload at least one image", 400);
      }
    if (totalImages > 3) {
        throw new userError("You are only allowed to upload a maximum of 3 images", 400);
      }
const uploader =  (path) => cloudinaryUpload(path, `Story/${req.user.email}`)
const urls = []
if(req.files.length !== 0){
// Process local files
for (const file of req.files) {
    const { path, size } = file;
    if (size > 2 * 1024 * 1024) {
      fs.unlinkSync(path); // delete large image
      throw new userError("Image size too large (max 2MB)", 400);
    }
    const newPath = await uploader(path);
    urls.push( {name : file.originalname, url : newPath.url });
    fs.unlinkSync(path); // clean up local file
  }
}
if(cloudImages.length !== 0 ){
for (const image of cloudImages){
    urls.push({name : image.name, url : image.src  })
}
}
//number of words in the story
// According to research, the average reading speed for adults is around 200-250 words per minute, but this can vary depending on factors such as age and reading experience.
const time = countWordsAndEstimateReadingTime(content)

    const newStory = {
        author : req.user.username,
        userId : id,
        title : title,
        slug : slugify(title),
        content : content,
        category,
        picture : urls,
        estimatedReadingTime : time,
        date : { month : month[datetime.getMonth()], year :datetime.getFullYear(), day : datetime.getDate()} 
    }
    const story = await Story.create(newStory)
    switch (req.user.role) {
        case "user":
            await User.createStory(req.user._id, story._id);
            break;
    }
    res.status(201).json({ message : "Story Successfully Created", story : story})
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "createStoryError.txt", "storyError")
    if (error instanceof userError) {
        return  res.status(error.statusCode).json({ message : error.message})
    } else if(error instanceof cloudinaryError){
        return  res.status(error.statusCode).json({ message : error.message})
    }
     else{
        return res.status(500).json({error : "Internal Server Error"})
        }
}
}
//To Upload The Story Picture
const uploadNow = async(req, res) => {
    try{
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
try{
    if(!validateMongoDbId(id)){
throw new userError("Pls enter a parameter recognized by the database", 400)
    }
if(!id){
    throw new userError("Pls Enter The Id Of The Story You Want To View", 400)
}

const foundStory = await Story.findById(id)
.populate("userId", "picture username email bio")
.select("estimatedReadingTime date _id author title content picture totalLikes totalViews views")
const exists = await User.exists({
    email: req.user.email,
    "following.follows" : foundStory.userId
});
const liked = await Story.exists({
    _id : id,
    "likes.likedBy" : req.user._id

})
const bookmarked = await Story.exists({
    _id : id,
    "bookmarks.bookmarkBy" : req.user._id
})
const isBookmarked = !!bookmarked;
const isLiked = !!liked
const isFollowing = !!exists;
if(!foundStory){
    throw new userError("This Story Does Not Exist", 404)
}
await foundStory.addView(req.user._id);
const adjustedStory = foundStory.toObject();
    res.status(200).json({ story :
         {...adjustedStory,
picture :    adjustedStory.picture[Math.floor(Math.random() * adjustedStory.picture.length)],
pictures : adjustedStory.picture
    },
         isFollowing : isFollowing,
         isLiked : isLiked,
         isBookmarked : isBookmarked
        })    

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
const excludeFields = ["page", "sort", "limit", "fields", "selection"]
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
queryString = queryString.replace(/\b(gte|gt|lte|lt|eq)\b/g, (match) => `$${match}`)
const followedUserIds = req.user.following.map(f => f.follows);
const showFollowingOnly = req.query.selection == "following"
let query;
const selectionQuery = showFollowingOnly
  ? { userId: { $in: followedUserIds } }
  : {}; // Empty query = match all

const queryToBeSent = {...JSON.parse(queryString), ...dateFilter, ...selectionQuery}
 // Combine the query object and date filter
query = Story.find(queryToBeSent)
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

}
else{
query = query.select("-__v")
}
//Pagination, for different pages
const page = req.query.page;
const limit = req.query.limit;
const skip = (page - 1) * limit;
query = query.skip(skip).limit(limit);
let storyCount;
if(req.query.page){
    if(req.query.category){
        storyCount =  await Story.countDocuments({category : req.query.category});
    }else{
        storyCount = await Story.countDocuments();
    }
    // if(skip >= storyCount){
    //     throw new userError( "This page does not exist", 404)
    // }
}
const allStories = await query.populate('userId', 'username picture').lean();
const cleanedStories = allStories.filter(story => {
    // Remove stories with empty objects, null or undefined values, and null/undefined _id
    return Object.keys(story).length > 0 && 
           story._id != null && 
           !Object.values(story).includes(null) && 
           !Object.values(story).includes(undefined);
  });
const enrichedFeed = cleanedStories.map((story) => ({
  ...story,
  picture : story.picture[Math.floor(Math.random() * story.picture.length)],
  isLiked: story.likes.some((like) => like.likedBy.toString() == req.user._id.toString()),
  isBookmarked : story.bookmarks.some((bookmark) => bookmark.bookmarkBy.toString() == req.user._id.toString())
}));
    res.status(200).json({stories : enrichedFeed, count : storyCount})       
}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "getAllStoryError.txt", "storyError")
    if (error instanceof userError) {
    return  res.status(error.statusCode).json({ message : error.message})
    }
     else{
    return res.status(500).json({message : "Internal Server Error"})
        }
}
}
const searchStories = async (req, res) => {
    const search = req.query.search_query; // your frontend will use ?query=something
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  try {
    if (!search) {
      return res.status(400).json({ message: "Search query is required." });
    }
    // Basic text search using regex (title and description)
    const stories = await Story.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } }
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username picture")
      .select("-content")
      .lean();
      console.log(stories.length)
    const totalCount = await Story.countDocuments({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ]
    });
   console.log(totalCount)
    const enrichedResults = stories.map((story) => ({
      ...story,
      picture: story.picture[Math.floor(Math.random() * story.picture.length)],
      isLiked: story.likes.some(
        (like) => like.likedBy.toString() === req.user._id.toString()
      ),
      isBookmarked: story.bookmarks.some(
        (bm) => bm.bookmarkBy.toString() === req.user._id.toString()
      )
    }));
    res.status(200).json({ stories: enrichedResults, count: totalCount });
  } catch (error) {
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "searchStoriesError.txt", "storyError")
    if (error instanceof userError) {
    return  res.status(error.statusCode).json({ message : error.message})
    }
     else{
    return res.status(500).json({message : "Internal Server Error"})
        }
  }
};
const liveSearchSuggestions = async (req, res) => {
    const search = req.query.search_query
    const limit = req.query.limit
    console.log(search, limit)
    try{
        if (!search) {
            return res.status(400).json({ message: "Search query is required." });
          }
          // Basic text search using regex (title and description)
          const stories = await Story.find({
            $or: [
              { title: { $regex: search, $options: "i" } },
              { content: { $regex: search, $options: "i" } },
              { author: { $regex: search, $options: "i" } }
            ]
          })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("userId", "username picture")
            .select("title estimatedReadingTime author")
            .lean();
            const users = await User.find({
                $or: [
                  { username: { $regex: search, $options: "i" } },
                ]
              })
                .sort({ createdAt: -1 })
                .select("username bio picture -_id")
                .limit(limit)
                .lean();
            res.status(200).json({ stories: stories, users : users });
    }
    
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "searchStoriesError.txt", "storyError")
        if (error instanceof userError) {
        return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
        return res.status(500).json({message : "Internal Server Error"})
            }
    }

}
const getSuggestedStories = async (req, res) => {
    const { page, limit } = req.query;
    const queryObj = {...req.query}
    try{
        let query;
        if(queryObj.type == "others"){
            query   =   Story.find({userId :  { $ne: req.query.userId }, _id : { $ne: req.query.currentStoryId} })
        }
        else{
            query   =   Story.find({userId :  req.query.userId, _id : { $ne: req.query.currentStoryId} })
        }
        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ")
            query = query.select(fields)
        
        }
const skip = (page - 1) * limit;
query = query.skip(skip).limit(limit);
const suggestedStories = await query.populate('userId', 'username picture').lean();
const cleanedStories = suggestedStories.filter(story => {
    // Remove stories with empty objects, null or undefined values, and null/undefined _id
    return Object.keys(story).length > 0 && 
           story._id != null && 
           !Object.values(story).includes(null) && 
           !Object.values(story).includes(undefined);
  });
const enrichedStorySuggestions = cleanedStories.map((story) => ({
    ...story,
    picture : story.picture[Math.floor(Math.random() * story.picture.length)],
    isLiked: story.likes.some((like) => like.likedBy.toString() == req.user._id.toString()),
    isBookmarked : story.bookmarks.some((bookmark) => bookmark.bookmarkBy.toString() == req.user._id.toString())
  }));
res.status(200).json({suggestedStories : enrichedStorySuggestions})  
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "getSuggestedStoriesError.txt", "storyError")
        if (error instanceof userError) {
        return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
        return res.status(500).json({message : "Internal Server Error"})
            }
    }
    }
const getPopularStories = async (req, res) => {
    const { category, number } = req.params;
    const { userId } = req.query
    const defaultCategory = [
        "fiction", "all", "non-fiction", "romance", "adventure", "memoir", "technology"    
       ]
try{
    const isValidCategory = defaultCategory.includes(category)
    if(!isValidCategory){
        throw new userError(`You Cannot Get Popular Stories From This Category ${category}`, 400)
    }
    let foundStories;
    if(category == "all"){
        foundStories = await Story.find().populate('userId', 'username picture').lean();
    }
    else{
        foundStories = await Story.find({ category : category}).populate('userId', 'username picture').lean()
    }
    const cleanedStories = foundStories.filter(story => {
        // Remove stories with empty objects, null or undefined values, and null/undefined _id
        return Object.keys(story).length > 0 && 
               story._id != null && 
               !Object.values(story).includes(null) && 
               !Object.values(story).includes(undefined);
      });
    const enrichedPopularStories = cleanedStories.map((story) => ({
        ...story,
        picture : story.picture[Math.floor(Math.random() * story.picture.length)],
        isLiked: story.likes.some((like) => like.likedBy.toString() == userId.toString()),
        isBookmarked : story.bookmarks.some((bookmark) => bookmark.bookmarkBy.toString() == userId.toString())
      }));
    const mostPopularStories = rankStories(enrichedPopularStories, number)
        res.status(200).json(mostPopularStories)         
        
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
        try{
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
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
    return  res.status(error.statusCode).json({ error : error.message})
    }
    else{
    return res.status(500).json({error : "Internal Server Error"})
    }
    }

}
const commentAStory = async (req, res) => {
    const { id } = req.params  // The story ID
    const { comment } = req.body;  // The comment text
    try {
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
        if(!comment){
            throw new userError("Pls enter your comment for this story", 400)
        }
        const story = await Story.findById(id);
        const commentedStory = await story.addComment( comment, req.user._id);
        await Notification.createStoryNotification(story.userId, story._id, "comment", `${req.user.username} commented on your story.`, req.user._id)
        // Respond with the updated story
        res.status(201).json(commentedStory.toObject().comments[0]);
    } catch (error) {
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "addCommentToStoryError.txt", "storyError");

        if (error instanceof userError) {
            return res.status(error.statusCode).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
const unCommentAStory = async(req, res) => {
    const { id, commentId } = req.params
    try{
        if(!id || !commentId){
            throw new userError("Pls Choose A Story And A Comment", 400)   
        }
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
        const storyToBeUnCommented = await Story.findById(id);
        if(!storyToBeUnCommented){
            throw new userError("This story does not exist", 400)
        }
       await storyToBeUnCommented.removeComment(commentId, req.user._id);
            res.status(201).json({message : "SuccessFully Deleted The Comment"});            
    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "unCommentAStoryError.txt", "storyError");
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
const getStoryComments = async (req, res) => {
    const { page, limit } = req.query;
    const { id } = req.params
    try{

    const skip = (page - 1) * limit;
    const gotUsers = await User.find();
    if(!gotUsers){
        throw new userError("No User Has Been Registered For Your Application", 204)
    }
    const story = await Story.findOne({ _id: id });
    const commentCount = story ? story.comments.length : 0;
    const storyComments = await Story.findOne({ _id: id })
  .populate({
    path: 'comments.commentBy', // This populates the user (commentBy) in the comments array
    select: 'username picture createdAt' 
    // You can add other fields here as needed
  })
  .slice('comments', [parseInt(skip), parseInt(limit)])
  .lean();
    res.status(200).json({ comments : storyComments["comments"], count : commentCount})      

    
    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "getAllUsersError.txt", "userError")
        if(error instanceof userError){
            return res.status(error.statusCode).json({ error : error.message})
        }else{
            return res.status(500).json({error : "Internal Server Error"})
        }
    }
    }
    const getStoryLikes = async (req, res) => {
        const { page, limit } = req.query;
        const { id } = req.params
        try{
        const skip = (page - 1) * limit;
        const gotUsers = await User.find();
        if(!gotUsers){
            throw new userError("No User Has Been Registered For Your Application", 204)
        }
        const story = await Story.findOne({ _id: id });
        const likesCount = story ? story.likes.length : 0;
        const storyLikes = await Story.findOne({ _id: id })
      .populate({
        path: 'likes.likedBy', // This populates the user (commentBy) in the comments array
        select: 'username picture bio' 
        // You can add other fields here as needed
      })
      .slice('likes', [parseInt(skip), parseInt(limit)])
      .lean();
    res.status(200).json({ likes : storyLikes["likes"], count : likesCount})     
    

         
           
        
        }
        catch(error){
            logEvents(`${error.name}: ${error.message}`, "getAllUsersError.txt", "userError")
            if(error instanceof userError){
                return res.status(error.statusCode).json({ error : error.message})
            }else{
                return res.status(500).json({error : "Internal Server Error"})
            }
        }
        }
const likeAStory = async(req, res) => {
    const { id } = req.params
try{
    
    if(!validateMongoDbId(id)){
        throw new userError("Pls enter a parameter recognized by the database", 400)
            }
    const story = await Story.findById(id);
  // Add the like to the story using static method
 await story.addLike(req.user._id);
 await Notification.createStoryNotification(story.userId, story._id, "like", `${req.user.username} liked your story.`, req.user._id)
  // Respond with the updated story
    res.status(201).json({"message" : "successfull"});        



}catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "addLikeToStoryError.txt", "storyError");
    if (error instanceof userError) {
        return res.status(error.statusCode).json({ message: error.message });
    } else {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
}

const unLikeAStory = async(req, res) => {
    const { id } = req.params
try{
    if(!validateMongoDbId(id)){
        throw new userError("Pls enter a parameter recognized by the database", 400)
            }
    const storyToBeUnLiked = await Story.findById(id);
    if(!storyToBeUnLiked){
        throw new userError("This story does not exist", 400)
    }
 await storyToBeUnLiked.removeLike(req.user._id);
    res.status(201).json({message : "Successfull"});    


}
catch(error){
    logEvents(`${error.name}: ${error.message}`, "unlikeAStoryError.txt", "storyError");
    if (error instanceof userError) {
        return res.status(error.statusCode).json({ message: error.message });
    } 
    else if(error instanceof notificationError){
        return res.status(error.statusCode).json({ message: error.message });
    }
    else {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
}





//To Bookmark A Story
const bookmarkAStory = async (req, res) => {
    const { id } = req.params;
    try{
    
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
const storyToBeBookmarked = await Story.findById(id)
if(!storyToBeBookmarked){
    throw new userError("This story does not exist", 400)
}
switch (req.user.role) {
    case "user":
        await User.bookmarkStory(req.user._id, storyToBeBookmarked._id)
        break;
}
const bookmarkedStory = await storyToBeBookmarked.addBookmark(req.user._id);
console.log(bookmarkedStory.userId, bookmarkedStory._id)
await Notification.createStoryNotification(bookmarkedStory.userId, bookmarkedStory._id, "bookmark", `${req.user.username} bookmarked your story.`, req.user._id)
res.status(201).json(bookmarkedStory)    

    }catch(error){
        logEvents(`${error.name}: ${error.message}`, "bookmarkAStoryError.txt", "storyError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
            }
             else{
            return res.status(500).json({message : "Internal Server Error"})
 }
    }
}
const unBookmarkAStory = async (req, res) => {
    const { id } = req.params;
    try {

        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
        const storyToBeUnbookmarked = await Story.findById(id);
        if(!storyToBeUnbookmarked ){
            throw new userError("This story does not exist", 400)
        }
        switch (req.user.role) {
            case "user":
                await User.unbookmarkStory(req.user._id, storyToBeUnbookmarked._id);
                break;
        }
        const unBookmarkedStory = await storyToBeUnbookmarked.removeBookmark(req.user._id);
        res.status(201).json(unBookmarkedStory);
    } catch (error) {
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "unbookmarkAStoryError.txt", "storyError");
        if (error instanceof userError) {
            return res.status(error.statusCode).json({ mesage: error.message });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
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
const deletedStory = await Story.findOneAndDelete({_id : id});
if(!deletedStory){
    throw new userError("This Story Does Not Exist", 404)
}
switch (req.user.role) {
    case "user":
        await User.deleteStory(req.user._id, id);
        break;
}
    res.status(200).json({"message" : "Deletion Of Story Was Successfull"})

    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "deleteAStoryError.txt", "storyError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
            }
             else{
            return res.status(500).json({message : "Internal Server Error"})
                }
    }
}
//For admin
const getStoryAnalytics = async (req, res) => {
    try{
        const [mostLikedStory, mostBookmarkedStory, mostViewedStory, mostCommentedStory, mostRecentStory] = await Promise.all([
            Story.find()
                .sort({ totalLikes: -1 })
                .limit(1) 
                .select("title author"),
            
            Story.find()
                .sort({ totalBookmarks: -1 }) 
                .limit(1)
                .select("title author")
                , 
        
            Story.find()
                .sort({ totalViews: -1 })
                .limit(1)
                .select("title author")
                ,  
            
            Story.find()
                .sort({ totalComments: -1 })
                .limit(1)
                .select("title author")
                ,
            Story.find()
    .sort({ createdAt: -1 })  // Sort by createdAt in descending order
    .limit(1)  // Limit to 1 result (most recent story)
    .select("title author createdAt")
                
        ]);
        res.status(200).json({
            mostLikedStory,
            mostBookmarkedStory,
            mostViewedStory,
            mostCommentedStory,
            mostRecentStory
        })
        
        
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getStoryAnalyticsError.txt", "userError")
        if(error instanceof userError){
            return res.status(error.statusCode).json({ message : error.message})
        }else{
            return res.status(500).json({message : "Internal Server Error"})
        }
    }
}
const getStoryMetrics = async (req, res) => {
    try{
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
        const countMetric = (field, start, end) => ([
            { $unwind: `$${field}` },
            { $match: { [`${field}.createdAt`]: { $gte: start, $lt: end } } },
            { $count: "count" }
          ]);
        const countData = (start, end) => ({
            createdAt : {
                $gte : start,
                $lt : end
            }
        })
        // Likes in the last 24h
        const [
            todayLikes,
            yesterdayLikes,
            todayBookmarks,
            yesterdayBookmarks,
            todayViews,
            yesterdayViews,
            todayComments,
            yesterdayComments,
            todayUsers,
            yesterdayUsers,
            todayStories,
            yesterdayStories
            ] = await Promise.all([
                Story.aggregate(countMetric("likes", twentyFourHoursAgo, now)),
                Story.aggregate(countMetric("likes", fortyEightHoursAgo, twentyFourHoursAgo)),
                Story.aggregate(countMetric("bookmarks", twentyFourHoursAgo, now)),
                Story.aggregate(countMetric("bookmarks", fortyEightHoursAgo, twentyFourHoursAgo)),
                Story.aggregate(countMetric("views", twentyFourHoursAgo, now)),
                Story.aggregate(countMetric("views", fortyEightHoursAgo, twentyFourHoursAgo)),
                Story.aggregate(countMetric("comments", twentyFourHoursAgo, now)),
                Story.aggregate(countMetric("comments", fortyEightHoursAgo, twentyFourHoursAgo)),
                User.countDocuments(countData(twentyFourHoursAgo, now)),
                User.countDocuments(countData(fortyEightHoursAgo, twentyFourHoursAgo)),
                Story.countDocuments(countData(twentyFourHoursAgo, now)),  // ✅ ADD THIS
                Story.countDocuments(countData(fortyEightHoursAgo, twentyFourHoursAgo))
        ])
        const todayLikesCount = todayLikes[0]?.count || 0;
        const yesterdayLikesCount = yesterdayLikes[0]?.count || 0;
        const todayBookmarksCount = todayBookmarks[0]?.count || 0;
        const yesterdayBookmarksCount = yesterdayBookmarks[0]?.count || 0;
        const todayViewsCount = todayViews[0]?.count || 0;
        const yesterdayViewsCount = yesterdayViews[0]?.count || 0;
        const todayCommentsCount = todayComments[0]?.count || 0;
        const yesterdayCommentsCount = yesterdayComments[0]?.count || 0;
        const calculatePercentageChange = (todayCount, yesterdayCount) => {
            // If both today and yesterday counts are 0, return 0 since there's no change
            if (todayCount === 0 && yesterdayCount === 0) return 0;
        
            // If only yesterday's count is 0, treat this as a 100% increase
            if (yesterdayCount === 0) return 100;
        
            // If only today's count is 0, treat this as a 100% decrease
            if (todayCount === 0) return -100;
        
            // Normal calculation for percentage change
            return Math.round(((todayCount - yesterdayCount) / Math.max(todayCount, yesterdayCount)) * 100);
        };
        const likesPercentageChange = calculatePercentageChange(todayLikesCount, yesterdayLikesCount);
        const bookmarksPercentageChange = calculatePercentageChange(todayBookmarksCount, yesterdayBookmarksCount);
        const viewsPercentageChange = calculatePercentageChange(todayViewsCount, yesterdayViewsCount);
        const commentsPercentageChange = calculatePercentageChange(todayCommentsCount, yesterdayCommentsCount);
        const usersPercentageChange = calculatePercentageChange(todayUsers, yesterdayUsers);
        const storiesPercentageChange = calculatePercentageChange(todayStories, yesterdayStories);  
        const trend = (value) => value > 0 ? "uptrend" : value < 0 ? "downtrend" : "uptrend";
        const likesTrend = trend(likesPercentageChange)
        const bookmarksTrend = trend(bookmarksPercentageChange)
        const viewsTrend = trend(viewsPercentageChange);
        const commentsTrend = trend(commentsPercentageChange)
        const usersTrend = trend(usersPercentageChange)
        const storiesTrend = trend(storiesPercentageChange)
        
        res.status(200).json({
        likes : {
            todayLikesCount,
            yesterdayLikesCount,
            percentage : Math.abs(likesPercentageChange),
            trend : likesTrend
        },
        bookmarks : {
            todayBookmarksCount,
            yesterdayBookmarksCount,
            percentage : Math.abs(bookmarksPercentageChange),
            trend : bookmarksTrend
        },
        views : {
            todayViewsCount,
            yesterdayViewsCount,
            percentage : Math.abs(viewsPercentageChange),
            trend : viewsTrend
        },
        comments : {
            todayCommentsCount,
            yesterdayCommentsCount,
            percentage : Math.abs(commentsPercentageChange),
            trend : commentsTrend
        },
        users : {
            todayUsersCount : todayUsers, 
            yesterdayUsersCount : yesterdayUsers,
            percentage : Math.abs(usersPercentageChange),
            trend : usersTrend
        },
        stories : {
            todayStoriesCount : todayStories, 
            yesterdayStoriesCount : yesterdayStories,
            percentage : Math.abs(storiesPercentageChange),
            trend : storiesTrend
        }
        })
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getStoryMetricsError.txt", "storyError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
            }
             else{
            return res.status(500).json({message : "Internal Server Error"})
                }
    }
}
const getGlobalMetrics = async (req, res) => {
    try{
        const countMetric = (field) => ([
            { $unwind: `$${field}`},
            { $count: "count" }
          ]);
const [userCount, storyCount, likeCount, commentCount, bookmarkCount, viewCount] = await Promise.all([
    User.countDocuments(),
    Story.countDocuments(),
    Story.aggregate(countMetric("likes")),
    Story.aggregate(countMetric("comments")),
    Story.aggregate(countMetric("bookmarks")),
    Story.aggregate(countMetric("views")),
])
res.status(200).json({
    userCount,
    storyCount,
    likeCount : likeCount[0]?.count || 0,
    commentCount : commentCount[0]?.count || 0,
    bookmarkCount : bookmarkCount[0]?.count || 0,
    viewCount : viewCount[0]?.count || 0
})
    }catch(error){
        console.log(error)
    }
}
module.exports = {
    createStory,
    getAStory,
    getAllStories,
    searchStories,
    getSuggestedStories,
    updateAStory,
    deleteAStory,
    uploadStoryPicture,
    bookmarkAStory,
    unBookmarkAStory,
    likeAStory,
    unLikeAStory,
    commentAStory,
    unCommentAStory,
    uploadNow,
    getPopularStories,
    getStoryComments,
    getStoryLikes,
    searchStories,
    liveSearchSuggestions,
    getStoryAnalytics,
    getStoryMetrics,
    getGlobalMetrics
}