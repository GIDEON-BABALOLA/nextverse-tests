const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
const path = require('path'); // For extracting file extensions
require("dotenv").config()

const Story = require(path.join(__dirname, "models", "storyModel.js"))
// Function to generate a random unique file name with extension
const generateUniqueFileName = (url) => {
  const extension = path.extname(url); // Get the file extension (e.g., .jpg, .png)
  const uniqueName = uuidv4(); // Generate a random unique ID
  return `${uniqueName}${extension}`; // Return the unique name with the file extension
};

// Function to update the `pictures` attribute in the Story model
const updateStoryPictures = async () => {
  try {
    const stories = await Story.find(); // Get all stories

    for (const story of stories) {
      if (story.picture && story.picture.length > 0) {
        // Map over the pictures array and update each URL
        const updatedPictures = story.picture.map((picture) => {
          const uniqueName = generateUniqueFileName(picture.url.url); // Generate the unique name from the URL
          return { url: picture.url.url, name: uniqueName }; // Return the structure with only url and name
        });

        // Update the story with the new pictures structure
        await Story.updateOne(
          { _id: story._id },
          { $set: { picture: updatedPictures } }
        );
      }
    }

    console.log('Story pictures updated successfully');
  } catch (error) {
    console.error('Error updating story pictures:', error);
  }
};

// Run the update
mongoose.connect(process.env.LITENOTE_MONGODB_URL)
.then(() => {
  updateStoryPictures();
})
.catch((error) => {
console.log(error)
})
