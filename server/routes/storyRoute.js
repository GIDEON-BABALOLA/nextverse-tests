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
    commentAStory,
} = require(path.join(__dirname, "..", "controllers", "storyController.js"))
const { authMiddleware } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadMiddleware, uploadVideoMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
router.post("/create-story", authMiddleware, uploadMiddleware, createStory)
router.post("/comment-a-story/:id", authMiddleware, commentAStory)
router.put("/like-a-story/:id", authMiddleware, likeAStory)
router.put("/update-a-story/:id", authMiddleware,  updateAStory)
router.put("/upload-story-picture/:id",  authMiddleware, uploadMiddleware,  uploadStoryPicture)
// router.post("/upload-now",  uploadVideoMiddleware, uploadNow)
router.get("/get-a-story/:id", authMiddleware,   getAStory)
router.get("/get-all-stories", authMiddleware, getAllStories)
router.get("/bookmark-a-story/:id", authMiddleware, bookmarkAStory)
router.get("/unbookmark-a-story/:id", authMiddleware, unBookmarkAStory)
router.delete("/delete-a-story/:id", authMiddleware, deleteAStory)
module.exports = router