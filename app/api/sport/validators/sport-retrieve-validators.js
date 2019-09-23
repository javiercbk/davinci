const idParamValidator = require('../../../lib/validators/id-param-validators');

const sportRetrieveValidators = [idParamValidator()];

module.exports = sportRetrieveValidators;
