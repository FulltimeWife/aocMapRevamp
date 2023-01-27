const asyncHandler = require('express-async-handler')
const MapMarker = require('../models/mapMarkerModel')
const User = require('../models/userModel')
const userRoles = require('../constants/userRoles')

const setMapMarker = asyncHandler(async (req, res) => {
  const newMarker = new MapMarker({
    coordinates: {}
  })
  newMarker.name = req.body.name
  newMarker.zone = req.body.zone
  newMarker.subzone = req.body.subzone
  newMarker.type = req.body.type
  newMarker.coordinates.set('x', req.body.coordinates.x)
  newMarker.coordinates.set('y', req.body.coordinates.y)
  newMarker.save()

  res.status(200).json(newMarker)
})

const updateMapMarker = asyncHandler(async (req, res) => {
  const marker = await MapMarker.findOne({_id: req.params.id})
  if(!marker) {
    res.status(400)
    throw new Error('Map marker not found')
  }

  const updatedMapMarker = await MapMarker.findByIdAndUpdate(req.params.id, req.body, {
    coordinates: req.body.coordinates,
    new: true
  })
  res.status(200).json(updatedMapMarker)
})

const deleteMapMarker = asyncHandler(async (req, res) => {
  const marker = await MapMarker.findOne({_id: req.params.id})
  if(!marker) {
    res.status(400)
    throw new Error ('Map marker now found')
  }
  await marker.remove()
  res.status(200).json({id: req.params.id})
})

const deleteAllMapMarkers = asyncHandler(async (req, res) => {
  await MapMarker.deleteMany({zone: req.params.id})
  res.status(200).json({message: `All markers in zone ${req.params.id} are now deleted`})
})


module.exports = {
  setMapMarker,
  updateMapMarker,
  deleteMapMarker,
  deleteAllMapMarkers
}
