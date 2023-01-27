const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protectToken = asyncHandler(async(req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decodedToken.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('You are not authorised to see this')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Token not authorised')
  }
})

module.exports = {
  protectToken
}