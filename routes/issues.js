const express = require('express')
const router = express.Router()
const Issue = require('../models/issue')

// read all issues
router.get('/api/issues', async (req, res, next) => {
  const issues = await Issue.find()
  res.json(issues)
})

// read single issue
router.get('/api/issues/:id', async (req, res, next) => {
  const issue = await Issue.findById(req.params.id)
  res.json(issue)
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
  const issue = await issueObject.save()
  res.json(issue)
})

// update single issue
router.put('/api/issues/:id', async (req, res, next) => {
  const issue = await Issue.findByIdAndUpdate(req.params.id, {
    reporter: req.body.reporter,
    assigned: req.body.assigned,
    priority: req.body.priority,
    status: req.body.status,
    summary: req.body.summary,
    description: req.body.description
  }, {new: true})
  res.json(issue)
})

// delete single issue
router.delete('/api/issues/:id', async (req, res, next) => {
  const issue = await Issue.findByIdAndDelete(req.params.id)
  res.json(issue)
})


module.exports = router
