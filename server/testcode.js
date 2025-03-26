// const cloudinary = require("cloudinary")
// require("dotenv").config()
// cloudinary.config({
//     cloud_name : process.env.LITENOTE_CLOUDINARY_CLOUD_NAME,
//     api_key : process.env.LITENOTE_CLOUDINARY_API_KEY,
//     api_secret : process.env.LITENOTE_CLOUDINARY_API_SECRET
    
// })
// const fetchImagesFromFolder = async (folderPath) => {
//   try {
//     const result = await cloudinary.v2.api.resources({
//       type: "upload",
//       prefix: folderPath, // Fetch images from the specific folder
//       max_results: 100  // Adjust as needed
//     });

// const response = result.resources.map((file) => ({
//       url: file.secure_url,
//     }));
//     console.log(response)
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     return [];
//   }
// };
// fetchImagesFromFolder("Avatars")
