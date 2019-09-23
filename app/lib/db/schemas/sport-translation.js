// eslint-disable-next-line global-require
const { Schema } = require('mongoose');

const { ISO639_1_LANGS } = require('../../validators/languages');

const TranslationSchema = new Schema(
  {
    sport: {
      type: Schema.Types.ObjectId,
      required: [true, 'sport is required'],
      ref: 'Sport'
    },
    name: {
      type: String,
      required: [true, 'sport name is required']
    },
    position: {
      type: String
    },
    translation: {
      type: String,
      required: [true, 'sport translation is required']
    },
    translationPosition: {
      type: String
    }
  },
  { _id: false }
);

const SportTranslationSchema = new Schema(
  {
    language: {
      type: String,
      enum: ISO639_1_LANGS,
      required: [true, 'sport translation language is required']
    },
    sports: {
      type: [TranslationSchema],
      default: () => []
    }
  },
  {
    collection: 'sportTranslations',
    timestamps: false
  }
);

SportTranslationSchema.index(
  {
    language: 1
  },
  {
    unique: true
  }
);

SportTranslationSchema.index({
  'sports.sport': 1
});

module.exports = SportTranslationSchema;
