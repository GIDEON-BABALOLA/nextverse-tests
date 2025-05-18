import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChatBotProvider } from './context/ChatBotContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { ModalContextProvider } from "./context/ModalContext.jsx"
import { ToastContextProvider } from './context/ToastContext.jsx'
import { SettingsContextProvider } from "./context/SettingsContext.jsx"
import { ConsentContextProvider } from './context/ConsentContext.jsx'
import { StickyNotesContextProvider } from './context/StickyNotesContext.jsx'
import { ProfileContextProvider } from './context/ProfileContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Router>
  <AuthContextProvider>
  <ProfileContextProvider>
  <ToastContextProvider>
  <ThemeContextProvider>
  <SettingsContextProvider>

  <ConsentContextProvider>
  <ModalContextProvider>
  <ChatBotProvider>  
  <StickyNotesContextProvider>

  <Routes>
  <Route path="/*" element={<App/>}/> 
  </Routes>
  </StickyNotesContextProvider>
  </ChatBotProvider>
  </ModalContextProvider>
  </ConsentContextProvider>
  </SettingsContextProvider>
  </ThemeContextProvider>
  </ToastContextProvider>
  </ProfileContextProvider>
  </AuthContextProvider>
  </Router>
  </>

)
