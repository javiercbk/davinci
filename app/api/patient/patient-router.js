const AbstractRouter = require('../../lib/router/abstract-router');
const PatientAPI = require('../patient/patient-api');
const {
  canAccessEntity,
  prependSecurityCheck
} = require('../../lib/security');
const {
  patientCreateValidators,
  patientEditValidators,
  patientSearchValidators,
  patientRetrieveValidators
} = require('./validators');

class PatientRouter extends AbstractRouter {
  init() {
    this.router.get(
      '/',
      prependSecurityCheck({
        public: false,
        canAccess: canAccessEntity('Patient'),
      }, patientSearchValidators),
      this.route({
        apiCall: this.genericAPICall(PatientAPI, 'search')
      })
    );
    this.router.get(
      '/:_id',
      prependSecurityCheck({
        public: false,
        canAccess: canAccessEntity('Patient'),
      }, patientRetrieveValidators),
      this.route({
        apiCall: this.genericAPICall(PatientAPI, 'getById')
      })
    );
    this.router.post(
      '/',
      prependSecurityCheck({
        public: false,
        canAccess: canAccessEntity('Patient'),
      }, patientCreateValidators),
      this.route({
        apiCall: this.genericAPICall(PatientAPI, 'create')
      })
    );
    this.router.put(
      '/:_id',
      prependSecurityCheck({
        public: false,
        canAccess: canAccessEntity('Patient'),
      }, patientEditValidators),
      this.route({
        apiCall: this.genericAPICall(PatientAPI, 'edit')
      })
    );
  }
}

const patientRouter = new PatientRouter();
patientRouter.init();
module.exports = patientRouter.router;
