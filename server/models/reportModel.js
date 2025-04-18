const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "harrasment or bullying",
      "hate speech",
      "fake account",
      "inappropriate content",
      "scam or fraud",
      "misinformation",
      "stolen content",
      "other"
    ],
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "opened", "closed"],
    default: "opened"
  },
  userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // This tells Mongoose to reference the 'User' model
        },
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
