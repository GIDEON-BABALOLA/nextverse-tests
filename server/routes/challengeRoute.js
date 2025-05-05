const express = require("express")
const path = require("path")
const router = express.Router()
const {
getAllChallenges
} = require(path.join(__dirname, "..", "controllers", "challengeController.js"))
const { authMiddleware, isAdministrator, bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { uploadProfileImageMiddleware } = require(path.join(__dirname, "..", "middlewares", "uploadImages.js"))
router.get("/get-all-challenges", authMiddleware, getAllChallenges);
module.exports = router
// 0807748966five