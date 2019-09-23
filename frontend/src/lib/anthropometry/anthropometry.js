/* eslint-disable func-names */
import moment from 'moment';
import { reduceMesurements } from '../statistics';
// import {
//   mean,
//   median
// } from '../statistics';

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

/**
 * @typedef {Object} Patient
 * @property {String} email the patient email.
 * @property {String} firstName the patient first name.
 * @property {String} lastName the patient last name.
 * @property {String} personalId the patient personal id.
 * @property {String} birthDate the patient birth date.
 * @property {String} countryOfOrigin the patient country of origin.
 * @property {String} gender the patient gender.
 * @property {String} sports the patient sports.
 * @property {Number} activityLevel the patient activity level.
 */

/**
 * @typedef {Object} Anthropometry
 * @property {Patient} patient the patient.
 * @property {Number[]} bodyMass the body mass in kg.
 * @property {Number[]} stature the stature in cm.
 * @property {Number[]} sittingHeight the sitting height in cm.
 * @property {Number[]} biacromial the biacromial in cm.
 * @property {Number[]} transverseChest the transverse chest in cm.
 * @property {Number[]} anteriorPosteriorChestDepth the anterior posterior chest
 * depth in cm.
 * @property {Number[]} biiliocristal the biiliocristal in cm.
 * @property {Number[]} humerusBiepicondylar the humerus biepicondylar in cm.
 * @property {Number[]} femurBiepicondylar the femur biepicondylar in cm.
 * @property {Number[]} head the head in cm.
 * @property {Number[]} armRelaxed the arm relaxed in cm.
 * @property {Number[]} armFlexedTensed the arm flexed tensed in cm.
 * @property {Number[]} forearm the forearm in cm.
 * @property {Number[]} chest the chest in cm.
 * @property {Number[]} minWaist the min waist in cm.
 * @property {Number[]} maxThighUpper the max thigh upper in cm.
 * @property {Number[]} maxCalf the max calf in cm.
 * @property {Number[]} triceps the triceps in mm.
 * @property {Number[]} subscapular the subscapular in mm.
 * @property {Number[]} supraspinal the supraspinal in mm.
 * @property {Number[]} abdominal the abdominal in mm.
 * @property {Number[]} frontThigh the frontThigh in mm.
 * @property {Number[]} medialCalf the medialCalf in mm.
 */

/**
 * @typedef {Object} AnthropometryMean
 * @property {Patient} patient the patient.
 * @property {Number} bodyMass the body mass in kg.
 * @property {Number} stature the stature in cm.
 * @property {Number} sittingHeight the sitting height in cm.
 * @property {Number} biacromial the biacromial in cm.
 * @property {Number} transverseChest the transverse chest in cm.
 * @property {Number} anteriorPosteriorChestDepth the anterior posterior chest
 * depth in cm.
 * @property {Number} biiliocristal the biiliocristal in cm.
 * @property {Number} humerusBiepicondylar the humerus biepicondylar in cm.
 * @property {Number} femurBiepicondylar the femur biepicondylar in cm.
 * @property {Number} head the head in cm.
 * @property {Number} armRelaxed the arm relaxed in cm.
 * @property {Number} armFlexedTensed the arm flexed tensed in cm.
 * @property {Number} forearm the forearm in cm.
 * @property {Number} chest the chest in cm.
 * @property {Number} minWaist the min waist in cm.
 * @property {Number} maxThighUpper the max thigh upper in cm.
 * @property {Number} maxCalf the max calf in cm.
 * @property {Number} triceps the triceps in mm.
 * @property {Number} subscapular the subscapular in mm.
 * @property {Number} supraspinal the supraspinal in mm.
 * @property {Number} abdominal the abdominal in mm.
 * @property {Number} frontThigh the frontThigh in mm.
 * @property {Number} medialCalf the medialCalf in mm.
 */

/**
 * @typedef {Object} AnthropometryMasses
 * @property {Number} adipose the adipose mass.
 * @property {Number} muscular the muscular mass.
 * @property {Number} residual the residual mass.
 * @property {Number} bony the bony mass.
 * @property {Number} skin the skin mass.
 * @property {Number} total the sum of all masses
 * @property {Object} percentajes all the percentage for each mass.
 * @property {Number} percentajes.adipose the adipose mass percentage.
 * @property {Number} percentajes.muscular the muscular mass percentage.
 * @property {Number} percentajes.residual the residual mass percentage.
 * @property {Number} percentajes.bony the bony mass percentage.
 * @property {Number} percentajes.skin the skin mass percentage.
 * @property {Object} scoresZ the score Z for each mass except for skin.
 * @property {Number} scoresZ.adipose the adipose score Z.
 * @property {Number} scoresZ.muscular the muscular score Z.
 * @property {Number} scoresZ.residual the residual score Z.
 * @property {Number} scoresZ.bony the bony score Z.
 * @property {Number} scoresZ.total the total score Z.
 */

