const { query } = require('express-validator/check');

const userQueryValidators = [
  query('email')
    .optional()
    .trim(),
  query('name')
    .optional()
    .trim()
];

module.exports = userQueryValidators;
