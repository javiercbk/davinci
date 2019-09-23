import _ from 'lodash';
import httpClient from '../http-client';
import UserAwareService from '../user-aware-service';

export default class AnthropometryService extends UserAwareService {
  search (query) {
    const options = {};
    options.params = _.pick(query, ['term', 'limit']);
    if (!options.params.term) {
      delete options.params.term;
    }
    return httpClient.get(`/api/anthropometrist/${this.userId}/patient`, options);
  }

  save (patient) {
    const pat = _.assign({}, patient);
    if (pat._id) {
      const patientId = encodeURIComponent(pat._id);
      delete pat._id;
      return httpClient.put(`/api/anthropometrist/${this.userId}/patient/${patientId}`, pat);
    }
    return httpClient.post(`/api/anthropometrist/${this.userId}/patient`, pat);
  }

  retrieve (patient) {
    const escapedId = encodeURIComponent(patient._id);
    return httpClient.get(`/api/anthropometrist/${this.userId}/patient/${escapedId}`);
  }
}