/**
 * @typedef {Object} Somatotype
 * @property {Number} endo the endomorphic value.
 * @property {Number} meso the mesomorphic value.
 * @property {Number} endo the endomorphic value.
 */

const MALE_SKIN_THICKNESS = 2.07;
const FEMALE_SKIN_THICKNESS = 1.96;
const MALE_SF_AREA = 68.308;
const FEMALE_SF_AREA = 73.074;
const YOUNG_SF_AREA = 70.961;

/**
 * Chooses the proper surface area constant for a patient
 * @param {Object} patient the patient.
 * @param {Date} patient.birthDate the patient birth date as string, date or moment.
 * @param {String} patient.gender the patient gender. 'M' is male and 'F' is female.
 * @return {Number} the surface area constant or null if birthDate or gender is not provided.
 */
export const patientSfArea = function (patient) {
  if (patient && patient.birthDate) {
    let birthDateMoment = patient.birthDate;
    if (typeof patient.birthDate === 'string') {
      birthDateMoment = moment(patient.birthDate);
    }
    const age = birthDateMoment.diff(moment(), 'years');
    if (age <= 12) {
      return YOUNG_SF_AREA;
    }
    if (patient.gender === 'M') {
      return MALE_SF_AREA;
    }
    if (patient.gender === 'F') {
      return FEMALE_SF_AREA;
    }
  }
  return null;
};

export const skinThickness = function (patient) {
  if (patient) {
    if (patient.gender === 'M') {
      return MALE_SKIN_THICKNESS;
    }
    return FEMALE_SKIN_THICKNESS;
  }
  return null;
};

/**
 * Calculates the Skin mass Superficial Area.
 * @param {Number} sfArea superficial area constant.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} skin mass superficial area.
 */
const skinMassSuperficialArea = function (sfArea, bodyMass, stature) {
  return (sfArea * bodyMass ** 0.425 * stature ** 0.725) / 10000.0;
};

/**
 * Calculates the Skin mass Superficial Area for a male.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} skin mass superficial area.
 */
export const maleSkinMassSuperficialArea = function (bodyMass, stature) {
  return skinMassSuperficialArea(MALE_SF_AREA, bodyMass, stature);
};

/**
 * Calculates the Skin mass Superficial Area for a female.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} skin mass superficial area.
 */
export const femaleSkinMassSuperficialArea = function (bodyMass, stature) {
  return skinMassSuperficialArea(FEMALE_SF_AREA, bodyMass, stature);
};

/**
 * Calculates the Skin mass Superficial Area for young people.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} skin mass superficial area.
 */
export const youngSkinMassSuperficialArea = function (bodyMass, stature) {
  return skinMassSuperficialArea(YOUNG_SF_AREA, bodyMass, stature);
};

/**
 * Calculates the skin mass.
 * @param {Number} skinThicknessValue constant for either a male or a female.
 * @param {Number} skinMassSupArea the skin mass superficial area.
 * @return {Number} the skin mass in kg.
 */
const skinMass = function (skinThicknessValue, skinMassSupArea) {
  return skinThicknessValue * skinMassSupArea * 1.05;
};

/**
 * Calculates the skin mass for a male.
 * @param {Number} skinMassSupArea the skin mass superficial area.
 * @return {Number} the skin mass in kg.
 */
export const maleSkinMass = function (skinMassSupArea) {
  return skinMass(MALE_SKIN_THICKNESS, skinMassSupArea);
};

/**
 * Calculates the skin mass for a female.
 * @param {Number} skinMassSupArea the skin mass superficial area.
 * @return {Number} the skin mass in kg.
 */
export const femaleSkinMass = function (skinMassSupArea) {
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
  tricepsMedian,
  subscapularMedian,
  supraspinalMedian,
  abdominalMedian,
  frontThighMedian,
  medialCalfMedian
) {
  return (
    tricepsMedian
    + subscapularMedian
    + supraspinalMedian
    + abdominalMedian
    + frontThighMedian
    + medialCalfMedian
  );
};

/**
 * Calculates the score Z adipose
 * @param {Number} sumSixFolds the sum of the six skin folds in mm.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the score Z adipose.
 */
