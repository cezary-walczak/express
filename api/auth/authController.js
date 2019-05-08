const express = require('express')
const router = express.Router()

const User = require('../users/userModel')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/api/auth', (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) return res.json({ auth: false, message: 'Email zarezerwowany' })
    // if user not exist hash password
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // store new user in db
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      })
      .then(result => res.json({ auth: true, message: 'Poprawnie zarejestrowano' }))
      .catch(error => res.json(error))
    })
    .catch(error => res.json(error))
    // 
  })
  .catch(error => res.json(error))
})

router.get('/api/auth', (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) return res.json({ auth: false, message: 'Niepoprawny email', token: null })
    // if user exist compare passwords
    bcrypt.compare(req.body.password, user.password)
    .then(result => {
      if (!result) return res.json({ auth: false, message: 'Niepoprawne hasło', token: null })
      // if password is OK send auth-token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 })
      res.header('Authorization', 'Bearer ' + token).json({ auth: true, message: 'Poprawnie zalogowano', token: token })
    })
    .catch(error => res.json(error))
    // 
  })
  .catch(error => res.json(error))
})

module.exports = router