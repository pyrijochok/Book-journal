// Inside a React component
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './components/Explore';
import LogIn from './components/LogIn';
import Register from './components/Register';
import BookPage from './components/BookPage';
import JournalEntry from './components/JournalEntry';
import Journal from './components/Journal';
import Liked from './components/Liked';
import AddEntry from './components/AddEntry';


function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('/api/example')
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   fetch('/api/books')
  //     .then((response) => response.json())
  //     .then((data) => setBooks(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  // return (
  //   <div>
  //     <h1>React + Fastify</h1>
  //     {/* <p>{data ? data.message : 'Loading...'}</p> */}
  //     {books.map((book) => (
  //         <li key={book.id}>
  //          <h2>{book.title}</h2>
  //          <p><strong>Author:</strong> {book.author}</p>
  //          <p><strong>Year:</strong> {book.year}</p>
  //          <p><strong>Pages:</strong> {book.pages}</p>
  //         </li>
  //       ))}
  //   </div>
  // );

  return(
      
      <Router>
      <Routes>
        <Route path="/explore/:userId" element={<Explore/>} />
        <Route path="/journal" element={<Journal/>} />
        <Route path="/journal/:userId" element={<Journal/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/book" element={<BookPage/>} />
        <Route path="/book/:bookId" element={<BookPage/>} />
        <Route path="/book/:userId/:bookId" element={<BookPage/>} />
        <Route path="/entry" element={<JournalEntry/>} />
        <Route path="/entry/:userId/:bookId" element={<JournalEntry/>} />
        <Route path="/liked/:userId" element={<Liked/>} />
        <Route path="/addentry" element={<AddEntry/>} />
        <Route path="/addentry/:userId" element={<AddEntry/>} />
      </Routes>
    </Router>
  )
}

export default App;
