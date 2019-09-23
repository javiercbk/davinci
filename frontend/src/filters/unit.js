/* eslint-disable func-names, object-shorthand */
import _ from 'lodash';

const conversions = {
  // metric to imperial
  cm2in: function (cm) {
    return cm * 0.3937;
  },
  cm2imperial: function (cm) {
    return this.cm2in(cm);
  },
  mm2in: function (mm) {
    return mm * 0.0394;
  },
  mm2imperial: function (mm) {
    return this.mm2in(mm);
  },
  kg2lb: function (kg) {
    return kg * 2.205;
  },
  kg2imperial: function (kg) {
    return this.kg2lb(kg);
  },
  // imperial to metric
  in2cm: function (inches) {
    return inches * 2.54;
  },
  in2metric: function (cm) {
    return this.in2cm(cm);
  },
  in2mm: function (inches) {
    return inches * 25.4;
  },
  lb2kg: function (lb) {
    return lb * 0.4536;
  },
  lb2metric: function (lb) {
    return this.lb2kg(lb);
  },
};
/**
 *
 * @param {Number | Object} measurement in the form of a number or an object.
 * @param {Number} measurement.value the measurement value.
 * @param {String} measurement.unit the measurement unit.
 * @param {String} toUnit the target unit. Can be a fixed unit, 'imperial' or 'metric'.
 * @param {String} fromUnit the source unit if measurement is a number.
 * @return {Number} the translated measurement or the original
 * value if transformation is not posible
 */
export const unitTransform = function (measurement, toUnit, fromUnit) {
  const value = _.get(measurement, 'value', measurement);
  let transformedMeasurement = measurement;
  const properFromUnit = _.get(measurement, 'unit', fromUnit);
  if (properFromUnit && toUnit) {
    const conversionFuncKey = `${properFromUnit}2${toUnit}`;
    const conversionFunc = conversions[conversionFuncKey];
    if (conversionFunc) {
      transformedMeasurement = conversionFunc(value);
    }
  }
  return transformedMeasurement;
};
