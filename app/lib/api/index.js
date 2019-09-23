const _ = require('lodash');
const {
  Types: {
    ObjectId
  }
} = require('mongoose');

const schemas = require('../db/schemas');
const UserSchemaWrapper = require('../db/schema-wrapper');

const logger = require('../log/logger');

const nullObjectId = ({
  equals() {
    return false;
  }
});

class AbstractAPI {
  constructor(options) {
    this.logger = _.get(options, 'logger', logger);
    this.user = _.get(options, 'user');
    this.config = _.get(options, 'config');
    this.db = _.get(options, 'db');
    this.remoteAddress = _.get(options, 'remoteAddress');
    if (options.schema) {
      this.schema = options.schema;
    } else if (this.user) {
      this.schema = new UserSchemaWrapper(this.user, schemas, this.logger);
    } else {
      this.schema = schemas;
    }
  }

  get currentUserId() {
    if (this.user && this.user._id) {
      return new ObjectId(this.user._id);
    }
    return nullObjectId();
  }
}

module.exports = AbstractAPI;
