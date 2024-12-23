import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from './Nav'

export default function Journal() {
  let { userId } = useParams()
  const [journalEntries, setEntries] = useState([])
  const navigate = useNavigate()
  
    useEffect(()=>{
      const isAuth = JSON.parse(localStorage.getItem('isAuth'));
      if(isAuth===false){
        console.log(isAuth)
        navigate('/login');
      }
    },[])
  
   

  useEffect(() => {
    fetch(`/api/journal/${userId}`)
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [userId])

  if (!journalEntries) {
    return <div>Loading...</div>
  }

  const openEntry = (e,entryId) => {
      e.preventDefault()
      navigate(`/entry/${userId}/${entryId}`)
  }

  const updateEntry = (e,entryId) => {
    e.preventDefault()
    navigate(`/updateentry/${userId}/${entryId}`)
  }

  const deleteEntry = async (e,entryId) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/deleteentry/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ entryId:entryId })
      })

      const data = await response.json()

      if (response.ok) {
        console.log(data.deleted)
        window.location.reload();
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.error('error:', error)
    }
  
  }

  const addEntry = () => {
    navigate(`/addentry/${userId}`)
  }

  return (
    <div>
      <Nav userId={userId} />
      <h1>Journal</h1>
      {journalEntries.map((entry) => (
        <li key={entry.id}>
          <h2>{entry.title}</h2>
          <p>
            <strong>Date:</strong> {entry.date}
          </p>
          <p>
            <strong>Rate:</strong> {entry.rate}
          </p>
          <button onClick={(e) => openEntry(e, entry.id)}>Open</button>
          <button onClick={(e) => updateEntry(e, entry.id)}>Update</button>
          <button onClick={(e) => deleteEntry(e, entry.id)}>Delete</button>
        </li>
      ))}
      <button onClick={addEntry}>Add entry</button>
    </div>
  )
}
