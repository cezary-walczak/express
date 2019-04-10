const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

// db connection
mongoose.connect(require('./config/db'), { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(res => console.log('DB connected...'))
  .catch(err => console.log(err))

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use(require('./routes/index'))
app.use(require('./routes/issues'))
app.use(require('./routes/users'))
app.use(require('./routes/errors'))

// // module.exports = app
app.listen(process.env.PORT || 3000, () => console.log('Server is listening...'))