const _ = require('lodash');
const http = require('http');

class RestError extends Error {
  constructor(code, options) {
    super();
    if (!code) {
      this.code = 500;
    }
    this.code = code;
    this.message = _.get(options, 'message', http.STATUS_CODES[this.code]);
    this.validationErrors = _.get(options, 'validationErrors');
  }
}

module.exports = RestError;
