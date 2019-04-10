const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

// db setup
mongoose.connect(require('./config/db'), { useNewUrlParser: true })
  .then(res => console.log('DB connected...'))
  .catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// body parsing setup
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(require('./routes/index'))
app.use(require('./routes/users'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// // module.exports = app
app.listen(process.env.PORT || 3000, () => console.log('Server is listening...'))


