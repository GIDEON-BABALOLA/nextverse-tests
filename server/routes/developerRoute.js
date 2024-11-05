const express = require("express")
const path = require("path")
const router = express.Router()
const {
signupDeveloper,
loginDeveloper,
logoutDeveloper,
getCurrentDeveloper,
uploadDeveloperPicture,
developerRefreshToken,
deleteDeveloper,
updateDeveloper,
} = require(path.join(__dirname, "..", "controllers", "developerController.js"))
const { authMiddleware, isDeveloper, bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadProfileImageMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
router.post("/register-developer", uploadProfileImageMiddleware,  signupDeveloper);
router.post("/login-developer", bruteForceLimiter, loginDeveloper)
router.post("/upload-developer-picture", authMiddleware, isDeveloper, uploadProfileImageMiddleware,  uploadDeveloperPicture)
router.put("/update-developer", authMiddleware, isDeveloper, updateDeveloper)
router.get("/developer-refresh-token", authMiddleware, isDeveloper, developerRefreshToken)
router.get("/get-current-developer", authMiddleware, isDeveloper, getCurrentDeveloper)
router.delete("/delete-developer", authMiddleware, isDeveloper, deleteDeveloper)
router.get("/logout-developer", logoutDeveloper)
module.exports = router
// 0807748966five