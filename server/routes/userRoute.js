const express = require("express")
const path = require("path")
const router = express.Router()
const {
signupUser,
loginUser,
logoutUser,
getCurrentUser,
uploadUserPicture,
userRefreshToken,
deleteUser,
updateUser,
followUser,
unfollowUser,
duplicateUsername
} = require(path.join(__dirname, "..", "controllers", "userController.js"))
const { authMiddleware, isUser, bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadProfileImageMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
router.post("/register-user", signupUser);
router.post("/login-user", bruteForceLimiter, loginUser)
router.post("/upload-user-picture", authMiddleware,  uploadProfileImageMiddleware,  uploadUserPicture)
router.post("/follow-user", authMiddleware, followUser)
router.post("/unfollow-user", authMiddleware, unfollowUser)
router.post("/duplicate-username", duplicateUsername)
router.put("/update-user", authMiddleware,  updateUser)
router.get("/user-refresh-token", authMiddleware,  userRefreshToken)
router.get("/get-current-user", authMiddleware, getCurrentUser)
router.delete("/delete-user", authMiddleware, deleteUser)
router.get("/logout-user", logoutUser)
module.exports = router