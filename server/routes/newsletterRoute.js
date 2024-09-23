const express = require("express")
const path = require("path")
const router = express.Router()
const { 
subScribeToNewsletter,
unSubscribeFromNewsletter,
getSubscribedUsers
} = require(path.join(__dirname, "..", "controllers", "newsletterController"))
router.post("/subscribe-to-newsletter", subScribeToNewsletter)
router.delete("/unsubscribe-to-newsletter", unSubscribeFromNewsletter)
router.get("/get-subscribed-users", getSubscribedUsers)
module.exports = router