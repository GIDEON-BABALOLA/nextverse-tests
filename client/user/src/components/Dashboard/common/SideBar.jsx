import { MdGridView, MdGroups,
   MdBookmarks,
   MdBarChart,
   MdNotifications,
   MdAutoStories, MdPersonOutline, MdReport, MdEmail, MdSettings, MdLogout, MdClose } from 'react-icons/md';
import { FaHome, FaBookmark } from 'react-icons/fa';
import NotificationBadge from "../../common/NotificationBadge"
import { Link, useParams } from "react-router-dom"
import "../../../styles/components/Dashboard/sidebar.css"
import { CgFeed} from "react-icons/cg"
import { useThemeContext } from '../../../hooks/useThemeContext';
import { MdDynamicFeed } from "react-icons/md";
import { useGetNotificationsCount } from "../../../hooks/useGetNotificationsCount"
import {  useEffect } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import useImageLoad from '../../../hooks/useImageLoaded';
import SpecialModal from '../../common/SpecialModal';
import LogoutConsent from '../../common/LogoutConsent';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState } from 'react';
const SideBar = ({sidebarRef, dashboardToast, setDashboardToast}) => {
   const { notificationsCount, getNotificationsCount } = useGetNotificationsCount();
   const { user } = useAuthContext();
   console.log(user)
   const [loading, setLoading] = useState(true)
   const [openModal,setOpenModal] = useState(false)
   const { loaded, error } = useImageLoad("https://res.cloudinary.com/doctr0fct/image/upload/v1715858874/company/lgudp6d1efith51xwyev.png");
   useEffect(() => {
      if (error) {
       setLoading(true)
      }
    
      if (loaded === true) {
      setLoading(false)
      }
    }, [loaded, error])
   const { colorMode } = useThemeContext()
   const { width } = useWindowSize() 
   useEffect(() => {
      if(colorMode == ""){
        document.body.classList.remove('dark-theme-variables');
        
      }
      // }
  switch (colorMode) {
    case "dark-mode":
      document.body.classList.add('dark-theme-variables');
  
      break;
      case "light-mode":
        document.body.classList.remove('dark-theme-variables');
      
      break;
  }
    }, [colorMode])
   const currentPage = useParams();
   const currentUrl = Object.values(currentPage)[0].split("/")[1]
   const closeSidebar = () => {
sidebarRef.current.classList.add("litenote-sidebar-aside-close")
sidebarRef.current.style.display = "block";
   }
   let startX, startY, endX, endY;
   const minSwipeDistance = 50;
   const handleTouchStart = (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }
  const handleTouchEnd = (event) => {
      endX = event.changedTouches[0].clientX;
      endY = event.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
         return;
        } else {
    
      closeSidebar()
        }
      }
    }
   const clickSidebarMenu = () => {
         setDashboardToast(true)   
     
   }
   const dave = () => {
      setDashboardToast(false)
sidebarRef.current.classList.add("litenote-sidebar-aside-close")
sidebarRef.current.style.display = "block";
   }
   const handleLogout = () => {
      setDashboardToast(false)
      sidebarRef.current.classList.add("litenote-sidebar-aside-close")
      sidebarRef.current.style.display = "block";
      setOpenModal(true)
   }
   useEffect(()=> {
clickSidebarMenu()
   }, [currentUrl] )
   useEffect(() => {
      getNotificationsCount()
   }, [])
  return (
<>
<SpecialModal openModal={openModal} setOpenModal={setOpenModal} title="" content={<LogoutConsent

setOpenModal={setOpenModal} />} height={350} width={400}/>
<aside className="litenote-sidebar-aside"

ref={sidebarRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

                    <div className="top" style={{ display : "flex", flexDirection : "row", alignItems : "center", position : width > 767 && "fixed",
                  
                    }}>
                        <div className="logo">
                      {  
                      loading ? 
                      <div className='sidebar-loaders sidebar-loaders-logo'></div>
                      : 
                      <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1715858874/company/lgudp6d1efith51xwyev.png"} 
                         style={{width : "20%"}}
                         />
}
                         <h2 className="litenote-dashboard-h-two">Lite Note </h2>
                        </div>
             <div className="close" id="close-btn" onClick={closeSidebar}>

               <MdClose size={25}/>
             </div>
                    </div>

                    <div className={`sidebar ${user.role === "user" ? "this-is-a-user" : "this-is-not-a-user"}`}

                    >
                <Link to="/" className={`sidebar-links ${currentUrl === "home" && "active"}`} >
                    <FaHome size={24} />
                           <h3 className="litenote-dashboard-h-three">Home</h3>
        </Link> 
        <Link to="/feed" className={`sidebar-links ${currentUrl === "home" && "active"}`} >
                    <CgFeed size={24} />
                           <h3 className="litenote-dashboard-h-three">Feed</h3>
        </Link>
                 
                    <Link to="/dashboard/bookmarks"  className={`sidebar-links ${currentUrl === "bookmarks" && "active"}`}>
                    <MdBookmarks size={20} />
                           <h3 className="litenote-dashboard-h-three">Bookmarks</h3>
        </Link>
                      


                     {  user.role == "admin" && <Link  to="/dashboard/analytics"  className={`sidebar-links ${currentUrl === "analytics" && "active"}`}
                        onClick={dave}
                        >
                        <MdBarChart size={24} />
                           <h3 className="litenote-dashboard-h-three">Analytics</h3>
                        </Link> }
                        <Link to="/dashboard/publish" className={`sidebar-links ${currentUrl === "publish" && "active"}`} 
                        
                        onClick={dave}>
                        <MdAutoStories size={24} />

                           <h3 className="litenote-dashboard-h-three">Publish</h3>
                        </Link>
                        <Link to="/dashboard/messages" className={`sidebar-links ${currentUrl === "messages" && "active"}`}
                        
                        onClick={dave}>
                        <MdEmail size={24} />
                           <h3 className="litenote-dashboard-h-three">Messages</h3>
                           <span className="message-count">26</span>
                        </Link>
                        <Link to="/dashboard/profile" className={`sidebar-links ${currentUrl === "profile" && "active"}`} 
                        
                        onClick={dave}>
                        <MdPersonOutline size={24} />
                           <h3 className="litenote-dashboard-h-three">Profile</h3>
                        </Link>
                        
                       { user.role == "admin" && <Link to="/dashboard/reports" className={`sidebar-links ${currentUrl === "reports" && "active"}`} 
                        
                        onClick={dave}>
                        <MdReport size={24} />
                           <h3 className="litenote-dashboard-h-three">Reports</h3>
                        </Link>
                       }
               
                        <Link to="/dashboard/notifications" className={`sidebar-links ${currentUrl === "notifications" && "active"}`}
                        
                        onClick={dave}>
                      
                        <NotificationBadge fontSize={25} iconColor={"#7d8da1"} badgeColor={"var(--litenote-notification-badge-background)"} 
                        number={notificationsCount}
                        />

                           <h3 className="litenote-dashboard-h-three" >Notifications</h3>
                           {/* <span className="message-count">26</span> */}
                        </Link>
                        <Link to="/dashboard/settings" className={`sidebar-links ${currentUrl === "settings" && "active"}`} 
                        
                        onClick={dave}>
                        <MdSettings size={24} />
                           <h3 className="litenote-dashboard-h-three">Settings</h3>
                        </Link>
                        
                        <span style={{cursor : "pointer"}}
                         href="/dashboard/logout"  className={`sidebar-links ${currentUrl === "logout" && "active"} special-modal-client
         `}
                           onClick={handleLogout}
                           >
                        <MdLogout size={24} className='special-modal-client'/>
                           <h3 className="litenote-dashboard-h-three special-modal-client">Logout</h3>
                        </span>
                       
                    </div>
                </aside>
</>
  )
}

export default SideBar