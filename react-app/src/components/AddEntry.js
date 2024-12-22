import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEntry(){
    let { userId } = useParams();
    const [title, setTitle] = useState('');
    const [date,setDate] = useState('');
    // const [review, setReview] = useState({});
    // const [notes, setNotes] = useState([]);
    const [rate, setRate] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
        const handleAddEntry = async (e)=>{
            e.preventDefault();
            console.log('entryAdded');
            try {
                const response = await fetch(`/api/addentry/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title,date, rate }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    console.log(data.entries);
                    navigate(`/journal/${userId}`);
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                setMessage('An error occurred. Please try again.');
                console.error('error:', error);
            }
        }
    
    return(
        <div>
            <h1>Add entry</h1>
            <form onSubmit={handleAddEntry}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rate:</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add entry</button>
            </form>
            {message && <p>{message}</p>}

        </div>
    )
}