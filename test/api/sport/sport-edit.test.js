const _ = require('lodash');
const {
  Types: { ObjectId }
} = require('mongoose');
const moment = require('moment');
const { buildSchema } = require('../../lib/db');
const { apiOptions, compareDBObject } = require('../../lib/helpers');
const SportAPI = require('../../../app/api/sport/sport-api');
const PatientAPI = require('../../../app/api/patient/patient-api');

let schema;
let anthropometrist;

beforeEach(async () => {
  schema = await buildSchema();
  anthropometrist = await schema.User.insertMany([
    {
      email: 'user-test@sample.com',
      firstName: 'User',
      lastName: 'Test'
    }
  ]);
  [anthropometrist] = anthropometrist;
});

const fakeSport = new ObjectId();

const measurements = {
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
  forearmSkinFold: [12.0, 11.467, 12.793, 12.767, 11.391]
};

const sportGenerator = (name, position, gender) => {
  const m = _.cloneDeep(measurements);
  m.name = name;
  m.position = position;
  m.gender = gender;
  return m;
};

const assertSportUpdated = (expected, value) => {
  expect(value._id).toBeDefined();
  expect(value._id.equals(expected._id)).toBeTruthy();
  expect(value.name).toEqual(expected.name);
  expect(value.gender).toEqual(expected.gender);
  if (_.isUndefined(expected.position)) {
    expect(value.position).toBeUndefined();
  } else {
    expect(value.position).toEqual(expected.position);
  }
  expect(value.sport.equals(expected._id)).toBeTruthy();
};

test('when sport is updated, all patients containing the sport should be updated as well', async () => {
  const sport = new schema.Sport(sportGenerator('Rugby', 'Fly half', 'M'));
  await sport.save();
  const embedableSport = _.pick(sport.toObject(), ['_id', 'name', 'position', 'gender']);
  embedableSport.sport = embedableSport._id;
  const user = {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_read_own', 'Anthropometry_manage_all', 'Patient_manage_all', 'Sport_manage_all']
  };
  const sportAPI = new SportAPI(apiOptions(schema, user));
  let patients;
  let errThrown;
  try {
    patients = await schema.Patient.insertMany([
      {
        anthropometrist,
        email: '1@sample.com',
        firstName: 'First 1',
        lastName: 'Last 1',
        personalId: '1',
        birthDate: moment.utc().add(-30, 'years'),
        countryOfOrigin: 'AR',
        gender: 'M',
        sports: [embedableSport],
        activityLevel: 1
      },
      {
        anthropometrist,
        email: '2@sample.com',
        firstName: 'First 2',
        lastName: 'Last 2',
        personalId: '2',
        birthDate: moment.utc().add(-32, 'years'),
        countryOfOrigin: 'AR',
        gender: 'M',
        sports: [embedableSport],
        activityLevel: 3
      }
    ]);
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  expect(patients).toHaveLength(2);
  try {
    await sportAPI.edit({
      _id: sport._id,
      name: 'Ping-Pong',
      position: '',
      gender: 'F'
    });
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  try {
    patients = await schema.Patient.find({ _id: { $in: patients.map(p => p._id) } });
  } catch (e) {
    errThrown = e;
  }
  expect(errThrown).toBeUndefined();
  expect(patients).toHaveLength(2);
  expect(patients[0].sports).toHaveLength(1);
  expect(patients[0].sports[0]._id).toBeDefined();
  assertSportUpdated(sport, patients[0].sports[0]);
  expect(patients[1].sports).toHaveLength(1);
  expect(patients[1].sports[0]._id).toBeDefined();
  assertSportUpdated(sport, patients[1].sports[0]);
});
