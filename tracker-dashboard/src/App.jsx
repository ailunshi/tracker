import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/landing-page'
import RegistrationName from './pages/registration-name'
import RegistrationEmail from './pages/registration-email'
import RegistrationPassword from './pages/registration-password'
import Login from './pages/login'
import Tracker from './pages/tracker'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration-name" element={<RegistrationName />} />
      <Route path="/registration-email" element={<RegistrationEmail />} />
      <Route path="/registration-password" element={<RegistrationPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tracker" element={<Tracker />} />
    </Routes>
  );
};

export default App
