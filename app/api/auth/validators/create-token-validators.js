const {
  body
} = require('express-validator/check');

const validatorMiddleware = [
  body('email').isLength({
    max: 256
  }).isEmail().trim(),
  body('password', 'passwords must be at least 5 chars long').isLength({
    min: 5,
    max: 256,
  })
];

module.exports = validatorMiddleware;
