const express = require('express')
const router = express.Router()
const {
  setMapMarker,
  updateMapMarker,
  deleteMapMarker,
  deleteAllMapMarkers
} = require('../controllers/mapMarkerController')
const {protectToken} = require('../middleware/authMiddlewar')

router.route('/').post(setMapMarker)
router.route('/:id').put(updateMapMarker, protectToken).delete(deleteMapMarker)
router.route('/purge/:id').delete(deleteAllMapMarkers)

module.exports = router