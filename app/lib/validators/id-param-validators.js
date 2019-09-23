const {
  param
} = require('express-validator/check');
const {
  toObjectId
} = require('./sanitizers');

const idParamValidator = (id = '_id', optional = false) => {
  let validator = param(id);
  if (optional) {
    validator = validator.optional();
  }
  validator = validator.isMongoId().customSanitizer(toObjectId);
  return validator;
};

module.exports = idParamValidator;
