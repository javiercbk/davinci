const patientCreateValidator = require('./patient-create-validators');
const idParamValidator = require('../../../lib/validators/id-param-validators');

const patientEditValidators = [
  idParamValidator(),
];

module.exports = patientEditValidators.concat(patientCreateValidator);
