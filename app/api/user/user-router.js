const AbstractRouter = require('../../lib/router/abstract-router');
const UserAPI = require('./user-api');
const {
  canAccessEntity,
  prependSecurityCheck
} = require('../../lib/security');
const {
  userCreateValidators,
  userEditValidators
} = require('./validators');

class UserRouter extends AbstractRouter {
  init() {
    this.router.post(
      '/',
      prependSecurityCheck({
        public: true,
        onlyPublic: true
      }, userCreateValidators),
      this.route({
        apiCall: this.genericAPICall(UserAPI, 'create')
      })
    );
    this.router.put(
      '/:_id',
      prependSecurityCheck({
        public: false,
        canAccess: canAccessEntity('User'),
      }, userEditValidators),
      this.route({
        apiCall: this.genericAPICall(UserAPI, 'edit'),
        responseHandler: function (req, res) {
          return (response) => {
            if (req.params._id.toString() === req.user._id.toString()) {
              // user updated itself, refresh the session
              req.session.user = response.user;
            }
            this.jsonResponseHandler(req, res)(response);
          };
        }
      })
    );
  }
}

const userRouter = new UserRouter();
userRouter.init();
module.exports = userRouter.router;
