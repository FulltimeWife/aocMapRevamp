const express = require('express')
const router = express.Router()
const {createUser, loginUser, getUser} = require('../controllers/userController')
const {protectToken} = require('../middleware/authMiddlewar')

router.post('/register/', createUser)
router.post('/login/', loginUser)
router.get('/profile/', protectToken, getUser)

module.exports = router