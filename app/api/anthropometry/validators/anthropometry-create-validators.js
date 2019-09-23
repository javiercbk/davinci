const { body } = require('express-validator/check');

const { toMoment, toObjectId } = require('../../../lib/validators/sanitizers');
const measurementValidators = require('./measurements-validators');

const anthropometryCreateValidators = [
  body('measurementDate').customSanitizer(
    toMoment({
      exists: false
    })
  ),
  body('errorPercent')
    .isInt({
      min: 0,
      max: 100
    })
    .optional(),
  body('patient._id')
    .isMongoId()
    .customSanitizer(toObjectId)
    .optional()
].concat(measurementValidators);

module.exports = anthropometryCreateValidators;
