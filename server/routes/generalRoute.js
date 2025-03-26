const express = require("express")
const path = require("path")
const router = express.Router()
const {
getAllAvatars
} = require(path.join(__dirname, "..", "controllers", "generalController.js"))
const { authMiddleware, } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.get("/get-all-avatars/:number", authMiddleware, getAllAvatars )
module.exports = router