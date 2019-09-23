const AbstractRouter = require('../../lib/router/abstract-router');
const SportAPI = require('../sport/sport-api');
const { canAccessEntity, prependSecurityCheck } = require('../../lib/security');
const {
  allSportsTranslationValidators,
  sportCreateValidators,
  sportEditValidators,
  sportSearchValidators,
  sportRetrieveValidators,
  sportTranslationValidators
} = require('./validators');

class SportRouter extends AbstractRouter {
  init() {
    this.router.get(
      '/translations/:lang',
      prependSecurityCheck(
        {
          public: true,
          onlyPublic: false
        },
        allSportsTranslationValidators
      ),
      this.route({
        apiCall: this.genericAPICall(SportAPI, 'allSportsTranslations'),
        responseHandler: function (req, res) {
          return (sportTranslations) => {
            res.status(200).json(sportTranslations);
          };
        }
      })
    );
    this.router.get(
      '/:_id/translations',
      prependSecurityCheck(
        {
          public: true,
          onlyPublic: false
        },
        sportTranslationValidators
      ),
      this.route({
        apiCall: this.genericAPICall(SportAPI, 'sportTranslations')
      })
    );
    this.router.get(
      '/',
      prependSecurityCheck(
        {
          public: false,
          canAccess: canAccessEntity('Sport')
        },
        sportSearchValidators
      ),
      this.route({
        apiCall: this.genericAPICall(SportAPI, 'search')
      })
    );
    this.router.get(
      '/:_id',
      prependSecurityCheck(
        {
          public: false,
          canAccess: canAccessEntity('Sport')
        },
        sportRetrieveValidators
      ),
      this.route({
        apiCall: this.genericAPICall(SportAPI, 'getById')
      })
    );
    this.router.post(
      '/',
      prependSecurityCheck(
        {
          public: false,
          canAccess: canAccessEntity('Sport', 'manage')
        },
        sportCreateValidators
      ),
      this.route({
        apiCall: this.genericAPICall(SportAPI, 'create')
      })
    );
    this.router.put(
      '/:_id',
      prependSecurityCheck(
        {
          public: false,
          canAccess: canAccessEntity('Sport', 'manage')
        },
        sportEditValidators
      ),
      this.route({
        apiCall: this.genericAPICall(SportAPI, 'edit')
      })
    );
  }
}

const sportRouter = new SportRouter();
sportRouter.init();
module.exports = sportRouter.router;
