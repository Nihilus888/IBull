import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import Home from './components/home/Home'
import StickyFooter from './components/partials/SiteFooter'
import Register from './components/register/Register'
import Guest from './components/auth/Guest'
import Auth from './componets/auth/auth'
import Login from './components/login/Login'
import SiteHeader from './components/partials/SiteHeader'
import StockView from './components/stockView/StockView'

function App() {
  // const profile = (<SiteHeader id={} showViewButton={true} />)

  return (
  
    <div className="App">

      <SiteHeader />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Guest component={Register} />} />
        <Route path="/login" element={<Guest component={Login} />} />
        <Route path="/stock/:id" element={<Guest component={StockView} />} />
        <Route path='/profile/:id' element={<Auth component={Profile} />} />
        <Route path='/logout' />
      </Routes>

      <StickyFooter />
    </div>
  );
}

export default App;

