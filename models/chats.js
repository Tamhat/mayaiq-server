// story.model.js

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  chat: {
    type: Array,
  },
  buyerName: {type: String},
  sellerName: {type: String},
  SellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Chat = mongoose.model('chats', chatSchema);

module.exports = Chat;
