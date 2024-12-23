import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from './Nav'

export default function AddEntry() {
  let { userId } = useParams()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
//   const [date, setDate] = useState('')
  const [pages, setPages] = useState('')
  const [text, setText] = useState('')
  const [rate, setRate] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem('isAuth'))
    if (isAuth === false) {
      console.log(isAuth)
      navigate('/')
    }
  }, [])

  const handleAddEntry = async (e) => {
    e.preventDefault()
    console.log('entryAdded')
    try {
      const response = await fetch(`/api/entry/add/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, pages, text, rate })
      })

      const data = await response.json()

      if (response.ok) {
        console.log(data.result)
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
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pages:</label>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Text:</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)}>
            Your entry text
          </textarea>
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
