const schemes = require('../schemes/scheme-model')
const colors = require('colors')

const checkSchemeId = async (req, res, next) => {
  const schemeId = req.params.scheme_id;
  console.log(`scheme ID: ${schemeId}`.bgCyan.black);
  const scheme = await schemes.findById(schemeId);
  if (!scheme) {
    console.log(`scheme not found: ${schemeId}`.bgRed.white);
    res.status(404).send({ message: `scheme with scheme_id ${schemeId} not found` });
  } else {
    console.log(`scheme found: ${schemeId}`.bgGreen.black);
    next();
  }
}

const validateScheme = (req, res, next) => {
  const schemeName = req.body.scheme_name;
  if (!schemeName || schemeName.length === 0 || typeof schemeName !== 'string') {
    res.status(400).send({ message: 'invalid scheme_name' });
  } else {
    next();
  }
}

const validateStep = (req, res, next) => {
  const instructions = req.body.instructions;
  const stepNumber = req.body.step_number;
  if (!instructions || instructions.length === 0 || typeof instructions !== 'string') {
    res.status(400).send({ message: 'invalid step' });
  } else if (!stepNumber || stepNumber < 1 || typeof stepNumber !== 'number') {
    res.status(400).send({ message: 'invalid step' });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep
}
