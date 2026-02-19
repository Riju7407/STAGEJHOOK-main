import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Suppress browser extension message channel errors
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('A listener indicated an asynchronous response by returning true')) {
    event.preventDefault();
    console.warn('ℹ️ Browser extension communication notice (can be ignored)');
  }
});

// Also handle unhandled promise rejections from extensions
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && 
      event.reason.message.includes('message channel closed')) {
    event.preventDefault();
    console.warn('ℹ️ Browser extension communication notice (can be ignored)');
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
