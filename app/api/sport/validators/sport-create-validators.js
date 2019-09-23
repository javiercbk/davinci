const _ = require('lodash');
const { body } = require('express-validator/check');

const { arrayOfThings } = require('../../../lib/validators/array');
const { ISO639_1_LANGS } = require('../../../lib/validators/languages');

const measurementValidators = require('../../anthropometry/validators/measurements-validators');

const isValidSportTranslation = (v) => {
  const properValue = !_.isNil(v) && _.isObject(v);
  if (!properValue) {
    return false;
  }
  const lang = _.get(v, 'language', '');
  const translation = _.get(v, 'translation', '');
  if (lang && ISO639_1_LANGS.findIndex(l => l === lang) === -1) {
    return false;
  }
  return translation.trim().length > 0;
};

const sportCreateValidators = [
  body('name')
    .exists()
    .trim()
    .isLength({
      min: 1,
      max: 250
    }),
  body('position')
    .optional()
    .trim()
    .isLength({
      min: 1,
      max: 250
    }),
  body('gender')
    .exists()
    .isIn(['F', 'M']),
  body('translations')
    .optional()
    .custom(
      arrayOfThings({
        optional: true,
        // eslint-disable-next-line max-len
        transform: value => value.map(({ language, translation }) => ({ language, translation: translation.trim() })),
        validator: value => value.every(isValidSportTranslation),
        errorMessage: path => `${path} is not an array of sports translations`
      })
    )
].concat(measurementValidators);

module.exports = sportCreateValidators;
