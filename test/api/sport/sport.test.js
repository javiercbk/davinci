const _ = require('lodash');
const {
  Types: { ObjectId }
} = require('mongoose');
const { buildSchema } = require('../../lib/db');
const {
  apiOptions,
  compareDBObject,
} = require('../../lib/helpers');
const SportAPI = require('../../../app/api/sport/sport-api');

let schema;
let user;

beforeEach(async () => {
  schema = await buildSchema();
  const users = await schema.User.insertMany([{
    email: 'user-test@sample.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_read_own', 'Anthropometry_manage_all', 'Patient_read_own', 'Sport_manage_all']
  }]);
  [user] = users;
});

const FAIL_TEST_TABLE = [
  [
    400,
    'Sport validation failed: name: Name is required',
    {
      gender: 'M'
    }
  ], [
    400,
    'Sport validation failed: gender: Gender is required',
    {
      name: 'Rugby'
    }
  ],
];

const EDIT_DATA = {
  name: 'Tennis',
  gender: 'F',
  bodyMass: [84.999, 84.999, 84.2],
  stature: [183, 182.999, 183.01],
  sittingHeight: [160.999, 161.999, 160.478],
  armSpan: [10.999, 11.999, 12.999, 10.999, 12.232],
  acromialRadial: [10.999, 12.999, 12.999, 10.999, 10.667],
  radialeStylionRadiale: [10.999, 11.999, 11.999, 11.999, 10.945],
  midstylionDactylion: [11.999, 12.999, 12.999, 10.999, 10.506],
  iliospinaleHeight: [12.999, 11.999, 11.999, 12.999, 10.769],
  trochanterionHeight: [11.999, 12.999, 12.999, 11.999, 11.686],
  trochanterionTibialeLaterale: [12.999, 12.999, 11.999, 10.999, 11.439],
  tibialeLateraleHeight: [12.999, 12.999, 11.999, 11.999, 12.727],
  tibialeMedialeSphyrionTibiale: [11.999, 11.999, 10.999, 10.999, 11.098],
  foot: [11.999, 12.999, 12.999, 11.999, 11.422],
  biacromial: [11.999, 11.999, 10.999, 11.999, 10.731],
  transverseChest: [10.999, 10.999, 12.999, 10.999, 11.579],
  anteriorPosteriorChestDepth: [10.999, 10.999, 10.999, 10.999, 11.627],
  biiliocristal: [12.999, 10.999, 11.999, 12.999, 10.708],
  humerusBiepicondylar: [11.999, 11.999, 11.999, 12.999, 12.315],
  femurBiepicondylar: [12.999, 11.999, 12.999, 12.999, 11.391],
  wristBistiloid: [12.999, 11.999, 10.999, 11.999, 11.703],
  ankleBimaleolar: [12.999, 12.999, 10.999, 11.999, 11.68],
  hand: [12.999, 12.999, 11.999, 12.999, 12.401],
  head: [11.999, 12.999, 10.999, 11.999, 11.849],
  neck: [10.999, 12.999, 12.999, 12.999, 11.662],
  armRelaxed: [10.999, 12.999, 10.999, 10.999, 12.456],
  armFlexedTensed: [12.999, 11.999, 12.999, 12.999, 12.281],
  forearm: [12.999, 12.999, 11.999, 11.999, 10.769],
  wrist: [10.999, 11.999, 10.999, 12.999, 10.095],
  chest: [11.999, 12.999, 12.999, 11.999, 10.524],
  minWaist: [11.999, 10.999, 12.999, 11.999, 12.536],
  maxAbdominal: [11.999, 10.999, 10.999, 12.999, 12.32],
  maxGlutealHip: [10.999, 10.999, 12.999, 12.999, 11.95],
  maxThighUpper: [11.999, 12.999, 12.999, 11.999, 10.044],
  midThigh: [10.999, 10.999, 11.999, 10.999, 12.305],
  maxCalf: [11.999, 12.999, 12.999, 11.999, 11.564],
  minAnkle: [11.999, 12.999, 11.999, 11.999, 12.878],
  triceps: [11.999, 11.999, 11.999, 12.999, 11.16],
  subscapular: [10.999, 11.999, 10.999, 10.999, 11.452],
  biceps: [11.999, 12.999, 11.999, 12.999, 11.585],
  iliacCrest: [11.999, 10.999, 12.999, 12.999, 12.654],
  supraspinal: [11.999, 11.999, 10.999, 11.999, 10.257],
  abdominal: [12.999, 11.999, 12.999, 11.999, 11.071],
  frontThigh: [12.999, 11.999, 11.999, 10.999, 12.598],
  medialCalf: [10.999, 10.999, 11.999, 12.999, 11.41],
  forearmSkinFold: [12.999, 11.999, 12.999, 12.999, 11.391],
};

