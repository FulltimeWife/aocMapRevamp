const asyncHandler = require('express-async-handler')
// Gets the current map by ID
// GET /api/map/:id
const getMap = asyncHandler(async (req, res) => {
  res.json({message: `Get String ${req.params.id}`})
})

// Sets a new map
// POST /api/map/
const setMap = asyncHandler(async (req, res) => {
  if(!req.body.message) {
    res.status(400)
    throw new Error ('No message')
  }
  res.json({message: 'Set String'})
})

// Updates a map
// PUT /api/map/:id
const putMap = asyncHandler(async (req, res) => {
  res.json({message: `Update string ${req.params.id}`})
})

// Deletes a map
// DELETE /api/map/:id
const deleteMap = asyncHandler(async (req, res) => {
  res.json({message: `Delete string ${req.params.id}`})
})

module.exports = {
  getMap,
  setMap,
  putMap,
  deleteMap
}