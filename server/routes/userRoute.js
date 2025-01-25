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
getAllUsers,
getAUser,
unfollowUser,
duplicateUsername,
verifyUserRegistration,
getUserProfile,
resendUserVerification,
getUserBookmarks,
getUserStories
} = require(path.join(__dirname, "..", "controllers", "userController.js"))
const {verifyReCAPTCHA } = require(path.join(__dirname, "..", "middlewares", "verifyReCAPTCHA"))
const { authMiddleware, isUser, bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadProfileImageMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
router.post("/register-user", verifyReCAPTCHA,  signupUser);
router.post("/verify-user-registration", verifyUserRegistration)
router.post("/resend-user-verification", resendUserVerification)
// router.post("/login-user", verifyReCAPTCHA,  bruteForceLimiter, loginUser)
router.post("/login-user",  bruteForceLimiter, loginUser)
router.post("/upload-user-picture", authMiddleware,  uploadProfileImageMiddleware,  uploadUserPicture)
router.post("/follow-user", authMiddleware, followUser)
router.post("/unfollow-user", authMiddleware, unfollowUser)
router.post("/duplicate-username", duplicateUsername)
router.put("/update-user", authMiddleware,  updateUser)
router.get("/user-refresh-token", authMiddleware,  userRefreshToken)
router.get("/get-current-user", authMiddleware, getCurrentUser)
router.get("/get-a-user/:id", authMiddleware, getAUser)
router.get("/get-all-users", authMiddleware, getAllUsers)
router.get("/get-user-profile", authMiddleware, getUserProfile)
router.get("/get-user-bookmarks", authMiddleware, getUserBookmarks)
router.get("/get-user-stories", authMiddleware, getUserStories)
router.get("/logout-user",  authMiddleware, isUser, logoutUser)
router.delete("/delete-user", authMiddleware, deleteUser)
module.exports = router