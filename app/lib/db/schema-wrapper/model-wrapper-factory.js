const _ = require('lodash');

const wrappedSave = function (user, model) {
  return function (options, callback) {
    const args = [];
    if (model.isNew) {
      model.createdBy = _.get(user, 'email');
    } else {
      model.updatedBy = _.get(user, 'email');
    }
    if (options) {
      args.push(options);
    }
    if (callback) {
      args.push(callback);
    }
    return model.__wrappedSave(...args);
  };
};

const modelWrapperFactory = (user, Model, logger) => {
  const ModelWrapper = function (data) {
    let clone = {};
    if (data) {
      clone = _.cloneDeep(data);
    }
    const model = new Model(clone);
    model.__wrappedSave = model.save;
    model.save = wrappedSave(user, model);
    model.$userContext = user;
    model.$logger = logger;
    return model;
  };

  _.extend(ModelWrapper, Model);

  // Wrapped model "static functions"

  ModelWrapper.update = function (conditions, doc, options, callback) {
    _.set(doc, '$set.updatedBy', user.email);
    return Model.update(conditions, doc, options, callback);
  };

  ModelWrapper.updateMany = function (conditions, doc, options, callback) {
    _.set(doc, '$set.updatedBy', user.email);
    return Model.updateMany(conditions, doc, options, callback);
  };

  ModelWrapper.updateOne = function (conditions, doc, options, callback) {
    _.set(doc, '$set.updatedBy', user.email);
    return Model.updateOne(conditions, doc, options, callback);
  };

  ModelWrapper.findOneAndUpdate = function (conditions, update, options, callback) {
    _.set(update, '$set.updatedBy', user.email);
    return Model.findOneAndUpdate(conditions, update, options, callback);
  };

  ModelWrapper.replaceOne = function (conditions, doc, options, callback) {
    _.set(doc, 'createdBy', user.email);
    return Model.replaceOne(conditions, doc, options, callback);
  };

  ModelWrapper.findByIdAndUpdate = function (id, update, options, callback) {
    _.set(update, '$set.updatedBy', user.email);
    return Model.findByIdAndUpdate(id, update, options, callback);
  };

  return ModelWrapper;
};

module.exports = modelWrapperFactory;
