const app = require('../index');
const mongoose = require("mongoose");
const User = require('../models/user.model');
const Entry = require('../models/entry.model');

let userId;
let entryId;

test('POST /api/register should register a user', async () => {
    const user = { nick: 'katetest', email:"katetest@gmail.com",password: '1234567' };
  
    const response = await app.inject({
      method: 'POST',
      url: '/api/register',
      payload: user
    });
  
    const responseData = await response.json();
    expect(responseData).toHaveProperty('result');
    expect(responseData.result.nick).toEqual(user.nick);
    userId = responseData.result._id;
  });

  test('POST /api/login should login a user', async () => {
    const user = { nick: 'katetest',password: '1234567' };
  
    const response = await app.inject({
      method: 'POST',
      url: '/api/login',
      payload: user
    });
  
    const responseData = await response.json();
    expect(responseData).toHaveProperty('user');
  });

  test('GET /api/journal/:userId should show entries for user', async () => {
    const response = await app.inject({
        method:'GET',
        url:`/api/journal/${userId}`
    });
  
    const responseData = await response.json();
    expect(responseData).toHaveProperty('entries');
  });


  test('POST /api/entry/add/:userId should add entry for user', async () => {
    const entry = {
        userId: userId,
        title: "Test entry",
        author: "Author Name",
        pages: 120,
        entryText: "Some text",
        rate: 8
      }
    const response = await app.inject({
        method:'POST',
        url:`/api/entry/add/${userId}`,
        payload: entry
    });
  
    const responseData = await response.json();
    expect(responseData).toHaveProperty('result');
    entryId = responseData.result._id;
  });

  test('GET /api/journal/:userId/:entryId should open entry with id', async () => {
    const response = await app.inject({
        method:'GET',
        url:`/api/journal/${userId}/${entryId}`
    });
  
    const responseData = await response.json();
    expect(responseData).toHaveProperty('entry');
  });

  afterAll(async () => {
    await Entry.findByIdAndDelete(entryId);
    await User.findByIdAndDelete(userId);
    await app.close();  // Close the Fastify server
    await mongoose.connection.close();  // Close MongoDB connection
  });




