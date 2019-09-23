const _ = require('lodash');
const { Schema } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const measurements = require('../schema-def/measurements');
const metadata = require('../plugins/metadata');

const schemaDef = Object.assign(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      __davinci: {
        public: true
      }
    },
    position: {
      type: String,
      default: '',
      __davinci: {
        public: true
      }
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['F', 'M'],
      __davinci: {
        public: true
      }
    }
  },
  measurements
);

const SportSchema = new Schema(schemaDef, {
  collection: 'sports',
  timestamps: true
});

SportSchema.plugin(mongooseDelete, {
  indexFields: true,
  overrideMethods: true
});
SportSchema.plugin(metadata('Sport'));
SportSchema.index(
  {
    name: 1,
    position: 1,
    gender: 1
  },
  {
    unique: true
  }
);

SportSchema.pre('save', function (next) {
  // used in post save hook
  this.wasNew = this.isNew;
  next();
});

/**
 * Updates all patients with this sport
 */
SportSchema.post('save', async function () {
  if (!this.wasNew) {
    // only if sport was not new (updating a sport)
    const update = { $set: {} };
    let executeUpdate = false;
    if (this.isModified('name')) {
      update.$set['sports.$.name'] = this.name;
      executeUpdate = true;
    }
    if (this.isModified('position')) {
      update.$set['sports.$.position'] = this.name;
      executeUpdate = true;
    }
    if (this.isModified('gender')) {
      update.$set['sports.$.gender'] = this.name;
      executeUpdate = true;
    }
    if (executeUpdate) {
      await this.model('Patient').updateMany(
        {
          sports: {
            $elemMatch: {
              _id: this._id
            }
          }
        },
        update
      );
    }
  }
});

SportSchema.methods.toEmbeddableObject = function () {
  const embeddableSport = _.pick(this.toObject(), ['_id', 'name', 'position', 'gender']);
  embeddableSport.sport = embeddableSport._id;
  return embeddableSport;
};

module.exports = SportSchema;
