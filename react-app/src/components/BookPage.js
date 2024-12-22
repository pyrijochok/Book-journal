import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { useParams } from 'react-router-dom';

export default function BookPage(){
    let {userId} = useParams();
    let { bookId } = useParams();
    const [book, setBook] = useState(null);

       useEffect(() => {
        fetch(`/api/books/${bookId}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setBook(data[0]); // Unwrap if the data is an array
                } else {
                    setBook(data);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [bookId]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Nav userId={userId}/>
            <p>{book.title}</p>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
            <p>Pages: {book.pages}</p>
            <p>Rating: {book.rating}</p>
        </div>
    );

}