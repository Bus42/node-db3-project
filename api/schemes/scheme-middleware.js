const schemes = require('../schemes/scheme-model')

const checkSchemeId = (req, res, next) => {
  const schemeId = req.params.scheme_id;
  const scheme = schemes.findById(schemeId);
  if (!scheme) {
    res.status(404).json({ message: `scheme with scheme_id ${schemeId} not found` });
  } else {
    next();
  }
}

const validateScheme = (req, res, next) => {
  const schemeName = req.body.scheme_name;
  if (!schemeName || schemeName.length === 0 || typeof schemeName !== 'string') {
    res.status(400).send({ message: 'invalid scheme_name' });
  } else {
    return next();
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
    return next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep
}
