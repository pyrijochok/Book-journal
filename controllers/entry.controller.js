const Entry = require('../models/entry.model')
const User = require('../models/user.model')

async function addEntryForUser(request, reply) {
  const { title, author, pages, text, rate } = request.body
  const userId = request.params.userId
  try {
    const entry = new Entry({
      userId: userId,
      title: title,
      author: author,
      pages: pages,
      entryText: text,
      rate: rate
    })
    const result = await entry.save()
    reply.send({ result: result })
  } catch (error) {
    console.error('Error adding entry:', {
      message: error.message,
      stack: error.stack,
      details: error // Log additional error information
    })
    reply.status(500).send(error)
  }
}

async function updateEntry(request, reply) {
  const { title, author, pages, text, rate } = request.body
  const entryId = request.params.entryId
  try {
    const entry = await Entry.findOneAndUpdate(
      { _id: entryId },
      {
        title: title,
        author: author,
        pages: pages,
        entryText: text,
        rate: rate
      }
    )
    reply.send({ entry: entry })
  } catch (error) {
    reply.status(500).send(error)
  }
}

async function deleteEntry(request, reply) {
  const entryId = request.params.entryId

  try {
    const entry = await Entry.findOneAndDelete({ _id: entryId })
    reply.send({ deleted: entry })
  } catch (error) {
    reply.status(500).send(error)
  }
}

module.exports = {
  addEntryForUser,
  updateEntry,
  deleteEntry
}
