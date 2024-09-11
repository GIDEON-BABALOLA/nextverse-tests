import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChatBotProvider } from './context/ChatBotContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { ModalContextProvider } from "./context/ModalContext.jsx"
import { ToastContextProvider } from './context/ToastContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthContextProvider>
  <ThemeContextProvider>
  <ModalContextProvider>
  <ToastContextProvider>
  <ChatBotProvider>  
  <Router>
  <Routes>
  <Route path="/*" element={<App/>}/> 
  </Routes>
  </Router>
  </ChatBotProvider>
  </ToastContextProvider>
  </ModalContextProvider>
  </ThemeContextProvider>
  </AuthContextProvider>
  </React.StrictMode>,
)
