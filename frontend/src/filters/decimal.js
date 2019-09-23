/* eslint-disable func-names */
import _ from 'lodash';

export const decimal = function (amount, decimalPlaces = 2) {
  let value = amount;
  if (typeof value !== 'number') {
    value = parseFloat(value);
    if (_.isNaN(value)) {
      return amount;
    }
  }
  return _.round(value, decimalPlaces).toLocaleString();
};
