const _ = require('lodash');
const Promise = require('bluebird');
const AbstractAPI = require('../../lib/api');
const RestError = require('../../lib/error');
const { escapeRegExp } = require('../../lib/validators/sanitizers');

const SEARCH_DEFAULT_LIMIT = 10;
const DEFAULT_SORT = {
  name: 1
};

class SportAPI extends AbstractAPI {
  async allSportsTranslations(options) {
    let sportTranslations;
    try {
      sportTranslations = await this.schema.SportTranslation.findOne({
        language: options.lang
      }).select('sports');
    } catch (e) {
      const message = e.message || e;
      this.logger.error(
        `Could not retrieve sports translations for language ${options.lang}. Error: ${message}`
      );
    }
    if (!sportTranslations) {
      throw new RestError(404, {
        message: `There are no sport translations for language ${options.lang}`
      });
    }
    const langSport = {};
    langSport[options.lang] = {
      sports: sportTranslations.sports.map((s) => {
        const sportTranslation = {};
        sportTranslation[s.name] = s.translation;
        if (s.position) {
          sportTranslation[`${s.name} - ${s.position}`] = s.translationPosition;
        }
        return sportTranslation;
      })
    };
    return langSport;
  }

  async sportTranslations(options) {
    let sportTranslations;
    try {
      sportTranslations = await this.schema.SportTranslation.find({
        'sports.sport': options._id
      });
    } catch (e) {
      const message = e.message || e;
      this.logger.error(
        `Could not retrieve sports translations for sport ${options._id}. Error: ${message}`
      );
    }
    const translations = [];
    sportTranslations.forEach((st) => {
      const sport = st.sports.find(s => s.sport.equals(options._id));
      if (!_.isNil(sport)) {
        translations.push({
          lang: st.language,
          translation: st.translation
        });
      }
    });
    return translations;
  }

  async create(prospect) {
    const sport = new this.schema.Sport();
    _.unset(prospect, 'traslations');
    sport.safeAssign(prospect);
    try {
      await sport.save();
    } catch (e) {
      if (e instanceof RestError) {
        throw e;
      } else if (e.name === 'ValidationError') {
        throw new RestError(400, { message: e.message });
      } else {
        const message = e.message || e;
        this.logger.error(`Error saving sport: ${message}`);
        throw new RestError(500, { message: 'Unknown error saving new sport' });
      }
    }
    return {
      sport: sport.toObject()
    };
  }

  async edit(prospect) {
    _.unset(prospect, 'traslations');
    const query = {
      _id: prospect._id
    };
    const sport = await this.schema.Sport.findOneWithDeleted(query).accessibleBy(
      this.user.abilities
    );
    if (!sport) {
      throw new RestError(404, {
        message: `Sport ${prospect._id} was not found`
      });
    }
    sport.safeAssign(prospect);
    try {
      await sport.save();
    } catch (e) {
      if (e instanceof RestError) {
        throw e;
      } else if (e.name === 'ValidationError') {
        throw new RestError(400, { message: e.message });
      } else {
        const message = e.message || e;
        this.logger.error(`Error saving sport ${prospect._id}: ${message}`);
        throw new RestError(500, { message: 'Unknown error saving sport' });
      }
    }
    return {
      sport: sport.toObject()
    };
  }

  async getById(searchParams) {
    const query = {};
    query._id = searchParams._id;
    const sport = await this.schema.Sport.findOneWithDeleted(query);
    if (!sport) {
      throw new RestError(404, {
        message: `Sport ${searchParams._id} was not found`
      });
    }
    return {
      sport: sport.toObject()
    };
  }

  async search(searchParams) {
    const query = {};
    if (searchParams.term) {
      const regexp = new RegExp(`${escapeRegExp(searchParams.term)}.*`, 'i');
      query.name = regexp;
    }
    if (searchParams.gender) {
      query.gender = searchParams.gender;
    }
    const limit = _.get(searchParams, 'limit', SEARCH_DEFAULT_LIMIT);
    const sort = _.get(searchParams, 'sort', DEFAULT_SORT);
    const sports = await this.schema.Sport.find(query)
      .limit(limit)
      .sort(sort);
    return {
      sports: sports.map(p => p.toObject())
    };
  }

  /**
   * Adds or edits the sports translations.
   * @param {object} sport the sport.
   * @param {object} sport._id the sport object id.
   * @param {string} sport.name the sport name.
   * @param {array} translations the language translation.
   */
  async _addOrEditTranslations(sport, translations) {
    if (!_.isNil(translations)) {
      try {
        await Promise.map(
          translations,
          async ({ language, translation }) => {
            let st = await this.schema.SportTranslation.findOne({
              language: language
            });
            if (!st) {
              st = new this.schema.SportTranslation({
                language: language,
                sports: []
              });
            }
            const sportFound = st.sports.find(s => s.sport.equals(sport._id));
            if (!_.isNil(sport)) {
              sportFound.name = sport.name;
              sportFound.translation = translation;
            } else {
              st.sports.push({ sport: sport._id, name: sport.name, translation });
            }
            await st.save();
          },
          { concurrency: 3 }
        );
      } catch (e) {
        const message = e.message || e;
        this.logger.error(
          `Error adding sport translations for sport ${sport.name}. Error: ${message}`
        );
        throw new RestError(500, { message: 'Failed to add sports translations', stack: e.stack });
      }
    }
  }
}

module.exports = SportAPI;
