const { Types: { ObjectId } } = require('mongoose');
const { buildSchema } = require('../../lib/db');
const UserAPI = require('../../../app/api/user/user-api');
const {
  comparePassword
} = require('../../../app/lib/password');
const {
  apiOptions
} = require('../../lib/helpers');

let schema;

beforeEach(async () => {
  schema = await buildSchema();
});

const TEST_PASSWORD = 'test';

test('user should not allow to search another user', async () => {
  const userLogged = {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    password: TEST_PASSWORD,
  };
  const userInDb = await schema.User.create(userLogged);
  const userAPI = new UserAPI(apiOptions(schema, userInDb));
  let errorThrown;
  const otherUser = await userAPI.schema.User.create({
    _id: new ObjectId(),
    email: 'other-user-test@test.com',
    firstName: 'Other User',
    lastName: 'Test',
    password: TEST_PASSWORD,
  });
  try {
    await userAPI.edit({
      _id: otherUser._id,
    });
  } catch (e) {
    errorThrown = e;
  }
  expect(errorThrown).toBeDefined();
  expect(errorThrown.code).toEqual(403);
});

test('user should throw 404 when editing a user that does not exist', async () => {
  const userLogged = {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_manage_all'],
    password: TEST_PASSWORD,
  };
  const userInDb = await schema.User.create(userLogged);
  const userAPI = new UserAPI(apiOptions(schema, userInDb));
  let errorThrown;
  try {
    await userAPI.edit({
      _id: new ObjectId(),
    });
  } catch (e) {
    errorThrown = e;
  }
  expect(errorThrown).toBeDefined();
  expect(errorThrown.code).toEqual(404);
});

test('user should throw 409 when changing the user\'s email with an existing one', async () => {
  const userLogged = {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_manage_all'],
    password: TEST_PASSWORD,
  };
  const userInDb = await schema.User.create(userLogged);
  const otherUser = await schema.User.create({
    _id: new ObjectId(),
    email: 'other-user-test@test.com',
    firstName: 'Other User',
    lastName: 'Test',
    password: TEST_PASSWORD,
  });
  const userAPI = new UserAPI(apiOptions(schema, userInDb));
  let errorThrown;
  try {
    await userAPI.edit({
      _id: otherUser._id,
      email: userLogged.email,
    });
  } catch (e) {
    errorThrown = e;
  }
  expect(errorThrown).toBeDefined();
  expect(errorThrown.code).toEqual(409);
});

test('user should throw 403 if oldPassword does not match', async () => {
  const userLogged = {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    password: TEST_PASSWORD,
  };
  const userInDb = await schema.User.create(userLogged);
  const userAPI = new UserAPI(apiOptions(schema, userInDb));
  const change = {
    _id: userLogged._id,
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    password: 'newPassword'
  };
  let errorThrown;
  try {
    await userAPI.edit(change);
  } catch (e) {
    errorThrown = e;
  }
  expect(errorThrown).toBeDefined();
  expect(errorThrown.code).toEqual(403);
  errorThrown = null;
  change.oldPassword = 'notMatchingPassword';
  try {
    await userAPI.edit(change);
  } catch (e) {
    errorThrown = e;
  }
  expect(errorThrown).toBeDefined();
  expect(errorThrown.code).toEqual(403);
});


test('user should be allowed to change its email', async () => {
  const userLogged = {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    password: TEST_PASSWORD,
  };
  const userInDb = await schema.User.create(userLogged);
  const userAPI = new UserAPI(apiOptions(schema, userInDb));
  const change = {
    _id: userLogged._id,
    firstName: 'User',
    lastName: 'Test',
    email: 'other-email@test.com',
  };
  const response = await userAPI.edit(change);
  const rule = userAPI.user.abilities.relevantRuleFor('read', 'User');
  expect(rule).toBeDefined();
  const publicFields = rule.fields;
  Object.keys(response.user).forEach((key) => {
    expect(publicFields).toContain(key);
  });
  expect(response.user._id).toEqual(userLogged._id);
  expect(response.user.email).toEqual(change.email);
  expect(response.user.firstName).toEqual(userLogged.firstName);
  expect(response.user.lastName).toEqual(userLogged.lastName);
});

test('user should be allowed to change its firstName and lastName', async () => {
  const userLogged = {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    password: TEST_PASSWORD,
  };
  const userInDb = await schema.User.create(userLogged);
  const userAPI = new UserAPI(apiOptions(schema, userInDb));
  const change = {
    _id: userLogged._id,
    email: 'user-test@test.com',
    firstName: 'Other',
    lastName: 'User',
  };
  const response = await userAPI.edit(change);
  const rule = userAPI.user.abilities.relevantRuleFor('read', 'User');
  expect(rule).toBeDefined();
  const publicFields = rule.fields;
  Object.keys(response.user).forEach((key) => {
    expect(publicFields).toContain(key);
  });
  expect(response.user._id).toEqual(userLogged._id);
  expect(response.user.email).toEqual(userLogged.email);
  expect(response.user.firstName).toEqual(change.firstName);
  expect(response.user.lastName).toEqual(change.lastName);
});

test('user should be allowed to change its password', async () => {
  const userLogged = {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    password: TEST_PASSWORD,
  };
  const userInDb = await schema.User.create(userLogged);
  const userAPI = new UserAPI(apiOptions(schema, userInDb));
  const change = {
    _id: userLogged._id,
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    oldPassword: TEST_PASSWORD,
    password: 'newPassword'
  };
  const response = await userAPI.edit(change);
  const rule = userAPI.user.abilities.relevantRuleFor('read', 'User');
  expect(rule).toBeDefined();
  const publicFields = rule.fields;
  Object.keys(response.user).forEach((key) => {
    expect(publicFields).toContain(key);
  });
  expect(response.user._id).toEqual(userLogged._id);
  expect(response.user.email).toEqual(userLogged.email);
  expect(response.user.firstName).toEqual(userLogged.firstName);
  expect(response.user.lastName).toEqual(userLogged.lastName);
  const saved = await schema.User.findOne({ _id: response.user._id });
  const passwordMatches = await comparePassword(change.password, saved.password);
  expect(passwordMatches).toBeTruthy();
});


test('user should be allowed to change another user if manage role is given', async () => {
  const userLogged = {
    _id: new ObjectId(),
    email: 'user-test@test.com',
    firstName: 'User',
    lastName: 'Test',
    roles: ['User_manage_all'],
    password: TEST_PASSWORD,
  };
  const userInDb = await schema.User.create(userLogged);
  const otherUser = await schema.User.create({
    _id: new ObjectId(),
    email: 'other-user-test@test.com',
    firstName: 'Other User',
    lastName: 'Test',
    password: TEST_PASSWORD,
  });
  const userAPI = new UserAPI(apiOptions(schema, userInDb));
  const response = await userAPI.edit({
    _id: otherUser._id,
    email: 'another-other-test@test.com',
    firstName: 'Other User',
    lastName: 'Test',
  });
  const rule = userAPI.user.abilities.relevantRuleFor('manage', 'User');
  expect(rule).toBeDefined();
  const publicFields = rule.fields;
  expect(response).toBeDefined();
  expect(response.user).toBeDefined();
  Object.keys(response.user).forEach((key) => {
    expect(publicFields).toContain(key);
  });
});
