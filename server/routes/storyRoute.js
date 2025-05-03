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
    getStoryLikes,
    searchStories,
    getStoryAnalytics,
    getStoryMetrics,
    getGlobalMetrics,
    liveSearchSuggestions
} = require(path.join(__dirname, "..", "controllers", "storyController.js"))
const { authMiddleware, isAdministrator } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
router.post("/create-a-story", authMiddleware, uploadMiddleware, createStory)
router.patch("/comment-a-story/:id", authMiddleware, commentAStory)
router.patch("/like-a-story/:id", authMiddleware, likeAStory)
router.patch("/update-a-story/:id", authMiddleware,  updateAStory)
router.put("/upload-story-picture/:id",  authMiddleware, uploadMiddleware,  uploadStoryPicture)
router.patch("/bookmark-a-story/:id", authMiddleware, bookmarkAStory)
router.patch("/unbookmark-a-story/:id", authMiddleware, unBookmarkAStory)
router.patch("/uncomment-a-story/:id/:commentId", authMiddleware, unCommentAStory)
router.patch("/unlike-a-story/:id", authMiddleware, unLikeAStory)
router.get("/get-a-story/:id", authMiddleware,   getAStory)
router.get("/get-all-stories", authMiddleware, getAllStories)
router.get("/search-stories", authMiddleware, searchStories)
router.get("/live-search-suggestions", authMiddleware, liveSearchSuggestions)
router.get("/get-popular-stories/:category/:number", getPopularStories)
router.get("/get-suggested-stories", authMiddleware, getSuggestedStories)
router.get("/get-story-comments/:id", authMiddleware, getStoryComments)
router.get("/get-story-likes/:id", authMiddleware, getStoryLikes)
router.get("/get-story-analytics", authMiddleware, isAdministrator, getStoryAnalytics)
router.get("/get-story-metrics", authMiddleware, isAdministrator, getStoryMetrics)
router.get("/get-global-metrics", authMiddleware, isAdministrator, getGlobalMetrics)
router.delete("/delete-a-story/:id", authMiddleware, deleteAStory)
module.exports = router