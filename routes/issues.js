const express = require('express')
const router = express.Router()
const Issue = require('../models/issue')

// read all issues
router.get('/api/issues', (req, res, next) => {
  Issue.find()
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

// read single issue
router.get('/api/issues/:id', (req, res, next) => {
  Issue.findById(req.params.id)
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

// create issue
router.post('/api/issues', (req, res, next) => {
  const issueObject = new Issue({
    reporter: req.body.reporter,
    assigned: req.body.assigned,
    priority: req.body.priority,
    status: req.body.status,
    summary: req.body.summary,
    description: req.body.description
  })
  issueObject.save()
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

// update single issue
router.put('/api/issues/:id', (req, res, next) => {
  Issue.findByIdAndUpdate(req.params.id, {
    reporter: req.body.reporter,
    assigned: req.body.assigned,
    priority: req.body.priority,
    status: req.body.status,
    summary: req.body.summary,
    description: req.body.description
  }, {new: true})
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

// delete single issue
router.delete('/api/issues/:id', (req, res, next) => {
  Issue.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(error => res.json(error))
})


module.exports = router
