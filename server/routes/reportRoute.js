const express = require("express")
const path = require("path")
const router = express.Router()
const { createReport, getAllReports } = require(path.join(__dirname, "..", "controllers", "reportController.js"))
const { authMiddleware } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.get("/get-all-reports", authMiddleware,  getAllReports)
router.post("/create-report", authMiddleware, createReport)
module.exports = router