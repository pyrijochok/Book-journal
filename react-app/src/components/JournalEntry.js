import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { useNavigate,useParams } from 'react-router-dom'

export default function JournalEntry() {
  let { userId } = useParams()
  let { entryId } = useParams()
  const navigate = useNavigate()
  const [entry, setEntry] = useState(null)

  
  useEffect(()=>{
      const isAuth = JSON.parse(localStorage.getItem('isAuth'));
      if(isAuth===false){
        console.log(isAuth)
        navigate('/login');
      }
    },[])

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
          <p>{entry.title}</p>
          <p>Author: {entry.author}</p>
          <p>Pages: {entry.pages}</p>
          <p>Date: {entry.date}</p>
          <p>{entry.entryText}</p>
          <p>Rating: {entry.rate}</p>
      </div>
  )
}
