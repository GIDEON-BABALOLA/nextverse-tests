const express = require("express")
const path = require("path")
const { bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware"))
const router = express.Router()
const { subscribeToWaitingList,
     getWaitingList,
     deleteUserFromWaitingList,
     downloadWaitingListError
 } = require(path.join(__dirname, "..", "controllers", "waitingListController"))
router.post("/subscribe-user",  subscribeToWaitingList)
router.get("/get-waiting-list", getWaitingList)
router.get("/download-waiting-list-error", downloadWaitingListError)
router.delete("/delete-subscribed-user/:email", deleteUserFromWaitingList)
module.exports = router