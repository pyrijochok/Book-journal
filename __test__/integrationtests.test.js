const app = require('../index');
const mongoose = require("mongoose");

test('GET /api/journal/:userId should return entries for user', async () => {
    const userId = "6769544b0bc3ce5eea5da8e8"
    const response = await app.inject({
        method:'GET',
        url:`/api/journal/${userId}`
    });
  
    const responseData = await response.json();
    expect(responseData).toHaveProperty('entries');
  });

  afterAll(async () => {
    await app.close();  // Close the Fastify server
    await mongoose.connection.close();  // Close MongoDB connection
  });
  