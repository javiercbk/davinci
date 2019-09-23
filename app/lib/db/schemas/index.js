/* eslint-disable global-require,import/no-dynamic-require */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const mongoose = global.mongoose || require('mongoose');

const models = {};
const schemas = {};

const toModelName = file => _.upperFirst(_.camelCase(file));

const isDirectory = file => fs.statSync(path.join(__dirname, file)).isDirectory();

fs.readdirSync(__dirname).filter(f => f !== 'index.js' && !isDirectory(f))
  .map(f => f.substring(0, f.length - 3))
  .forEach((f) => {
    schemas[toModelName(f)] = require(path.join(__dirname, f));
  });
Object.keys(schemas).forEach((modelName) => {
  models[modelName] = mongoose.model(modelName, schemas[modelName]);
});

module.exports = models;
