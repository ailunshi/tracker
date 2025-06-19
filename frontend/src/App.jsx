import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import Home from './pages/landing-page'
import RegistrationName from './pages/registration-name'
import RegistrationEmail from './pages/registration-email'
import RegistrationPassword from './pages/registration-password'
import Login from './pages/login'
import Tracker from './pages/tracker'
import PrivateRoute from './hocs/PrivateRoute'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration-name" element={<RegistrationName />} />
      <Route path="/registration-email" element={<RegistrationEmail />} />
      <Route path="/registration-password" element={<RegistrationPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* move dashboard to private later */}
      <Route
        exact path='/tracker'
        element={
          <PrivateRoute>
            <Tracker />
            
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App
