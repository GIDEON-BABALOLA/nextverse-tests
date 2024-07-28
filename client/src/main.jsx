import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChatBotProvider } from './context/ChatBotContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ChatBotProvider>  
  <Router>
  <Routes>
  <Route path="/*" element={<App/>}/> 
  {/* /* Means more nested route inside the route */}
  </Routes>
  </Router>
  </ChatBotProvider>
  </React.StrictMode>,
)
