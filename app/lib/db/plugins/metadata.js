const _ = require('lodash');
const moment = require('moment');

// Add metadata for all modules
module.exports = exports = schemaName => function docMetadata(schema) {
  // Fields for all models
  const customFields = {
    updatedBy: String,
    createdBy: String,
    deletedBy: String,
    restoredBy: String,
    deletedAt: Date,
    restoredAt: Date
  };

  // Deleted at
  schema.pre('save', function (next) {
    if (this.isModified('deleted') && this.deleted) {
      this.deletedAt = moment.utc().toDate();
      if (this.updatedBy) {
        this.deletedBy = this.updatedBy;
      }
    }
    if (!this.isNew && this.isModified('deleted') && !this.deleted) {
      this.restoredAt = moment.utc().toDate();
      if (this.updatedBy) {
        this.restoredBy = this.updatedBy;
      }
    }
    next();
  });

  // Set Props and Sanitize
  schema.methods.safeAssign = function (newValue, options) {
    const ignoreProps = _.get(options, 'ignoreProps', []);
    const noEmptyProps = _.get(options, 'noEmptyProps', []);
    if (_.isObject(newValue)) {
      const regExps = [/^\$/, /^_id/, /^__/];
      const objKeys = Object.keys(newValue);
      objKeys.forEach(key => regExps.forEach((reg) => {
        if (reg.test(key)) {
          delete newValue[key];
        }
      }));
      Object.assign(this, newValue);
      // delete the missing properties.
      Object.keys(this.toObject())
        .filter(key => regExps.findIndex(re => re.test(key)) === -1)
        .filter(key => ignoreProps.indexOf(key) === -1)
        .forEach((key) => {
          const hasKey = _.hasIn(newValue, key);
          const isEmptyProp = noEmptyProps.indexOf(key) !== -1 && newValue[key] === '';
          if (!hasKey || isEmptyProp) {
            this[key] = undefined;
          }
        });
    }
  };

  schema.statics.selectPublicData = function (cursor, user) {
    if (user && user.abilities) {
      let rule = user.abilities.relevantRuleFor('manage', this.modelName);
      if (!rule) {
        rule = user.abilities.relevantRuleFor('read', this.modelName);
      }
      if (rule && rule.fields) {
        cursor.select(rule.fields);
      }
    }
    return cursor;
  };

  schema.statics.getFields = function (user) {
    if (user && user.abilities) {
      let rule = user.abilities.relevantRuleFor('manage', this.modelName);
      if (!rule) {
        rule = user.abilities.relevantRuleFor('read', this.modelName);
      }
      return _.get(rule, 'fields', null);
    }
    return null;
  };

  schema.methods.toPublicObject = function (user, fields = []) {
    const publicObject = this.toObject();
    if (fields.length) {
      return _.pick(publicObject, fields);
    }
    if (user && user.abilities) {
      let rule = user.abilities.relevantRuleFor('manage', schemaName);
      if (!rule) {
        rule = user.abilities.relevantRuleFor('read', schemaName);
      }
      if (rule) {
        const allFields = _.get(rule, 'fields', []).concat(fields);
        if (allFields.length) {
          return _.pick(publicObject, allFields);
        }
      }
    }
    return publicObject;
  };

  // Add custom filed here
  schema.add(customFields);
};
