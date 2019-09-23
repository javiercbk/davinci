/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import httpClient from '../http-client';
import UserAwareService from '../user-aware-service';

export default class SportService extends UserAwareService {
  retrieve (sportId) {
    const encodedId = encodeURIComponent(sportId);
    return httpClient.get(`/api/sport/${encodedId}`);
  }

  retrieveSportTranslations (sportId) {
    return httpClient.get(`/api/sport/${encodeURIComponent(sportId)}/translations`);
  }

  search (searchTerm) {
    const params = [];
    if (searchTerm.name) {
      params.push(`name=${encodeURIComponent(searchTerm.name)}`);
    }
    if (searchTerm.position) {
      params.push(`position=${encodeURIComponent(searchTerm.position)}`);
    }
    if (searchTerm.gender) {
      params.push(`gender=${encodeURIComponent(searchTerm.gender)}`);
    }
    let url = '/api/sport';
    const queryParams = params.join('&');
    if (queryParams) {
      url = `${url}?${queryParams}`;
    }
    return httpClient.get(url);
  }

  save (sportToSave) {
    const sport = _.cloneDeep(sportToSave);
    if (sport._id) {
      const sportId = encodeURIComponent(sport._id);
      delete sport._id;
      return httpClient.put(`/api/sport/${sportId}`, sport);
    }
    return httpClient.post('/api/sport', sport);
  }
}
