const mongoose = require('mongoose');

const { Schema, model } = mongoose

const dialogSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }, 
  partner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  poll: String,
  createdAt: Date,
});

const DialogModel = model('Dialog', dialogSchema);

module.exports = DialogModel;