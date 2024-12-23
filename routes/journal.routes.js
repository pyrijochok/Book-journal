const journalController = require("../controllers/journal.controller");

async function journalRoutes(fastify, options) {
    fastify.get('/:userId/:entryId', journalController.getEntryById)
    fastify.get('/:userId', journalController.getEntriesForUser)
  }
  
  module.exports = journalRoutes;