const _ = require('lodash');
const moment = require('moment');

const logger = require('./logger');

/**
 * Appends a logger to the request that contains the request context.
 * @param {object} options optional middleware options
 * @param {object} options.logLevel optional functional that returns the log level string.
 *  application configuration module interface.
 */
module.exports = options => (req, res, next) => {
  const timestamp = moment()
    .utc()
    .toDate();
  // default log level is debug
  // const logLevel = _.get(options, 'logLevel', 'info');
  req.$logger = logger.child({
    id: req.id,
    timestamp,
    type: 'request',
    user: {
      _id: _.get(req, 'user._id')
    },
  })
  next();
};
