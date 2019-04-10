const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  reporter: {
    type: String,
    required: true,
    maxlength: 255
  },
  assigned: {
    type: String,
    maxlength: 255
  },

  priority: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
  }
})

module.exports = mongoose.model('User', UserSchema)