import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { Toast } from './components/common/Toast.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
        <Toast />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
