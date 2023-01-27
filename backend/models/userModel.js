const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    unique: [true, 'Username already taken']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password']
  },
  role: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0
  }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)