// require("dotenv").config()
// const mongoose = require('mongoose');
// const express = require("express")
// const app = express();
// const User = require('./models/userModel'); // Assuming you have a User model

// // Function to delete all users except for the one with the given email
// const deleteAllUsersExceptOne = async (email) => {
//   try {
//     // Find the user to exclude by email
//     const userToExclude = await User.findOne({ email });

//     // If no user is found with the provided email, throw an error
//     if (!userToExclude) {
//       throw new Error('User not found');
//     }

//     // Delete all users except the one to exclude
//     const result = await User.deleteMany({
//       _id: { $ne: userToExclude._id }, // Exclude the user with the given email
//     });

//     console.log(`${result.deletedCount} users deleted, excluding the user with email: ${email}`);
//   } catch (error) {
//     console.error('Error deleting users:', error);
//   }
// };

// mongoose.connect(process.env.LITENOTE_MONGODB_URL)
// .then(() => {

//         deleteAllUsersExceptOne('user10@gmail.com');  // Replace with the email of the user you want to keep
// })
// // Usage


// const removeStoryPictureFromText = (name) => {
//   const tag = document.createElement("div")
//   tag.innerHTML = storyContent;
//   const spans = tag.querySelectorAll("span");
//   spans.forEach(span => {
//     const match = span.innerText.match(/\[Image ([^\]]+)]/);
//     if (match) {
//       const imageName = match[1];
// if(name == imageName){
//   span.remove()
// }
//     }
//   });
//   console.log(spans)
//   return tag.innerHTML
// }
const roleId = "userId"
const selectedId = "123"
const query = {}
query[roleId] = selectedId
console.log(query)