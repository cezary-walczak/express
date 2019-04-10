const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

// read all ussers
router.get('/api/users', async (req, res, next) => {
  res.json(await User.find())
})
// read single user
router.get('/api/users/:id', async (req, res, next) => {
  res.json(await User.findById(req.params.id))
})
// create user
router.post('/api/users', async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email})
  if (user) return res.status(400).json({ message: 'User already existed' })

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10))
  
  // res.json(await user.save())
  res.header('x-auth-token', user.generateAuthToken()).json({
    name: user.name,
    email: user.email 
  })
})
// update single user
router.put('/api/users/:id', async (req, res, next) => {
  res.json(await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, {new: true}))
})
// delete single user
router.delete('/api/users/:id', async (req, res, next) => {
  res.json(await User.findByIdAndDelete(req.params.id))
})

module.exports = router
