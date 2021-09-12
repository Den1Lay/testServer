const mongoose = require('mongoose');
const { Schema, model } = mongoose

const dialogSchema = Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  // },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }, 
  partner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  poll: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const DialogModel = model('Dialog', dialogSchema);

module.exports = DialogModel;