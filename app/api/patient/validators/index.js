const patientCreateValidators = require('./patient-create-validators');
const patientEditValidators = require('./patient-edit-validators');
const patientRetrieveValidators = require('./patient-retrieve-validators');
const patientSearchValidators = require('./patient-search-validators');

module.exports = {
  patientCreateValidators,
  patientEditValidators,
  patientRetrieveValidators,
  patientSearchValidators
};
