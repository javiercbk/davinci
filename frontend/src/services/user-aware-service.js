import store from '../store';

export default class UserAwareService {
  constructor () {
    this.user = store.getters['session/user'];
  }

  get userId () {
    if (this.user) {
      return encodeURIComponent(this.user._id);
    }
    return null;
  }
}