export const scoreZAdipose = function (sumSixFoldsValue, statureMedian) {
  return (sumSixFoldsValue * (170.18 / statureMedian) - 116.41) / 34.79;
};

/**
 * Calculates the adipose mass.
 * @param {Number} zAdipose the score Z adipose.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the adipose mass.
 */
export const adiposeMass = function (zAdipose, statureMedian) {
  return (zAdipose * 5.85 + 25.6) / (170.18 / statureMedian) ** 3;
};

/**
 * Calculates the corrected arm perimetre
 * @param {Number} armRelaxedMedian
 * @param {Number} tricepsMedian
 */
export const perCorrectedArm = function (armRelaxedMedian, tricepsMedian) {
  return armRelaxedMedian - (tricepsMedian * 3.141) / 10.0;
};

/**
 * Calculates the correcter perimeter for the forearm.
 * @param {Number} forearmMedian in cm.
 * @return {Number} the correcter perimeter for the forearm.
 */
export const perForearm = function (forearmMedian) {
  return forearmMedian;
};

/**
 * Calculates the corrected perimeter for the thigh.
 * @param {Number} maxThighUpperMedian in cm.
 * @param {Number} frontThighMedian in cm.
 * @return {Number} the corrected perimeter for the thigh.
 */
export const perCorrectedThigh = function (maxThighUpperMedian, frontThighMedian) {
  return maxThighUpperMedian - (frontThighMedian * 3.141) / 10.0;
};

/**
 * Calculates the corrected perimeter for the calf.
 * @param {Number} maxCalfMedian in cm.
 * @param {Number} medialCalfMedian in cm.
 * @return {Number} the corrected perimeter for the calf.
 */
export const perCorrectedCalf = function (maxCalfMedian, medialCalfMedian) {
  return maxCalfMedian - (medialCalfMedian * 3.141) / 10.0;
};

/**
 * Calculates the corrected perimeter for the thorax.
 * @param {Number} chestMedian in cm.
 * @param {Number} subscapularMedian in cm.
 * @return {Number} the corrected perimeter for the thorax.
 */
export const perCorrectedThorax = function (chestMedian, subscapularMedian) {
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
  corrArmPer,
  forearmPer,
  corrThighPer,
  corrCalfPer,
  corrThoraxPer
) {
  return corrArmPer + forearmPer + corrThighPer + corrCalfPer + corrThoraxPer;
};

/**
 * Calculates the score Z muscular.
 * @param {Number} sumCorrectedPerimetersValue sum of all the corrected perimeters in cm.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the score Z muscular.
 */
export const scoreZMuscular = function (sumCorrectedPerimetersValue, statureMedian) {
  return (sumCorrectedPerimetersValue * (170.18 / statureMedian) - 207.21) / 13.74;
};

/**
 * Calculates the muscular mass.
 * @param {Number} scoreZMuscularValue the score z muscular.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the muscular mass in kg.
 */
export const muscularMass = function (scoreZMuscularValue, statureMedian) {
  return (scoreZMuscularValue * 5.4 + 24.5) / (170.18 / statureMedian) ** 3;
};

/**
 * Calculates the corrected perimeter for the waist.
 * @param {Number} minWaistMean in cm.
 * @param {Number} abdominalMean in mm.
 * @return {Number} the corrected perimeter for the waist.
 */
export const perCorrectedWaist = function (minWaistMean, abdominalMean) {
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
  transverseChestMean,
  anteriorPosteriorChestDepthMean,
  perCorrectedWaistValue
) {
  return transverseChestMean + anteriorPosteriorChestDepthMean + perCorrectedWaistValue;
};

/**
 * Calculates the score Z residual.
 * @param {Number} thoraxSumValue the thorax sum.
 * @param {Number} sittingHeightMean the sitting height mean in cm.
 * @return {Number} the score Z residual.
 */
export const scoreZResidual = function (thoraxSumValue, sittingHeightMean) {
  return (thoraxSumValue * (89.92 / sittingHeightMean) - 109.35) / 7.08;
};

/**
 * Calculates the residual mass in kg.
 * @param {Number} scoreZResidualValue the score Z residual.
 * @param {Number} sittingHeightMean the sitting height mean in cm.
 * @return {Number} the residual mass in kg.
 */
export const residualMass = function (scoreZResidualValue, sittingHeightMean) {
  return (scoreZResidualValue * 1.24 + 6.1) / (89.92 / sittingHeightMean) ** 3;
};

