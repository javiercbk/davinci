const {
  body
} = require('express-validator/check');
const idParamValidator = require('../../../lib/validators/id-param-validators');

const userEditValidators = [
  idParamValidator(),
  body('email').isLength({
    max: 256
  }).isEmail().trim(),
  body('firstName').exists().isLength({
    max: 150
  }),
  body('lastName').exists().isLength({
    max: 150
  }),
  body('password').isLength({
    min: 5,
    max: 256
  }).optional(),
  body('oldPassword', 'oldPassword field must be passed when password param is present').isLength({
    max: 256
  }).custom((oldPassword, {
    req
  }) => {
    if ((oldPassword && !req.body.password) || (!oldPassword && req.body.password)) {
      return false;
    }
    return true;
  })
];

module.exports = userEditValidators;
