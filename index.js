const fastify = require('fastify')()
const path = require('path')
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Entry = require("./models/entry.model");

const authRoutes = require("./routes/auth.routes");
const journalRoutes = require("./routes/journal.routes");
const entryRoutes = require("./routes/entry.routes");

// Serve static files from the React build folder inside `react-app`
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'react-app', 'build'),
  prefix: '/' // Serve files at the root URL
})

// Serve React app for all non-API routes
fastify.setNotFoundHandler((request, reply) => {
  reply.sendFile('index.html') // React's entry point
})

mongoose
  .connect("mongodb+srv://tokarskaaalina:cuti1IY0DYFhgxSg@myfreecluster.teshg.mongodb.net/book-journal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.log("Error connecting to database", e));




// fastify.get('/api/journal/:userId/:entryId', async (request, reply) => {
//   const entryId = parseInt(request.params.entryId, 10)
// //   const entry = journalEntries.find((entry) => entry.id === entryId)
//   try{
//     const entry = await Entry.findOne({ id: entryId });
//     return entry;
//   }catch(error){
//     reply.code(500).send({ message: 'Error fetching data', error: error.message });
//   }
 
// })

// fastify.get('/api/journal/:userId', async (request, reply) => {
//   const userId = parseInt(request.params.userId, 10)
//   try {
//     const entries = await Entry.find({ userId: userId });
//     // if (entries.length > 0) {
//       return entries;
//     // } else {
//     //   reply.code(404).send({ message: 'No entries found for this user.' });
//     // }
//   } catch (error) {
//     reply.code(500).send({ message: 'Error fetching entries', error: error.message });
//   }
// })

// fastify.post('/api/login', async (request, reply) => {
//   const { nick, password } = request.body

// //   const user = users.find((u) => u.nick === nick && u.password === password)
//   const user = await User.findOne({nick:nick, password:password})

//   if (user) {
//     reply.send({
//       success: true,
//       message: 'Login successful',
//       user: {id:user.id, nick:user.nick}
//     })
//   } else {
//     reply
//       .code(401)
//       .send({ success: false, message: 'Invalid email or password' })
//   }
// })

// fastify.post('/api/register', async (request, reply) => {
//   const { nick, email, password } = request.body

// //   

//   try{
//     const users = await User.find();
//     const id = users.length + 1
//     const user = new User({
//         id: id,
//         nick: nick,
//         password: password,
//         email: email
//       });
//     const result = await user.save();
//     reply.send({result:result});
//   }catch(error){
//     reply.status(500).send(error);
//   }
  
// })

// fastify.post('/api/entry/add/:userId', async (request, reply) => {
//   const { title, author, pages, text, rate } = request.body
//   const userId = parseInt(request.params.userId, 10)

//   try{

//     const entry = new Entry({
//         id: journalEntries.length + 1,
//         userId: userId,
//         title: title,
//         author: author,
//         pages: pages,
//         entryText: text,
//         rate: rate
//       })
//       const result = await entry.save();
//       reply.send({result:result});

//   }catch(error){
//     reply.status(500).send(error);
//   }
  
// })

// fastify.put('/api/entry/update/:entryId', async (request, reply) => {
//   const { title, author, pages, text, rate } = request.body
//   const entryId = parseInt(request.params.entryId, 10)
//   try{
//     const entry = await Entry.findOneAndUpdate({id:entryId},{title:title,author:author,pages:pages,text:text,rate:rate})
//     reply.send({entry:entry});
//   }catch(error){
//     reply.status(500).send(error);
//   }
  

// })

// fastify.delete('/api/entry/delete/:entryId', async (request, reply) => {
//   const entryId = parseInt(request.params.entryId, 10)

//   try{
//     const entry = await Entry.findOneAndDelete({id:entryId})
//     reply.send({deleted:entry})
//   }
//   catch(error){
//     reply.status(500).send(error);
//   }
 
// })

fastify.register(authRoutes, { prefix: "/api" });
fastify.register(journalRoutes, { prefix: "/api/journal" });
fastify.register(entryRoutes, { prefix: "/api/entry" });

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
