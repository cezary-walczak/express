const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

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

UserSchema.methods.generateAuthToken = function() { // can't use arrow cause of 'this'
  return jwt.sign({ _id: this._id, email: this.email }, this.password)
}

module.exports = mongoose.model('User', UserSchema)