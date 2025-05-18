const mongoose = require("mongoose");
const User = require("./models/userModel"); // Adjust path if needed

mongoose.connect("mongodb+srv://nextverse101:n3dblQlCnV63uvZU@cluster0.hhv6f.mongodb.net/litenoteDB").then(() => {
  console.log("MongoDB connected.");
  createUser();
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

async function createUser() {
  try {
    const newUser = new User({
      username: "Jemima",
      email: "marojemima@gmail.com",
      password: "password123$",
      mobile: "08012345678",
      bio: "I love writing",
      staus : "true"
    });

    await newUser.save();
    console.log("✅ User created successfully:", newUser);
    process.exit();
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
    process.exit(1);
  }
}
