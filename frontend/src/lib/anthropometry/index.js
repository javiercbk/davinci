import _ from 'lodash';
import { REQUIRED_MEASUREMENTS } from './anthropometry';

export const emptyMessurements = () => ({
  errorPercent: 2,
  bodyMass: [],
  stature: [],
  sittingHeight: [],
  armSpan: [],
  acromialRadial: [],
  radialeStylionRadiale: [],
  midstylionDactylion: [],
  iliospinaleHeight: [],
  trochanterionHeight: [],
  trochanterionTibialeLaterale: [],
  tibialeLateraleHeight: [],
  tibialeMedialeSphyrionTibiale: [],
  foot: [],
  biacromial: [],
  transverseChest: [],
  anteriorPosteriorChestDepth: [],
  biiliocristal: [],
  humerusBiepicondylar: [],
  femurBiepicondylar: [],
  wristBistiloid: [],
  ankleBimaleolar: [],
  hand: [],
  head: [],
  neck: [],
  armRelaxed: [],
  armFlexedTensed: [],
  forearm: [],
  wrist: [],
  chest: [],
  minWaist: [],
  maxAbdominal: [],
  maxGlutealHip: [],
  maxThighUpper: [],
  midThigh: [],
  maxCalf: [],
  minAnkle: [],
  triceps: [],
  subscapular: [],
  biceps: [],
  iliacCrest: [],
  supraspinal: [],
  abdominal: [],
  frontThigh: [],
  medialCalf: [],
  forearmSkinFold: []
});

export const emptyAnthropometry = () => _.assignIn(
  {},
  {
    _id: null,
    patient: null,
    measurementDate: ''
  },
  emptyMessurements()
);

export const missingAnthropometryMeasurements = (anthropometry) => {
  const anth = _.pick(anthropometry, REQUIRED_MEASUREMENTS);
  const missingProperties = [];
  _.forEach(_.keys(anth), (key) => {
    let isCompleted = false;
    if (!_.isEmpty(anth[key])) {
      if (_.isArray(anth[key])) {
        isCompleted = _.some(anth[key], m => !_.isEmpty(m));
      } else {
        isCompleted = true;
      }
    }
    if (isCompleted) {
      missingProperties.push(key);
    }
  });
  return missingProperties;
};

// eslint-disable-next-line max-len
export const isAnthropometryCompleted = anthropometry => missingAnthropometryMeasurements(anthropometry).length === 0;

export const isRequiredProp = propName => REQUIRED_MEASUREMENTS.indexOf(propName) !== -1;

export const requiredProps = () => REQUIRED_MEASUREMENTS.slice(0);
