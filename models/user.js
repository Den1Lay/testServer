const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;