const TEST_TABLE = [{
  // empty
  name: 'Soccer',
  gender: 'F',
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
  forearmSkinFold: [],
}, {
  // with random values
  name: 'Rugby',
  gender: 'M',
  bodyMass: [84.3, 84.3, 84.2],
  stature: [183, 182.8, 183.01],
  sittingHeight: [160.3, 161.003, 160.478],
  armSpan: [10.821, 11.134, 12.975, 10.406, 12.232],
  acromialRadial: [10.767, 12.036, 12.859, 10.881, 10.667],
  radialeStylionRadiale: [10.205, 11.283, 11.7, 11.51, 10.945],
  midstylionDactylion: [11.234, 12.652, 12.651, 10.61, 10.506],
  iliospinaleHeight: [12.564, 11.524, 11.919, 12.576, 10.769],
  trochanterionHeight: [11.96, 12.503, 12.867, 11.884, 11.686],
  trochanterionTibialeLaterale: [12.879, 12.454, 11.322, 10.133, 11.439],
  tibialeLateraleHeight: [12.821, 12.255, 11.051, 11.462, 12.727],
  tibialeMedialeSphyrionTibiale: [11.246, 11.258, 10.783, 10.832, 11.098],
  foot: [11.162, 12.554, 12.645, 11.973, 11.422],
  biacromial: [11.36, 11.989, 10.153, 11.06, 10.731],
  transverseChest: [10.788, 10.386, 12.503, 10.317, 11.579],
  anteriorPosteriorChestDepth: [10.027, 10.844, 10.103, 10.87, 11.627],
  biiliocristal: [12.998, 10.627, 11.449, 12.127, 10.708],
  humerusBiepicondylar: [11.161, 11.16, 11.974, 12.304, 12.315],
  femurBiepicondylar: [12.0, 11.467, 12.793, 12.767, 11.391],
  wristBistiloid: [12.467, 11.997, 10.104, 11.517, 11.703],
  ankleBimaleolar: [12.189, 12.718, 10.899, 11.407, 11.68],
  hand: [12.863, 12.602, 11.489, 12.202, 12.401],
  head: [11.319, 12.26, 10.184, 11.702, 11.849],
  neck: [10.101, 12.07, 12.696, 12.947, 11.662],
  armRelaxed: [10.376, 12.734, 10.296, 10.409, 12.456],
  armFlexedTensed: [12.633, 11.21, 12.483, 12.881, 12.281],
  forearm: [12.832, 12.392, 11.104, 11.317, 10.769],
  wrist: [10.542, 11.037, 10.28, 12.237, 10.095],
  chest: [11.137, 12.321, 12.575, 11.768, 10.524],
  minWaist: [11.333, 10.69, 12.535, 11.553, 12.536],
  maxAbdominal: [11.084, 10.296, 10.888, 12.3, 12.32],
  maxGlutealHip: [10.257, 10.387, 12.891, 12.443, 11.95],
  maxThighUpper: [11.041, 12.692, 12.954, 11.692, 10.044],
  midThigh: [10.787, 10.292, 11.259, 10.077, 12.305],
  maxCalf: [11.841, 12.356, 12.517, 11.834, 11.564],
  minAnkle: [11.411, 12.042, 11.591, 11.938, 12.878],
  triceps: [11.845, 11.829, 11.801, 12.677, 11.16],
  subscapular: [10.76, 11.777, 10.511, 10.471, 11.452],
  biceps: [11.329, 12.504, 11.98, 12.294, 11.585],
  iliacCrest: [11.596, 10.116, 12.139, 12.628, 12.654],
  supraspinal: [11.223, 11.632, 10.552, 11.964, 10.257],
  abdominal: [12.318, 11.21, 12.327, 11.306, 11.071],
  frontThigh: [12.293, 11.545, 11.299, 10.453, 12.598],
  medialCalf: [10.809, 10.394, 11.023, 12.862, 11.41],
  forearmSkinFold: [12.0, 11.467, 12.793, 12.767, 11.391],
}];

test('sport edition should throw 404 when no sport was found', async () => {
  let errThrown;
  const sportAPI = new SportAPI(apiOptions(schema, user));
  const fakeSportId = new ObjectId();
  try {
    await sportAPI.edit({
      _id: fakeSportId,
    });
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(404);
  expect(errThrown.message).toEqual(`Sport ${fakeSportId} was not found`);
});

test.each(FAIL_TEST_TABLE)('sport creation %# should throw %d with message "%s"', async (code, message, testData) => {
  let errThrown;
  const sportAPI = new SportAPI(apiOptions(schema, user));
  try {
    await sportAPI.create(testData);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(code);
  expect(errThrown.message).toEqual(message);
});

test.each(FAIL_TEST_TABLE)('sport edition %# should throw %d with message "%s"', async (code, message, testData) => {
  let errThrown;
  const sportAPI = new SportAPI(apiOptions(schema, user));
  const existingSport = _.cloneDeep(testData);
  existingSport.name = 'Sample';
  existingSport.gender = 'F';
  const { sport } = await sportAPI.create(existingSport);
  expect(sport._id).toBeDefined();
  const editionProspect = _.cloneDeep(testData);
  editionProspect._id = sport._id;
  try {
    await sportAPI.edit(editionProspect);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(code);
  expect(errThrown.message).toEqual(message);
});

test.each(TEST_TABLE)('sport should be created with admin: %#', async (testData) => {
  const sportAPI = new SportAPI(apiOptions(schema, user));
  const { sport } = await sportAPI.create(_.cloneDeep(testData));
  expect(sport._id).toBeDefined();
  compareDBObject(sport, testData);
});

test.each(TEST_TABLE)('sport should be edited with admin: %#', async (testData) => {
  const sportAPI = new SportAPI(apiOptions(schema, user));
  const { sport } = await sportAPI.create(_.cloneDeep(testData));
  expect(sport._id).toBeDefined();
  const editionProspect = _.cloneDeep(EDIT_DATA);
  editionProspect._id = sport._id;
  expect(sport._id).toBeDefined();
  const editResponse = await sportAPI.edit(editionProspect);
  expect(editResponse.sport._id).toBeDefined();
  compareDBObject(editResponse.sport, EDIT_DATA);
});
