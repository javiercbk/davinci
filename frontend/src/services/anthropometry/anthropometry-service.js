import _ from 'lodash';
import moment from 'moment';
import httpClient from '../http-client';
import UserAwareService from '../user-aware-service';

const DATE_FORMAT = 'YYYY-MM-DD';
export default class AnthropometryService extends UserAwareService {
  retrieve (anthropometryId) {
    const encodedId = encodeURIComponent(anthropometryId);
    return httpClient.get(`/api/anthropometrist/${this.userId}/anthropometry/${encodedId}`);
  }

  search (searchTerm) {
    const params = [];
    if (searchTerm.from) {
      params.push(`from=${encodeURIComponent(moment.utc(searchTerm.from).format(DATE_FORMAT))}`);
    }
    if (searchTerm.to) {
      params.push(`to=${encodeURIComponent(moment.utc(searchTerm.to).format(DATE_FORMAT))}`);
    }
    if (searchTerm.patient) {
      params.push(`patient=${encodeURIComponent(searchTerm.patient)}`);
    }
    if (searchTerm.fields) {
      if (_.isArray(searchTerm.fields)) {
        params.push(`fields=${encodeURIComponent(searchTerm.fields.join(','))}`);
      } else if (typeof searchTerm.fields === 'string') {
        params.push(`fields=${encodeURIComponent(searchTerm.fields)}`);
      }
    }
    let url = `/api/anthropometrist/${this.userId}/anthropometry`;
    const queryParams = params.join('&');
    if (queryParams) {
      url = `${url}?${queryParams}`;
    }
    return httpClient.get(url);
  }

  save (anthropometry) {
    const anth = _.cloneDeep(anthropometry);
    if (anthropometry._id) {
      const anthropometryId = encodeURIComponent(anth._id);
      delete anth._id;
      return httpClient.put(
        `/api/anthropometrist/${this.userId}/anthropometry/${anthropometryId}`,
        anth
      );
    }
    return httpClient.post(`/api/anthropometrist/${this.userId}/anthropometry`, anth);
  }
}
