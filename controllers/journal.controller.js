const Entry = require("../models/entry.model");

async function getEntryById (request, reply) {
    const entryId = request.params.entryId
    try{
      const entry = await Entry.findOne({ _id: entryId });
      reply.send({entry:entry});
    }catch(error){
      reply.code(500).send({ message: 'Error fetching data', error: error.message });
    }
   
  }

  async function getEntriesForUser(request, reply){
    const userId = request.params.userId
    try {
      const entries = await Entry.find({ userId: userId });
        reply.send({entries:entries});
    } catch (error) {
      reply.code(500).send({ message: 'Error fetching entries', error: error.message });
    }
  }
  

module.exports = {
 getEntryById,
 getEntriesForUser
};