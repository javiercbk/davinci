const Promise = require('bluebird');

const AbstractRouter = require('../../lib/router/abstract-router');
const {
  securityCheck,
  prependSecurityCheck
} = require('../../lib/security');
const RestError = require('../../lib/error');
const AuthAPI = require('./auth-api');

const {
  createTokenValidators
} = require('./validators');

/**
 * Destroys the user's session
 * @param {Object} request Express' request object.
 * @returns {Promise} resolved when the session is destroyed.
 */
const destroySession = request => new Promise((resolve, reject) => {
  request.session.destroy((err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

class AuthRouter extends AbstractRouter {
  init() {
    this.router.post(
      '/',
      prependSecurityCheck({
        public: true,
        onlyPublic: true
      }, createTokenValidators),
      this.route({
        apiCall: this.genericAPICall(AuthAPI, 'authenticate'),
        responseHandler: function (req, res) {
          return (sessionData) => {
            req.session.user = sessionData;
            const csrfToken = req.csrfToken();
            req.session.save();
            this.jsonResponseHandler(req, res)({
              user: sessionData,
              csrfToken
            });
          };
        },
        responseSchema: {
          status: {
            code: 'int32',
            message: 'string',
            error: 'bool',
            version: 'string'
          },
          data: {
            user: {
              _id: 'string',
            },
            csrfToken: 'string',
          }
        },
        produces: 'application/json',
        consumes: 'application/json'
      })
    );
    this.router.get(
      '/current',
      prependSecurityCheck({
        public: false,
        onlyPublic: false
      }),
      this.route({
        apiCall: this.genericAPICall(AuthAPI, 'currentUser'),
      })
    );
    this.router.post(
      '/logout',
      securityCheck(),
      this.route({
        apiCall: this.genericAPICall(AuthAPI, 'logout'),
        responseHandler: function (req, res) {
          return () => {
            destroySession(req).then(() => {
              res.status(204).send();
            }).catch((err) => {
              const message = err.message || err;
              req.$logger.error(`Error destroying session" ${message}`);
              throw new RestError(500, {
                message: 'Error destroying session'
              });
            });
          };
        }
      })
    );
  }
}

const authRouter = new AuthRouter();
authRouter.init();
module.exports = authRouter.router;
