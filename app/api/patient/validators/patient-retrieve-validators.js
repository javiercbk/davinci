const idParamValidator = require('../../../lib/validators/id-param-validators');

const patientRetrieveValidators = [idParamValidator()];

module.exports = patientRetrieveValidators;
