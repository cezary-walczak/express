const express = require('express')
const router = express.Router()
const User = require('../models/user')

// read all users
router.get('/api/users', async (req, res, next) => {
  res.json(await User.find())
})
// read single issue
router.get('/api/users/:id', async (req, res, next) => {
  res.json(await User.findById(req.params.id))
})
// create issue
router.post('/api/users', async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email})
  if (user) return res.status(400).json({ message: 'User already existed' })

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  await user.save()
  res.json({
    name: user.name,
    email: user.email 
  })
})
// update single issue
router.put('/api/users/:id', async (req, res, next) => {
  res.json(await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, {new: true}))
})
// delete single issue
router.delete('/api/users/:id', async (req, res, next) => {
  res.json(await User.findByIdAndDelete(req.params.id))
})

module.exports = router
