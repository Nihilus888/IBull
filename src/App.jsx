import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./components/home/Home";
import StickyFooter from "./components/partials/SiteFooter";
import Register from "./components/register/Register";
import Guest from "./components/auth/Guest";
import Auth from "./components/auth/Auth";
import Login from "./components/login/Login";
import SiteHeader from "./components/partials/SiteHeader";
import StockCard from "./components/stockCard/StockCard";
import Profile from "./components/profile/Profile";
import Line from "./components/stockView/Line";

//react-query or axios for frontend API call

function App() {
  // const profile = (<SiteHeader id={} showViewButton={true} />)

  return (
    <div className="App">
      <SiteHeader />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Guest component={Register} />} />
        <Route path="/login" element={<Guest component={Login} />} />
        <Route path="/profile/:id" element={<Auth component={Profile} />} />
        <Route path="/Line" element={<Guest component={Line} />} />
        <Route path="/logout" />
      </Routes>

      <StickyFooter />
    </div>
  );
}

export default App;
