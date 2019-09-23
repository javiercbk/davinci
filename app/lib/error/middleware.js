const _ = require('lodash');

const RestError = require('./index');
const {
  DAVINCI_VERSION
} = require('../config');

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next();
  }
  let message = err.message || err;
  let code = _.get(err, 'code', 500);
  req.$logger.error(message);
  if (_.get(err, 'code') === 'EBADCSRFTOKEN') {
    // authorization error
    req.$logger.debug(`CSRF failed for ${req.method} ${req.url}`);
    code = 401;
  } else if (_.isNumber(err.status) && err.status >= 300 && err.status < 600) {
    // express error
    code = err.status;
  } else if (!(err instanceof RestError)) {
    // Application error
    // Don't show the real error message if it is not a RestError
    message = 'Internal server error';
  }
  // when it is an error message, append the request id
  const result = {
    status: {
      id: req.id,
      message,
      code,
      error: true,
      version: DAVINCI_VERSION
    }
  };
  if (err && err.validationErrors) {
    result.status.validationErrors = err.validationErrors;
  }
  res.status(result.status.code).send(result);
  next();
};
