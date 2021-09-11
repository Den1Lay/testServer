const mongoose = require('mongoose');
const bson = require('bson');

const { Schema, model, Types } = mongoose

const dialogSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new bson.ObjectId(),
  },
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