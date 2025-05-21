const express = require("express")
const path = require("path")
const router = express.Router()
const { bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { googleAuthentication, redirectToGoogle, googleCallback } = require(path.join(__dirname, "..", "controllers", "thirdPartyAuthController.js"))
router.post("/google-authentication", bruteForceLimiter, googleAuthentication)
router.get("/google", redirectToGoogle);
router.get("/google/callback", googleCallback);
module.exports = router