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
getAllDevelopers 
} = require(path.join(__dirname, "..", "controllers", "developerController.js"))
const { authMiddleware, isDeveloper, bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadProfileImageMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
const {verifyReCAPTCHA } = require(path.join(__dirname, "..", "middlewares", "verifyReCAPTCHA"))
router.post("/register-developer", verifyReCAPTCHA, uploadProfileImageMiddleware,  signupDeveloper);
router.post("/login-developer", verifyReCAPTCHA, bruteForceLimiter, loginDeveloper)
router.post("/upload-developer-picture", authMiddleware, isDeveloper, uploadProfileImageMiddleware,  uploadDeveloperPicture)
router.put("/update-developer", authMiddleware, isDeveloper, updateDeveloper)
router.get("/developer-refresh-token", authMiddleware, isDeveloper, developerRefreshToken)
router.get("/get-current-developer", authMiddleware, isDeveloper, getCurrentDeveloper)
router.get("/get-all-developers",  getAllDevelopers)
router.get("/logout-developer", authMiddleware,  isDeveloper,  logoutDeveloper)
router.delete("/delete-developer", authMiddleware, isDeveloper, deleteDeveloper)
module.exports = router
// 0807748966five