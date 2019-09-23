const _ = require('lodash');
const assert = require('assert');

const RestError = require('../../error');

const checkAnthropometrist = function (options) {
  const anthropometristProp = _.get(options, 'prop', 'anthropometrist');
  const modelName = _.get(options, 'model');
  const required = _.get(options, 'required', true);
  assert(typeof modelName === 'string' && modelName);
  return async function () {
    const userId = _.get(this, '$userContext._id');
    if (userId) {
      if (this.isModified(anthropometristProp)) {
        const anthropometristId = _.get(this, `${anthropometristProp}._id`, this[anthropometristProp]);
        if (!anthropometristId) {
          if (required) {
            throw new RestError(400, {
              message: 'Anthropometrist must be provided',
            });
          }
        } else if (!anthropometristId.equals(userId)) {
          const abilities = _.get(this, '$userContext.abilities');
          const canManage = abilities.can('manage', 'Anthropometry');
          if (canManage) {
            // only check anthropometrist when a non equal
            const anthropometrist = await this.model('User').findOneWithDeleted({ _id: anthropometristId });
            if (!anthropometrist) {
              throw new RestError(422, {
                message: `Cannot create or edit this ${modelName} for a non existing anthropometrist`
              });
            }
          } else {
            throw new RestError(403, {
              message: `Cannot create or edit this ${modelName} for another anthropometrist`
            });
          }
        }
      }
    } else {
      throw new RestError(401, {
        message: `Cannot create or edit this ${this.modelName} without a anthropometrist`
      });
    }
  };
};

module.exports = {
  checkAnthropometrist
};
