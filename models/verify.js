// story.model.js
const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
  code: {
    type: String, // Assuming the code is a string
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1h' }, // TTL index for automatic deletion after 1 hour
  },
});

const Verify = mongoose.model('verify', verifySchema);

module.exports = Verify;
