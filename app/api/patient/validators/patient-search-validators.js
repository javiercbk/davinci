const { query } = require('express-validator/check');

const patientSearchValidators = [
  query('term')
    .optional()
    .isLength({
      min: 1,
      max: 256
    }),
  query('limit')
    .optional()
    .isInt({
      min: 1,
      max: 10
    })
    .toInt()
];

module.exports = patientSearchValidators;
