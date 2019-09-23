const {
  DAVINCI_VERSION
} = require('../../lib/config');

const AbstractAPI = require('../../lib/api');

class VersionAPI extends AbstractAPI {
  async currentVersion() {
    return {
      version: DAVINCI_VERSION,
    };
  }
}

module.exports = VersionAPI;
