const express = require('express')
const router = express.Router()
const Issue = require('../models/issue')

// read all issues
router.get('/api/issues', async (req, res, next) => {
  res.json(await Issue.find())
})
// read single issue
router.get('/api/issues/:id', async (req, res, next) => {
  res.json(await Issue.findById(req.params.id))
})
// create issue
router.post('/api/issues', async (req, res, next) => {
  const issueObject = new Issue({
    reporter: req.body.reporter,
    assigned: req.body.assigned,
    priority: req.body.priority,
    status: req.body.status,
    summary: req.body.summary,
    description: req.body.description
  })
  res.json(await issueObject.save())
})
// update single issue
router.put('/api/issues/:id', async (req, res, next) => {
  res.json(await Issue.findByIdAndUpdate(req.params.id, {
    reporter: req.body.reporter,
    assigned: req.body.assigned,
    priority: req.body.priority,
    status: req.body.status,
    summary: req.body.summary,
    description: req.body.description
  }, {new: true}))
})
// delete single issue
router.delete('/api/issues/:id', async (req, res, next) => {
  res.json(await Issue.findByIdAndDelete(req.params.id))
})

module.exports = router