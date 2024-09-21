import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
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
import { useAuthContext } from './hooks/useAuthContext';
import TeamPage from "./Pages/TeamPage"
function App() {
  const { user } = useAuthContext()
  const location = useLocation();
  console.log(location)
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(null)
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
   setShowTermsAndConditions={ setShowTermsAndConditions}/>}>
<Route index element={<Home 
showTermsAndConditions={showTermsAndConditions} setShowTermsAndConditions={setShowTermsAndConditions}/>} />
<Route path="publish" element={ user == null ? <Navigate to="/login" /> : <Publish />} />
<Route path="profile" element={ user == null ? <Navigate to="/login" /> : <ProfilePage/>}/>
<Route path="explore" element={user == null ? <Navigate to="/login" /> : <BrowsePage/>}/>
  </Route>
  <Route path="our-team" element={<TeamPage />} />
  <Route path="login" element={<LoginPage />} />
  <Route path="feed" element={  user == null ? <Navigate to="/login" /> : <FeedPage />} />
  <Route path="story" element={user == null ? <Navigate to="/login" /> : <StoryPage />}  />
  <Route path="follow-suggestions" element={ user == null ? <Navigate to="/login" /> : <FollowPage />}/>
  <Route path="dashboard" element={user == null ? <Navigate to = "/login" /> : <DashboardLayout sidebarRef={sidebarRef} dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>}>
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
<Route path="verify/:email/:token" element={<VerifyPage />}/>
  <Route  path="*" element={<NotFound/>}/>
</Routes> : <JoinWaitingListPage />
}
    </>
  )
}

export default App
