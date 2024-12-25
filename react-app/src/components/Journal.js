import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from './Nav'

export default function Journal() {
  let { userId } = useParams()
  const [journalEntries, setEntries] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem('isAuth'))
    if (isAuth === false) {
      console.log(isAuth)
      navigate('/')
    }
  }, [])

  useEffect(() => {
    fetch(`/api/journal/${userId}`)
      .then((response) => response.json())
      .then((data) => setEntries(data.entries))
      .catch((error) => console.error('Error fetching data:', error))
  }, [userId])

  if (!journalEntries) {
    return <div>Loading...</div>
  }


  const openEntry = (e, entryId) => {
    e.preventDefault()
    navigate(`/entry/${userId}/${entryId}`)
  }

  const updateEntry = (e, entryId) => {
    e.preventDefault()
    navigate(`/updateentry/${userId}/${entryId}`)
  }

  const deleteEntry = async (e, entryId) => {
    e.preventDefault()
      try {
        const response = await fetch(`/api/entry/delete/${entryId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ entryId: entryId })
        })
  
        const data = await response.json()
  
        if (response.ok) {
          console.log(data.deleted)
          window.location.reload()
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
      {journalEntries.length===0?(
        <div>User has no entries yet</div>
      ):(
      <ul>
        {journalEntries.map((entry) => (
        <li key={entry._id}>
          <h2>{entry.title}</h2>
          <p>
            <strong>Date:</strong> {new Date(entry.date).toDateString()}
          </p>
          <p>
            <strong>Rate:</strong> {entry.rate}
          </p>
          <button onClick={(e) => openEntry(e, entry._id)}>Open</button>
          <button onClick={(e) => updateEntry(e, entry._id)}>Update</button>
          <button onClick={(e) => deleteEntry(e, entry._id)}>Delete</button>
        </li>
      ))}
      </ul>
    )}
      <button onClick={addEntry}>Add entry</button>
    </div>
  )
}
