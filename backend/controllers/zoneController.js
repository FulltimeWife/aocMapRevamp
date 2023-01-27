const asyncHandler = require('express-async-handler')
var ObjectId = require('mongoose').Types.ObjectId
const Zone = require('../models/zoneModel')
const User = require('../models/userModel')
const MapMarker = require('../models/mapMarkerModel')

// Gets the current map by ID
// GET /api/map/:id
const getZone = asyncHandler(async (req, res) => {
  console.log(`The req.params.id is: ${req.params.id}`)
  let zone;
  if(ObjectId.isValid(req.params.id)) {
    zone = await Zone.find({_id: req.params.id})
  } else {
    zone = await Zone.find({name: req.params.id})
  }

  if(!zone) {
    res.status(400)
    throw new Error ('Zone not found')
  }
  const zoneMarkers = await MapMarker.find({ zone: zone})
  res.status(200).json(zoneMarkers)
})

// Sets a new map
// POST /api/map/
const setZone = asyncHandler(async (req, res) => {
  const {name} = req.body
  if(!name) {
    res.status(400)
    throw new Error('Please provide the name of the Zone')
  }
  const checkZone = await Zone.findOne({name})

  if (checkZone) {
    res.status(400)
    throw new Error('Zone already exists')
  }

  const newZone = await Zone.create({
    name,
    owner: req.user.id
  })

  if (newZone) {
    res.status(201).json({
      _id: newZone._id,
      name: newZone.name,
      owner: req.user.id
    })
  } else {
    res.status(400)
    throw new Error('Invalid zone data')
  }
})

// Updates a map
// PUT /api/map/:id
const putZone = asyncHandler(async (req, res) => {
  const zone = await Zone.findOne({name: req.params.id})

  if(!zone) {
    res.status(400)
    throw new Error('Zone not found')
  }

  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User does not exist')
  }

  if(zone.owner.toString() !== user.id) {
    res.status(401)
    throw new Error('This is not your zone')
  }

  let updatedZone = await Zone.findOneAndUpdate(req.params.id, req.body, {
    name: req.body.name,
    new: true
  })

  res.status(200).json(updatedZone)
})

// Deletes a map
// DELETE /api/map/:id
const deleteZone = asyncHandler(async (req, res) => {
  const zone = await Zone.findOne({name: req.params.id})

  if(!zone) {
    res.status(400)
    throw new Error('Zone not found')
  }

  await zone.remove()
  res.status(200).json(`Removed zone: ${req.params.id}`)
})

module.exports = {
  getZone,
  setZone,
  putZone,
  deleteZone
}