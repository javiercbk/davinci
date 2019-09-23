const {
  body
} = require('express-validator/check');

const userQueryValidators = [
  body('email').exists().isLength({
    max: 256
  }).isEmail()
  // eslint-disable-next-line
  .trim(),
  body('firstName').exists().isLength({
    max: 150
  }).trim(),
  body('lastName').exists().isLength({
    max: 150
  }).trim(),
  body('password').exists().isLength({
    min: 5,
    max: 256
  }),
  body('recaptcha').exists().isLength({
    min: 1,
    max: 2048
  })
];

module.exports = userQueryValidators;
