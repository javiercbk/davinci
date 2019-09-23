import _ from 'lodash';

// eslint-disable-next-line func-names
export const countriesList = function (localeObject) {
  const {
    countries
  } = localeObject;
  const keys = _.keys(countries);
  return _.map(keys, k => ({
    name: countries[k],
    isoCode: k
  }));
};
