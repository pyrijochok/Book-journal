// Inside a React component
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LogIn from './components/LogIn'
import Register from './components/Register'
import JournalEntry from './components/JournalEntry'
import Journal from './components/Journal'
import AddEntry from './components/AddEntry'
import UpdateEntry from './components/UpdateEntry'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/journal/:userId" element={<Journal />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entry/:userId/:entryId" element={<JournalEntry />} />
        <Route path="/addentry/:userId" element={<AddEntry />} />
        <Route path="/updateentry/:userId/:entryId" element={<UpdateEntry />} />
      </Routes>
    </Router>
  )
}

export default App
