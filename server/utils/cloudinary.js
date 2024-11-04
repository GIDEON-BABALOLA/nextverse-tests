const cloudinary = require("cloudinary").v2
const path = require("path")
const { cloudinaryError } = require(path.join(__dirname, "customError.js"))
cloudinary.config({
    cloud_name : process.env.LIGHTNOTE_CLOUDINARY_CLOUD_NAME,
    api_key : process.env.LIGHTNOTE_CLOUDINARY_API_KEY,
    api_secret : process.env.LIGHTNOTE_CLOUDINARY_API_SECRET
    
})
//This helps to upload assets in a folder
const cloudinaryUpload = async (filesToUpload, folderName) => {
    try{
        const result = await cloudinary.uploader.upload(
            filesToUpload,
            {
              folder: folderName,
            }
          );
return { url : result.secure_url}
    }catch(error){
      console.log(error)
      throw new cloudinaryError("Unable To Upload Picture, Check Internet Connection", 400)
    }
}
//This Helps to Delete multiple assets within a folder and the folder itself
const cloudinaryDelete = async (folderName) => {
  try{
    await cloudinary.api.delete_resources_by_prefix(`User/${folderName}`);
    await cloudinary.api.delete_folder(`/User/${folderName}`)
  }catch(error){
    throw new cloudinaryError("Unable To Delete Your Picture, Check Internet Connection", 400)
  }
}
const cloudinaryDeveloperDelete = async (folderName) => {
  try{
    await cloudinary.api.delete_resources_by_prefix(`Developer/${folderName}`);
    await cloudinary.api.delete_folder(`/Developer/${folderName}`)
  }catch(error){
    throw new cloudinaryError("Unable To Delete Your Picture, Check Internet Connection", 400)
  }
}
//This deletes a single asset with the publicID
const cloudinarySingleDelete = async (publicId, folderName) => {
  try{
    console.log(publicId)
   const wow =  await cloudinary.uploader
  .destroy(publicId)
  console.log(wow)
  }
  catch(error){
    throw new cloudinaryError("Unable To Delete Formal Picture, Check Internet Connection", 400)
  }
}

module.exports =  { cloudinaryUpload, cloudinaryDelete, cloudinarySingleDelete, cloudinaryDeveloperDelete }