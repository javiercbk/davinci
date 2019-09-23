/* eslint-disable func-names */
import _ from 'lodash';

/**
 * Calculates the mean (average) of an array of numbers.
 * @param {Array} arrayOfNumbers is an array of numbers
 * @return {Number} the mean of the array of numbers.
 */
export const mean = function (arrayOfNumbers) {
  return _.mean(arrayOfNumbers);
};

/**
 * Calculates the median of an array of numbers.
 * @param {Array} arrayOfNumbers is an array of numbers
 * @return {Number} the median of the array of numbers.
 */
export const median = function (arrayOfNumbers) {
  const len = arrayOfNumbers.length;
  if (len === 0) {
    return 0;
  }
  const clone = arrayOfNumbers.slice(0);
  clone.sort((a, b) => a - b);
  const half = Math.floor(len / 2);
  if (len % 2) {
    return clone[half];
  }
  return (clone[half - 1] + clone[half]) / 2.0;
};

/**
 *
 * @param {Array} arrayOfMesurements array of numbers.
 * @return {Number} returns the first element if length === 1,
 * the mean if length === 2, the median if length > 0, otherwise null.
 */
export const reduceMesurements = function (arrayOfMesurements) {
  const filtered = _.filter(arrayOfMesurements, v => v !== null);
  const len = filtered.length;
  if (len === 1) {
    return filtered[0];
  }
  if (len === 2) {
    return mean(filtered);
  }
  if (len > 0) {
    return median(filtered);
  }
  return null;
};
