const mongoose = require('mongoose')

const zoneSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please provide the name of the Zone']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
})

module.exports = mongoose.model('Zone', zoneSchema)