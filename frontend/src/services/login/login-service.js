/* eslint-disable class-methods-use-this */
import httpClient from '../http-client';

export default class LoginService {
  authenticate (credentials) {
    return httpClient.post('/api/auth', credentials);
  }

  getCurrentUser () {
    return httpClient.get('/api/auth/current');
  }

  logout () {
    return httpClient.post('/api/auth/logout');
  }
}