/**
 * Calculates the score Z head.
 * @param {Number} headMedian in cm.
 * @return {Number} the score Z head.
 */
export const scoreZHead = function (headMedian) {
  return (headMedian - 56) / 1.44;
};

/**
 * Calculates the bony head mass.
 * @param {Number} scoreZHeadValue the score Z head.
 * @return {Number} the bony head mass in kg.
 */
export const bonyHeadMass = function (scoreZHeadValue) {
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
  biacromialMedian,
  biiliocristalMedian,
  humerusBiepicondylarMedian,
  femurBiepicondylarMedian
) {
  return (
    biacromialMedian
    + biiliocristalMedian
    + humerusBiepicondylarMedian * 2
    + femurBiepicondylarMedian * 2
  );
};

/**
 * Calculates the score Z Bony Body.
 * @param {Number} diameterSumValue in cm.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the score Z bony body.
 */
export const scoreZBonyBody = function (diameterSumValue, statureMedian) {
  return (diameterSumValue * (170.18 / statureMedian) - 98.88) / 5.33;
};

/**
 * Calculates the bony body mass
 * @param {Number} scoreZBonyBodyValue the score z bony body.
 * @param {Number} statureMedian the stature median in cm.
 * @return {Number} the bony body mass in kg.
 */
export const bonyBodyMass = function (scoreZBonyBodyValue, statureMedian) {
  return (scoreZBonyBodyValue * 1.34 + 6.7) / (170.18 / statureMedian) ** 3;
};

/**
 * Calculates the total bony mass.
 * @param {Number} bonyHeadMassValue in kg.
 * @param {Number} bonyBodyMassValue in kg.
 * @return {Number} the total bony mass in kg.
 */
export const totalBonyMass = function (bonyHeadMassValue, bonyBodyMassValue) {
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
  skinMassValue,
  adiposeMassValue,
  muscularMassValue,
  residualMassValue,
  bonyHeadMassValue,
  bonyBodyMassValue
) {
  return (
    skinMassValue
    + adiposeMassValue
    + muscularMassValue
    + residualMassValue
    + bonyHeadMassValue
    + bonyBodyMassValue
  );
};

/**
 * Calculates the difference between the structurated weight and body mass.
 * @param {Number} structuratedWeightValue the structurated weight in kg.
 * @param {Number} bodyMass the body mass in kg.
 * @return {Number} the difference between the structurated weight and body mass in kg.
 */
export const structuratedWeightBodyMassDiff = function (structuratedWeightValue, bodyMass) {
  return structuratedWeightValue - bodyMass;
};

/**
 * Calculates the difference percentage.
 * @param {Number} structuratedWeightBodyMassDiffValue the difference between the structurated
 * weight and body mass.
 * @param {Number} bodyMass in kg.
 * @return {Number} the difference percentage
 */
export const diffPercentage = function (structuratedWeightBodyMassDiffValue, bodyMass) {
  return structuratedWeightBodyMassDiffValue / bodyMass;
};

/**
 * Calculates the mass percent measurement.
 * @param {Number} structuratedWeightValue the structurated weight in kg.
 * @param {Number} massMeasurement the mass measurement in kg.
 * @return {Number} the adiposeMassPercent
 */
export const massPercent = function (structuratedWeightValue, massMeasurement) {
  return massMeasurement / structuratedWeightValue;
};

/**
 * Calculates the mass adjustment.
 * @param {Number} structuratedWeightBodyMassDiffValue the difference between
 * the structurated weight and body mass.
 * @param {Number} massMeasurement the mass measurement in kg.
 * @return {Number} the mass adjustment.
 */
export const massAdjustment = function (structuratedWeightBodyMassDiffValue, massMeasurement) {
  return structuratedWeightBodyMassDiffValue * massMeasurement;
};

/**
 * Calculates the adjusted mass in kg.
 * @param {Number} massAdjustmentValue the mass adjustment
 * @param {Number} massMeasurement in kg.
 * @return {Number} the adjusted mass in kg.
 */
export const adjustedMass = function (massAdjustmentValue, massMeasurement) {
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
  structuratedWeightValue,
  structuratedWeightBodyMassDiffValue,
  massMeasurement
) {
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
  structuratedWeightBodyMassDiffValue,
  structuredWeightAdjustment
) {
  return structuratedWeightBodyMassDiffValue - structuredWeightAdjustment;
};

/**
 * Calculates the difference between reference bony mass and the bony mass in kg.
 * @param {Number} referenceBonyMass in kg.
 * @param {Number} adjustedTotalBonyMass in kg.
 * @return {Number} the difference between reference bony mass and the bony mass in kg.
 */
