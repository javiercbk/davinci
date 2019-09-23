/* eslint-disable class-methods-use-this */
import httpClient from '../http-client';

export default class UserService {
  create (newUser) {
    return httpClient.post('/api/user', newUser);
  }

  checkEmailExist (emailToCheck) {
    return httpClient.get(`/api/user/check?email=${encodeURIComponent(emailToCheck)}`);
  }
}
