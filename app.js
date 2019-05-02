const path = require('path')
const express = require('express')

const app = express()
const db = require('./config/db');

// body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// routes
app.use(require('./api/auth/authController'))
app.use(require('./api/users/userController'))

// // module.exports = app
app.listen(process.env.PORT || 3000, () => console.log('Server is listening...'))