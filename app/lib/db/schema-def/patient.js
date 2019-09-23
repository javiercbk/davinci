const { Schema } = require('mongoose');
const { countriesISO } = require('../../validators/countries');

const patientSchemaFactory = () => ({
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  personalId: {
    type: String
  },
  birthDate: {
    type: Date
  },
  countryOfOrigin: {
    type: String,
    enum: countriesISO
  },
  gender: {
    type: String
  },
  sports: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sport'
    }
  ],
  activityLevel: {
    type: Number,
    default: -1,
    min: -1,
    max: 4
  }
});

module.exports = patientSchemaFactory;
