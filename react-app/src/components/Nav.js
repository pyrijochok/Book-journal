import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Nav({ userId }) {
  const navigate = useNavigate()

  const logOut = () => {
    navigate('/')
  }
  const openJournal = () => {
    navigate(`/journal/${userId}`)
  }

  return (
    <div>
      <button onClick={logOut}>Log out</button>
      <button onClick={openJournal}>Journal</button>
    </div>
  )
}
