import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { RegisterProvider } from './context/RegisterContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import '@fontsource-variable/inter';
import '@fontsource-variable/roboto';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RegisterProvider>
          <App />
        </RegisterProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);