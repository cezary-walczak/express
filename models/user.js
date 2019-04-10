const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5
  },
  reporter: {
    type: Array
  },
  assigned: {
    type: Array
  }
})

module.exports = mongoose.model('User', UserSchema)