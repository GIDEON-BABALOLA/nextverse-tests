const express = require("express")
const path = require("path")
const router = express.Router()
const {  populateStories, populateUsers, fixUserModel } = require(path.join(__dirname, "..", "controllers", "fixController"))
const { authMiddleware } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.get("/fix-user-model",   fixUserModel)
router.get("/fix-populate-stories", authMiddleware, populateStories)
router.get("/fix-populate-users", authMiddleware, populateUsers)
module.exports = router