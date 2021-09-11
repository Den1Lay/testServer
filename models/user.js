const mongoose = require('mongoose');
const uuid = require('uuid')

const { Schema, model, Types } = mongoose;

const userSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: Types.ObjectId(),
  },
  loginName: String,
  nickName: String,
  password: String,
  last_seen: Date, 
  confirmed: Boolean,
  registrateDate: Date,
  online: {
    type: Boolean,
    default: true
  }
});

const UserModel = model('User', userSchema);

module.exports = UserModel;