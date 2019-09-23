const {
  body
} = require('express-validator/check');

const {
  numberArray
} = require('../../../lib/validators/array');

const defaultNumberArrayValidator = () => numberArray({
  allowNull: true,
  arrayMax: 5,
  min: 0
});

const measurementsValidators = [
  body('bodyMass').custom(defaultNumberArrayValidator()).optional(),
  body('stature').custom(defaultNumberArrayValidator()).optional(),
  body('sittingHeight').custom(defaultNumberArrayValidator()).optional(),
  body('armSpan').custom(defaultNumberArrayValidator()).optional(),
  body('acromialRadial').custom(defaultNumberArrayValidator()).optional(),
  body('radialeStylionRadiale').custom(defaultNumberArrayValidator()).optional(),
  body('midstylionDactylion').custom(defaultNumberArrayValidator()).optional(),
  body('iliospinaleHeight').custom(defaultNumberArrayValidator()).optional(),
  body('trochanterionHeight').custom(defaultNumberArrayValidator()).optional(),
  body('trochanterionTibialeLaterale').custom(defaultNumberArrayValidator()).optional(),
  body('tibialeLateraleHeight').custom(defaultNumberArrayValidator()).optional(),
  body('tibialeMedialeSphyrionTibiale').custom(defaultNumberArrayValidator()).optional(),
  body('foot').custom(defaultNumberArrayValidator()).optional(),
  body('biacromial').custom(defaultNumberArrayValidator()).optional(),
  body('transverseChest').custom(defaultNumberArrayValidator()).optional(),
  body('anteriorPosteriorChestDepth').custom(defaultNumberArrayValidator()).optional(),
  body('biiliocristal').custom(defaultNumberArrayValidator()).optional(),
  body('humerusBiepicondylar').custom(defaultNumberArrayValidator()).optional(),
  body('femurBiepicondylar').custom(defaultNumberArrayValidator()).optional(),
  body('wristBistiloid').custom(defaultNumberArrayValidator()).optional(),
  body('ankleBimaleolar').custom(defaultNumberArrayValidator()).optional(),
  body('hand').custom(defaultNumberArrayValidator()).optional(),
  body('head').custom(defaultNumberArrayValidator()).optional(),
  body('neck').custom(defaultNumberArrayValidator()).optional(),
  body('armRelaxed').custom(defaultNumberArrayValidator()).optional(),
  body('armFlexedTensed').custom(defaultNumberArrayValidator()).optional(),
  body('forearm').custom(defaultNumberArrayValidator()).optional(),
  body('wrist').custom(defaultNumberArrayValidator()).optional(),
  body('chest').custom(defaultNumberArrayValidator()).optional(),
  body('minWaist').custom(defaultNumberArrayValidator()).optional(),
  body('maxAbdominal').custom(defaultNumberArrayValidator()).optional(),
  body('maxGlutealHip').custom(defaultNumberArrayValidator()).optional(),
  body('maxThighUpper').custom(defaultNumberArrayValidator()).optional(),
  body('midThigh').custom(defaultNumberArrayValidator()).optional(),
  body('maxCalf').custom(defaultNumberArrayValidator()).optional(),
  body('minAnkle').custom(defaultNumberArrayValidator()).optional(),
  body('triceps').custom(defaultNumberArrayValidator()).optional(),
  body('subscapular').custom(defaultNumberArrayValidator()).optional(),
  body('biceps').custom(defaultNumberArrayValidator()).optional(),
  body('iliacCrest').custom(defaultNumberArrayValidator()).optional(),
  body('supraspinal').custom(defaultNumberArrayValidator()).optional(),
  body('abdominal').custom(defaultNumberArrayValidator()).optional(),
  body('frontThigh').custom(defaultNumberArrayValidator()).optional(),
  body('medialCalf').custom(defaultNumberArrayValidator()).optional(),
  body('forearmSkinFold').custom(defaultNumberArrayValidator()).optional(),
];

module.exports = measurementsValidators;
