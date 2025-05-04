const express = require("express")
const path = require("path")
const router = express.Router()
const { getMyNotifications, getNotificationsCount, getAllNotifications } = require(path.join(__dirname, "..", "controllers", "notificationController.js"))
const { authMiddleware, isAdministrator } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.get("/get-my-notifications", authMiddleware,  getMyNotifications)
router.get("/get-notifications-count", authMiddleware, getNotificationsCount)
router.get("/get-all-notifications", authMiddleware, isAdministrator, getAllNotifications)
module.exports = router