export const referenceBonyMassBonyMass = function (referenceBonyMass, adjustedTotalBonyMass) {
  // return Math.abs(referenceBonyMass - adjustedTotalBonyMass);
  return referenceBonyMass - adjustedTotalBonyMass;
};

/**
 * Calculates the four masses sum kg.
 * @param {Number} referenceBonyMass in kg.
 * @param {Number} adjustedTotalBonyMass in kg.
 * @return {Number} the four masses sum.
 */
export const fourMassesSum = function (referenceBonyMass, adjustedStructuratedWeight) {
  // return Math.abs(adjustedStructuratedWeight - referenceBonyMass);
  return adjustedStructuratedWeight - referenceBonyMass;
};

/**
 * Calculates the basic mass.
 * @param {Number} bodyMass in kg.
 * @param {Number} stature in cm.
 * @return {Number} the basic mass.
 */
export const basicMass = function (bodyMass, stature) {
  return bodyMass * (170.18 / stature) ** 3;
};

/**
 * Calculates the basic mass score Z.
 * @param {Number} basicMassValue the basic mass.
 * @return {Number} the basic mass score Z.
 */
export const basicMassScoreZ = function (basicMassValue) {
  return (basicMassValue - 64.58) / 8.6;
};

/**
 * Calculates the pre total mass score Z.
 * @param {Number} totalMassValue in kg.
 * @param {Number} statureMean in cm.
 * @return {Number} the pre total mass score z.
 */
export const preTotalMassScoreZ = function (totalMassValue, statureMean) {
  return totalMassValue * (170.18 / statureMean) ** 3;
};

/**
 * Calculates the total mass score z.
 * @param {Number} preTotalMassScoreZValue the pre total mass score z.
 * @return {Number} the total mass score z.
 */
export const totalMassScoreZ = function (preTotalMassScoreZValue) {
  return (preTotalMassScoreZValue - 64.58) / 8.6;
};

/**
 * Calculates the pre score Z.
 * @param {Number} stature in cm.
 * @param {Number} measurement the measurement.
 * @return {Number} the pre score Z.
 */
export const preScoreZ = function (stature, measurement) {
  return measurement * (170.18 / stature);
};

/**
 * Creates a curry function of the pre score z function.
 * @param {Number} stature  in cm.
 * @returns {Function} curried preScoreZ function.
 */
export const curryPreScoreZ = function (stature) {
  return function (measurement) {
    return preScoreZ(stature, measurement);
  };
};

/**
 * Calculates the sitting height score Z
 * @param {Number} basicHeightValue the basic height value in cm.
 * @returns the sitting height score z
 */
export const sittingHeightScoreZ = function (basicHeightValue) {
  return (basicHeightValue - 89.92) / 4.5;
};

/**
 * Calculates the Biacromial Score Z.
 * @param {Number} preBiacromialScoreZ the biacromial pre score z value.
 * @returns {Number} the Biacromial Score Z.
 */
export const biacromialScoreZ = function (preBiacromialScoreZ) {
  return (preBiacromialScoreZ - 38.04) / 1.92;
};

/**
 * Calculates the transverseChestScoreZ.
 * @param {Number} preTransverseChestScoreZ the preTransverseChestScoreZ.
 * @return {Number} the transverseChest score z.
 */
export const transverseChestScoreZ = function (preTransverseChestScoreZ) {
  return (preTransverseChestScoreZ - 27.92) / 1.74;
};

/**
 * Calculates the anteriorPosteriorChestDepthScoreZ.
 * @param {Number} preAnteriorPosteriorChestDepthScoreZ the preAnteriorPosteriorChestDepthScoreZ.
 * @return {Number} the anteriorPosteriorChestDepth score z.
 */
export const anteriorPosteriorChestDepthScoreZ = function (preAnteriorPosteriorChestDepthScoreZ) {
  return (preAnteriorPosteriorChestDepthScoreZ - 17.5) / 1.38;
};

/**
 * Calculates the biiliocristalScoreZ.
 * @param {Number} preBiiliocristalScoreZ the preBiiliocristalScoreZ.
 * @return {Number} the biiliocristal score z.
 */
export const biiliocristalScoreZ = function (preBiiliocristalScoreZ) {
  return (preBiiliocristalScoreZ - 28.84) / 1.75;
};

