const mongoose = require('mongoose');

const mapMarkerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name of the Map Marker']
  },
  coordinates: {
    type: Map,
    of: Number,
    required: [true, 'Please provide the coordinates']
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
    ref: 'zones'
  },
  subzone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'zones'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  type: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6],
    default: 0
  }
})

module.exports = mongoose.model('MapMarker', mapMarkerSchema, 'markers')