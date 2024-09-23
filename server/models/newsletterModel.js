const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: [String], // Array of categories the user is subscribed to
    enum: [
'adventure',
'romance',
'fiction',
'nonFiction', 
'liteNoteUpdates', 
"weeklyUpdates"
], // Limit the options to these categories
    default: [] // Default to an empty array if no subscription is chosen
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps : true
}
);

const Newsletter = mongoose.model('Newsletter', newsletterSchema);
module.exports = Newsletter;
