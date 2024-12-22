import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { useNavigate, useParams } from 'react-router-dom';



export default function Explore(){
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    let { userId } = useParams();
    
      useEffect(() => {
        fetch('/api/books')
          .then((response) => response.json())
          .then((data) => setBooks(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

      const openBook = (e,id)=>{
        e.preventDefault();
        // let id =1;
        let route = `/book/${userId}/${id}`;
        navigate(route);
      }

      const likeBook = async (e,bookId)=>{
        e.preventDefault();
        // console.log('liked');
        try {
          const response = await fetch(`/api/books/${userId}/like`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ bookId: bookId }),
          });
  
          const data = await response.json();
          if (response.ok) {
              setMessage('Book liked successfully');
              console.log('liked');
              console.log(data.liked)
              const button = document.getElementById(`likeButton${bookId}`);
              button.innerText = 'Liked';
          } else {
              setMessage(data.message || 'Error liking book');
          }
      } catch (error) {
          console.error('Error liking book:', error);
          setMessage('Error liking book');
      }
      }
    
      return (
        <div>
          <Nav userId={userId}/>
          <h1>Books</h1>
          {books.map((book) => (
              <li key={book.id}>
               <h2>{book.title}</h2>
               <p><strong>Author:</strong> {book.author}</p>
               <p><strong>Year:</strong> {book.year}</p>
               <p><strong>Pages:</strong> {book.pages}</p>
               <button onClick={(e)=>openBook(e,book.id)}>Open</button>
               <button onClick={(e)=>likeBook(e,book.id)} id={`likeButton${book.id}`}>Like</button>
              </li>
            ))}
        </div>
      );

}