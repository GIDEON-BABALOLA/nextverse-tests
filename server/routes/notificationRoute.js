const express = require("express")
const path = require("path")
const router = express.Router()
const { getMyNotifications } = require(path.join(__dirname, "..", "controllers", "notificationController.js"))
const { authMiddleware } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.get("/get-my-notifications", authMiddleware,  getMyNotifications)
module.exports = router