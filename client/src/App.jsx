import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from './components/common/Layout';
import Home from './Pages/Home';
import NotFound from "./Pages/NotFound"
import Publish from './Pages/Publish';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import ProfilePage from './Pages/Profile';
import BrowsePage from "./Pages/Browse"
import { useState, useRef } from "react"
import AnalyticsPage from "./Pages/Dashboard/AnalyticsPage"
import UsersPage from "./Pages/Dashboard/UsersPage"
import SettingsPage from "./Pages/Dashboard/SettingsPage"
import StoriesPage from './Pages/Dashboard/StoriesPage';
import ReportsPage from './Pages/Dashboard/ReportsPage';
import DashboardLayout from './components/Dashboard/common/DashboardLayout';
import DashboardProfilePage from "./Pages/Dashboard/DashboardProfilePage"
import BookmarksPage from './Pages/Dashboard/BookmarksPage';
import TeamPage from "./Pages/TeamPage"
function App() {
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(null)
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  const sidebarRef = useRef()
  const [dashboardToast, setDashboardToast] = useState(false)
  return (
    
    <>
<Routes>
  <Route path="/" element={<Layout className="pages"
  setShowCookieConsent={setShowCookieConsent}
   setShowTermsAndConditions={ setShowTermsAndConditions}/>}>
<Route index element={<Home 
showCookieConsent={showCookieConsent}
setShowCookieConsent={setShowCookieConsent}
showTermsAndConditions={showTermsAndConditions} setShowTermsAndConditions={setShowTermsAndConditions}/>} />
<Route path="publish" element={<Publish />} />
<Route path="profile" element={< ProfilePage/>}/>
<Route path="browse" element={< BrowsePage/>}/>
  </Route>
  <Route path="our-team" element={<TeamPage />} />
  <Route path="login" element={<LoginPage />} />
  <Route path="dashboard" element={<DashboardLayout sidebarRef={sidebarRef} dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>}>
          <Route path="bookmarks" element={<BookmarksPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="analytics" element={<AnalyticsPage sidebarRef={sidebarRef} dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>}/>
          <Route path="users" element={<UsersPage sidebarRef={sidebarRef} dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>}/>
          <Route path="settings" element={<SettingsPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="stories" element={<StoriesPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="reports" element={<ReportsPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="profile" element={<DashboardProfilePage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
        </Route>

<Route path="register" element={<RegisterPage />} />
  <Route  path="*" element={<NotFound/>}/>
</Routes>
    </>
  )
}

export default App
