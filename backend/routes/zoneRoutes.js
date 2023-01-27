const express = require('express')
const router = express.Router()
const {getZone, setZone, putZone, deleteZone} = require('../controllers/zoneController')
const {protectToken} = require('../middleware/authMiddlewar')

router.route('/:id').get(getZone).put(protectToken, putZone).delete(protectToken, deleteZone)
router.route('/').post(protectToken, setZone)


module.exports = router