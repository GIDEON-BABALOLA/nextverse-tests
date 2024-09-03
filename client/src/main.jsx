import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChatBotProvider } from './context/ChatBotContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthContextProvider>
  <ChatBotProvider>  
  <Router>
  <Routes>
  <Route path="/*" element={<App/>}/> 
  </Routes>
  </Router>
  </ChatBotProvider>
  </AuthContextProvider>
  </React.StrictMode>,
)
