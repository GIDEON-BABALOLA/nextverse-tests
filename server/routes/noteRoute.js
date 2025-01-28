const express = require("express")
const path = require("path")
const router = express.Router()
const {
createNote,
readNote,
updateNote, 
deleteNote
} = require(path.join(__dirname, "..", "controllers", "noteController.js"))
const { authMiddleware } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.post("/create-note", authMiddleware, createNote);
router.get("/read-note/:id", authMiddleware, readNote);
router.put("/update-note/:id", authMiddleware, updateNote)
router.delete("/delete-note/:id", authMiddleware, deleteNote)