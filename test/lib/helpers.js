const _ = require('lodash');
const moment = require('moment');
const { Types: { ObjectId } } = require('mongoose');
const UserSchemaWrapper = require('../../app/lib/db/schema-wrapper');
const {
  getUserAbilities
} = require('../../app/lib/user-abilities');
const config = require('../../app/lib/config');
const nullLogger = require('../../app/lib/log/null-logger');

const apiOptions = (schema, user, altOptions) => {
  let clone = _.cloneDeep(user);
  if (user && user.__v !== undefined) {
    clone = user.toJSON();
  }
  clone = Object.assign({
    _id: new ObjectId(),
    roles: ['User_read_own', 'Anthropometry_read_own', 'Patient_read_own', 'Sport_read_all']
  }, clone);
  const options = Object.assign({}, {
    user: clone,
    logger: nullLogger,
    config: config,
    remoteAddress: '127.0.0.1',
    schema: new UserSchemaWrapper(clone, schema, nullLogger)
  }, altOptions);
  options.user.abilities = getUserAbilities(clone);
  return options;
};

const noUserApiOptions = (schema, altOptions) => Object.assign({}, {
  logger: nullLogger,
  config: config,
  remoteAddress: '127.0.0.1',
  schema: new UserSchemaWrapper(null, schema, nullLogger)
}, altOptions);

const _compareObjectKeyFactory = (object, testData) => (key) => {
  const toCompare = object[key];
  const comparison = testData[key];
  if (typeof toCompare !== typeof comparison) {
    console.log(key);
  }
  expect(typeof toCompare).toEqual(typeof comparison);
  if (Array.isArray(toCompare)) {
    expect(Array.isArray(comparison)).toBeTruthy();
    expect(toCompare).toEqual(comparison);
  } else if (toCompare instanceof Date) {
    expect(moment(toCompare).isSame(moment(comparison))).toBeTruthy();
  } else if (toCompare instanceof ObjectId) {
    expect(toCompare.equals(comparison)).toBeTruthy();
  } else if (_.get(object, `${key}._id`)) {
    expect(toCompare._id.equals(comparison._id)).toBeTruthy();
  } else if (moment.isMoment(toCompare)) {
    expect(toCompare.isSame(comparison)).toBeTruthy();
  } else {
    expect(toCompare).toEqual(comparison);
  }
};

const compareDBObject = (object, testData) => {
  const comparer = _compareObjectKeyFactory(object, testData);
  Object.keys(testData).forEach(comparer);
};

module.exports = {
  apiOptions,
  compareDBObject,
  noUserApiOptions,
};
