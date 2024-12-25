const app = require('../index');
const mongoose = require("mongoose");
const User = require('../models/user.model');

jest.mock('../models/user.model');


test('POST /api/login should return a user', async () => {
  const mockUser = { nick: 'alina', password: '1234567' };

  User.findOne.mockResolvedValue(mockUser);

  const response = await app.inject({
    method: 'POST',
    url: '/api/login',
    payload: {
      nick: 'alina',
      password: '1234567',
    }
  });

  const responseData = await response.json();
  expect(responseData).toHaveProperty('user');
  expect(responseData.user).toEqual(mockUser);
});

test('POST /api/register should return a registered user', async () => {
  const mockUser = { _id:"6gcf53jtd85ytf",nick: 'alina', email:"alin@gmail.com",password: '1234567' };

  User.prototype.save.mockResolvedValue(mockUser);

  const response = await app.inject({
    method: 'POST',
    url: '/api/register',
    payload: { nick: 'alina', email:"alin@gmail.com",password: '1234567' }
  });

  const responseData = await response.json();
  expect(responseData).toHaveProperty('result');
  expect(responseData.result).toEqual(mockUser);
});

afterAll(async () => {
  await app.close();  // Close the Fastify server
  await mongoose.connection.close();  // Close MongoDB connection
});

