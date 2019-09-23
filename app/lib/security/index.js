const _ = require('lodash');

const RestError = require('../error');

const NOT_ALLOWED_ERROR = new RestError(403, {
  message: 'You are not allowed to access this resource'
});

const securityCheck = function (rules) {
  const isPublic = _.get(rules, 'public', false);
  const onlyPublic = _.get(rules, 'onlyPublic', false);
  const canAccess = _.get(rules, 'canAccess');
  return function (req, res, next) {
    const user = _.get(req, 'session.user');
    if (!user && !isPublic) {
      throw new RestError(401, {
        message: 'You must be logged in to access this resource'
      });
    } else if (user && onlyPublic) {
      throw NOT_ALLOWED_ERROR;
    } else if (canAccess && !canAccess(user)) {
      throw NOT_ALLOWED_ERROR;
    }
    next();
  };
};

const prependSecurityCheck = function (rule, validationRules = []) {
  return [securityCheck(rule)].concat(validationRules);
};

const canAccessEntity = function (entityName, actionAllowed) {
  return function (user) {
    let actions;
    const ab = user.abilities;
    if (!actionAllowed) {
      actions = ['read', 'manage'];
    } else if (Array.isArray(actionAllowed)) {
      actions = actionAllowed;
    } else {
      actions = [actionAllowed];
    }
    return actions.some(action => ab.can(action, entityName));
  };
};

module.exports = {
  canAccessEntity,
  securityCheck,
  prependSecurityCheck
};
