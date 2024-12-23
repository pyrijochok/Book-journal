const Entry = require("../models/entry.model");

async function getEntryById (request, reply) {
    const entryId = request.params.entryId
  //   const entry = journalEntries.find((entry) => entry.id === entryId)
    try{
      const entry = await Entry.findOne({ _id: entryId });
      return entry;
    }catch(error){
      reply.code(500).send({ message: 'Error fetching data', error: error.message });
    }
   
  }

  async function getEntriesForUser(request, reply){
    const userId = request.params.userId
    try {
      const entries = await Entry.find({ userId: userId });
      // if (entries.length > 0) {
        return entries;
      // } else {
      //   reply.code(404).send({ message: 'No entries found for this user.' });
      // }
    } catch (error) {
      reply.code(500).send({ message: 'Error fetching entries', error: error.message });
    }
  }
  

module.exports = {
 getEntryById,
 getEntriesForUser
};