const _ = require('lodash');
const {
  Schema,
  mongo: { ObjectID }
} = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const { checkAnthropometrist } = require('../hooks/anthropometrist');
const patientSchemaFactory = require('../schema-def/patient');
const metadata = require('../plugins/metadata');
const RestError = require('../../error');

const patientSchema = patientSchemaFactory();

const {
  Types: { ObjectId }
} = Schema;

const PUBLIC_FIELDS = [
  '_id',
  'anthropometrist',
  'email',
  'firstName',
  'lastName',
  'personalId',
  'birthDate',
  'countryOfOrigin',
  'gender',
  'sports',
  'activityLevel'
];

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

// enforce validations on Patients
patientSchema.firstName.required = [true, 'First name must be provided'];
patientSchema.lastName.required = [true, 'Last name must be provided'];
patientSchema.birthDate.required = [true, 'Birth date must be provided'];
patientSchema.gender.required = [true, 'Gender must be provided'];
patientSchema.gender.enum = ['F', 'M'];
patientSchema.sports = { type: [PatientSportSchema], default: [] };

const knownPatientKeys = Object.keys(patientSchema).concat(['_id']);

const schemaDef = Object.assign(
  {
    anthropometrist: {
      type: ObjectId,
      ref: 'User',
      __davinci: {
        public: false
      }
    }
  },
  patientSchema
);

const PatientSchema = new Schema(schemaDef, {
  collection: 'patients',
  timestamps: true
});

PatientSchema.pre('validate', function (next) {
  // used in post save hook
  this.wasNew = this.isNew;
  next();
});

PatientSchema.pre('validate', async function () {
  if (this.isModified('sports') && this.sports && this.sports.length) {
    const knownSports = await this.model('Sport').find({
      _id: { $in: this.sports.map(s => s._id) }
    });
    if (knownSports.length !== this.sports.length) {
      const missing = this.sports.find(
        s => knownSports.findIndex(ks => ks._id.toString() === s._id.toString()) === -1
      );
      throw new RestError(422, {
        message: `Sport "${missing._id}" does not exist`
      });
    } else if (!knownSports.every(s => s.gender === this.gender)) {
      throw new RestError(422, {
        message: 'All sports provided must match the gender of the patient'
      });
    } else {
      // if all went fine, then transform the sports from _id to embeddable objects.
      this.sports = knownSports.map(s => s.toEmbeddableObject());
    }
  }
});

PatientSchema.pre('save', function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

PatientSchema.pre('save', checkAnthropometrist({ model: 'patient' }));

PatientSchema.post('save', async function () {
  if (!this.wasNew) {
    // only if patient was not new (updating a patient)
    const pickedPatient = this.toEmbeddableObject();
    // After saving a patient, update all the patients in the anthropometries collection
    const update = { $set: { patient: pickedPatient } };
    let accessibleBy = c => c;
    if (this.$userContext) {
      update.$set.updatedBy = this.$userContext.email;
      accessibleBy = c => c.accessibleBy(this.$userContext.abilities);
    }
    const cursor = this.model('Anthropometry').updateMany({ 'patient._id': this._id }, update);
    await accessibleBy(cursor).exec();
  }
});

PatientSchema.plugin(mongooseDelete, {
  indexFields: true,
  overrideMethods: true
});
PatientSchema.plugin(metadata('Patient'));

PatientSchema.statics.getScopedQuery = function (action, scope, user) {
  if (scope === 'all') {
    // when scope all, do not assign any condition to the query.
    return { fields: PUBLIC_FIELDS };
  }
  const userId = new ObjectID(user._id.toString());
  return { condition: { anthropometrist: userId }, fields: PUBLIC_FIELDS };
};

PatientSchema.methods.toEmbeddableObject = function () {
  return _.pick(this.toObject(), knownPatientKeys);
};

PatientSchema.index({
  anthropometrist: 1
});
PatientSchema.index({
  anthropometrist: 1,
  firstName: 1,
  lastName: 1
});
PatientSchema.index({
  anthropometrist: 1,
  personalId: 1
});
PatientSchema.index({
  anthropometrist: 1,
  'sports._id': 1
});
PatientSchema.index({
  anthropometrist: 1,
  gender: 1
});
PatientSchema.index({
  'sports._id': 1
});

module.exports = PatientSchema;
