const { param } = require('express-validator/check');

const sportTranslationValidators = [
  // ISO 639-1 language
  param('lang')
    .exists()
    .trim()
    .isLength({
      min: 1,
      max: 3
    })
];

module.exports = sportTranslationValidators;
