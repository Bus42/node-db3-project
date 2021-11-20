// DO NOT CHANGE THIS FILE
const express = require('express')
const {
  checkSchemeId,
  validateScheme,
  validateStep
} = require('./scheme-middleware')
const schemes = require('./scheme-model.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    schemes.find()
      .then(schemes => res.send(schemes))
  } catch (error) {
    next(error)
  }
})

router.get('/:scheme_id', checkSchemeId, async (req, res) => {
  const { scheme_id } = req.params;
  try {
    const scheme = await schemes.findById(scheme_id)
    res.send(scheme)
  } catch (error) {
    res.status(500).send({ error })
  }
})

router.get('/:scheme_id/steps', checkSchemeId, async (req, res) => {
  const { scheme_id } = req.params

  schemes.findSteps(scheme_id)
    .then(steps => {
      res.send(steps)
    })
    .catch((error) => {
      res.status(500).send({ error })
    })
})

/*
  [POST] /api/schemes { "scheme_name": "Take Ovah" }

  response:
  {
    "scheme_id": 8,
    "scheme_name": "Take Ovah"
  }
*/
router.post('/', validateScheme, async (req, res, next) => {
  const scheme = req.body

  schemes.add(scheme)
    .then(scheme => {
      res.status(201).json(scheme)
    })
    .catch(next)
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
router.post('/:scheme_id/steps', checkSchemeId, validateStep, (req, res, next) => {
  const step = req.body
  const { scheme_id } = req.params

  schemes.addStep(scheme_id, step)
    .then(allSteps => {
      res.status(201).json(allSteps)
    })
    .catch(next)
})

router.use(async (err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    sageAdvice: 'Finding the real error is 90% of the bug fix',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router
