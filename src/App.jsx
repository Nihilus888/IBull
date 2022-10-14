import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import Home from './components/home/Home'
import StickyFooter from './components/partials/SiteFooter'

function App() {
  // const profile = (<SiteHeader id={} showViewButton={true} />)

  return (
  
    <div className="App">
      <Home />
      <StickyFooter />
    </div>
  );
}

export default App;

