const { query } = require('express-validator/check');

const sportSearchValidators = [
  query('term')
    .optional()
    .isLength({
      min: 1,
      max: 250
    }),
  query('gender')
    .exists()
    .isIn(['F', 'M'])
    .optional(),
  query('limit')
    .optional()
    .isInt({
      min: 1,
      max: 10
    })
];

module.exports = sportSearchValidators;
