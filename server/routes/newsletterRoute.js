const express = require("express")
const path = require("path")
const router = express.Router()
const { 
subScribeToNewsletter,
unSubscribeFromNewsletter,
getSubscribedUsers
} = require(path.join(__dirname, "..", "controllers", "newsletterController"))
const {verifyReCAPTCHA } = require(path.join(__dirname, "..", "middlewares", "verifyReCAPTCHA"))
router.post("/subscribe-to-newsletter", verifyReCAPTCHA,  subScribeToNewsletter)
router.delete("/unsubscribe-to-newsletter", unSubscribeFromNewsletter)
router.get("/get-subscribed-users", getSubscribedUsers)
module.exports = router