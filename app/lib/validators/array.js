const _ = require('lodash');
const {
  Types: { ObjectId }
} = require('mongoose');

const onlyNumbers = arr => arr.every(v => _.isNumber(v));
const onlyNumbersOrNull = arr => arr.every(v => _.isNumber(v) || v === null);
const onlyObjectId = arr => arr.every(v => ObjectId.isValid(v));

const numberArray = options => function (value, { path }) {
  const allowNull = _.get(options, 'allowNull', false);
  let validateElementsStrategy = onlyNumbers;
  if (allowNull) {
    validateElementsStrategy = onlyNumbersOrNull;
  }
  if (!Array.isArray(value)) {
    throw new Error(`${path} is not an array`);
  } else if (!validateElementsStrategy(value)) {
    throw new Error(`${path} contain non numeric elements`);
  } else if (options) {
    if (options.arrayMin !== undefined && value.length < options.arrayMin) {
      throw new Error(`${path} should contain at least ${options.arrayMin} numbers`);
    }
    if (options.arrayMax !== undefined && value.length > options.arrayMax) {
      throw new Error(`${path} should contain at most ${options.arrayMax} numbers`);
    }
    if (options.min !== undefined && !value.every(v => v >= options.min)) {
      throw new Error(`${path} should contain numbers greater than or equal to ${options.min}`);
    }
    if (options.max !== undefined && !value.every(v => v <= options.max)) {
      throw new Error(`${path} should contain numbers lesser than or equal to ${options.max}`);
    }
  }
  return true;
};

const arrayOfThings = options => function (value, { req, path }) {
  const transform = _.get(options, 'transform', v => v);
  const isOptional = _.get(options, 'optional', true);
  const validator = _.get(options, 'validator', () => false);
  const errorMessage = _.get(options, 'errorMessage', p => `${p} contains non valid elements`);
  if (value) {
    if (!Array.isArray(value)) {
      throw new Error(`${path} is not an array`);
    } else if (!validator(value)) {
      throw new Error(errorMessage(path));
    }
    if (transform) {
      _.set(req, path, transform(value));
    }
  } else if (!isOptional) {
    throw new Error(`${path} is a required value`);
  }
};

const objectIdArray = (options) => {
  const objectIdOptions = {
    transform: value => value.map(v => new ObjectId(v)),
    validator: onlyObjectId,
    errorMessage: path => `${path} contains non ObjectId elements`
  };
  const newOptions = Object.assing({}, options, objectIdOptions);
  return arrayOfThings(newOptions);
};

module.exports = {
  numberArray,
  arrayOfThings,
  objectIdArray
};
