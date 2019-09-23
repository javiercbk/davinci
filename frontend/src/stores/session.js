/* eslint-disable no-param-reassign */
// global window
import LoginService from '../services/login/login-service';

let loginService;

const ensureLoginService = () => {
  if (!loginService) {
    loginService = new LoginService();
  }
};

const CSRF_TOKEN_KEY = 'csrf-token-holder';

const _state = {
  user: null,
  viewport: null,
  userRequested: false,
  csrfToken: window.localStorage.getItem(CSRF_TOKEN_KEY),
  versionChanged: false,
  firstRoute: null,
  version: null
};

const getters = {
  user: storeState => storeState.user,
  csrfToken: storeState => storeState.csrfToken,
  userRequested: storeState => storeState.userRequested,
  versionChanged: storeState => storeState.versionChanged,
  firstRoute: storeState => storeState.firstRoute,
  version: storeState => storeState.version,
  viewport: storeState => storeState.viewport
};

const mutations = {
  setUser: (storeState, payload) => {
    storeState.user = payload;
  },
  setUserRequested: (storeState, payload) => {
    storeState.userRequested = payload;
  },
  setCSRFToken: (storeState, payload) => {
    window.localStorage.setItem(CSRF_TOKEN_KEY, payload);
    storeState.csrfToken = payload;
  },
  setFirstRoute: (storeState, payload) => {
    storeState.firstRoute = payload;
  },
  setVersion: (storeState, payload) => {
    // only update the version once
    if (!storeState.version) {
      storeState.version = payload;
    }
  },
  setVersionChanged: (storeState) => {
    // only update the version once
    storeState.versionChanged = true;
  },
  setViewport: (storeState, payload) => {
    storeState.viewport = payload;
  }
};

const actions = {
  requestUserLogged: ({
    commit
  }) => {
    ensureLoginService();
    return loginService
      .getCurrentUser()
      .then((response) => {
        commit('setUser', response.data.data.user);
      })
      .catch(() => {
        // if it fails, do nothing
      })
      .finally(() => commit('setUserRequested', true));
  },
  setUser: ({
    commit
  }, payload) => {
    commit('setUser', payload);
  },
  setFirstRoute: ({
    commit
  }, payload) => {
    commit('setFirstRoute', payload);
  },
  setCSRFToken: ({
    commit
  }, payload) => {
    commit('setCSRFToken', payload);
  },
  setVersion: ({
    commit,
    state
  }, payload) => {
    if (!state.version || state.version === payload) {
      commit('setVersion', payload);
    } else {
      commit('setVersionChanged');
    }
  },
  logout: ({
    commit
    // dispatch
  }) => {
    // dispatch('tasks/clearTaskPolling');
    ensureLoginService();
    return loginService.logout().then((response) => {
      commit('setUser', null);
      commit('setCSRFToken', null);
      return response;
    });
  },
  setViewport: ({
    commit
  }, payload) => {
    commit('setViewport', payload);
  }
};

export default {
  state: _state,
  getters,
  mutations,
  actions,
  namespaced: true
};
