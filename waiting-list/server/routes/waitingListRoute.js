const express = require("express")
const path = require("path")
const { bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware"))
const router = express.Router()
const { subscribeToWaitingList,
     getWaitingList,
     deleteUserFromWaitingList
 } = require(path.join(__dirname, "..", "controllers", "waitingListController"))
router.post("/subscribe-user", bruteForceLimiter, subscribeToWaitingList)
router.get("/get-waiting-list", getWaitingList)
router.delete("/delete-subscribed-user/:email", deleteUserFromWaitingList)
module.exports = router