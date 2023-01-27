const express = require('express')
const router = express.Router()
const {getMap, setMap, putMap, deleteMap} = require('../controllers/mapController')

router.route('/:id').get(getMap).put(putMap).delete(deleteMap)
router.route('/').post(setMap)





module.exports = router