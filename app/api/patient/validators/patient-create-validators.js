const _ = require('lodash');
const {
  Types: { ObjectId }
} = require('mongoose');
const { body } = require('express-validator/check');
const { arrayOfThings } = require('../../../lib/validators/array');
const { toMoment } = require('../../../lib/validators/sanitizers');
const { countriesISO } = require('../../../lib/validators/countries');

const isValidSportElement = v => !_.isNil(v) && _.isObject(v) && ObjectId.isValid(v.sport);

const patientCreateValidators = [
  body('email')
    .optional()
    .trim()
    .isLength({
      max: 256
    })
    // eslint-disable-next-line
    .isEmail(),
  body('firstName')
    .exists()
    .trim()
    .isLength({
      min: 1,
      max: 150
    }),
  body('lastName')
    .exists()
    .trim()
    .isLength({
      min: 1,
      max: 150
    }),
  body('personalId')
    .optional()
    .trim()
    .isLength({
      min: 1,
      max: 256
    }),
  body('birthDate').customSanitizer(
    toMoment({
      exists: true
    })
  ),
  body('gender')
    .exists()
    .isIn(['F', 'M']),
  body('countryOfOrigin')
    .optional()
    .isIn(countriesISO),
  body('sports')
    .optional()
    .custom(
      arrayOfThings({
        optional: true,
        transform: value => value.map(v => ({ sport: new ObjectId(v.sport) })),
        validator: value => value.every(isValidSportElement),
        errorMessage: path => `${path} is not an object array with a sport property`
      })
    ),
  body('activityLevel')
    .optional()
    .isInt({
      min: -1,
      max: 4
    })
];

module.exports = patientCreateValidators;
