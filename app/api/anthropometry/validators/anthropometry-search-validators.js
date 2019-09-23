const { query } = require('express-validator/check');
const { toMoment, toObjectId } = require('../../../lib/validators/sanitizers');

const anthropometrySearchValidators = [
  query('from')
    .optional()
    .customSanitizer(
      toMoment({
        format: 'YYYY-MM-DD'
      })
    ),
  query('to')
    .optional()
    .customSanitizer(
      toMoment({
        format: 'YYYY-MM-DD'
      })
    ),
  query('fields')
    .optional()
    .isLength({
      max: 1024
    }),
  query('patient')
    .optional()
    .isMongoId()
    .customSanitizer(toObjectId),
  query('limit')
    .optional()
    .isInt({
      min: 1,
      max: 50
    })
    .toInt()
];

module.exports = anthropometrySearchValidators;
