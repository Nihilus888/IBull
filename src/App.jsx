import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import Home from './components/home/Home'
import StickyFooter from './components/partials/SiteFooter'
import Register from './components/register/Register'
import Guest from './components/auth/Guest'
import Login from './components/login/Login'
import SiteHeader from './components/partials/SiteHeader'

function App() {
  // const profile = (<SiteHeader id={} showViewButton={true} />)

  return (
  
    <div className="App">

      <SiteHeader />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Guest component={Register} />} />
        <Route path="/login" element={<Guest component={Login} />} />
      </Routes>

      <StickyFooter />
    </div>
  );
}

export default App;

