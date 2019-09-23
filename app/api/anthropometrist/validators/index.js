const idParamValidator = require('../../../lib/validators/id-param-validators');

const {
  anthropometryCreateValidators,
  anthropometryEditValidators,
  anthropometrySearchValidators,
  anthropometryRetrieveValidators
} = require('../../anthropometry/validators');
const {
  patientCreateValidators,
  patientEditValidators,
  patientSearchValidators,
  patientRetrieveValidators
} = require('../../patient/validators');

const anthropometristIdValidator = [idParamValidator('anthropometrist')];
const aCreateValidators = anthropometristIdValidator.concat(anthropometryCreateValidators);
const aEditValidators = anthropometristIdValidator.concat(anthropometryEditValidators);
const aSearchValidators = anthropometristIdValidator.concat(anthropometrySearchValidators);
const aRetrieveValidators = anthropometristIdValidator.concat(anthropometryRetrieveValidators);
const pCreateValidators = anthropometristIdValidator.concat(patientCreateValidators);
const pEditValidators = anthropometristIdValidator.concat(patientEditValidators);
const pSearchValidators = anthropometristIdValidator.concat(patientSearchValidators);
const pRetrieveValidators = anthropometristIdValidator.concat(patientRetrieveValidators);

module.exports = {
  anthropometryCreateValidators: aCreateValidators,
  anthropometryEditValidators: aEditValidators,
  anthropometrySearchValidators: aSearchValidators,
  anthropometryRetrieveValidators: aRetrieveValidators,
  patientCreateValidators: pCreateValidators,
  patientEditValidators: pEditValidators,
  patientSearchValidators: pSearchValidators,
  patientRetrieveValidators: pRetrieveValidators
};
