const _ = require('lodash');
const AbstractAPI = require('../../lib/api');
const RestError = require('../../lib/error');

const SEARCH_DEFAULT_LIMIT = 10;
const DEFAULT_SORT = {
  _id: 1
};

class AnthropometryAPI extends AbstractAPI {
  async create(prospect) {
    const anthropometry = new this.schema.Anthropometry();
    anthropometry.safeAssign(prospect);
    if (!anthropometry.anthropometrist) {
      // if no anthropometrist, assign user
      anthropometry.anthropometrist = this.user._id;
    }
    try {
      await anthropometry.save();
    } catch (e) {
      if (e instanceof RestError) {
        throw e;
      } else if (e.name === 'ValidationError') {
        throw new RestError(400, { message: e.message });
      } else {
        const message = e.message || e;
        this.logger.error(`Error saving anthropometry: ${message}`);
        throw new RestError(500, { message: 'Unknown error saving new anthropometry' });
      }
    }
    return {
      anthropometry: anthropometry.toObject()
    };
  }

  async edit(prospect) {
    const query = {
      _id: prospect._id
    };
    if (!this.user) {
      throw new RestError(401, { message: 'You must be logged in to edit this anthropometry' });
    }
    const anthropometry = await this.schema.Anthropometry.findOneWithDeleted(query).accessibleBy(
      this.user.abilities
    );
    if (!anthropometry) {
      throw new RestError(404, {
        message: `Anthropometry ${prospect._id} was not found`
      });
    }
    anthropometry.safeAssign(prospect);
    try {
      await anthropometry.save();
    } catch (e) {
      if (e instanceof RestError) {
        throw e;
      } else if (e.name === 'ValidationError') {
        throw new RestError(400, { message: e.message });
      } else {
        const message = e.message || e;
        this.logger.error(`Error saving anthropometry ${prospect._id}: ${message}`);
        throw new RestError(500, { message: 'Unknown error saving anthropometry' });
      }
    }
    return {
      anthropometry: anthropometry.toObject()
    };
  }

  async getById(searchParams) {
    const query = {};
    query._id = searchParams._id;
    const cursor = this.schema.Anthropometry.findOneWithDeleted(query).accessibleBy(
      this.user.abilities
    );
    const anthropometry = await this.schema.Anthropometry.selectPublicData(cursor, this.user);
    if (!anthropometry) {
      throw new RestError(404, {
        message: `Anthropometry ${searchParams._id} was not found`
      });
    }
    return {
      anthropometry: anthropometry.toObject()
    };
  }

  async search(searchParams) {
    const query = {};
    const fromTo = [];
    if (searchParams.from) {
      fromTo.push({
        $gte: searchParams.from
      });
    }
    if (searchParams.from) {
      fromTo.push({
        $lte: searchParams.to
      });
    }
    if (searchParams.patient) {
      query['patient._id'] = searchParams.patient;
    }
    const limit = _.get(searchParams, 'limit', SEARCH_DEFAULT_LIMIT);
    const sort = _.get(searchParams, 'sort', DEFAULT_SORT);
    const fields = _.get(searchParams, 'fields', '').split(',');
    let cursor = this.schema.Anthropometry.find(query).accessibleBy(this.user.abilities);
    cursor = this.schema.Anthropometry.selectPublicData(cursor, this.user);
    const anthropometries = await cursor
      .limit(limit)
      .sort(sort)
      .exec();
    return {
      anthropometries: anthropometries.map(a => a.toPublicObject(this.user, fields))
    };
  }
}

module.exports = AnthropometryAPI;
