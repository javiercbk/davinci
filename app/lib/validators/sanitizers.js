const _ = require('lodash');
const {
  Types: {
    ObjectId
  }
} = require('mongoose');
const moment = require('moment');

const escapeRegExp = function (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

const toMoment = options => (value) => {
  const exist = _.get(options, 'exists', false);
  if (!value && !exist) {
    return null;
  }
  const parseFormat = _.get(options, 'format', moment.ISO_8601);
  const parsedDate = moment(value, parseFormat, true);
  if (parsedDate.isValid()) {
    return parsedDate;
  }
  throw new Error('Value is not an ISO 8601');
};

const toSanitizedRegExp = (value) => {
  if (value) {
    return escapeRegExp(value);
  }
  return value;
};

const toObjectId = function (value) {
  try {
    return new ObjectId(value);
  } catch (e) {
    return value;
  }
};

module.exports = {
  escapeRegExp,
  toObjectId,
  toMoment,
  toSanitizedRegExp
};
