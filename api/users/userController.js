const express = require('express')
const router = express.Router()
const User = require('./userModel')
const authVerify = require('../auth/authVerify')

router.get('/api/users', (req, res, next) => {
  User.find()
  .then(result => res.json({ message: "users readed", result: result }))
  .catch(error => res.json(error))
})

router.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(result => res.json({ message: "user readed", result: result }))
  .catch(error => res.json(error))
})

router.post('/api/users', authVerify, (req, res, next) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(result => res.json({ message: "user created", result: result }))
  .catch(error => res.json(error))
})

router.put('/api/users/:id', authVerify, (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, {new: true})
  .then(result => res.json({ message: "user updated", result: result }))
  .catch(error => res.json(error))
})

router.delete('/api/users/:id', authVerify, (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
  .then(result => res.json({ message: "user deleted", result: result }))
  .catch(error => res.json(error))
})

module.exports = router