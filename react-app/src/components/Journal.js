import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Nav from './Nav';


export default function Journal(){
    let { userId } = useParams();
    const [journalEntries, setEntries] = useState([]);
    const navigate = useNavigate();
    
      // useEffect(() => {
      //   fetch('/api/journal')
      //     .then((response) => response.json())
      //     .then((data) => setEntries(data))
      //     .catch((error) => console.error('Error fetching data:', error));
      // }, []);

      useEffect(() => {
        fetch(`/api/journal/${userId}`)
          .then((response) => response.json())
          .then((data) => setEntries(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, [userId]);

      if (!journalEntries) {
        return <div>Loading...</div>;
      }


      const openEntry = ()=>{
        navigate("/entry");
      }

      // const addEntry = ()=>{
      //   navigate("/addentry");
      // }

      const addEntry = ()=>{
        navigate(`/addentry/${userId}`);
      }
    
      return (
        <div>
             <Nav userId={userId}/>
          <h1>Journal</h1>
          {journalEntries.map((entry,index) => (
              <li key={index}>
               <h2>{entry.title}</h2>
               <p><strong>Date:</strong> {entry.date}</p>
               <p><strong>Rate:</strong> {entry.rate}</p>
               <button onClick={openEntry}>Open</button>
              </li>
            ))}
            <button onClick={addEntry}>Add entry</button>
        </div>
      );

}