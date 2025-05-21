const express = require("express")
const path = require("path")
const cors = require("cors")
const router = express.Router()
const { bruteForceLimiter } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
const { googleAuthentication, googleCallback } = require(path.join(__dirname, "..", "controllers", "thirdPartyAuthController.js"))
router.post("/google-authentication", bruteForceLimiter, googleAuthentication)
router.post("/google/callback", bruteForceLimiter, googleCallback);
module.exports = router