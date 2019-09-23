const {
  Types: { ObjectId }
} = require('mongoose');
const { buildSchema } = require('../../lib/db');
const { apiOptions } = require('../../lib/helpers');
const RecapchaValidatorMock = require('../../lib/mocks/recaptha');
const UserAPI = require('../../../app/api/user/user-api');
const { comparePassword } = require('../../../app/lib/password');

let schema;

beforeEach(async () => {
  schema = await buildSchema();
});

const userComparisonProps = ['email', 'firstName', 'lastName'];

test('user should be created', async () => {
  const userAPI = new UserAPI(
    apiOptions(schema, {
      _id: new ObjectId(),
      email: 'user-test@test.com',
      firstName: 'User',
      lastName: 'Test'
    })
  );
  userAPI.recaptchaValidator = new RecapchaValidatorMock();
  const userProspect = {
    email: 'user-create@test.com',
    firstName: 'firstName',
    lastName: 'lastName',
    password: '123456',
    recaptcha: 'success'
  };
  const response = await userAPI.create(userProspect);
  const rule = userAPI.user.abilities.relevantRuleFor('read', 'User');
  expect(rule).toBeDefined();
  const publicFields = rule.fields;
  Object.keys(response.user).forEach((key) => {
    expect(publicFields).toContain(key);
  });
  const userInDb = await schema.User.findOne({ email: userProspect.email });
  userComparisonProps.forEach((prop) => {
    expect(userInDb[prop]).toEqual(userProspect[prop]);
  });
  const passwordMatches = await comparePassword(userProspect.password, userInDb.password);
  expect(passwordMatches).toBeTruthy();
});

test('user fail to create a user with repeated email', async () => {
  const userAPI = new UserAPI(apiOptions(schema, { email: 'user-test@test.com' }));
  userAPI.recaptchaValidator = new RecapchaValidatorMock();
  const userProspect = {
    email: 'user-create@test.com',
    firstName: 'firstName',
    lastName: 'lastName',
    password: '123456',
    recaptcha: 'success'
  };
  await userAPI.create(userProspect);
  let errorThrown;
  try {
    await userAPI.create(userProspect);
  } catch (e) {
    errorThrown = e;
  }
  expect(errorThrown).toBeDefined();
  expect(errorThrown.code).toEqual(409);
});

test('user fail to create a user when recaptha fails', async () => {
  const userAPI = new UserAPI(apiOptions(schema, { email: 'user-test@test.com' }));
  userAPI.recaptchaValidator = new RecapchaValidatorMock();
  const userProspect = {
    email: 'user-create@test.com',
    firstName: 'firstName',
    lastName: 'lastName',
    password: '123456',
    recaptcha: 'fail'
  };
  let errorThrown;
  try {
    await userAPI.create(userProspect);
  } catch (e) {
    errorThrown = e;
  }
  expect(errorThrown).toBeDefined();
  expect(errorThrown.code).toEqual(403);
});
