const _ = require('lodash');

const AbstractAPI = require('../../lib/api');
const { comparePassword } = require('../../lib/password');
const RestError = require('../../lib/error');

const INVALID_LOGIN = new RestError(401, {
  message: 'Invalid username or password'
});

const USER_ALLOWED_PROPS = [
  '_id',
  'email',
  'firstName',
  'lastName',
  'language',
  'measurementSystem',
  'timezone',
  'dateFormat',
  'datetimeFormat',
  'roles'
];

class AuthAPI extends AbstractAPI {
  async authenticate(credentials) {
    const user = await this.schema.User.findOne({
      email: credentials.email
    });
    if (!user) {
      throw INVALID_LOGIN;
    }
    let passwordMatch = false;
    try {
      passwordMatch = await comparePassword(credentials.password, user.password);
    } catch (e) {
      const message = e.message || e;
      this.logger.error(`Error checking password: ${message}`);
      throw new RestError(500, {
        message: 'Internal server error'
      });
    }
    if (!passwordMatch) {
      this.logger.debug(`Invalid login for user ${user.email}`);
      throw INVALID_LOGIN;
    }
    const flatUser = _.pick(user.toObject(), USER_ALLOWED_PROPS);
    this.logger.debug(`User ${user.email} logged in`);
    return flatUser;
  }

  async currentUser() {
    return {
      user: this.user
    };
  }

  async logout() {
    this.logger.debug(`User ${this.user.email} logged out`);
  }
}

module.exports = AuthAPI;
