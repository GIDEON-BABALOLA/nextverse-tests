const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  goal: {
    type: String, // e.g., 'write_stories'
    enum: ['write_stories', 'read_stories', 'comment', 'like', 'custom'],
    required: true
  },
  targetCount: {
    type: Number, // e.g., 5 stories
    required: true
  },
  timeFrame: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'custom'],
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date, // optional for open challenges
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // null if system-created
  },
  isActive: {
    type: Boolean,
    default: true
  },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    joinedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completedAt: Date,
    isWinner: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
