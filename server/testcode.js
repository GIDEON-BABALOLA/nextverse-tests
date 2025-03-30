const cloudinary = require("cloudinary")
require("dotenv").config()
cloudinary.config({
    cloud_name : process.env.LITENOTE_CLOUDINARY_CLOUD_NAME,
    api_key : process.env.LITENOTE_CLOUDINARY_API_KEY,
    api_secret : process.env.LITENOTE_CLOUDINARY_API_SECRET
    
})
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
//name attribute is important
// const checkIfFolderExists = async (folderName) => {
//     try {
//         const response = await cloudinary.v2.api.sub_folders(folderName);
//         console.log(`Folder "${folderName}" exists.`);
//         return true;
//     } catch (error) {
//         if (error.http_code === 404) {
//             console.log(`Folder "${folderName}" does not exist.`);
//             return false;
//         }
//         console.error("Error:", error.message);
//         return false;
//     }
// };

// Usage
checkIfFolderExists("User/user1@gmail.com");
