const modelWrapperFactory = require('./model-wrapper-factory');

class UserSchemaWrapper {
  constructor(user, schema, logger) {
    this._user = user;
    this.schema = schema;
    this.logger = logger;
    this._wrap();
  }

  _wrap() {
    Object.keys(this.schema).forEach((model) => {
      this[model] = modelWrapperFactory(this._user, this.schema[model], this.logger);
    });
  }
}

module.exports = UserSchemaWrapper;
