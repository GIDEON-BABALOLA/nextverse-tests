const path = require("path")
const multer = require("multer")
const fs = require("fs")
const fsPromises = require("fs").promises
const  { uploadError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const multerStorage = multer.diskStorage({
    destination : async (req, file, cb ) => {
        if(!fs.existsSync(path.join(__dirname, "..", 'public', "images"))){
            await fsPromises.mkdir(path.join(__dirname, "..", 'public', "images"),  { recursive: true });
        }
cb(null, path.join(__dirname, "..", "public", "images"))
    },
    filename : (req, file, cb) => {
const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    }
})
// This modification should create all the necessary directories in the path if they don't exist. The { recursive: true } option ensures that parent directories are created as needed. Make sure to adjust the path and folder names based on your project structure.
const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }else{ 
        cb({
            message :  "Unsupported file format"
        },
        false)
    }
}
const uploadPhoto = multer({
    storage : multerStorage,
    fileFilter : multerFilter,
    limits : {    fieldSize: 	2000000 } //2 megabytes at most // // 2 Megabyte in bytes (1 kilobyte = 1024 bytes)
})
const uploadImageMiddleware = uploadPhoto.array('picture', 2);
const uploadProfileImage = uploadPhoto.single("profile-picture");
const uploadMiddleware = (req, res, next) => {
  uploadImageMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size too large (max 2MB)', success: false });
      }
      return res.status(400).json({ error: err.message, success: false });
    } else if (err) {
      console.log(err)
      return res.status(400).json({ error: err.message, success: false });
    }
    console.log(req.file)
    // No errors, move to the next middleware or route handler
    next();
 });
};
const uploadProfileImageMiddleware = (req, res, next) => {
    uploadProfileImage(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File size too large (max 2MB)', success: false });
        }
       //The only error this can catch is unexpected field
        return res.status(400).json({ error : error.message});
      } else if (error) {
        //The error this can catch is unsupported file format,  and unsupported file size
        return res.status(400).json({ error : error.message});
      }
  
      // No errors, move to the next middleware or route handler
      next();
   });
  };


module.exports = {uploadMiddleware, uploadProfileImageMiddleware}