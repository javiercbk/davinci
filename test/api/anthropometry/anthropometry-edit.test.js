const _ = require('lodash');
const { Types: { ObjectId } } = require('mongoose');
const moment = require('moment');
const { buildSchema } = require('../../lib/db');
const {
  apiOptions,
  compareDBObject,
  noUserApiOptions
} = require('../../lib/helpers');
const AnthropometryAPI = require('../../../app/api/anthropometry/anthropometry-api');

let schema;
let anthropometrist;

beforeEach(async () => {
  schema = await buildSchema();
  anthropometrist = await schema.User.insertMany([{
    email: 'user-test@sample.com',
    firstName: 'User',
    lastName: 'Test',
  }]);
  [anthropometrist] = anthropometrist;
});

const TEST_TABLE = [
  () => ({
    // complete, empty and no patient, no anthropometrist (user should be assumed)
    measurementDate: moment.utc(),
    errorPercent: 0,
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
    __fail: true,
  }), anth => ({
    // complete, empty and no patient
    anthropometrist: anth,
    measurementDate: moment.utc(),
    errorPercent: 0,
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
  }), (anth, pat) => ({
    // complete and empty
    anthropometrist: anth,
    patient: pat,
    measurementDate: moment.utc(),
    errorPercent: 0,
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
  }), (anth, pat) => ({
    // with random values
    anthropometrist: anth,
    patient: pat,
    measurementDate: moment.utc(),
    errorPercent: 0,
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
  })];

