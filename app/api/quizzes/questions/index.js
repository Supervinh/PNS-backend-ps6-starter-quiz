const { Router } = require('express')

const { Question } = require('../../../models')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200).json(Question.get().filter((e) => e.quizId === req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    console.log(req.params.questionId)
    res.status(200).json(Question.getById(req.params.questionId).filter((e) => e.quizId === req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const question = Question.create({ ...req.body, quizId: parseInt(req.params.quizId, 10) })
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    const id = parseInt(req.params.questionId, 10)
    const questionToDelete = Question.get().filter((q) => q.id === id).filter((e) => e.quizId === req.params.quizId)
    Question.delete(id)
    res.status(200).json(questionToDelete)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.update(req.params.questionId, req.body).filter(e => e.quizId === req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router
