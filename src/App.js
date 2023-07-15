import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';

export const userContext = React.createContext();

function App() {
  const user = useState(null);
  return (
    <div className="app">
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
