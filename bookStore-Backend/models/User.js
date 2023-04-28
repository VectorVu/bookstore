const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  point: {
    type: Number,
    default: 0
  },
  phoneNumber: String,
  savedBooks: {
    type: Array,
    default: []
  }
}, { versionKey: false });
module.exports = mongoose.model('User', UserSchema);