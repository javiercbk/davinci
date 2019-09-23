const AbstractRouter = require('../../lib/router/abstract-router');
const PatientAPI = require('../patient/patient-api');
const AnthropometryAPI = require('../anthropometry/anthropometry-api');
const {
  canAccessEntity,
  prependSecurityCheck
} = require('../../lib/security');
const {
  anthropometryCreateValidators,
  anthropometryEditValidators,
  anthropometrySearchValidators,
  anthropometryRetrieveValidators,
  patientCreateValidators,
  patientEditValidators,
  patientSearchValidators,
  patientRetrieveValidators
} = require('./validators');

class AnthropometristRouter extends AbstractRouter {
  init() {
    // patient routes
    try {
      this.router.get(
        '/:anthropometrist/patient',
        prependSecurityCheck({
          public: false,
          canAccess: canAccessEntity('Patient'),
        }, patientSearchValidators),
        this.route({
          apiCall: this.genericAPICall(PatientAPI, 'search')
        })
      );
    } catch (e) {
      console.log(e);
    }
    this.router.get(
      '/:anthropometrist/patient/:_id',
      prependSecurityCheck({
        public: false
      }, patientRetrieveValidators),
      this.route({
        apiCall: this.genericAPICall(PatientAPI, 'getById')
      })
    );
    this.router.post(
      '/:anthropometrist/patient',
      prependSecurityCheck({
        public: false
      }, patientCreateValidators),
      this.route({
        apiCall: this.genericAPICall(PatientAPI, 'create')
      })
    );
    this.router.put(
      '/:anthropometrist/patient/:_id',
      prependSecurityCheck({
        public: false
      }, patientEditValidators),
      this.route({
        apiCall: this.genericAPICall(PatientAPI, 'edit')
      })
    );
    // anthropometries
    this.router.get(
      '/:anthropometrist/anthropometry',
      prependSecurityCheck({
        public: false
      }, anthropometrySearchValidators),
      this.route({
        apiCall: this.genericAPICall(AnthropometryAPI, 'search')
      })
    );
    this.router.get(
      '/:anthropometrist/anthropometry/:_id',
      prependSecurityCheck({
        public: false
      }, anthropometryRetrieveValidators),
      this.route({
        apiCall: this.genericAPICall(AnthropometryAPI, 'getById')
      })
    );
    this.router.post(
      '/:anthropometrist/anthropometry',
      prependSecurityCheck({
        public: false
      }, anthropometryCreateValidators),
      this.route({
        apiCall: this.genericAPICall(AnthropometryAPI, 'create')
      })
    );
    this.router.put(
      '/:anthropometrist/anthropometry/:_id',
      prependSecurityCheck({
        public: false
      }, anthropometryEditValidators),
      this.route({
        apiCall: this.genericAPICall(AnthropometryAPI, 'edit')
      })
    );
  }
}

const anthropometristRouter = new AnthropometristRouter();
anthropometristRouter.init();
module.exports = anthropometristRouter.router;
