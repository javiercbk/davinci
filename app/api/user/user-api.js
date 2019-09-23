const _ = require('lodash');

const AbstractAPI = require('../../lib/api');
const RecaptchaValidator = require('../../lib/recaptcha');
const RestError = require('../../lib/error');

const ALLOWED_USER_PROPS = ['_id', 'firstName', 'lastName', 'email'];

class UserAPI extends AbstractAPI {
  constructor(options) {
    super(options);
    this.recaptchaValidator = new RecaptchaValidator();
  }

  async create(prospect) {
    this.logger.debug(`Attempting to create user ${prospect.email}`);
    const existingUser = await this.schema.User.findOne({
      email: prospect.email
    });
    if (existingUser) {
      this.logger.debug(`User ${prospect.email} already exists`);
      throw new RestError(409, {
        message: `A user already exist with email ${prospect.email}`
      });
    }
    try {
      this.logger.debug(`Validating recaptcha for prospect user ${prospect.email}`);
      await this.recaptchaValidator.validate(prospect.recaptcha, this.remoteAddress);
    } catch (err) {
      const message = err.message || err;
      this.logger.error(`Failed to validate recaptcha code: ${message}`);
      throw new RestError(403, {
        message: 'Recaptcha validation failed'
      });
    }
    const newUser = new this.schema.User(prospect);
    this.logger.debug(`Creating user ${prospect.email} in the database`);
    try {
      await newUser.save();
    } catch (err) {
      if (err instanceof RestError) {
        throw err;
      } else if (err.name === 'ValidationError') {
        throw new RestError(400, { message: err.message });
      } else {
        const message = err.message || err;
        this.logger.error(`Failed to create user ${prospect.email}. Error: ${message}`);
        throw new RestError(500, {
          message: 'Error saving new user'
        });
      }
    }
    this.logger.debug(`User ${prospect.email} created`);
    const flatUser = newUser.toPublicObject(this.user);
    return {
      user: flatUser
    };
  }

  async edit(prospect) {
    this.logger.debug(`User ${this.user.email} is attempting to edit user ${prospect._id}`);
    const updatesSelf = this.currentUserId.equals(prospect._id);
    if (!updatesSelf && !this.user.abilities.can('manage', 'User')) {
      throw new RestError(403, {
        message: 'You are not allowed to edit other users'
      });
    }
    const user = await this.schema.User.findOneWithDeleted({
      _id: prospect._id
    });
    if (!user) {
      this.logger.debug(
        `User ${this.user.email} attempted to edit unexisting user ${prospect._id}`
      );
      throw new RestError(404, {
        message: `User ${prospect._id} does not exist`
      });
    }
    user.safeAssign(prospect, {
      ignoreProps: ['password', 'roles', 'forgotPassword']
    });
    try {
      await user.save();
    } catch (err) {
      if (err instanceof RestError) {
        throw err;
      } else if (err.name === 'ValidationError') {
        throw new RestError(400, { message: err.message });
      } else {
        const message = err.message || err;
        this.logger.error(
          `Error updating user ${prospect._id} ${prospect.email}. Error: ${message}`
        );
        throw new RestError(500, {
          message: 'Internal server error'
        });
      }
    }
    this.logger.debug(`User ${this.user.email} has updated user ${prospect._id} ${prospect.email}`);
    const flatUser = _.pick(user.toObject(), ALLOWED_USER_PROPS);
    return {
      user: flatUser
    };
  }
}

module.exports = UserAPI;
