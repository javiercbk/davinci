const _ = require('lodash');
const mongoose = require('mongoose');

const { AbilityBuilder } = require('@casl/ability');

const breakRole = r => r.split('_');

const getUserAbilities = user => AbilityBuilder.define((can) => {
  _.get(user, 'roles', []).forEach((role) => {
    const [model, action, scope] = breakRole(role);
    const mongooseModel = mongoose.models[model];
    if (mongooseModel && mongooseModel.getScopedQuery) {
      const { fields, condition } = mongooseModel.getScopedQuery(action, scope, user);
      can(action, model, fields, condition);
    } else {
      can(action, model);
    }
  });
});

const userAbilitiesMiddleware = (req, res, next) => {
  const user = _.get(req, 'session.user');
  if (user) {
    user.abilities = getUserAbilities(user);
  }
  next();
};

module.exports = {
  getUserAbilities,
  userAbilitiesMiddleware,
};
