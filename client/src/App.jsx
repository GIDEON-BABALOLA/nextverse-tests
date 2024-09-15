import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from './components/common/Layout';
import Home from './Pages/Home';
import NotFound from "./Pages/NotFound"
import Publish from './Pages/Publish';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import VerifyPage from "./Pages/Verify"
import ProfilePage from './Pages/Profile';
import FeedPage from "./Pages/Feed"
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
import JoinWaitingListPage from './Pages/JoinWaitingListPage';
import MessagesPage from "./Pages/Dashboard/MessagesPage"
import StoryPage from './Pages/StoryPage';
import FollowPage from './Pages/FollowPage';
import { useLocation } from "react-router-dom"
import TeamPage from "./Pages/TeamPage"
import { useEffect } from 'react';
function App() {
  const location = useLocation();
  console.log(location)
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(null)
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  const sidebarRef = useRef()
  const [dashboardToast, setDashboardToast] = useState(false)
//   useEffect(() => {

// const dashboardPattern = /^\/dashboard\/?.*$/
// const feedPattern = /^\/feed\/?.*$/

//     if (!dashboardPattern.test(location.pathname)) {
//       document.body.classList.remove('dark-theme-variables');
//     } 
//   }, [location.pathname]);
  let appReady = true
  return (
    
    <>
{ appReady ?   <Routes>
  <Route path="/" element={<Layout className="pages"
  setShowCookieConsent={setShowCookieConsent}
   setShowTermsAndConditions={ setShowTermsAndConditions}/>}>
<Route index element={<Home 
showCookieConsent={showCookieConsent}
setShowCookieConsent={setShowCookieConsent}
showTermsAndConditions={showTermsAndConditions} setShowTermsAndConditions={setShowTermsAndConditions}/>} />
<Route path="publish" element={<Publish />} />
<Route path="profile" element={< ProfilePage/>}/>
<Route path="explore" element={< BrowsePage/>}/>
  </Route>
  <Route path="our-team" element={<TeamPage />} />
  <Route path="login" element={<LoginPage />} />
  <Route path="feed" element={<FeedPage />} />
  <Route path="story" element={<StoryPage />}/>
  <Route path="follow-suggestions" element={<FollowPage />}/>
  <Route path="dashboard" element={<DashboardLayout sidebarRef={sidebarRef} dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>}>
          <Route path="bookmarks" element={<BookmarksPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="analytics" element={<AnalyticsPage sidebarRef={sidebarRef} dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>}/>
          <Route path="users" element={<UsersPage sidebarRef={sidebarRef} dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>}/>
          <Route path="settings" element={<SettingsPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="publish" element={<StoriesPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="reports" element={<ReportsPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="profile" element={<DashboardProfilePage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="messages" element={<MessagesPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          
        </Route>

<Route path="register" element={<RegisterPage />} />
<Route path="verify" element={<VerifyPage />}/>
  <Route  path="*" element={<NotFound/>}/>
</Routes> : <JoinWaitingListPage />
}
    </>
  )
}

export default App
