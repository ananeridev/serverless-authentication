const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // only for test purpose
});

module.exports = mongoose.model('User', UserSchema);