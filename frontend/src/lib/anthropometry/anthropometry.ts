/* eslint-disable func-names */

export interface Patient {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  personalId?: string;
  birthDate: string | Date;
  countryOfOrigin: string;
  gender: string;
  sports: string[];
  activityLevel: number;
}

export interface Anthropometry {
  // the anthropometry _id
  _id?: string;
  // the date of the measurement
  measurementDate: string | Date;
  // the error percent
  errorPercent: 2;
  // patient the patient.
  patient?: Patient;
  // bodyMass the body mass in kg.
  bodyMass: number[];
  // stature the stature in cm.
  stature: number[];
  // sittingHeight the sitting height in cm.
  sittingHeight: number[];
  armSpan: number[];
  acromialRadial: number[];
  radialeStylionRadiale: number[];
  midstylionDactylion: number[];
  iliospinaleHeight: number[];
  trochanterionHeight: number[];
  trochanterionTibialeLaterale: number[];
  tibialeLateraleHeight: number[];
  tibialeMedialeSphyrionTibiale: number[];
  foot: number[];
  // biacromial the biacromial in cm.
  biacromial: number[];
  // transverseChest the transverse chest in cm.
  transverseChest: number[];
  // anteriorPosteriorChestDepth the anterior posterior chest depth in cm.
  anteriorPosteriorChestDepth: number[];
  // biiliocristal the biiliocristal in cm.
  biiliocristal: number[];
  // humerusBiepicondylar the humerus biepicondylar in cm.
  humerusBiepicondylar: number[];
  // femurBiepicondylar the femur biepicondylar in cm.
  femurBiepicondylar: number[];
  wristBistiloid: number[];
  ankleBimaleolar: number[];
  hand: number[];
  // head the head in cm.
  head: number[];
  neck: number[];
  // armRelaxed the arm relaxed in cm.
  armRelaxed: number[];
  // armFlexedTensed the arm flexed tensed in cm.
  armFlexedTensed: number[];
  // forearm the forearm in cm.
  forearm: number[];
  wrist: number[];
  // chest the chest in cm.
  chest: number[];
  // minWaist the min waist in cm.
  minWaist: number[];
  maxAbdominal: number[];
  // the maxGlutealHip in cm.
  maxGlutealHip: number[];
  // maxThighUpper the max thigh upper in cm.
  maxThighUpper: number[];
  // the midThigh in cm.
  midThigh: number[];
  // maxCalf the max calf in cm.
  maxCalf: number[];
  minAnkle: number[];
  // triceps the triceps in mm.
  triceps: number[];
  // subscapular the subscapular in mm.
  subscapular: number[];
  biceps: number[];
  iliacCrest: number[];
  // supraspinal the supraspinal in mm.
  supraspinal: number[];
  // abdominal the abdominal in mm.
  abdominal: number[];
  // frontThigh the frontThigh in mm.
  frontThigh: number[];
  // medialCalf the medialCalf in mm.
  medialCalf: number[];
  forearmSkinFold: number[];
}

export interface AnthropometryMean {
  // patient the patient.
  patient?: Patient;
  // the body mass in kg.
  bodyMass: number;
  // the stature in cm.
  stature: number;
  // the sitting height in cm.
  sittingHeight: number;
  // the biacromial in cm.
  biacromial: number;
  // the transverse chest in cm.
  transverseChest: number;
  // the anterior posterior chest depth in cm.
  anteriorPosteriorChestDepth: number;
  // the biiliocristal in cm.
  biiliocristal: number;
  // the humerus biepicondylar in cm.
  humerusBiepicondylar: number;
  // the femur biepicondylar in cm.
  femurBiepicondylar: number;
  // the head in cm.
  head: number;
  // the arm relaxed in cm.
  armRelaxed: number;
  // the arm flexed tensed in cm.
  armFlexedTensed: number;
  // the forearm in cm.
  forearm: number;
  // the chest in cm.
  chest: number;
  // the min waist in cm.
  minWaist: number;
  // the max gluteal hip in cm
  maxGlutealHip: number;
  // the max thigh upper in cm.
  maxThighUpper: number;
  // the mid Thigh in cm.
  midThigh: number;
  // the max calf in cm.
  maxCalf: number;
  // the triceps in mm.
  triceps: number;
  // the subscapular in mm.
  subscapular: number;
  // the supraspinal in mm.
  supraspinal: number;
  // the abdominal in mm.
  abdominal: number;
  // the frontThigh in mm.
  frontThigh: number;
  // the medialCalf in mm.
  medialCalf: number;
}

export interface Masses {
  // the adipose mass.
  adipose: number;
  // the muscular mass.
  muscular: number;
  // the residual mass.
  residual: number;
  // the bony mass.
  bony: number;
  // the skin mass.
  skin?: number;
}

export interface MassesWithTotal extends Masses {
  // total the sum of all masses
  total: number;
}

export interface AnthropometryMasses extends MassesWithTotal {
  // all the percentage for each mass
  percentages: Masses;
  // the score Z for each mass except for skin.
  scoresZ: MassesWithTotal;
  // the adjusted masses.
  adjusted: MassesWithTotal;
}

export interface Somatotype {
  // the endomorphic value
  endo: number;
  // the mesomorphic value
  meso: number;
  // the ectomorphic value
  ecto: number;
}

const lodashBaseSum = function (array, iteratee) {
  let result;
  for (const value of array) {
    const current = iteratee(value);
    if (current !== undefined) {
      result = result === undefined ? current : result + current;
    }
  }
  return result;
};

/** Used as references for various `Number` constants. */
const NAN = 0 / 0;

const lodashMeanBy = function (array, iteratee) {
  const length = array == null ? 0 : array.length;
  return length ? lodashBaseSum(array, iteratee) / length : NAN;
};

const lodashMean = function (array) {
  return lodashMeanBy(array, value => value);
};

/**
 * Calculates the mean (average) of an array of numbers.
 * @param {Array} arrayOfNumbers is an array of numbers
 * @return {Number} the mean of the array of numbers.
 */
export const mean = function (arrayOfNumbers: number[]): number {
  return lodashMean(arrayOfNumbers);
};

/**
 * Calculates the median of an array of numbers.
 * @param {Array} arrayOfNumbers is an array of numbers
 * @return {Number} the median of the array of numbers.
 */
