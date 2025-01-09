const { read } = require("fs");
const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const createNote = () => {
try{

}
catch(error){
    logEvents(`${error.name}: ${error.message}`, "createNoteError.txt", "noteError")
}
}
const readNote = () => {
    try{

    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "createNoteError.txt", "noteError")
    }
}
const updateNote = () => {
    try{

    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "createNoteError.txt", "noteError")
    }
}
const deleteNote = () => {
    try{

    }
    catch(error){
        logEvents(`${error.name}: ${error.message}`, "createNoteError.txt", "noteError")
    }
}
module.exports ={
    createNote,
    readNote,
    updateNote, 
    deleteNote
}