const mongoose = require('mongoose');

const { Schema, model, Types } = mongoose;

const msgSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId(),
  },
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dialog: {
    type: Schema.Types.ObjectId,
    ref: 'Dialog'
  },
  createdAt: Date,
  poll: String,
  prevPoll: String,
  nextPoll: String,
  readed: {
    type: Boolean, 
    default: false
  }
});

const Msg = model('Msg', msgSchema);

module.exports = Msg;