/**
 * Calculates the humerusBiepicondylarScoreZ.
 * @param {Number} preHumerusBiepicondylarScoreZ the preHumerusBiepicondylarScoreZ.
 * @return {Number} the humerusBiepicondylar score z.
 */
export const humerusBiepicondylarScoreZ = function (preHumerusBiepicondylarScoreZ) {
  return (preHumerusBiepicondylarScoreZ - 6.48) / 0.35;
};

/**
 * Calculates the femurBiepicondylarScoreZ.
 * @param {Number} preFemurBiepicondylarScoreZ the preFemurBiepicondylarScoreZ.
 * @return {Number} the femurBiepicondylar score z.
 */
export const femurBiepicondylarScoreZ = function (preFemurBiepicondylarScoreZ) {
  return (preFemurBiepicondylarScoreZ - 9.52) / 0.48;
};

/**
 * Calculates the headScoreZ.
 * @param {Number} preHeadScoreZ the preHeadScoreZ.
 * @return {Number} the head score z.
 */
export const headScoreZ = function (preHeadScoreZ) {
  return (preHeadScoreZ - 56) / 1.44;
};

/**
 * Calculates the armRelaxedScoreZ.
 * @param {Number} preArmRelaxedScoreZ the preArmRelaxedScoreZ.
 * @return {Number} the armRelaxed score z.
 */
export const armRelaxedScoreZ = function (preArmRelaxedScoreZ) {
  return (preArmRelaxedScoreZ - 26.89) / 2.33;
};

/**
 * Calculates the armFlexedTensedScoreZ.
 * @param {Number} preArmFlexedTensedScoreZ the preArmFlexedTensedScoreZ.
 * @return {Number} the armFlexedTensed score z.
 */
export const armFlexedTensedScoreZ = function (preArmFlexedTensedScoreZ) {
  return (preArmFlexedTensedScoreZ - 29.41) / 2.37;
};

/**
 * Calculates the forearmScoreZ.
 * @param {Number} preForearmScoreZ the preForearmScoreZ.
 * @return {Number} the forearm score z.
 */
export const forearmScoreZ = function (preForearmScoreZ) {
  return (preForearmScoreZ - 25.13) / 1.41;
};

/**
 * Calculates the chestScoreZ.
 * @param {Number} preChestScoreZ the preChestScoreZ.
 * @return {Number} the chest score z.
 */
export const chestScoreZ = function (preChestScoreZ) {
  return (preChestScoreZ - 87.86) / 5.18;
};

/**
 * Calculates the minWaistScoreZ.
 * @param {Number} preMinWaistScoreZ the preMinWaistScoreZ.
 * @return {Number} the minWaist score z.
 */
export const minWaistScoreZ = function (preMinWaistScoreZ) {
  return (preMinWaistScoreZ - 71.91) / 4.45;
};

/**
 * Calculates the max gluteal hip score Z.
 * @param {Number} preMaxGlutealHipScoreZ the preMaxGlutealHipScoreZ.
 * @return {Number} the max gluteal hip score Z.
 */
export const maxGlutealHipScoreZ = function (preMaxGlutealHipScoreZ) {
  return (preMaxGlutealHipScoreZ - 94.67) / 5.58;
};

/**
 * Calculates the maxThighUpperScoreZ.
 * @param {Number} preMaxThighUpperScoreZ the preMaxThighUpperScoreZ.
 * @return {Number} the maxThighUpper score z.
 */
export const maxThighUpperScoreZ = function (preMaxThighUpperScoreZ) {
  return (preMaxThighUpperScoreZ - 55.82) / 4.23;
};

/**
 * Calculates the mid thight score Z.
 * @param {Number} midThighMean the mid thight mean in cm.
 * @return {Number} the mid thight score Z.
 */
export const midThighScoreZ = function (midThighMean) {
  return (midThighMean - 53.2) / 4.56;
};

/**
 * Calculates the maxCalfScoreZ.
 * @param {Number} preMaxCalfScoreZ the preMaxCalfScoreZ.
 * @return {Number} the maxCalf score z.
 */
export const maxCalfScoreZ = function (preMaxCalfScoreZ) {
  return (preMaxCalfScoreZ - 35.25) / 2.3;
};

/**
 * Calculates the tricepsScoreZ.
 * @param {Number} preTricepsScoreZ the preTricepsScoreZ.
 * @return {Number} the triceps score z.
 */
export const tricepsScoreZ = function (preTricepsScoreZ) {
  return (preTricepsScoreZ - 15.4) / 4.47;
};

