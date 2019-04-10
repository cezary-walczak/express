const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

// // read all users
// router.get('/api/auth', async (req, res, next) => {
//   res.json(await User.find())
// })
// // read single issue
// router.get('/api/auth/:id', async (req, res, next) => {
//   res.json(await User.findById(req.params.id))
// })
// create issue
router.post('/api/auth', async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email})
  if (!user) return res.status(400).json({ message: 'Invalid email or password' })

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' })

  res.json({ jwt: user.generateAuthToken() })
  // res.json({
  //   name: user.name,
  //   email: user.email 
  // })
})
// // update single issue
// router.put('/api/auth/:id', async (req, res, next) => {
//   res.json(await User.findByIdAndUpdate(req.params.id, {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   }, {new: true}))
// })
// // delete single issue
// router.delete('/api/auth/:id', async (req, res, next) => {
//   res.json(await User.findByIdAndDelete(req.params.id))
// })

module.exports = router
