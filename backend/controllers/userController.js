const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const createUser = asyncHandler(async (req, res) => {
  const {username, password, role} = req.body
  if(!username || !password) {
    res.status(400)
    throw new Error('Missing username or password')
  }

  const checkUser = await User.findOne({name: username})
  if(checkUser) {
    res.status(400) 
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    username: username,
    password: hashedPassword,
    role,
  })

  if(newUser) {
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      token: generateToken(newUser._id),
      role: newUser.role
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({username})

  if(user &&(await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const getUser = asyncHandler(async (req, res) => {
  const {_id, username} = await User.findById(req.user.id)

  res.status(200).json({
    _id: _id,
    username
  })
})

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  createUser,
  loginUser,
  getUser
}