import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { useNavigate,useParams } from 'react-router-dom';



export default function Liked(){
    const [likedBooks, setBooks] = useState([]);
    const navigate = useNavigate();
    let { userId } = useParams();
    
      useEffect(() => {
        fetch(`/api/liked/${userId}`)
          .then((response) => response.json())
          .then((data) => setBooks(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

      const openBook = ()=>{
        navigate("/book");
      }
    
      return (
        <div>
          <Nav userId={userId}/>
          <h1>Books</h1>
          {likedBooks.map((book,index) => (
              <li key={index}>
               <h2>{book.title}</h2>
               <p><strong>Author:</strong> {book.author}</p>
               <p><strong>Year:</strong> {book.year}</p>
               <p><strong>Pages:</strong> {book.pages}</p>
               <p><strong>Rating:</strong> {book.rating}</p>
               <button onClick={openBook}>Open</button>
              </li>
            ))}
        </div>
      );

}