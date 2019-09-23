// eslint-disable-next-line global-require
const _ = require('lodash');
const {
  Schema,
  Types: { ObjectId }
} = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const RestError = require('../../error');

const { checkAnthropometrist } = require('../hooks/anthropometrist');
const measurements = require('../schema-def/measurements');
const patientSchemaFactory = require('../schema-def/patient');
const metadata = require('../plugins/metadata');

const PUBLIC_FIELDS = Object.keys(measurements).concat([
  '_id',
  'anthropometrist',
  'patient',
  'measurementDate',
  'errorPercent'
]);

const patientSchema = patientSchemaFactory();

const PatientSportSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, '_id is required']
    },
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    position: {
      type: String
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['F', 'M']
    },
    sport: {
      type: Schema.Types.ObjectId,
      required: [true, 'sportRef is required'],
      ref: 'Sport'
    }
  },
  { _id: false }
);

patientSchema.sports = [PatientSportSchema];

const Patient = new Schema(patientSchema);

const schemaDef = Object.assign(
  {
    anthropometrist: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Anthropometrist must be provided']
    },
    patient: Patient,
    measurementDate: {
      type: Date
    },
    errorPercent: {
      type: Number
    }
  },
  measurements
);

const AnthropometrySchema = new Schema(schemaDef, {
  collection: 'anthropometries',
  timestamps: true
});

AnthropometrySchema.plugin(mongooseDelete, {
  indexFields: true,
  overrideMethods: true
});
AnthropometrySchema.plugin(metadata('Anthropometry'));

AnthropometrySchema.statics.getScopedQuery = function (action, scope, user) {
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
  return { condition: { anthropometrist: userId }, fields: PUBLIC_FIELDS };
};

AnthropometrySchema.pre('save', checkAnthropometrist({ model: 'anthropometry' }));

AnthropometrySchema.pre('save', async function () {
  const patientId = _.get(this.patient, '_id');
  if (this.isModified('patient._id')) {
    if (patientId) {
      // only make these checks if patient has value
      if (!_.isEmpty(this.$userContext)) {
        const anthropometristId = _.get(this.anthropometrist, '_id', this.anthropometrist);
        const patient = await this.model('Patient').findOneWithDeleted({
          _id: patientId,
          anthropometrist: anthropometristId
        });
        if (!patient) {
          throw new RestError(422, {
            message: `Cannot create or edit this anthropometry with not existing patient ${patientId}`
          });
        } else {
          this.patient = patient.toEmbeddableObject();
        }
      } else {
        throw new RestError(401, {
          message: 'Cannot create or edit this anthropometry without a anthropometrist'
        });
      }
    } else {
      this.patient = undefined;
    }
  }
});

AnthropometrySchema.index({ anthropometrist: 1 });
AnthropometrySchema.index({ 'patient._id': 1 });
AnthropometrySchema.index({ 'patient.firstName': 1, 'patient.lastName': 1 });
AnthropometrySchema.index({ 'patient.personalId': 1 });
AnthropometrySchema.index({ 'patient.gender': 1 });
AnthropometrySchema.index({ 'patient.sports._id': 1 });
AnthropometrySchema.index({ measurementDate: 1 });

module.exports = AnthropometrySchema;