/**
 * Calculates the subscapularScoreZ.
 * @param {Number} preSubscapularScoreZ the preSubscapularScoreZ.
 * @return {Number} the subscapular score z.
 */
export const subscapularScoreZ = function (preSubscapularScoreZ) {
  return (preSubscapularScoreZ - 17.2) / 5.07;
};

/**
 * Calculates the supraspinalScoreZ.
 * @param {Number} preSupraspinalScoreZ the preSupraspinalScoreZ.
 * @return {Number} the supraspinal score z.
 */
export const supraspinalScoreZ = function (preSupraspinalScoreZ) {
  return (preSupraspinalScoreZ - 15.4) / 4.47;
};

/**
 * Calculates the abdominalScoreZ.
 * @param {Number} preAbdominalScoreZ the preAbdominalScoreZ.
 * @return {Number} the abdominal score z.
 */
export const abdominalScoreZ = function (preAbdominalScoreZ) {
  return (preAbdominalScoreZ - 25.4) / 7.78;
};

/**
 * Calculates the frontThighScoreZ.
 * @param {Number} preFrontThighScoreZ the preFrontThighScoreZ.
 * @return {Number} the frontThigh score z.
 */
export const frontThighScoreZ = function (preFrontThighScoreZ) {
  return (preFrontThighScoreZ - 27) / 8.33;
};

/**
 * Calculates the medialCalfScoreZ.
 * @param {Number} preMedialCalfScoreZ the preMedialCalfScoreZ.
 * @return {Number} the medialCalf score z.
 */
export const medialCalfScoreZ = function (preMedialCalfScoreZ) {
  return (preMedialCalfScoreZ - 16) / 4.67;
};

/**
 * Calculate all anthropometry medians for every mandatory property
 * @param {Anthropometry} anthropometry an anthropometry will all measurements.
 */
export const anthropometryMedians = function (anthropometry) {
  const anthropometryMedian = {};
  if (anthropometry) {
    const len = REQUIRED_MEASUREMENTS.length;
    // I'm using a simple for loop here to keep the code as simple as possible
    // so it is easy to convert it to webassembly.
    for (let i = 0; i < len; i++) {
      const key = REQUIRED_MEASUREMENTS[i];
      anthropometryMedian[key] = reduceMesurements(anthropometry[key]);
    }
    anthropometryMedian.patient = anthropometry.patient;
  }
  return anthropometryMedian;
};

/**
 * Calculates all score z for all measurements except for stature.
 * @param {AnthropometryMean} anthropometry an anthropometry with mean.
 * @return {AnthropometryMean} the score z of each measurement.
 */
