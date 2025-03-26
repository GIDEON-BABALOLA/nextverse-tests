const { cloudinaryError, validatorError, } = require("../utils/customError");
const cloudinary = require("cloudinary")
const getAllAvatars = async (req, res) => {
    const { number } = req.params
    console.log(number)
try{
    const result = await cloudinary.v2.api.resources({
      type: "upload",
      prefix: "Avatars", // Fetch images from the specific folder
      max_results: parseInt(number)  // Adjust as needed
    });

const response = result.resources.map((file) => ({
      url: file.secure_url,
    }));
    res.status(200).json({message : "Successfully retrieved Avatars", avatars : response})
}catch(error){
    console.log(error.message)
    if (error instanceof cloudinaryError) {
        return res.status(error.statusCode).json({ message : "Unable To Retrieve Avatars"})
    }
         else{
     return res.status(500).json({message : "Internal Server Error"})
     }
}
}
module.exports = { getAllAvatars }