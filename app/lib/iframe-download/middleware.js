const _ = require('lodash');
const {
  DAVINCI_USE_SECURE_COOKIES
} = require('../config');

const cookieConfiguration = {
  maxAge: 5000,
  httpOnly: false
};

if (DAVINCI_USE_SECURE_COOKIES) {
  cookieConfiguration.secure = true;
}

module.exports = (req, res, next) => {
  const ptsCookieValue = _.get(req, 'query.dvcCookieValue', null);
  if (ptsCookieValue) {
    // a cookie that last 5 seconds
    // used to check if file downloaded finished
    res.cookie(`dvcCookieValue-${ptsCookieValue}`, ptsCookieValue, cookieConfiguration);
  }
  next();
};
