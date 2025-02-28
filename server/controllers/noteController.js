const path = require("path");
const sanitizeHtml = require('sanitize-html');
const { calculateObjectSize } = require("bson"); 
const { formatSize } = require("../utils/size")
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const Note = require(path.join(__dirname, "..", "models", "noteModel"))
const Admin = require(path.join(__dirname, "..", "models", "adminModel"))
const User = require(path.join(__dirname, "..", "models", "userModel"))
const {  userError } = require("../utils/customError");
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const createNote = async (req, res) => {
    const { title, content } = req.body;
try{
    // console.log(crash)
    if(  !title || !content){
        throw new userError("Please Fill In All The Fields", 400)
    }
    const sanitizedContent = sanitizeHtml(content, {
        allowedTags: ["b", "i", "em", "strong", "p", "ul", "li", "a"], // Allow only safe tags
        allowedAttributes: { "a": ["href"] }, // Allow only safe attributes
      });
      const noteCount = await Note.countDocuments();
      if(noteCount == 10){
        throw new userError("You Can Only Create Ten Notes", 400)
      }
    const newNote = {
        author : req.user.username,
        title, 
        userId : req.user._id,
        content : sanitizedContent
    }
    const note = await Note.create(newNote)
        switch (req.user.role) {
            case "user":
                await User.addNote(req.user.email, note._id);
                break;
            case "admin":
                await Admin.addNote(req.user.email, note._id);
        }
    res.status(200).json({ message: "Creation of Note Was Successful", note: note });
}
catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "createNoteError.txt", "noteError")
    if (error instanceof userError) {
        return  res.status(error.statusCode).json({ message : error.message})
    }
     else{
        return res.status(500).json({message : "Internal Server Error"})
        }
}
}
const shareNote = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try{
        if(!validateMongoDbId(id)){
        throw new userError("Pls enter a parameter recognized by the database", 400)
            }
        const foundNote = await Note.findById(id)
        if(!foundNote){
            throw new userError("This Note Does Not Exist", 404)
        }
        switch (req.user.role) {
            case "user":
                await User.addNote(email, foundNote._id);
                break;
            case "admin":
                await Admin.addNote(email, foundNote._id);
        }
        res.status(201).json({message : "Sharing of note was successfull", note : foundNote})
    }
   
    
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "shareNoteError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
const readNote = async (req, res) => {
    const { id } = req.params;
    try{
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
                const foundNote = await Note.findById(id);
                if(!foundNote){
                    throw new userError("This Note Does Not Exist", 404)
                }           
    res.status(200).json({ message: "Reading of Note Was Successful", note: foundNote });

    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "readNoteError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
    }

const updateNote = async (req, res) => {
    const { id } = req.params;
    try{
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
const updatedNote = await Note.findByIdAndUpdate(id, req.body, {new : true});
if(!updatedNote){
    throw new userError("The Note You Want To Update Does Not Exist", 404)
}
res.status(201).json({ message: "Updating of Note Was Successful", note: updatedNote });

    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "updateNoteError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
const deleteNote = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try{
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
                const deletedNote = await Note.findOneAndDelete({_id : id});
if(!deletedNote){
    throw new userError("This Note Does Not Exist", 404)
}
switch (req.user.role) {
    case "user":
        await User.removeNote(req.user._id, id);
        break;
    case "admin":
        await Admin.removeNote(req.user._id, id);
}
res.status(200).json({ message: "Deletion of Note Was Successful", note: deletedNote });
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "deleteNoteError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
const getMyNotes = async (req, res) => {
    try{
   const noteCount = await Note.countDocuments();
    const userNotes = await User.findOne({ _id: req.user._id })
      .populate({
        path: 'notes.noteId',
       select: 'author title userId size updatedAt createdAt' 
        // You can add other fields here as needed
      })
      .lean();
      const noteMan = userNotes["notes"].map((item) => ({...item.noteId}))
const noteToBeSent = noteMan.map((note) => {
    return {...note, size :  formatSize(calculateObjectSize(note))}
})
console.log(noteToBeSent)
res.status(200).json({ message: "Retrieval of All My Notes Was Successful", notes: noteToBeSent, noteCount : noteCount });
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getMyNotesError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({error : "Internal Server Error"})
            }  
    }
}
module.exports ={
    createNote,
    readNote,
    updateNote, 
    deleteNote,
    getMyNotes,
    shareNote
}