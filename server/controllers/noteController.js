const path = require("path");
const sanitizeHtml = require('sanitize-html');
const { calculateObjectSize } = require("bson"); 
const { formatSize } = require("../utils/size")
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const Note = require(path.join(__dirname, "..", "models", "noteModel"))

const User = require(path.join(__dirname, "..", "models", "userModel"))
const {  userError } = require("../utils/customError");
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const createNote = async (req, res) => {
    const { title, content } = req.body;
try{
    if(  !title || !content){
        throw new userError("Please Fill In All The Fields", 400)
    }
    const sanitizedContent = sanitizeHtml(content, {
        allowedTags: ["b", "i", "em", "strong", "p", "ul", "li", "a"], // Allow only safe tags
        allowedAttributes: { "a": ["href"] }, // Allow only safe attributes
      });
      const noteCount = await Note.countDocuments({ userId : req.user._id});
      if(noteCount == 10){
        throw new userError("You Can Only Create Ten Notes", 400)
      }
    const newNote = {
        author : req.user.username,
        title, 
        userId : req.user._id,
        content : content
    }
    const note = await Note.create(newNote)
    await Note.addNote(req.user._id, note._id, "creator")
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
            const userToBeSharedTo  =  await User.findOne({email : email})
            if(!userToBeSharedTo){
                throw new userError("This user does not exist", 400)
            }
        const foundNote = await Note.findById(id)
        console.log(foundNote)
        if(!foundNote){
            throw new userError("This Note Does Not Exist", 404)
        }
        const exists = await Note.exists({
            _id: id,
            "owners.userId" : userToBeSharedTo._id
        });
        if(foundNote.userId.toString() == userToBeSharedTo._id && foundNote.userId.toString() == req.user._id.toString()){
            console.log("how")
            throw new userError("You Already Have This Note", 400)
        }
        if(exists){
            throw new userError("User already has this note.", 400)
        }
        await Note.addNote(userToBeSharedTo._id, foundNote._id, "owner")
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
    console.log(req.body)
    
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
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
const removeNote = async (req, res) => {
    const { id } = req.params;
    try{
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
    const noteToBeRemoved =  await Note.findById(id)
    if(noteToBeRemoved.userId == req.user._id){
        throw new userError("You cannot remove a note that you created", 400)
    }
    if(!noteToBeRemoved){
        throw new userError("This note does not exist", 404)
    }
    await Note.removeNote(req.user._id,  id, "owner")
        res.status(200).json({message : "Note Successfully Removed", note : noteToBeRemoved})     
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "removeNoteError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({message : "Internal Server Error"})
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
                const deletedNote = await Note.findOneAndDelete({ 
                    _id: id, 
                    userId: req.user._id // Ensures only the creator can delete
                });
                
                if (!deletedNote) {
                    throw new userError("You did not create this note or it does not exist.", 400);
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
            return res.status(500).json({message : "Internal Server Error"})
            }
    }
}
const getMyNotes = async (req, res) => {
    try{
   const myNotes = await Note.find({
    owners: {
        $elemMatch: { userId: req.user._id }
    }
})
.select("author title userId size updatedAt createdAt owners, sharedWith")
.lean();
const myNotesAfterFormattingSize = myNotes.map((note) => {
    return {...note, size : formatSize(calculateObjectSize(note))}
})
res.status(200).json({ message: "Retrieval of All My Notes Was Successful", notes: myNotesAfterFormattingSize, noteCount : myNotes.length });
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getMyNotesError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({message : "Internal Server Error"})
            }  
    }
}
const getANote = async (req, res) => {
    const { id } = req.params;
    try{
    if(!validateMongoDbId(id)){
throw new userError("Pls enter a parameter recognized by the database", 400)
    }
if(!id){
    throw new userError("Pls Enter The Id Of The Story You Want To View", 400)
}

const foundNote = await Note.findById(id)
.select("_id author title content")
if(!foundNote){
    throw new userError("This note does not exist", 400)
}
res.status(200).json({message : "Successfully retrieved Your Note", note : foundNote})
    }catch(error){
        console.log(error);
        logEvents(`${error.name}: ${error.message}`, "getANoteError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({message : "Internal Server Error"})
            }  
    }
}
module.exports ={
    createNote,
    readNote,
    updateNote, 
    deleteNote,
    removeNote,
    getMyNotes,
    getANote,
    shareNote
}