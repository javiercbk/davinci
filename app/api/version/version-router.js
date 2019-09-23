const Promise = require('bluebird');

const AbstractRouter = require('../../lib/router/abstract-router');
const {
  prependSecurityCheck
} = require('../../lib/security');
const VersionAPI = require('./version-api');

class VersionRouter extends AbstractRouter {
  init() {
    this.router.get(
      '/',
      prependSecurityCheck({
        public: true,
        onlyPublic: false
      }),
      this.route({
        apiCall: this.genericAPICall(VersionAPI, 'currentVersion'),
      })
    );
  }
}

const versionRouter = new VersionRouter();
versionRouter.init();
module.exports = versionRouter.router;
