import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from './Nav'

export default function UpdateEntry() {
  let { userId } = useParams()
  let { entryId } = useParams()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState('')
  const [text, setText] = useState('')
  const [rate, setRate] = useState('')
  const [message, setMessage] = useState('')

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

  useEffect(() => {
    if (entry) {
      setTitle(entry.title || '')
      setAuthor(entry.author || '')
      setPages(entry.pages || '')
      setText(entry.entryText || '')
      setRate(entry.rate || '')
    }
  }, [entry])

  if (!entry) {
    return <div>Loading...</div>
  }

  const handleUpdateEntry = async (e) => {
    e.preventDefault()
    console.log('entryUpdated')
    try {
      const response = await fetch(`/api/entry/update/${entryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, pages, text, rate })
      })

      const data = await response.json()

      if (response.ok) {
        console.log(data.entry)
        navigate(`/journal/${userId}`)
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
      console.error('error:', error)
    }
  }

  return (
    <div>
      <Nav userId={userId} />
      <h1>Update entry</h1>
      <form onSubmit={handleUpdateEntry}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label>Pages:</label>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </div>
        <div>
          <label>Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
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
        <button type="submit">Update entry</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
