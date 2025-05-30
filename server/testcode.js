const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const User = require("./models/userModel"); // Adjust path if needed

mongoose.connect("mongodb+srv://nextverse101:n3dblQlCnV63uvZU@cluster0.hhv6f.mongodb.net/litenoteDB").then(() => {
  console.log("MongoDB connected.");
  createUser();
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

async function createUser() {
  const hashedPassword = await bcrypt.hash("Password123$", 10);
  try {
    const newUser = new User({
      username: "Laquisha_Pudz",
      email: "laquisha.pudz009@gmail.com",
      password: hashedPassword,
      mobile: "08123212348",
      bio: "I love writing",
      verification : false,
      role : "admin",
      picture: "https://res.cloudinary.com/doctr0fct/image/upload/v1730507537/Avatars/11475225_sgqvqs.jpg",
      status: true
    });

    await newUser.save();
    console.log("✅ User created successfully:", newUser);
    process.exit();
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
    process.exit(1);
  }
}
