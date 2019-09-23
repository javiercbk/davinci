const AbstractRouter = require('../../lib/router/abstract-router');
const AnthropometryAPI = require('../anthropometry/anthropometry-api');
const { canAccessEntity, prependSecurityCheck } = require('../../lib/security');
const {
  anthropometryCreateValidators,
  anthropometryEditValidators,
  anthropometrySearchValidators,
  anthropometryRetrieveValidators
} = require('./validators');

class AnthropometryRouter extends AbstractRouter {
  init() {
    this.router.get(
      '/',
      prependSecurityCheck(
        {
          public: false,
          canAccess: canAccessEntity('Anthropometry')
        },
        anthropometrySearchValidators
      ),
      this.route({
        apiCall: this.genericAPICall(AnthropometryAPI, 'search')
      })
    );
    this.router.get(
      '/:_id',
      prependSecurityCheck(
        {
          public: false,
          canAccess: canAccessEntity('Anthropometry')
        },
        anthropometryRetrieveValidators
      ),
      this.route({
        apiCall: this.genericAPICall(AnthropometryAPI, 'getById')
      })
    );
    this.router.post(
      '/',
      prependSecurityCheck(
        {
          public: false,
          canAccess: canAccessEntity('Anthropometry')
        },
        anthropometryCreateValidators
      ),
      this.route({
        apiCall: this.genericAPICall(AnthropometryAPI, 'create')
      })
    );
    this.router.put(
      '/:_id',
      prependSecurityCheck(
        {
          public: false,
          canAccess: canAccessEntity('Anthropometry')
        },
        anthropometryEditValidators
      ),
      this.route({
        apiCall: this.genericAPICall(AnthropometryAPI, 'edit')
      })
    );
  }
}

const anthropometryRouter = new AnthropometryRouter();
anthropometryRouter.init();
module.exports = anthropometryRouter.router;
