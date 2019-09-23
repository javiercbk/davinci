/* eslint-disable no-param-reassign */
import axios from 'axios';
import store from '../store';

const axiosInstance = axios.create({
  // insert axios options here.
});

axiosInstance.interceptors.request.use((config) => {
  if (config.method !== 'GET' && config.method !== 'HEAD' && config.method !== 'OPTIONS') {
    const csrfToken = store.getters['session/csrfToken'];
    if (csrfToken) {
      config.headers['csrf-token'] = csrfToken;
    }
  }
  return config;
});

export default axiosInstance;
