
const path = require("path")
const multer = require("multer")
const fs = require("fs")
const fsPromises = require("fs").promises
const  { uploadError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const multerStorage = multer.diskStorage({
    destination : async (req, file, cb ) => {
        if(!fs.existsSync(path.join(__dirname, "..", 'public', "videos"))){
            await fsPromises.mkdir(path.join(__dirname, "..", 'public', "videos"),  { recursive: true });
        }
cb(null, path.join(__dirname, "..", "public", "videos"))
    },
    filename : (req, file, cb) => {
const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
// cb(null, file.fieldname + "-" + uniqueSuffix + ".mp4");
cb(null, file.originalname  + ".mp4");
    }
})
const multerNext = (req, file, cb) => {
    if(file.mimetype.startsWith("video")){
        cb(null, true)
    }else{ 
        cb({
            message :  "Unsupported file format"
        },
        false)
    }
  }
const uploadDer = multer({
    storage : multerStorage,
    fileFilter : multerNext,
    limits : {    fieldSize: 	200000000000000 } //2 megabytes at most // // 2 Megabyte in bytes (1 kilobyte = 1024 bytes)
  })
  const uploadVideo = uploadDer.array("video", 20)
const uploadVideoMiddleware = (req, res, next) => {
    uploadVideo(req, res, (error) => {
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
  }