const env = require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose');

const app = express()

//  db connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
.then(res => console.log('DB connected...'))
.catch(err => console.log(err))

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