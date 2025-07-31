import React from 'react';
import Navbar from  "./components/Navbar";
import Home from  "./components/Home";
import Footer from  "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Creators from './pages/Creators'
import { useAuth } from './context/AuthProvider';
import { Toaster } from "react-hot-toast";


function App() {

  const location = useLocation();
  const hideNavbarFooter = ["/dashboard","/login","/register"].includes(location.pathname);

  const {blogs} = useAuth();
  console.log(blogs);
  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      {/*Defining Routes */}
      <Routes>
      <Route exact path = "/" element = {<Home />} ></Route>
      <Route exact path = "/blogs" element = {<Blogs />} ></Route>
      <Route exact path = "/about" element = {<About />} ></Route>
      <Route exact path = "/contact" element = {<Contact />} ></Route>
      <Route exact path = "/creators" element = {<Creators />} ></Route>
      <Route exact path = "/login" element = {<Login />} ></Route>
      <Route exact path = "/register" element = {<Register />} ></Route>
      <Route exact path = "/dashboard" element = {<Dashboard />} ></Route>
      </Routes>
      {!hideNavbarFooter && <Footer />}
      <Toaster />
    </div>
  )
}

export default App