import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import Home from './components/home/Home'
import StickyFooter from './components/partials/SiteFooter'
import Register from './components/register/Register'
import Guest from './components/auth/Guest'

function App() {
  // const profile = (<SiteHeader id={} showViewButton={true} />)

  return (
  
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Guest component={Register} />} />
      </Routes>
      <StickyFooter />
    </div>
  );
}

export default App;

