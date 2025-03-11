const express = require("express")
const path = require("path")
const router = express.Router()
const {
createNote,
readNote,
updateNote, 
getMyNotes,
deleteNote,
removeNote,
getANote,
shareNote
} = require(path.join(__dirname, "..", "controllers", "noteController.js"))
const { authMiddleware } = require(path.join(__dirname, "..", "middlewares", "authMiddleware.js"))
router.post("/create-note", authMiddleware, createNote);
router.get("/read-note/:id", authMiddleware, readNote);
router.put("/update-note/:id", authMiddleware, updateNote)
router.get("/get-my-notes", authMiddleware, getMyNotes)
router.get("/get-a-note/:id", authMiddleware, getANote)
router.put("/share-note/:id", authMiddleware, shareNote)
router.delete("/remove-note/:id", authMiddleware, removeNote)
router.delete("/delete-note/:id", authMiddleware, deleteNote)
module.exports = router