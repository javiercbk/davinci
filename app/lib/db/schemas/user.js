// eslint-disable-next-line global-require
const {
  Schema,
  Types: { ObjectId }
} = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const moment = require('moment-timezone');

const { comparePassword, encodePassword } = require('../../password');

const RestError = require('../../error');
const metadata = require('../plugins/metadata');

const PUBLIC_FIELDS = ['_id', 'email', 'firstName', 'lastName', 'roles'];

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    password: {
      type: String
    },
    language: {
      type: String,
      enum: ['en', 'es'],
      default: 'en'
    },
    measurementSystem: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    },
    timezone: {
      type: String,
      enum: moment.tz.names().concat(['automatic']),
      default: 'automatic'
    },
    dateFormat: {
      type: String,
      enum: ['YYYY-MM-DD', 'YYYY-DD-MM'],
      default: 'YYYY-MM-DD'
    },
    datetimeFormat: {
      type: String,
      enum: ['YYYY-MM-DD HH:mm', 'YYYY-DD-MM HH:mm'],
      default: 'YYYY-MM-DD HH:mm'
    },
    roles: {
      type: [String],
      default: ['User_read_own', 'Anthropometry_read_own', 'Patient_read_own', 'Sport_read_all']
    },
    forgotPassword: {
      code: String,
      creation: Date
    }
  },
  {
    collection: 'users',
    timestamps: true
  }
);

UserSchema.path('password').set(function (newPassword) {
  if (this._originalPassword === undefined) {
    this._originalPassword = this.password || null;
  }
  return newPassword;
});

UserSchema.pre('save', function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

UserSchema.pre('save', async function () {
  if (!this.isNew && this.isModified('email')) {
    const otherUser = await this.model('User').findOneWithDeleted({
      email: this.email
    });
    if (otherUser) {
      throw new RestError(409, {
        message: `There is already another user with email ${otherUser.email}`
      });
    }
  }
});

UserSchema.pre('save', async function () {
  if (
    this.isModified('password')
    && this._originalPassword
    && this._originalPassword !== this.password
  ) {
    if (this.oldPassword && this.password) {
      const passwordMatches = await comparePassword(this.oldPassword, this._originalPassword);
      if (!passwordMatches) {
        throw new RestError(403, {
          message: 'Old password does not match'
        });
      } else {
        // will update password
        this.password = await encodePassword(this.password);
      }
    } else {
      throw new RestError(403, {
        message: 'Old password does not match'
      });
    }
  } else if (this.isNew) {
    this.password = await encodePassword(this.password);
  }
});

UserSchema.plugin(mongooseDelete, {
  indexFields: true,
  overrideMethods: true
});
UserSchema.plugin(metadata('User'));

UserSchema.statics.getScopedQuery = function (action, scope, user) {
  if (action === 'manage') {
    // when scope all, do not assign any condition to the query.
    return { fields: PUBLIC_FIELDS };
  }
  let userId;
  if (user._id instanceof ObjectId) {
    userId = user._id;
  } else {
    userId = new ObjectId(user._id);
  }
  return { condition: { _id: userId }, fields: PUBLIC_FIELDS };
};

UserSchema.index(
  {
    email: 1
  },
  {
    unique: true
  }
);

module.exports = UserSchema;
