const fastify = require('fastify')();
const { request } = require('http');
const path = require('path');

// Serve static files from the React build folder inside `react-app`
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'react-app', 'build'),
  prefix: '/', // Serve files at the root URL
});

// Serve React app for all non-API routes
fastify.setNotFoundHandler((request, reply) => {
  reply.sendFile('index.html'); // React's entry point
});

const users = [
    {
        id:1,
        nick:"alina",
        password:"123456",
        email:"alina@gmail.com",

    }

]

const journalEntries2 = [
    {
        id:1,
        userId:1,
        title:"Super Book",
        author:"Takara Moshi",
        pages:123,
        bookImage:"image",
        entryText:"some awesomw text",
        rate:10
    }
]
const journalEntries = [
    {
        bookId:1,
        userId:2,
        date:"21.12.24",
        title:"Book",
        review:{
            text:"good book",
            date:"23.12.24"
        },
        notes:[
            {
                text:"good weather today",
                date:"22.12.24"
            }
        ],
        rate: 8,


    },
    {
        bookId:1,
        userId:2,
        date:"21.12.24",
        title:"Book",
        review:{
            text:"good book",
            date:"23.12.24"
        },
        notes:[
            {
                text:"good weather today",
                date:"22.12.24"
            }
        ],
        rate: 8,


    }

]

const books = [
    {
        id:1,
        title:"Book",
        year:2013,
        pages:320,
        authorId:1,
        author:"Fu Jin Jou",
        rating:7

    },

]


const likedBooks = [
    {
        userId:1,
        bookId:3,
        title:"Book",
        year:2013,
        pages:320,
        author:"Fu Jin Jou",
        rating:7

    },
    {
        userId:2,
        bookId:4,
        title:"the Book",
        year:2013,
        pages:320,
        author:"Fu Jin Jou",
        rating:7

    },

]



fastify.get('/api/books', async (request, reply) => {
  return books;
});

fastify.get('/api/books/:bookId', async (request, reply) => {
    const id = parseInt(request.params.bookId, 10);
    const book = books.find(book => book.id === id);
    if (book) {
    return book;
    } else {
    reply.code(404).send({ message: 'Book not found' });
    }
});

fastify.post('/api/books/:userId/like', async (request, reply) => {
    const userId = parseInt(request.params.userId, 10);
    const { bookId } = request.body; // Extract `id` from the request body
    const bookid = parseInt(bookId, 10); // Properly parse `id` as an integer

    const book = books.find(book => book.id === bookid);

    if (!book) {
        reply.code(404).send({ message: 'Book not found' });
        return;
    }

    if (!likedBooks.find(b => {return (b.bookId === bookId && b.userId===userId)})) {
        const likedBook ={
            userId:userId,
            bookId:book.id,
            title:book.title,
            year:book.year,
            pages:book.pages,
            author:book.author,
            rating:book.rating

        }
        likedBooks.push(likedBook);
        reply.send({ success: true, message: "Book liked successfully", liked:likedBooks });
    } else {
        reply.code(400).send({ message: 'Book is already liked' });
    }
});

fastify.get('/api/liked', async (request, reply) => {
    return likedBooks;
  });

  fastify.get('/api/liked/:userId', async (request, reply) => {
    const userId = parseInt(request.params.userId, 10);
    const liked =likedBooks.filter(book => book.userId === userId);
    if (liked) {
         return liked;
    } else {
         reply.code(404).send({ message: 'There are no liked books' });
    }
  });

fastify.get('/api/journal', async (request, reply) => {
    return journalEntries;
  });

  fastify.get('/api/journal/:userId', async (request, reply) => {
    const userId = parseInt(request.params.userId, 10);
    const entries =journalEntries.filter(entry => entry.userId === userId);
    if (entries) {
         return entries;
    } else {
         reply.code(404).send({ message: 'There are no entries' });
    }
  });

fastify.post('/api/login', (request, reply) => {
    const { nick, password } = request.body;

    // Find user by email and verify password
    const user = users.find(u => u.nick === nick && u.password === password);

    if (user) {
        reply.send({ success: true, message: "Login successful", user: { id: user.id, nick: user.nick} });
    } else {
        reply.code(401).send({ success: false, message: "Invalid email or password" });
    }
});

fastify.post('/api/register', (request, reply) => {
    const { nick,email, password } = request.body;

    const id = users.length+1;
    // Find user by email and verify password
    const user = {
            id:id,
            nick:nick,
            password:password,
            email:email
    }
    users.push(user);
    if (user) {
        reply.send({ success: true, message: "Register successful", user: { id: user.id, nick: user.nick},usersArray:[users] });
    } else {
        reply.code(401).send({ success: false, message: "Error" });
    }
});

fastify.post('/api/addentry', (request, reply) => {
    const { title,date, rate } = request.body;

    const id = journalEntries.length+1;
    // Find user by email and verify password
    const entry = {
            id:id,
            title:title,
            date:date,
            rate:rate
    }
    journalEntries.push(entry);

    if(!books.find(book => book.title === title)){
        const book = {
            id:books.length+1,
            title:title
        }
        books.push(book);
    }

    if (entry) {
        reply.send({ success: true, message: "Successful", entries:journalEntries });
    } else {
        reply.code(401).send({ success: false, message: "Error" });
    }
});

fastify.post('/api/addentry/:userId', (request, reply) => {
    const { title,date, rate } = request.body;
    const userId = parseInt(request.params.userId, 10);
    // Find user by email and verify password
    const entry = {
            userId:userId,
            title:title,
            date:date,
            rate:rate
    }
    journalEntries.push(entry);

    if(!books.find(book => book.title === title)){
        const book = {
            id:books.length+1,
            title:title
        }
        books.push(book);
    }

    if (entry) {
        reply.send({ success: true, message: "Successful", entries:journalEntries });
    } else {
        reply.code(401).send({ success: false, message: "Error" });
    }
});

// Define an example API endpoint
fastify.get('/api/example', async (request, reply) => {
    return { message: 'Hello from the Fastify API!' };
  });




// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log('Server running at http://localhost:5000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