export const anthropometryScoreZ = function (anthropometry) {
  const basicMassValue = basicMass(anthropometry.bodyMass, anthropometry.stature);
  const cpsz = curryPreScoreZ(anthropometry.stature);
  const apcdsz = anteriorPosteriorChestDepthScoreZ(cpsz(anthropometry.anteriorPosteriorChestDepth));
  return {
    bodyMass: basicMassScoreZ(basicMassValue),
    stature: null,
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
export const anthropometryMasses = function (anthropometry, patient) {
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
  const masses = {
    adipose: adiposeMass(adiposeScoreZValue, anthropometry.stature),
    muscular: muscularMass(scoreZMuscularValue, anthropometry.stature),
    residual: residualMass(scoreZResidualValue, anthropometry.sittingHeight),
    bony: totalBonyMass(bonyHeadMassValue, bonyBodyMassValue),
    skin: skinMass(skinThickness(patient), skinMassSupAreaValue)
  };
  const structuratedWeightValue = structuratedWeight(
    masses.skin,
    masses.adipose,
    masses.muscular,
    masses.residual,
    bonyHeadMassValue,
    bonyBodyMassValue
  );
  // not using Object keys nor lodash to quickly export it to C and then to wasm.
  masses.total = masses.adipose + masses.muscular + masses.residual + masses.bony + masses.skin;
  const structuratedWeightBodyMassDiffValue = structuratedWeightBodyMassDiff(
    structuratedWeightValue,
    anthropometry.bodyMass
  );
  masses.adjusted = {
    adipose: adjustMass(
      structuratedWeightValue,
      structuratedWeightBodyMassDiffValue,
      masses.adipose
    ),
    muscular: adjustMass(
      structuratedWeightValue,
      structuratedWeightBodyMassDiffValue,
      masses.muscular
    ),
    residual: adjustMass(
      structuratedWeightValue,
      structuratedWeightBodyMassDiffValue,
      masses.residual
    ),
    bony: adjustMass(structuratedWeightValue, structuratedWeightBodyMassDiffValue, masses.bony),
    skin: adjustMass(structuratedWeightValue, structuratedWeightBodyMassDiffValue, masses.skin)
  };
  masses.adjusted.total = masses.adjusted.adipose
    + masses.adjusted.muscular
    + masses.adjusted.residual
    + masses.adjusted.bony
    + masses.adjusted.skin;
  masses.readjusted = {
    // FIXME add readjusted masses
  };
  masses.percentages = {
    adipose: masses.adipose / structuratedWeightValue,
    muscular: masses.muscular / structuratedWeightValue,
    residual: masses.residual / structuratedWeightValue,
    bony: masses.bony / structuratedWeightValue,
    skin: masses.skin / structuratedWeightValue,
    total: 100
  };
  masses.scoresZ = {
    adipose: adiposeScoreZValue,
    muscular: scoreZMuscularValue,
    residual: scoreZResidualValue,
    bony: scoreZBonyBodyValue,
    total: totalMassScoreZ(preTotalMassScoreZ(masses.adjusted.total, anthropometry.stature))
  };
  return masses;
};

/**
 * Calculates the endomorphic somatotype value.
 * @param {AnthropometryMean} anthropometryMean
 * @returns {Number} the endomorphic somatotype value.
 */
export const endomorphic = function (anthropometryMean) {
  const { triceps, subscapular, supraspinal, stature } = anthropometryMean;
  const threeFoldsSum = triceps + subscapular + supraspinal;
  const stature170 = 170.18 / stature;
  const threeFoldsSumTimesStature170 = threeFoldsSum * stature170;
  return (
    -0.7182
    + (0.1451 * threeFoldsSumTimesStature170
      - (0.00068 * threeFoldsSumTimesStature170 ** 2
        + 0.0000014 * threeFoldsSumTimesStature170 ** 3))
  );
};

const somatoypeCorrectedPerimeter = function (measurement, skinFold) {
  return measurement - skinFold / 10.0;
};

/**
 * Calculates the mesomorphic somatotype value.
 * @param {AnthropometryMean} anthropometryMean
 * @returns {Number} the mesomorphic somatotype value.
 */
export const mesomorphic = function (anthropometryMean) {
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
    0.858 * humerusBiepicondylar
    + 0.601 * femurBiepicondylar
    + 0.188 * corPerArm
    + 0.161 * corPerCalf
    - stature * 0.131
    + 4.5
  );
};

/**
 * Calculates the ectomorphic somatotype value.
 * @param {AnthropometryMean} anthropometryMean
 * @returns {Number} the ectomorphic somatotype value.
 */
export const ectomorphic = function (anthropometryMean) {
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
export const somatotype = function (anthropometryMean) {
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
export const idealWeight = function (anthropometry) {
  const { stature, patient } = anthropometry;
  if (patient.gender === 'M') {
    return (stature / 100) ** 2 * 23;
  }
  if (patient.gender === 'F') {
    return (stature / 100) ** 2 * 21.5;
  }
  return null;
};

/**
 *
 * @param {AnthropometryMean} anthropometry
 */
export const basalMetabolicRateSpecialWeight = function (anthropometry) {
  const { bodyMass } = anthropometry;
  const idealWg = idealWeight(anthropometry);
  return idealWg + (bodyMass - idealWg * 0.25);
};

/**
 *
 * @param {AnthropometryMean} anthropometry
 */
export const basalMetabolicRate = function (anthropometry) {
  const { bodyMass, stature, patient } = anthropometry;
  const idealWg = idealWeight(anthropometry);
  const spWg = basalMetabolicRateSpecialWeight(anthropometry);
  const wg = bodyMass < idealWg ? bodyMass : spWg;
  const { birthDate } = patient;
  const years = moment().diff(moment(birthDate), 'years');
  if (patient.gender === 'M') {
    return 66 + 13.7 * wg + 5 * stature - 6.8 * years;
  }
  if (patient.gender === 'F') {
    return 655 + 9.6 * wg + 1.7 * stature - 4.7 * years;
  }
  return null;
};

/**
 *
 * @param {AnthropometryMean} anthropometry
 */
export const phisicalActivityLevel = function (patient) {
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
  return null;
};

/**
 *
 * @param {AnthropometryMean} anthropometry
 */
export const estimatedTotalEnergyExpenditure = function (anthropometry) {
  const bmr = basalMetabolicRate(anthropometry);
  const pal = phisicalActivityLevel(anthropometry.patient);
  return bmr * pal;
};
