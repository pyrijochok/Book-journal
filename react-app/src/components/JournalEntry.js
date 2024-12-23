import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { useNavigate, useParams } from 'react-router-dom'

export default function JournalEntry() {
  let { userId } = useParams()
  let { entryId } = useParams()
  const navigate = useNavigate()
  const [entry, setEntry] = useState(null)

  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem('isAuth'))
    if (isAuth === false) {
      console.log(isAuth)
      navigate('/')
    }
  }, [])

  useEffect(() => {
    fetch(`/api/journal/${userId}/${entryId}`)
      .then((response) => response.json())
      .then((data) => {
        setEntry(data)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [entryId])

  if (!entry) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Nav userId={userId} />
      <h1>{entry.title}</h1>
      <p>Author: {entry.author}</p>
      <p>Pages: {entry.pages}</p>
      <p>Date: {new Date(entry.date).toDateString()}</p>
      <p>Text: {entry.entryText}</p>
      <p>Rating: {entry.rate}</p>
    </div>
  )
}
