const express = require("express")
const path = require("path")
const router = express.Router()
const {
    createStory,
    getAStory,
    getAllStories,
    updateAStory,
    deleteAStory,
    uploadStoryPicture,
    bookmarkAStory,
    unBookmarkAStory,
    likeAStory,
    unLikeAStory,
    commentAStory,
    unCommentAStory,
    getPopularStories,
    getSuggestedStories,
    getStoryComments,
    getStoryLikes
} = require(path.join(__dirname, "..", "controllers", "storyController.js"))
const { authMiddleware } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
router.post("/create-a-story", authMiddleware, uploadMiddleware, createStory)
router.post("/comment-a-story/:id", authMiddleware, commentAStory)
router.put("/like-a-story/:id", authMiddleware, likeAStory)
router.put("/update-a-story/:id", authMiddleware,  updateAStory)
router.put("/upload-story-picture/:id",  authMiddleware, uploadMiddleware,  uploadStoryPicture)
router.put("/unbookmark-a-story/:id", authMiddleware, unBookmarkAStory)
router.put("/uncomment-a-story/:id/:commentId", authMiddleware, unCommentAStory)
router.put("/unlike-a-story/:id", authMiddleware, unLikeAStory)
// router.post("/upload-now",  uploadVideoMiddleware, uploadNow)
router.get("/get-a-story/:id", authMiddleware,   getAStory)
router.get("/get-all-stories", authMiddleware, getAllStories)
router.get("/get-popular-stories/:category/:number", getPopularStories)
router.get("/get-suggested-stories", authMiddleware, getSuggestedStories)
router.get("/bookmark-a-story/:id", authMiddleware, bookmarkAStory)
router.get("/get-story-comments/:id", authMiddleware, getStoryComments)
router.get("/get-story-likes/:id", authMiddleware, getStoryLikes)
router.delete("/delete-a-story/:id", authMiddleware, deleteAStory)
module.exports = router