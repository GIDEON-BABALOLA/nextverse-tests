const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { rankStories } = require(path.join(__dirname, "..", "utils", "rankStories.js"))
const fs = require('fs');
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const Admin = require(path.join(__dirname, "..", "models", "adminModel.js"))
const Story = require(path.join(__dirname, "..", "models", "storyModel.js"))
const Notification = require(path.join(__dirname, "..", "models", "notificationModel.js"))
const _ = require('lodash');
const slugify = require("slugify")
const { cloudinaryError, userError, notificationError } = require("../utils/customError");
const { Console } = require("console");
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
        avatar : req.user.picture,
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
        case "admin":
            await Admin.createStory(req.user._id, story._id);
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
.select("estimatedReadingTime date _id author avatar title content userId picture totalLikes totalViews")
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
const totalViews =  (Number(foundStory.totalViews) || 0) + 1;
foundStory.totalViews = totalViews.toString()
await foundStory.save()
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
console.log(req.query.page, req.query.limit)
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
queryString = queryString.replace(/\b(gte|gt|lte|lt|eq)\b/g, (match) => `$${match}`)
let query;
const queryToBeSent = {...JSON.parse(queryString), ...dateFilter}
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
const allStories = await query.lean();
const enrichedFeed = allStories.map((story) => ({
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
const suggestedStories = await query.lean();
const enrichedStorySuggestions = suggestedStories.map((story) => ({
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
        foundStories = await Story.find().lean();
    }
    else{
        foundStories = await Story.find({ category : category}).lean()
    }
    const enrichedPopularStories = foundStories.map((story) => ({
        ...story,
        picture : story.picture[Math.floor(Math.random() * story.picture.length)],
        isLiked: story.likes.some((like) => like.likedBy.toString() == userId.toString()),
        isBookmarked : story.bookmarks.some((bookmark) => bookmark.bookmarkBy.toString() == userId.toString())
      }));
      console.log(enrichedPopularStories)
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
        // Add the comment to the story using static method
        const date = new Date();
        const commentedStory = await story.addComment( comment, req.user._id, date);
        await Notification.createStoryNotification(story.userId, story._id, "comment", `${req.user.username} commented on your story.`, req.user._id)
        // Respond with the updated story
        res.status(201).json(commentedStory.toObject().comments[0]);
    } catch (error) {
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
    select: 'username picture' 
    // You can add other fields here as needed
  })
  .slice('comments', [parseInt(skip), parseInt(limit)])
  .lean();
    res.status(200).json({ comments : storyComments["comments"], count : commentCount})      

    
    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "getAllUsersError.txt", "adminError")
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
            logEvents(`${error.name}: ${error.message}`, "getAllUsersError.txt", "adminError")
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
    case "admin":
        await Admin.bookmarkStory(req.user._id, storyToBeBookmarked._id)
}
const bookmarkedStory = await storyToBeBookmarked.addBookmark(req.user._id);
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
            case "admin":
                await Admin.unbookmarkStory(req.user._id, storyToBeUnbookmarked._id);
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
    console.log(id)
    console.log(req.user.role)
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
    case "admin":
        await Admin.deleteStory(req.user._id, id);
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
module.exports = {
    createStory,
    getAStory,
    getAllStories,
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
    getStoryLikes
}
