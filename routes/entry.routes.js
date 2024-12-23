const entryController = require("../controllers/entry.controller");

async function entryRoutes(fastify, options) {
      
      fastify.post('/add/:userId', entryController.addEntryForUser)
      
      fastify.put('/update/:entryId',entryController.updateEntry)
      
      fastify.delete('/delete/:entryId', entryController.deleteEntry)
  }
  
  module.exports = entryRoutes;