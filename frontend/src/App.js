// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from './components/Navbar';
import Home from './components/Home';
import BlogEditor from './components/BlogEditor';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<BlogEditor />} />
        
        
      </Routes>
    </Router>
  );
};

export default App;