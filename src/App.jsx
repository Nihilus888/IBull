import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/home/Home";
import StickyFooter from "./components/partials/SiteFooter";
import Register from "./components/register/Register";
import Guest from "./components/auth/Guest";
import Auth from "./components/auth/Auth";
import Login from "./components/login/Login";
import SiteHeader from "./components/partials/SiteHeader";
import Profile from "./components/profile/Profile";
import Watchlist from "./components/watchlist/Watchlist";
import stockView from "./components/stock/stockView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgot from "./components/forgot/Forgot";

//react-query or axios for frontend API call

function App() {
  // const profile = (<SiteHeader id={} showViewButton={true} />)

  return (
    <div className="App">
      <ToastContainer />
      <SiteHeader />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Guest component={Register} />} />
        <Route path="/login" element={<Guest component={Login} />} />
        <Route path="/profile/:id" element={<Auth component={Profile} />} />
        <Route path="/watchlist/:id" element={<Auth component={Watchlist} /> } />
        <Route path="/stockView" element={<Auth component={stockView} />} />
        <Route path="/logout" />
        <Route path="/forgot" element={<Guest component={Forgot} />} />
      </Routes>

      <StickyFooter />
    </div>
  );
}

export default App;
