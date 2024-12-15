import './App.css';
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import Layout from './components/common/Layout';
import Home from './Pages/Home';
import NotFound from "./Pages/NotFound"
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import VerifyPage from "./Pages/Verify"
import ProfilePage from './Pages/Profile';
import FeedPage from "./Pages/Feed"
import ExplorePage from "./Pages/ExplorePage"
import { useState, useRef, useEffect } from "react"
import AnalyticsPage from "./Pages/Dashboard/AnalyticsPage"
import UsersPage from "./Pages/Dashboard/UsersPage"
import SettingsPage from "./Pages/Dashboard/SettingsPage"
import StoriesPage from './Pages/Dashboard/StoriesPage';
import ReportsPage from './Pages/Dashboard/ReportsPage';
import DashboardLayout from './components/Dashboard/common/DashboardLayout';
import DashboardProfilePage from "./Pages/Dashboard/DashboardProfilePage"
import BookmarksPage from './Pages/Dashboard/BookmarksPage';
import NotificationsPage from './Pages/Dashboard/NotificationsPage';
import JoinWaitingListPage from './Pages/JoinWaitingListPage';
import MessagesPage from "./Pages/Dashboard/MessagesPage"
import StoryPage from './Pages/StoryPage';
import NoteReaderPage from './Pages/NoteReaderPage';
import LoadingPage from './Pages/LoadingPage';
import FollowPage from './Pages/FollowPage';
import { useAuthContext } from './hooks/useAuthContext';
import { useThemeContext } from './hooks/useThemeContext';
import DevelopersPage from "./Pages/DevelopersPage"
function App() {
  console.log("dave")
  const location = useParams()
  const { colorMode } = useThemeContext()
  useEffect(() => {
switch (location["*"]) {
  case "":
    document.body.classList.add('body-height-override');
    break;
  default:
    document.body.classList.remove('body-height-override');
    break;
}
if(location["*"]  !== ""){
  switch (colorMode) {
    case "dark-mode":
      document.body.classList.add("dark-theme-variables")
      break;
      case "light-mode":
          document.body.classList.remove("dark-theme-variables")
      break;
  }
}

  }, [location, colorMode])
  const { user, appLoading } = useAuthContext()
  const sidebarRef = useRef()
  const [dashboardToast, setDashboardToast] = useState(false)
  let appReady = true
  return (
    
    <>
{ appReady ?   <Routes>
  <Route path="/" element={<Layout className="pages"/>}>
<Route index element={<Home/>    } />
<Route path="profile/:username" 
    element={
          appLoading ? (
        <LoadingPage />
          ) : user ? (
            <ProfilePage />
          ) : (
            <Navigate to="/login" />
          )
        }
/>
<Route path="explore" 
    element={
          appLoading ? (
        <LoadingPage />
          ) : user ? (
            <ExplorePage />
          ) : (
            <Navigate to="/login" />
          )
        }
/>
  </Route>
  <Route path="feed" 
    element={
          appLoading ? (
        <LoadingPage />
          ) : user ? (
            <FeedPage />
          ) : (
            <Navigate to="/login" />
          )
        }
/>
<Route path="story/:username/:title/:id" 
    element={
          appLoading ? (
        <LoadingPage />
          ) : user ? (
            <StoryPage />
          ) : (
            <Navigate to="/login" />
          )
        }
/>
<Route path="follow-suggestions" 
    element={
          appLoading ? (
        <LoadingPage />
          ) : user ? (
            <FollowPage />
          ) : (
            <Navigate to="/login" />
          )
        }
/>
  <Route path="our-developers" element={<DevelopersPage />} />
  <Route path="login" element={<LoginPage />} />
  <Route path="note/:email/:id" element={ <NoteReaderPage />} />
  <Route path="dashboard" element={ <DashboardLayout sidebarRef={sidebarRef} dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>}>
          <Route path="bookmarks" element={<BookmarksPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
          <Route path="notifications" element={<NotificationsPage dashboardToast={dashboardToast} setDashboardToast={setDashboardToast} sidebarRef={sidebarRef} />}/>
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
