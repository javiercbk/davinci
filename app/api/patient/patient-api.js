const _ = require('lodash');

const AbstractAPI = require('../../lib/api');
const RestError = require('../../lib/error');
const { escapeRegExp } = require('../../lib/validators/sanitizers');

const SEARCH_DEFAULT_LIMIT = 10;
const DEFAULT_SORT = {
  _id: 1
};

class PatientAPI extends AbstractAPI {
  async create(prospect) {
    const patient = new this.schema.Patient();
    patient.safeAssign(prospect);
    try {
      await patient.save();
    } catch (e) {
      if (e instanceof RestError) {
        throw e;
      } else if (e.name === 'ValidationError') {
        throw new RestError(400, { message: e.message });
      } else {
        const message = e.message || e;
        this.logger.error(`Error saving patient: ${message}`);
        throw new RestError(500, { message: 'Unknown error saving new patient' });
      }
    }
    return {
      patient: patient.toObject()
    };
  }

  async edit(prospect) {
    const query = {
      _id: prospect._id
    };
    const patient = await this.schema.Patient.findOneWithDeleted(query).accessibleBy(
      this.user.abilities
    );
    if (!patient) {
      throw new RestError(404, {
        message: `Patient ${prospect._id} was not found`
      });
    }
    patient.safeAssign(prospect);
    try {
      await patient.save();
    } catch (e) {
      if (e instanceof RestError) {
        throw e;
      } else if (e.name === 'ValidationError') {
        throw new RestError(400, { message: e.message });
      } else {
        const message = e.message || e;
        this.logger.error(`Error saving patient ${patient._id}: ${message}`);
        throw new RestError(500, { message: 'Unknown error saving patient', stack: e.stack });
      }
    }
    return {
      patient: patient.toObject()
    };
  }

  async getById(searchParams) {
    const query = {};
    if (!this.user.abilities.can('manage', 'Patient')) {
      query.anthropometrist = this.user._id;
    }
    query._id = searchParams._id;
    const patient = await this.schema.Patient.findOneWithDeleted(query);
    if (!patient) {
      throw new RestError(404, {
        message: `Patient ${searchParams._id} was not found`
      });
    }
    return {
      patient: patient.toPublicObject()
    };
  }

  async search(searchParams) {
    const query = {};
    if (!this.user.abilities.can('manage', 'Patient')) {
      query.anthropometrist = this.currentUserId;
    }
    if (searchParams.term) {
      const regexp = new RegExp(`${escapeRegExp(searchParams.term)}.*`, 'i');
      query.$or = [
        // Search in first name, last name and email
        {
          firstName: regexp
        },
        {
          lastName: regexp
        },
        {
          personalId: regexp
        }
      ];
    }
    const limit = _.get(searchParams, 'limit', SEARCH_DEFAULT_LIMIT);
    const sort = _.get(searchParams, 'sort', DEFAULT_SORT);
    const patients = await this.schema.Patient.find(query)
      .limit(limit)
      .sort(sort);
    return {
      patients: patients.map(p => p.toObject())
    };
  }
}

module.exports = PatientAPI;