export const median = function (arrayOfNumbers: number[]): number {
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
export const reduceMesurements = function (arrayOfMesurements: number[]): number {
  const filtered = [];
  const mesurementsLen = arrayOfMesurements.length;
  let len = 0;
  for (let i = 0; i < mesurementsLen; i++) {
    const v = arrayOfMesurements[i];
    if (v !== null) {
      len++;
      filtered.push(v);
    }
  }
  if (len === 1) {
    return filtered[0];
  } else if (len === 2) {
    return mean(filtered);
  } else if (len > 0) {
    return median(filtered);
  }
  throw new Error('No Mesurementes to reduce');
};

/**
 * Known masses groups
 */
export const GROUPED_MASSES = ['adipose', 'muscular', 'residual', 'bony', 'skin'];

/**
 * REQUIRED_MEASUREMENTS has all the props names that are mandatory for generating
 * an anthropometry report.
 */
export const REQUIRED_MEASUREMENTS = [
  'bodyMass',
  'stature',
  'sittingHeight',
  'biacromial',
  'transverseChest',
  'anteriorPosteriorChestDepth',
  'biiliocristal',
  'humerusBiepicondylar',
  'femurBiepicondylar',
  'head',
  'armRelaxed',
  'armFlexedTensed',
  'forearm',
  'chest',
  'minWaist',
  'maxGlutealHip',
  'maxThighUpper',
  'midThigh',
  'maxCalf',
  'triceps',
  'subscapular',
  'supraspinal',
  'abdominal',
  'frontThigh',
  'medialCalf'
];

const MALE_SKIN_THICKNESS = 2.07;
const FEMALE_SKIN_THICKNESS = 1.96;
const MALE_SF_AREA = 68.308;
const FEMALE_SF_AREA = 73.074;
const YOUNG_SF_AREA = 70.961;

const calculateAge = function (birthday: Date) { // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const getPatientBirthDate = function(patient: Patient) {
  let birthDateMoment: Date;
  if (typeof patient.birthDate === 'string') {
    birthDateMoment = new Date(patient.birthDate);
  } else {
    birthDateMoment = patient.birthDate as Date;
  }
  return birthDateMoment;
}

/**
 * Chooses the proper surface area constant for a patient
 * @param {Object} patient the patient.
 * @param {Date} patient.birthDate the patient birth date as string, date or moment.
 * @param {String} patient.gender the patient gender. 'M' is male and 'F' is female.
 * @return {Number} the surface area constant or null if birthDate or gender is not provided.
 */
export const patientSfArea = function (patient: Patient): number {
  if (patient && patient.birthDate) {
    const age = calculateAge(getPatientBirthDate(patient));
    if (age <= 12) {
      return YOUNG_SF_AREA;
    } else if (patient.gender === 'M') {
      return MALE_SF_AREA;
    } else if (patient.gender === 'F') {
      return FEMALE_SF_AREA;
    }
  }
  throw new Error('Surface area could not be determined');
};

export const skinThickness = function (patient: Patient): number {
  if (patient) {
    if (patient.gender === 'M') {
      return MALE_SKIN_THICKNESS;
    }
    return FEMALE_SKIN_THICKNESS;
  }
  throw new Error('Skin Thickness could not be determined');
};

/**
 * Calculates the Skin mass Superficial Area.
 * @param {Number} sfArea superficial area constant.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} skin mass superficial area.
 */
const skinMassSuperficialArea = function (
  sfArea: number,
  bodyMass: number,
  stature: number
): number {
  return (sfArea * bodyMass ** 0.425 * stature ** 0.725) / 10000.0;
};

/**
 * Calculates the Skin mass Superficial Area for a male.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} skin mass superficial area.
 */
export const maleSkinMassSuperficialArea = function (bodyMass: number, stature: number) {
  return skinMassSuperficialArea(MALE_SF_AREA, bodyMass, stature);
};

/**
 * Calculates the Skin mass Superficial Area for a female.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} skin mass superficial area.
 */
export const femaleSkinMassSuperficialArea = function (bodyMass: number, stature: number): number {
  return skinMassSuperficialArea(FEMALE_SF_AREA, bodyMass, stature);
};

/**
 * Calculates the Skin mass Superficial Area for young people.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} skin mass superficial area.
 */
export const youngSkinMassSuperficialArea = function (bodyMass: number, stature: number): number {
  return skinMassSuperficialArea(YOUNG_SF_AREA, bodyMass, stature);
};

/**
 * Calculates the skin mass.
 * @param {Number} skinThicknessValue constant for either a male or a female.
 * @param {Number} skinMassSupArea the skin mass superficial area.
 * @return {Number} the skin mass in kg.
 */
const skinMass = function (skinThicknessValue: number, skinMassSupArea: number): number {
  return skinThicknessValue * skinMassSupArea * 1.05;
};

/**
 * Calculates the skin mass for a male.
 * @param {Number} skinMassSupArea the skin mass superficial area.
 * @return {Number} the skin mass in kg.
 */
export const maleSkinMass = function (skinMassSupArea: number): number {
  return skinMass(MALE_SKIN_THICKNESS, skinMassSupArea);
};

/**
 * Calculates the skin mass for a female.
 * @param {Number} skinMassSupArea the skin mass superficial area.
 * @return {Number} the skin mass in kg.
 */
export const femaleSkinMass = function (skinMassSupArea: number): number {
  return skinMass(FEMALE_SKIN_THICKNESS, skinMassSupArea);
};

/**
 * Calculates the six skin fold sum.
 * @param {Number} tricepsMedian the triceps in mm.
 * @param {Number} subscapularMedian the subscapular in mm.
 * @param {Number} supraspinalMedian the supraspinal in mm.
 * @param {Number} abdominalMedian the abdominal in mm.
 * @param {Number} frontThighMedian the frontThigh in mm.
 * @param {Number} medialCalfMedian the medialCalf in mm.
 * @return {Number} the six skin fold sum.
 */
export const sumSixFolds = function (
  tricepsMedian: number,
  subscapularMedian: number,
  supraspinalMedian: number,
  abdominalMedian: number,
  frontThighMedian: number,
  medialCalfMedian: number
): number {
  return (
    tricepsMedian +
    subscapularMedian +
    supraspinalMedian +
    abdominalMedian +
    frontThighMedian +
    medialCalfMedian
  );
};

/**
 * Calculates the score Z adipose
 * @param {Number} sumSixFolds the sum of the six skin folds in mm.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the score Z adipose.
 */
export const scoreZAdipose = function (sumSixFoldsValue: number, statureMedian: number): number {
  return (sumSixFoldsValue * (170.18 / statureMedian) - 116.41) / 34.79;
};

/**
 * Calculates the adipose mass.
 * @param {Number} zAdipose the score Z adipose.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the adipose mass.
 */
export const adiposeMass = function (zAdipose: number, statureMedian: number): number {
  return (zAdipose * 5.85 + 25.6) / (170.18 / statureMedian) ** 3;
};

/**
 * Calculates the corrected arm perimetre
 * @param {Number} armRelaxedMedian
 * @param {Number} tricepsMedian
 */
export const perCorrectedArm = function (armRelaxedMedian: number, tricepsMedian: number): number {
  return armRelaxedMedian - (tricepsMedian * 3.141) / 10.0;
};

/**
 * Calculates the correcter perimeter for the forearm.
 * @param {Number} forearmMedian in cm.
 * @return {Number} the correcter perimeter for the forearm.
 */
export const perForearm = function (forearmMedian: number) {
  return forearmMedian;
};

/**
 * Calculates the corrected perimeter for the thigh.
 * @param {Number} maxThighUpperMedian in cm.
 * @param {Number} frontThighMedian in cm.
 * @return {Number} the corrected perimeter for the thigh.
 */
export const perCorrectedThigh = function (
  maxThighUpperMedian: number,
  frontThighMedian: number
): number {
  return maxThighUpperMedian - (frontThighMedian * 3.141) / 10.0;
};

/**
 * Calculates the corrected perimeter for the calf.
 * @param {Number} maxCalfMedian in cm.
 * @param {Number} medialCalfMedian in cm.
 * @return {Number} the corrected perimeter for the calf.
 */
export const perCorrectedCalf = function (maxCalfMedian: number, medialCalfMedian: number): number {
  return maxCalfMedian - (medialCalfMedian * 3.141) / 10.0;
};

/**
 * Calculates the corrected perimeter for the thorax.
 * @param {Number} chestMedian in cm.
 * @param {Number} subscapularMedian in cm.
 * @return {Number} the corrected perimeter for the thorax.
 */
export const perCorrectedThorax = function (chestMedian: number, subscapularMedian: number): number {
  return chestMedian - (subscapularMedian * 3.141) / 10.0;
};

/**
 * Calculates the corrected perimeter sum.
 * @param {Number} corrArmPer arm corrected perimeter.
 * @param {Number} forearmPer forearm corrected perimeter.
 * @param {Number} corrThighPer thigh corrected perimeter.
 * @param {Number} corrCalfPer calf corrected perimeter.
 * @param {Number} corrThoraxPer thorax corrected perimeter.
 * @return {Number} the sum of all the correcter perimeter.
 */
export const sumCorrectedPerimeters = function (
  corrArmPer: number,
  forearmPer: number,
  corrThighPer: number,
  corrCalfPer: number,
  corrThoraxPer: number
): number {
  return corrArmPer + forearmPer + corrThighPer + corrCalfPer + corrThoraxPer;
};

/**
 * Calculates the score Z muscular.
 * @param {Number} sumCorrectedPerimetersValue sum of all the corrected perimeters in cm.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the score Z muscular.
 */
export const scoreZMuscular = function (
  sumCorrectedPerimetersValue: number,
  statureMedian: number
): number {
  return (sumCorrectedPerimetersValue * (170.18 / statureMedian) - 207.21) / 13.74;
};

/**
 * Calculates the muscular mass.
 * @param {Number} scoreZMuscularValue the score z muscular.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the muscular mass in kg.
 */
export const muscularMass = function (scoreZMuscularValue: number, statureMedian: number): number {
  return (scoreZMuscularValue * 5.4 + 24.5) / (170.18 / statureMedian) ** 3;
};

/**
 * Calculates the corrected perimeter for the waist.
 * @param {Number} minWaistMean in cm.
 * @param {Number} abdominalMean in mm.
 * @return {Number} the corrected perimeter for the waist.
 */
export const perCorrectedWaist = function (minWaistMean: number, abdominalMean: number): number {
  return minWaistMean - abdominalMean * 0.3141;
};

/**
 * Calculates the sum of the thorax.
 * @param {Number} transverseChestMean in cm.
 * @param {Number} anteriorPosteriorChestDepthMean in cm.
 * @param {Number} perCorrectedWaistValue the perimeter corrected waist.
 * @return {Number} the sum of the thorax.
 */
export const thoraxSum = function (
  transverseChestMean: number,
  anteriorPosteriorChestDepthMean: number,
  perCorrectedWaistValue: number
): number {
  return transverseChestMean + anteriorPosteriorChestDepthMean + perCorrectedWaistValue;
};

/**
 * Calculates the score Z residual.
 * @param {Number} thoraxSumValue the thorax sum.
 * @param {Number} sittingHeightMean the sitting height mean in cm.
 * @return {Number} the score Z residual.
 */
export const scoreZResidual = function (thoraxSumValue: number, sittingHeightMean: number): number {
  return (thoraxSumValue * (89.92 / sittingHeightMean) - 109.35) / 7.08;
};

/**
 * Calculates the residual mass in kg.
 * @param {Number} scoreZResidualValue the score Z residual.
 * @param {Number} sittingHeightMean the sitting height mean in cm.
 * @return {Number} the residual mass in kg.
 */
export const residualMass = function (
  scoreZResidualValue: number,
  sittingHeightMean: number
): number {
  return (scoreZResidualValue * 1.24 + 6.1) / (89.92 / sittingHeightMean) ** 3;
};

/**
 * Calculates the score Z head.
 * @param {Number} headMedian in cm.
 * @return {Number} the score Z head.
 */
export const scoreZHead = function (headMedian: number): number {
  return (headMedian - 56) / 1.44;
};

/**
 * Calculates the bony head mass.
 * @param {Number} scoreZHeadValue the score Z head.
 * @return {Number} the bony head mass in kg.
 */
export const bonyHeadMass = function (scoreZHeadValue: number): number {
  return scoreZHeadValue * 0.18 + 1.2;
};

/**
 * Calculates the diameter sum.
 * @param {Number} biacromialMedian in cm.
 * @param {Number} biiliocristalMedian in cm.
 * @param {Number} humerusBiepicondylarMedian in cm.
 * @param {Number} femurBiepicondylarMedian in cm.
 * @return {Number} the diameter sum.
 */
export const diameterSum = function (
  biacromialMedian: number,
  biiliocristalMedian: number,
  humerusBiepicondylarMedian: number,
  femurBiepicondylarMedian: number
): number {
  return (
    biacromialMedian +
    biiliocristalMedian +
    humerusBiepicondylarMedian * 2 +
    femurBiepicondylarMedian * 2
  );
};

/**
 * Calculates the score Z Bony Body.
 * @param {Number} diameterSumValue in cm.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the score Z bony body.
 */
export const scoreZBonyBody = function (diameterSumValue: number, statureMedian: number): number {
  return (diameterSumValue * (170.18 / statureMedian) - 98.88) / 5.33;
};

/**
 * Calculates the bony body mass
 * @param {Number} scoreZBonyBodyValue the score z bony body.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the bony body mass in kg.
 */
export const bonyBodyMass = function (scoreZBonyBodyValue: number, statureMedian: number): number {
  return (scoreZBonyBodyValue * 1.34 + 6.7) / (170.18 / statureMedian) ** 3;
};

/**
 * Calculates the total bony mass.
 * @param {Number} bonyHeadMassValue in kg.
 * @param {Number} bonyBodyMassValue in kg.
 * @return {Number} the total bony mass in kg.
 */
export const totalBonyMass = function (
  bonyHeadMassValue: number,
  bonyBodyMassValue: number
): number {
  return bonyHeadMassValue + bonyBodyMassValue;
};

/**
 * Calculates the structurated weight.
 * @param {Number} skinMassValue in kg.
 * @param {Number} adiposeMassValue in kg.
 * @param {Number} muscularMassValue in kg.
 * @param {Number} residualMassValue in kg.
 * @param {Number} bonyHeadMassValue in kg.
 * @param {Number} bonyBodyMassValue in kg.
 * @return {Number} structurated weight in kg.
 */
export const structuratedWeight = function (
  skinMassValue: number,
  adiposeMassValue: number,
  muscularMassValue: number,
  residualMassValue: number,
  bonyHeadMassValue: number,
  bonyBodyMassValue: number
): number {
  return (
    skinMassValue +
    adiposeMassValue +
    muscularMassValue +
    residualMassValue +
    bonyHeadMassValue +
    bonyBodyMassValue
  );
};

/**
 * Calculates the difference between the structurated weight and body mass.
 * @param {Number} structuratedWeightValue the structurated weight in kg.
 * @param {Number} bodyMass the body mass in kg.
 * @return {Number} the difference between the structurated weight and body mass in kg.
 */
export const structuratedWeightBodyMassDiff = function (
  structuratedWeightValue: number,
  bodyMass: number
): number {
  return structuratedWeightValue - bodyMass;
};

/**
 * Calculates the difference percentage.
 * @param {Number} structuratedWeightBodyMassDiffValue the difference between the structurated
 * weight and body mass.
 * @param {Number} bodyMass in kg.
 * @return {Number} the difference percentage
 */
export const diffPercentage = function (
  structuratedWeightBodyMassDiffValue: number,
  bodyMass: number
): number {
  return structuratedWeightBodyMassDiffValue / bodyMass;
};

/**
 * Calculates the mass percent measurement.
 * @param {Number} structuratedWeightValue the structurated weight in kg.
 * @param {Number} massMeasurement the mass measurement in kg.
 * @return {Number} the adiposeMassPercent
 */
export const massPercent = function (
  structuratedWeightValue: number,
  massMeasurement: number
): number {
  return massMeasurement / structuratedWeightValue;
};

/**
 * Calculates the mass adjustment.
 * @param {Number} structuratedWeightBodyMassDiffValue the difference between
 * the structurated weight and body mass.
 * @param {Number} massMeasurement the mass measurement in kg.
 * @return {Number} the mass adjustment.
 */
export const massAdjustment = function (
  structuratedWeightBodyMassDiffValue: number,
  massMeasurement: number
): number {
  return structuratedWeightBodyMassDiffValue * massMeasurement;
};

/**
 * Calculates the adjusted mass in kg.
 * @param {Number} massAdjustmentValue the mass adjustment
 * @param {Number} massMeasurement in kg.
 * @return {Number} the adjusted mass in kg.
 */
export const adjustedMass = function (massAdjustmentValue: number, massMeasurement: number): number {
  return massMeasurement - massAdjustmentValue;
};

/**
 * Adjusts a mass measurement
 * @param {Number} structuratedWeightValue the structurated Weight.
 * @param {Number} structuratedWeightBodyMassDiffValue the structurated Weight Body Mass Diff.
 * @param {Number} massMeasurement the mass measurement.
 * @returns {Number} the adjusted mass.
 */
export const adjustMass = function (
  structuratedWeightValue: number,
  structuratedWeightBodyMassDiffValue: number,
  massMeasurement: number
): number {
  const massPer = massPercent(structuratedWeightValue, massMeasurement);
  const adiposeAdjustment = massAdjustment(structuratedWeightBodyMassDiffValue, massPer);
  return adjustedMass(adiposeAdjustment, massMeasurement);
};

/**
 * Calculates the structurated weight body mass difference adjustment.
 * @param {Number} structuratedWeightBodyMassDiffValue the structurated weight body mass difference.
 * @param {Number} structuredWeightAdjustment the structured weight adjustment.
 * @return {Number} the structurated weight body mass difference adjustment.
 */
export const structuratedWeightBodyMassDiffAdjustment = function (
  structuratedWeightBodyMassDiffValue: number,
  structuredWeightAdjustment: number
): number {
  return structuratedWeightBodyMassDiffValue - structuredWeightAdjustment;
};

/**
 * Calculates the difference between reference bony mass and the bony mass in kg.
 * @param {Number} referenceBonyMass in kg.
 * @param {Number} adjustedTotalBonyMass in kg.
 * @return {Number} the difference between reference bony mass and the bony mass in kg.
 */
export const referenceBonyMassBonyMass = function (
  referenceBonyMass: number,
  adjustedTotalBonyMass: number
): number {
  // return Math.abs(referenceBonyMass - adjustedTotalBonyMass);
  return referenceBonyMass - adjustedTotalBonyMass;
};

/**
 * Calculates the four masses sum kg.
 * @param {Number} referenceBonyMass in kg.
 * @param {Number} adjustedTotalBonyMass in kg.
 * @return {Number} the four masses sum.
 */
export const fourMassesSum = function (
  referenceBonyMass: number,
  adjustedStructuratedWeight: number
): number {
  // return Math.abs(adjustedStructuratedWeight - referenceBonyMass);
  return adjustedStructuratedWeight - referenceBonyMass;
};

/**
 * Calculates the basic mass.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} the basic mass.
 */
export const basicMass = function (bodyMass: number, stature: number): number {
  return bodyMass * (170.18 / stature) ** 3;
};

/**
 * Calculates the basic mass score Z.
 * @param {Number} basicMassValue the basic mass.
 * @return {Number} the basic mass score Z.
 */
export const basicMassScoreZ = function (basicMassValue: number): number {
  return (basicMassValue - 64.58) / 8.6;
};

/**
 * Calculates the pre total mass score Z.
 * @param {Number} totalMassValue in kg.
 * @param {Number} statureMean in cm.
 * @return {Number} the pre total mass score z.
 */
export const preTotalMassScoreZ = function (totalMassValue: number, statureMean: number): number {
  return totalMassValue * (170.18 / statureMean) ** 3;
};

/**
 * Calculates the total mass score z.
 * @param {Number} preTotalMassScoreZValue the pre total mass score z.
 * @return {Number} the total mass score z.
 */
export const totalMassScoreZ = function (preTotalMassScoreZValue: number): number {
  return (preTotalMassScoreZValue - 64.58) / 8.6;
};

/**
 * Calculates the pre score Z.
 * @param {Number} stature in cm.
 * @param {Number} measurement the measurement.
 * @return {Number} the pre score Z.
 */
export const preScoreZ = function (stature: number, measurement: number): number {
  return measurement * (170.18 / stature);
};

/**
 * Creates a curry function of the pre score z function.
 * @param {Number} stature  in cm.
 * @returns {Function} curried preScoreZ function.
 */
export const curryPreScoreZ = function (stature: number): (v: number) => number {
  return function (measurement: number): number {
    return preScoreZ(stature, measurement);
  };
};

/**
 * Calculates the sitting height score Z
 * @param {Number} basicHeightValue the basic height value in cm.
 * @returns the sitting height score z
 */
export const sittingHeightScoreZ = function (basicHeightValue: number): number {
  return (basicHeightValue - 89.92) / 4.5;
};

/**
 * Calculates the Biacromial Score Z.
 * @param {Number} preBiacromialScoreZ the biacromial pre score z value.
 * @returns {Number} the Biacromial Score Z.
 */
export const biacromialScoreZ = function (preBiacromialScoreZ: number): number {
  return (preBiacromialScoreZ - 38.04) / 1.92;
};

/**
 * Calculates the transverseChestScoreZ.
 * @param {Number} preTransverseChestScoreZ the preTransverseChestScoreZ.
 * @return {Number} the transverseChest score z.
 */
export const transverseChestScoreZ = function (preTransverseChestScoreZ: number): number {
  return (preTransverseChestScoreZ - 27.92) / 1.74;
};

/**
 * Calculates the anteriorPosteriorChestDepthScoreZ.
 * @param {Number} preAnteriorPosteriorChestDepthScoreZ the preAnteriorPosteriorChestDepthScoreZ.
 * @return {Number} the anteriorPosteriorChestDepth score z.
 */
export const anteriorPosteriorChestDepthScoreZ = function (preAnteriorPosteriorChestDepthScoreZ: number): number {
  return (preAnteriorPosteriorChestDepthScoreZ - 17.5) / 1.38;
};

/**
 * Calculates the biiliocristalScoreZ.
 * @param {Number} preBiiliocristalScoreZ the preBiiliocristalScoreZ.
 * @return {Number} the biiliocristal score z.
 */
export const biiliocristalScoreZ = function (preBiiliocristalScoreZ: number): number {
  return (preBiiliocristalScoreZ - 28.84) / 1.75;
};

/**
 * Calculates the humerusBiepicondylarScoreZ.
 * @param {Number} preHumerusBiepicondylarScoreZ the preHumerusBiepicondylarScoreZ.
 * @return {Number} the humerusBiepicondylar score z.
 */
export const humerusBiepicondylarScoreZ = function (preHumerusBiepicondylarScoreZ: number): number {
  return (preHumerusBiepicondylarScoreZ - 6.48) / 0.35;
};

/**
 * Calculates the femurBiepicondylarScoreZ.
 * @param {Number} preFemurBiepicondylarScoreZ the preFemurBiepicondylarScoreZ.
 * @return {Number} the femurBiepicondylar score z.
 */
export const femurBiepicondylarScoreZ = function (preFemurBiepicondylarScoreZ: number): number {
  return (preFemurBiepicondylarScoreZ - 9.52) / 0.48;
};

/**
 * Calculates the headScoreZ.
 * @param {Number} preHeadScoreZ the preHeadScoreZ.
 * @return {Number} the head score z.
 */
export const headScoreZ = function (preHeadScoreZ: number): number {
  return (preHeadScoreZ - 56) / 1.44;
};

/**
 * Calculates the armRelaxedScoreZ.
 * @param {Number} preArmRelaxedScoreZ the preArmRelaxedScoreZ.
 * @return {Number} the armRelaxed score z.
 */
export const armRelaxedScoreZ = function (preArmRelaxedScoreZ: number): number {
  return (preArmRelaxedScoreZ - 26.89) / 2.33;
};

/**
 * Calculates the armFlexedTensedScoreZ.
 * @param {Number} preArmFlexedTensedScoreZ the preArmFlexedTensedScoreZ.
 * @return {Number} the armFlexedTensed score z.
 */
export const armFlexedTensedScoreZ = function (preArmFlexedTensedScoreZ: number): number {
  return (preArmFlexedTensedScoreZ - 29.41) / 2.37;
};

/**
 * Calculates the forearmScoreZ.
 * @param {Number} preForearmScoreZ the preForearmScoreZ.
 * @return {Number} the forearm score z.
 */
export const forearmScoreZ = function (preForearmScoreZ: number): number {
  return (preForearmScoreZ - 25.13) / 1.41;
};

/**
 * Calculates the chestScoreZ.
 * @param {Number} preChestScoreZ the preChestScoreZ.
 * @return {Number} the chest score z.
 */
export const chestScoreZ = function (preChestScoreZ: number): number {
  return (preChestScoreZ - 87.86) / 5.18;
};

/**
 * Calculates the minWaistScoreZ.
 * @param {Number} preMinWaistScoreZ the preMinWaistScoreZ.
 * @return {Number} the minWaist score z.
 */
export const minWaistScoreZ = function (preMinWaistScoreZ: number): number {
  return (preMinWaistScoreZ - 71.91) / 4.45;
};

/**
 * Calculates the max gluteal hip score Z.
 * @param {Number} preMaxGlutealHipScoreZ the preMaxGlutealHipScoreZ.
 * @return {Number} the max gluteal hip score Z.
 */
export const maxGlutealHipScoreZ = function (preMaxGlutealHipScoreZ: number): number {
  return (preMaxGlutealHipScoreZ - 94.67) / 5.58;
};

/**
 * Calculates the maxThighUpperScoreZ.
 * @param {Number} preMaxThighUpperScoreZ the preMaxThighUpperScoreZ.
 * @return {Number} the maxThighUpper score z.
 */
export const maxThighUpperScoreZ = function (preMaxThighUpperScoreZ: number): number {
  return (preMaxThighUpperScoreZ - 55.82) / 4.23;
};

/**
 * Calculates the mid thight score Z.
 * @param {Number} midThighMean the mid thight mean in cm.
 * @return {Number} the mid thight score Z.
 */
export const midThighScoreZ = function (midThighMean: number): number {
  return (midThighMean - 53.2) / 4.56;
};

/**
 * Calculates the maxCalfScoreZ.
 * @param {Number} preMaxCalfScoreZ the preMaxCalfScoreZ.
 * @return {Number} the maxCalf score z.
 */
export const maxCalfScoreZ = function (preMaxCalfScoreZ: number): number {
  return (preMaxCalfScoreZ - 35.25) / 2.3;
};

/**
 * Calculates the tricepsScoreZ.
 * @param {Number} preTricepsScoreZ the preTricepsScoreZ.
 * @return {Number} the triceps score z.
 */
export const tricepsScoreZ = function (preTricepsScoreZ: number): number {
  return (preTricepsScoreZ - 15.4) / 4.47;
};

/**
 * Calculates the subscapularScoreZ.
 * @param {Number} preSubscapularScoreZ the preSubscapularScoreZ.
 * @return {Number} the subscapular score z.
 */
export const subscapularScoreZ = function (preSubscapularScoreZ: number): number {
  return (preSubscapularScoreZ - 17.2) / 5.07;
};

/**
 * Calculates the supraspinalScoreZ.
 * @param {Number} preSupraspinalScoreZ the preSupraspinalScoreZ.
 * @return {Number} the supraspinal score z.
 */
export const supraspinalScoreZ = function (preSupraspinalScoreZ: number): number {
  return (preSupraspinalScoreZ - 15.4) / 4.47;
};

/**
 * Calculates the abdominalScoreZ.
 * @param {Number} preAbdominalScoreZ the preAbdominalScoreZ.
 * @return {Number} the abdominal score z.
 */
export const abdominalScoreZ = function (preAbdominalScoreZ: number): number {
  return (preAbdominalScoreZ - 25.4) / 7.78;
};

/**
 * Calculates the frontThighScoreZ.
 * @param {Number} preFrontThighScoreZ the preFrontThighScoreZ.
 * @return {Number} the frontThigh score z.
 */
export const frontThighScoreZ = function (preFrontThighScoreZ: number): number {
  return (preFrontThighScoreZ - 27) / 8.33;
};

/**
 * Calculates the medialCalfScoreZ.
 * @param {Number} preMedialCalfScoreZ the preMedialCalfScoreZ.
 * @return {Number} the medialCalf score z.
 */
export const medialCalfScoreZ = function (preMedialCalfScoreZ: number): number {
  return (preMedialCalfScoreZ - 16) / 4.67;
};

/**
 * Calculate all anthropometry medians for every mandatory property
 * @param {Anthropometry} anthropometry an anthropometry will all measurements.
 * @return {AnthropometryMean} the mean of all measurements.
 */
export const anthropometryMedians = function (anthropometry: Anthropometry): AnthropometryMean {
  const anyAnthropometryMedian: any = {};
  if (anthropometry) {
    const len = REQUIRED_MEASUREMENTS.length;
    const anyAnthropometry: any = anthropometry;
    for (let i = 0; i < len; i++) {
      const key = REQUIRED_MEASUREMENTS[i];
      const numbers = anyAnthropometry[key] as number[];
      anyAnthropometryMedian[key] = reduceMesurements(numbers);
    }
    anyAnthropometryMedian.patient = anyAnthropometry.patient;
  }
  return anyAnthropometryMedian as AnthropometryMean;
};

/**
 * Calculates all score z for all measurements except for stature.
 * @param {AnthropometryMean} anthropometry an anthropometry with mean.
 * @return {AnthropometryMean} the score z of each measurement.
 */
export const anthropometryScoreZ = function (anthropometry: AnthropometryMean): AnthropometryMean {
  const basicMassValue = basicMass(anthropometry.bodyMass, anthropometry.stature);
  const cpsz = curryPreScoreZ(anthropometry.stature);
  const apcdsz = anteriorPosteriorChestDepthScoreZ(cpsz(anthropometry.anteriorPosteriorChestDepth));
  return {
    bodyMass: basicMassScoreZ(basicMassValue),
    stature: anthropometry.stature,
    sittingHeight: sittingHeightScoreZ(cpsz(anthropometry.sittingHeight)),
    biacromial: biacromialScoreZ(cpsz(anthropometry.biacromial)),
    transverseChest: transverseChestScoreZ(cpsz(anthropometry.transverseChest)),
    anteriorPosteriorChestDepth: apcdsz,
    biiliocristal: biiliocristalScoreZ(cpsz(anthropometry.biiliocristal)),
    humerusBiepicondylar: humerusBiepicondylarScoreZ(cpsz(anthropometry.humerusBiepicondylar)),
    femurBiepicondylar: femurBiepicondylarScoreZ(cpsz(anthropometry.femurBiepicondylar)),
    head: headScoreZ(cpsz(anthropometry.head)),
    armRelaxed: armRelaxedScoreZ(cpsz(anthropometry.armRelaxed)),
    armFlexedTensed: armFlexedTensedScoreZ(cpsz(anthropometry.armFlexedTensed)),
    forearm: forearmScoreZ(cpsz(anthropometry.forearm)),
    chest: chestScoreZ(cpsz(anthropometry.chest)),
    minWaist: minWaistScoreZ(cpsz(anthropometry.minWaist)),
    maxGlutealHip: maxGlutealHipScoreZ(cpsz(anthropometry.maxGlutealHip)),
    maxThighUpper: maxThighUpperScoreZ(cpsz(anthropometry.maxThighUpper)),
    midThigh: midThighScoreZ(anthropometry.midThigh),
    maxCalf: maxCalfScoreZ(cpsz(anthropometry.maxCalf)),
    triceps: tricepsScoreZ(cpsz(anthropometry.triceps)),
    subscapular: subscapularScoreZ(cpsz(anthropometry.subscapular)),
    supraspinal: supraspinalScoreZ(cpsz(anthropometry.supraspinal)),
    abdominal: abdominalScoreZ(cpsz(anthropometry.abdominal)),
    medialCalf: medialCalfScoreZ(cpsz(anthropometry.medialCalf)),
    frontThigh: frontThighScoreZ(cpsz(anthropometry.frontThigh))
  };
};

/**
 * Returns the anthropometry masses.
 * @param {AnthropometryMean} anthropometry the anthropometry
 * @param {Patient} patient the patient.
 * @return {AnthropometryMasses} The anthropometry masses.
 */
export const anthropometryMasses = function (
  anthropometry: AnthropometryMean,
  patient: Patient
): AnthropometryMasses {
  const sfArea = patientSfArea(patient);
  const skinMassSupAreaValue = skinMassSuperficialArea(
    sfArea,
    anthropometry.bodyMass,
    anthropometry.stature
  );
  const sumSixFoldsValue = sumSixFolds(
    anthropometry.triceps,
    anthropometry.subscapular,
    anthropometry.supraspinal,
    anthropometry.abdominal,
    anthropometry.frontThigh,
    anthropometry.medialCalf
  );
  const adiposeScoreZValue = scoreZAdipose(sumSixFoldsValue, anthropometry.stature);
  const corrArmPer = perCorrectedArm(anthropometry.armRelaxed, anthropometry.triceps);
  const forearmPer = perForearm(anthropometry.forearm);
  const corrThighPer = perCorrectedThigh(anthropometry.maxThighUpper, anthropometry.frontThigh);
  const corrCalfPer = perCorrectedCalf(anthropometry.maxCalf, anthropometry.medialCalf);
  const corrThoraxPer = perCorrectedThorax(anthropometry.chest, anthropometry.subscapular);
  const sumCorrectedPerimetersValue = sumCorrectedPerimeters(
    corrArmPer,
    forearmPer,
    corrThighPer,
    corrCalfPer,
    corrThoraxPer
  );
  const scoreZMuscularValue = scoreZMuscular(sumCorrectedPerimetersValue, anthropometry.stature);
  const perCorrectedWaistValue = perCorrectedWaist(anthropometry.minWaist, anthropometry.abdominal);
  const thoraxSumValue = thoraxSum(
    anthropometry.transverseChest,
    anthropometry.anteriorPosteriorChestDepth,
    perCorrectedWaistValue
  );
  const scoreZResidualValue = scoreZResidual(thoraxSumValue, anthropometry.sittingHeight);
  const bonyHeadMassValue = bonyHeadMass(scoreZHead(anthropometry.head));
  const diameterSumValue = diameterSum(
    anthropometry.biacromial,
    anthropometry.biiliocristal,
    anthropometry.humerusBiepicondylar,
    anthropometry.femurBiepicondylar
  );
  const scoreZBonyBodyValue = scoreZBonyBody(diameterSumValue, anthropometry.stature);
  const bonyBodyMassValue = bonyBodyMass(scoreZBonyBodyValue, anthropometry.stature);
  const adipose = adiposeMass(adiposeScoreZValue, anthropometry.stature);
  const muscular = muscularMass(scoreZMuscularValue, anthropometry.stature);
  const residual = residualMass(scoreZResidualValue, anthropometry.sittingHeight);
  const bony = totalBonyMass(bonyHeadMassValue, bonyBodyMassValue);
  const skin = skinMass(skinThickness(patient), skinMassSupAreaValue);
  const structuratedWeightValue = structuratedWeight(
    skin,
    adipose,
    muscular,
    residual,
    bonyHeadMassValue,
    bonyBodyMassValue
  );
  const structuratedWeightBodyMassDiffValue = structuratedWeightBodyMassDiff(
    structuratedWeightValue,
    anthropometry.bodyMass
  );
  const adjustedAdipose = adjustMass(
    structuratedWeightValue,
    structuratedWeightBodyMassDiffValue,
    adipose
  );
  const adjustedMuscular = adjustMass(
    structuratedWeightValue,
    structuratedWeightBodyMassDiffValue,
    muscular
  );
  const adjustedResidual = adjustMass(
    structuratedWeightValue,
    structuratedWeightBodyMassDiffValue,
    residual
  );
  const adjustedBony = adjustMass(
    structuratedWeightValue,
    structuratedWeightBodyMassDiffValue,
    bony
  );
  const adjustedSkin = adjustMass(
    structuratedWeightValue,
    structuratedWeightBodyMassDiffValue,
    skin
  );
  const adjusted: MassesWithTotal = {
    adipose: adjustedAdipose,
    muscular: adjustedMuscular,
    residual: adjustedResidual,
    bony: adjustedBony,
    skin: adjustedSkin,
    total: adjustedAdipose + adjustedMuscular + adjustedResidual + adjustedBony + adjustedSkin
  };
  // TODO: add readjusted masses
  // masses.readjusted = {};
  const percentages: MassesWithTotal = {
    adipose: adipose / structuratedWeightValue,
    muscular: muscular / structuratedWeightValue,
    residual: residual / structuratedWeightValue,
    bony: bony / structuratedWeightValue,
    skin: skin / structuratedWeightValue,
    total: 100
  };
  const scoresZ: MassesWithTotal = {
    adipose: adiposeScoreZValue,
    muscular: scoreZMuscularValue,
    residual: scoreZResidualValue,
    bony: scoreZBonyBodyValue,
    total: totalMassScoreZ(preTotalMassScoreZ(adjusted.total, anthropometry.stature))
  };
  return {
    adipose,
    muscular,
    residual,
    bony,
    skin,
    total: adipose + muscular + residual + bony + skin,
    percentages,
    scoresZ,
    adjusted
  };
};

/**
 * Calculates the endomorphic somatotype value.
 * @param {AnthropometryMean} anthropometryMean
 * @returns {Number} the endomorphic somatotype value.
 */
export const endomorphic = function (anthropometryMean: AnthropometryMean): number {
  const { triceps, subscapular, supraspinal, stature } = anthropometryMean;
  const threeFoldsSum = triceps + subscapular + supraspinal;
  const stature170 = 170.18 / stature;
  const threeFoldsSumTimesStature170 = threeFoldsSum * stature170;
  return (
    -0.7182 +
    (0.1451 * threeFoldsSumTimesStature170 -
      (0.00068 * threeFoldsSumTimesStature170 ** 2 + 0.0000014 * threeFoldsSumTimesStature170 ** 3))
  );
};

const somatoypeCorrectedPerimeter = function (measurement: number, skinFold: number): number {
  return measurement - skinFold / 10.0;
};

/**
 * Calculates the mesomorphic somatotype value.
 * @param {AnthropometryMean} anthropometryMean
 * @returns {Number} the mesomorphic somatotype value.
 */
export const mesomorphic = function (anthropometryMean: AnthropometryMean): number {
  const {
    armRelaxed,
    femurBiepicondylar,
    humerusBiepicondylar,
    maxCalf,
    medialCalf,
    triceps,
    stature
  } = anthropometryMean;
  const corPerArm = somatoypeCorrectedPerimeter(armRelaxed, triceps);
  const corPerCalf = somatoypeCorrectedPerimeter(maxCalf, medialCalf);
  return (
    0.858 * humerusBiepicondylar +
    0.601 * femurBiepicondylar +
    0.188 * corPerArm +
    0.161 * corPerCalf -
    stature * 0.131 +
    4.5
  );
};

/**
 * Calculates the ectomorphic somatotype value.
 * @param {AnthropometryMean} anthropometryMean
 * @returns {Number} the ectomorphic somatotype value.
 */
export const ectomorphic = function (anthropometryMean: AnthropometryMean): number {
  const { bodyMass, stature } = anthropometryMean;
  const hwr = stature / bodyMass ** (1.0 / 3.0);
  let endo = null;
  if (hwr <= 38.25) {
    endo = 0.1;
  } else if (hwr < 40.75) {
    endo = 0.463 * hwr - 17.63;
  } else {
    endo = 0.732 * hwr - 28.58;
  }
  return endo;
};

/**
 * Calculates the somatotypes values.
 * @param {AnthropometryMean} anthropometryMean
 * @returns {Somatotype} the somatotypes values.
 */
export const somatotype = function (anthropometryMean: AnthropometryMean): Somatotype {
  return {
    ecto: ectomorphic(anthropometryMean),
    meso: mesomorphic(anthropometryMean),
    endo: endomorphic(anthropometryMean)
  };
};

/**
 *
 * @param {AnthropometryMean} anthropometry
 */
export const idealWeight = function (anthropometry: AnthropometryMean): number {
  const { stature, patient } = anthropometry;
  if (patient) {
    if (patient.gender === 'M') {
      return (stature / 100) ** 2 * 23;
    } else if (patient.gender === 'F') {
      return (stature / 100) ** 2 * 21.5;
    }
  }
  throw new Error('Ideal weight could not be calculated');
};

/**
 *
 * @param {AnthropometryMean} anthropometry
 */
export const basalMetabolicRateSpecialWeight = function (anthropometry: AnthropometryMean): number {
  const { bodyMass } = anthropometry;
  const idealWg = idealWeight(anthropometry);
  return idealWg + (bodyMass - idealWg * 0.25);
};

/**
 *
 * @param {AnthropometryMean} anthropometry
 */
export const basalMetabolicRate = function (anthropometry: AnthropometryMean): number {
  const { bodyMass, stature, patient } = anthropometry;
  const idealWg = idealWeight(anthropometry);
  const spWg = basalMetabolicRateSpecialWeight(anthropometry);
  const wg = bodyMass < idealWg ? bodyMass : spWg;
  if (patient && patient.birthDate) {
    const years = calculateAge(getPatientBirthDate(patient));
    if (patient.gender === 'M') {
      return 66 + 13.7 * wg + 5 * stature - 6.8 * years;
    } else if (patient.gender === 'F') {
      return 655 + 9.6 * wg + 1.7 * stature - 4.7 * years;
    }
  }
  throw new Error('Basal metabolic rate could not be determined');
};

/**
 *
 * @param {AnthropometryMean} anthropometry
 */
export const phisicalActivityLevel = function (patient: Patient): number {
  if (patient.gender === 'M') {
    switch (patient.activityLevel) {
      case -1:
        return 0;
      case 0:
        return 1.3;
      case 1:
        return 1.6;
      case 2:
        return 1.7;
      case 3:
        return 2.1;
      case 4:
        return 2.4;
      default:
        break;
    }
  } else if (patient.gender === 'F') {
    switch (patient.activityLevel) {
      case -1:
        return 0;
      case 0:
        return 1.3;
      case 1:
        return 1.5;
      case 2:
        return 1.6;
      case 3:
        return 1.9;
      case 4:
        return 2.2;
      default:
        break;
    }
  }
  throw new Error('Activity level could not be determined');
};

/**
 *
 * @param {AnthropometryMean} anthropometry
 */
export const estimatedTotalEnergyExpenditure = function (anthropometry: AnthropometryMean): number {
  if (anthropometry.patient) {
    const bmr = basalMetabolicRate(anthropometry);
    const pal = phisicalActivityLevel(anthropometry.patient);
    return bmr * pal;
  }
  throw new Error('Total energy expenditure could not be determined');
};
