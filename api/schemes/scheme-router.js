// DO NOT CHANGE THIS FILE
const express = require('express')
const {
  checkSchemeId,
  validateScheme,
  validateStep
} = require('./scheme-middleware')
const schemes = require('./scheme-model.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    schemes.find()
      .then(schemes => res.status(200).send(schemes))
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:scheme_id', checkSchemeId, async (req, res) => {
  const { scheme_id } = req.params;
  try {
    const scheme = await schemes.findById(scheme_id)
    res.status(200).send(scheme)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:scheme_id/steps', checkSchemeId, async (req, res) => {
  const { scheme_id } = req.params

  schemes.findSteps(scheme_id)
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/', validateScheme, async (req, res) => {
  const scheme = req.body

  schemes.add(scheme)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(error => res.status(500).send(error))
})

/*
  [POST] /api/schemes/5/steps { "instructions": "and yet more questing", "step_number": 2 }

  response:
  [
    {
      "step_id": 12,
      "step_number": 1,
      "instructions": "quest and quest some more",
      "scheme_name": "Find the Holy Grail"
    },
    {
      "step_id": 17,
      "step_number": 2,
      "instructions": "and yet more questing",
      "scheme_name": "Find the Holy Grail"
    }
  ]
*/
router.post('/:scheme_id/steps', checkSchemeId, validateStep, async (req, res) => {
  const step = req.body
  const { scheme_id } = req.params
  schemes.addStep({ ...step, scheme_id })
    .then((response) => {
      res.status(201).send(response)
    })
    .catch(error => res.status(500).send({ error }))
})

router.use(async (err, req, res) => { // eslint-disable-line
  res.status(err.status || 500).json({
    sageAdvice: 'Finding the real error is 90% of the bug fix',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router
