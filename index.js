const fastify = require('fastify')()
const path = require('path')

// Serve static files from the React build folder inside `react-app`
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'react-app', 'build'),
  prefix: '/' // Serve files at the root URL
})

// Serve React app for all non-API routes
fastify.setNotFoundHandler((request, reply) => {
  reply.sendFile('index.html') // React's entry point
})

const users = [
  {
    id: 1,
    nick: 'alina',
    password: '123456',
    email: 'alina@gmail.com'
  }
]

const journalEntries = [
  {
    id: 1,
    userId: 1,
    title: 'Life Book',
    date: '4-12-24',
    author: 'Takara Moshi',
    pages: 120,
    entryText: 'Best book ever.',
    rate: 10
  }
]


fastify.get('/api/journal/:userId/:entryId', async (request, reply) => {
    const entryId = parseInt(request.params.entryId, 10)
    const entry = journalEntries.find((entry) => entry.id === entryId)
    if (entry) {
        return entry
    } else {
      reply.code(404).send({ message: 'Entry not found' })
    }
  })


fastify.get('/api/journal/:userId', async (request, reply) => {
  const userId = parseInt(request.params.userId, 10)
  const entries = journalEntries.filter((entry) => entry.userId === userId)
  if (entries) {
    return entries
  } else {
    reply.code(404).send({ message: 'There are no entries' })
  }
})

fastify.post('/api/login', (request, reply) => {
  const { nick, password } = request.body

  const user = users.find((u) => u.nick === nick && u.password === password)

  if (user) {
    reply.send({
      success: true,
      message: 'Login successful',
      user: { id: user.id, nick: user.nick }
    })
  } else {
    reply
      .code(401)
      .send({ success: false, message: 'Invalid email or password' })
  }
})

fastify.post('/api/register', (request, reply) => {
  const { nick, email, password } = request.body

  const id = users.length + 1

  const user = {
    id: id,
    nick: nick,
    password: password,
    email: email
  }
  users.push(user)
  if (user) {
    reply.send({
      success: true,
      message: 'Register successful',
      user: { id: user.id, nick: user.nick },
      usersArray: [users]
    })
  } else {
    reply.code(401).send({ success: false, message: 'Error' })
  }
})


fastify.post('/api/addentry/:userId', (request, reply) => {
  const { title,author,pages, date,text, rate } = request.body
  const userId = parseInt(request.params.userId, 10)
  const entry = {
    id:journalEntries.length + 1,
    userId: userId,
    title: title,
    date: date,
    author:author,
    pages:pages,
    entryText:text,
    rate: rate
  }

  journalEntries.push(entry)

  if (entry) {
    reply.send({
      success: true,
      message: 'Successful',
      entries: journalEntries
    })
  } else {
    reply.code(401).send({ success: false, message: 'Error' })
  }
})

fastify.put('/api/updateentry/:entryId', (request, reply) => {
    const { title,author,pages,text, rate } = request.body
    const entryId = parseInt(request.params.entryId, 10)
    const entry = journalEntries.find((entry) => entry.id === entryId)
    entry.title = title;
    entry.author = author;
    entry.pages = pages;
    entry.entryText = text;
    entry.rate = rate;
  
    if (entry) {
      reply.send({
        success: true,
        message: 'Successful',
        entries: journalEntries
      })
    } else {
      reply.code(401).send({ success: false, message: 'Error' })
    }
  })

  fastify.delete('/api/deleteentry/:entryId', (request, reply) => {
    const entryId = parseInt(request.params.entryId, 10)
    const entry = journalEntries.find((entry) => entry.id === entryId)
    const entryIndex = journalEntries.indexOf(entry)
    journalEntries.splice(entryIndex,1)
  
    if (entry) {
      reply.send({
        success: true,
        message: 'Successful',
        deleted:entry
      })
    } else {
      reply.code(401).send({ success: false, message: 'Error' })
    }
  })

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
    console.log('Server running at http://localhost:5000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
