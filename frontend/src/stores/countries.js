/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { i18n } from '../i18n';

// countries translations in https://github.com/michaelwittig/node-i18n-iso-countries
const getCountriesObj = (locale) => {
  const currentLocale = locale || i18n.locale;
  const allMessages = _.get(
    i18n,
    `messages.${currentLocale}`,
    _.get(i18n, `messages.${i18n.fallbackLocale}`)
  );
  return _.get(allMessages, 'countries', {});
};

const computeCountryList = countriesObj => _.map(_.keys(countriesObj), key => ({
  value: key,
  name: countriesObj[key]
}));

const initCountries = getCountriesObj();

const _state = {
  countries: initCountries,
  countryList: computeCountryList(initCountries)
};

const getters = {
  countries: storeState => storeState.countries,
  countryList: storeState => storeState.countryList
};

const mutations = {
  countries: (storeState, payload) => {
    storeState.countries = payload;
    storeState.countryList = computeCountryList(payload);
  }
};

const actions = {
  onLocaleChange: ({ commit }, newLocale) => {
    const localizedCountries = getCountriesObj(newLocale);
    commit('countries', localizedCountries);
  }
};

export default {
  state: _state,
  getters,
  mutations,
  actions,
  namespaced: true
};