test('anthropometry edition should throw 401 if user is not provided', async () => {
  const anthropometryAPI = new AnthropometryAPI(noUserApiOptions(schema));
  const anthropometryProspect = TEST_TABLE[0]();
  anthropometryProspect.anthropometrist = anthropometrist;
  let inserted;
  let errThrown;
  try {
    inserted = await schema.Anthropometry.insertMany([anthropometryProspect]);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  anthropometryProspect._id = inserted[0]._id;
  try {
    await anthropometryAPI.edit(anthropometryProspect);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(401);
  expect(errThrown.message).toEqual('You must be logged in to edit this anthropometry');
});

test('anthropometry edition should throw 404 when anthropometry does not exist', async () => {
  const anthropometryAPI = new AnthropometryAPI(apiOptions(schema, {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_read_own', 'Anthropometry_manage_all', 'Patient_read_own', 'Sport_read_all']
  }));
  const anthropometryProspect = TEST_TABLE[0]();
  anthropometryProspect.anthropometrist = anthropometrist;
  const fakeAnthropometryId = new ObjectId();
  anthropometryProspect._id = fakeAnthropometryId;
  let errThrown;
  try {
    await anthropometryAPI.edit(anthropometryProspect);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(404);
  expect(errThrown.message).toEqual(`Anthropometry ${fakeAnthropometryId} was not found`);
});

test('anthropometry edition should throw 422 if provided patient does not exist', async () => {
  const anthropometryAPI = new AnthropometryAPI(apiOptions(schema, {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_read_own', 'Anthropometry_manage_all', 'Patient_read_own', 'Sport_read_all']
  }));
  const anthropometryProspect = TEST_TABLE[0]();
  anthropometryProspect.anthropometrist = anthropometrist;
  let inserted;
  let errThrown;
  try {
    inserted = await schema.Anthropometry.insertMany([anthropometryProspect]);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  anthropometryProspect._id = inserted[0]._id;
  const fakePatientId = new ObjectId();
  anthropometryProspect.anthropometrist = anthropometrist;
  anthropometryProspect.patient = { _id: fakePatientId, gender: 'M' };
  try {
    await anthropometryAPI.edit(anthropometryProspect);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(422);
  expect(errThrown.message).toEqual(`Cannot create or edit this anthropometry with not existing patient ${fakePatientId}`);
});

test('anthropometry edition should throw 422 if provided patient does not belong to the anthropometrist', async () => {
  const anthropometryAPI = new AnthropometryAPI(apiOptions(schema, {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_read_own', 'Anthropometry_manage_all', 'Patient_read_own', 'Sport_read_all']
  }));
  const anthropometryProspect = TEST_TABLE[0]();
  anthropometryProspect.anthropometrist = anthropometrist;
  let inserted;
  let errThrown;
  try {
    inserted = await schema.Anthropometry.insertMany([anthropometryProspect]);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  anthropometryProspect._id = inserted[0]._id;
  const patientId = new ObjectId();
  await schema.Patient.insertMany([{
    _id: patientId,
    anthropometrist: new ObjectId(),
    firstName: 'Sample',
    lastName: 'Patient',
    birthDate: moment.utc('1990-01-20 04:34'),
    gender: 'M',
  }]);
  anthropometryProspect.anthropometrist = anthropometrist;
  anthropometryProspect.patient = { _id: patientId, gender: 'M' };
  try {
    await anthropometryAPI.edit(anthropometryProspect);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(422);
  expect(errThrown.message).toEqual(`Cannot create or edit this anthropometry with not existing patient ${patientId}`);
});

test('anthropometry edition should throw 422 if anthropometrist does not exist', async () => {
  const anthropometryAPI = new AnthropometryAPI(apiOptions(schema, {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_read_own', 'Anthropometry_manage_all', 'Patient_read_own', 'Sport_read_all']
  }));
  const anthropometryProspect = TEST_TABLE[0]();
  anthropometryProspect.anthropometrist = anthropometrist;
  let inserted;
  let errThrown;
  try {
    inserted = await schema.Anthropometry.insertMany([anthropometryProspect]);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  anthropometryProspect._id = inserted[0]._id;
  const patientId = new ObjectId();
  const fakeAnthropometristId = new ObjectId();
  await schema.Patient.insertMany([{
    _id: patientId,
    anthropometrist: fakeAnthropometristId,
    firstName: 'Sample',
    lastName: 'Patient',
    birthDate: moment.utc('1990-01-20 04:34'),
    gender: 'M',
  }]);
  anthropometryProspect.anthropometrist = fakeAnthropometristId;
  anthropometryProspect.patient = { _id: patientId, gender: 'M' };
  try {
    await anthropometryAPI.edit(anthropometryProspect);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(422);
  expect(errThrown.message).toEqual('Cannot create or edit this anthropometry for a non existing anthropometrist');
});

test('anthropometry edition should throw 400 if no anthropometrist provided', async () => {
  const anthropometryAPI = new AnthropometryAPI(apiOptions(schema, {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_read_own', 'Anthropometry_manage_all', 'Patient_read_own', 'Sport_read_all']
  }));
  const anthropometryProspect = TEST_TABLE[0]();
  anthropometryProspect.anthropometrist = anthropometrist;
  let inserted;
  let errThrown;
  try {
    inserted = await schema.Anthropometry.insertMany([anthropometryProspect]);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  anthropometryProspect._id = inserted[0]._id;
  const patientId = new ObjectId();
  await schema.Patient.insertMany([{
    _id: patientId,
    anthropometrist: anthropometrist._id,
    firstName: 'Sample',
    lastName: 'Patient',
    birthDate: moment.utc('1990-01-20 04:34'),
    gender: 'M',
  }]);
  anthropometryProspect.patient = { _id: patientId, gender: 'M' };
  delete anthropometryProspect.anthropometrist;
  try {
    await anthropometryAPI.edit(anthropometryProspect);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(400);
  expect(errThrown.message).toEqual('Anthropometry validation failed: anthropometrist: Anthropometrist must be provided');
});

test('anthropometry edition should throw 403 when creating an anthropometry with a non admin user for another anthropometrist', async () => {
  const anthropometryAPI = new AnthropometryAPI(apiOptions(schema, {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
  }));
  const anthropometryProspect = TEST_TABLE[0]();
  anthropometryProspect.anthropometrist = anthropometrist;
  let inserted;
  let errThrown;
  try {
    inserted = await schema.Anthropometry.insertMany([anthropometryProspect]);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  anthropometryProspect._id = inserted[0]._id;
  const patientId = new ObjectId();
  await schema.Patient.insertMany([{
    _id: patientId,
    anthropometrist: anthropometrist._id,
    firstName: 'Sample',
    lastName: 'Patient',
    birthDate: moment.utc('1990-01-20 04:34'),
    gender: 'M',
  }]);
  anthropometryProspect.anthropometrist = anthropometrist._id;
  anthropometryProspect.patient = { _id: patientId, gender: 'M' };
  try {
    await anthropometryAPI.edit(anthropometryProspect);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeDefined();
  expect(errThrown.code).toEqual(404);
  expect(errThrown.message).toEqual(`Anthropometry ${anthropometryProspect._id} was not found`);
});

test.each(TEST_TABLE)('anthropometry should be edited with admin: %#', async (testDataFunc) => {
  const anthropometryAPI = new AnthropometryAPI(apiOptions(schema, {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_read_own', 'Anthropometry_manage_all', 'Patient_read_own', 'Sport_read_all']
  }));
  // always create an empty anthropometry to edit
  const anthropometryProspect = TEST_TABLE[0]();
  anthropometryProspect.anthropometrist = anthropometrist;
  let inserted;
  let errThrown;
  try {
    inserted = await schema.Anthropometry.insertMany([anthropometryProspect]);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  const testData = testDataFunc(anthropometrist);
  testData._id = inserted[0]._id;
  testData.anthropometrist = anthropometrist;
  const { anthropometry } = await anthropometryAPI.edit(testData);
  expect(anthropometry._id).toBeDefined();
  compareDBObject(anthropometry, testData);
});

test.each(TEST_TABLE)('anthropometry should be edited with common user: %#', async (testDataFunc) => {
  const anthropometryAPI = new AnthropometryAPI(apiOptions(schema, _.pick(anthropometrist, ['_id', 'email', 'firstName', 'lastName'])));
  // always create an empty anthropometry to edit
  const anthropometryProspect = TEST_TABLE[0]();
  anthropometryProspect.anthropometrist = anthropometrist;
  let inserted;
  let errThrown;
  try {
    inserted = await schema.Anthropometry.insertMany([anthropometryProspect]);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  const testData = testDataFunc(anthropometrist);
  testData._id = inserted[0]._id;
  testData.anthropometrist = anthropometrist;
  const { anthropometry } = await anthropometryAPI.edit(testData);
  expect(anthropometry._id).toBeDefined();
  compareDBObject(anthropometry, testData);
});
