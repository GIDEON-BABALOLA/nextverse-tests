import { MdGridView, MdGroups, MdBarChart, MdAutoStories, MdPersonOutline, MdReport, MdEmail, MdSettings, MdLogout, MdClose } from 'react-icons/md';
import { FaHome, FaBookmark } from 'react-icons/fa';
import { Link, useParams } from "react-router-dom"
import "../../../styles/components/Dashboard/sidebar.css"
import logo from "../../../../src/assets/litenote.png"
import useColorMode from '../../../hooks/useColorMode';
import {  useEffect } from 'react';
const SideBar = ({sidebarRef, dashboardToast, setDashboardToast}) => {
   let role = "user"
   const  { colorMode }= useColorMode()
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
   // console.log(linkRef.current.innerText)
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
  console.log("start")
    }
  const handleTouchEnd = (event) => {
      endX = event.changedTouches[0].clientX;
      endY = event.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      console.log(deltaY)
  
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
         console.log("left")
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
   useEffect(()=> {
clickSidebarMenu()
   }, [currentUrl] )
  return (
<>
<aside className="litenote-sidebar-aside" ref={sidebarRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

                    <div className="top">
                        <div className="logo">
                         <img src={logo} />
                         <h2 className="litenote-dashboard-h-two">Lite Note </h2>
                        </div>
             <div className="close" id="close-btn" onClick={closeSidebar}>

               <MdClose size={25}/>
             </div>
                    </div>

                    <div className="sidebar">
                 <Link to="/" className={`sidebar-links ${currentUrl === "home" && "active"}`} >
                    <FaHome size={24} />
                           <h3 className="litenote-dashboard-h-three">Home</h3>
        </Link>
                 
                    <Link to="/dashboard/bookmarks"  className={`sidebar-links ${currentUrl === "bookmarks" && "active"}`}>
                    <FaBookmark size={20} />
                           <h3 className="litenote-dashboard-h-three">Bookmarks</h3>
        </Link>
                      
                        
                        <Link to="/dashboard/users" className={`sidebar-links ${currentUrl === "users" && "active"}` } 
                           onClick={dave}
                        >
                        
                        <MdGroups size={24} />

                           <h3 className="litenote-dashboard-h-three"   >Users</h3>
                        </Link>

                        <Link  to="/dashboard/analytics"  className={`sidebar-links ${currentUrl === "analytics" && "active"}`}
                        onClick={dave}
                        >
                        <MdBarChart size={24} />
                           <h3 className="litenote-dashboard-h-three">Analytics</h3>
                        </Link>
                        <Link to="/dashboard/stories" className={`sidebar-links ${currentUrl === "stories" && "active"}`} 
                        
                        onClick={dave}>
                        <MdAutoStories size={24} />

                           <h3 className="litenote-dashboard-h-three">Stories</h3>
                        </Link>
                        <Link to="/dashboard/profile" className={`sidebar-links ${currentUrl === "profile" && "active"}`} 
                        
                        onClick={dave}>
                        <MdPersonOutline size={24} />
                           <h3 className="litenote-dashboard-h-three">Profile</h3>
                        </Link>
                        <Link to="/dashboard/reports" className={`sidebar-links ${currentUrl === "reports" && "active"}`} 
                        
                        onClick={dave}>
                        <MdReport size={24} />
                           <h3 className="litenote-dashboard-h-three">Reports</h3>
                        </Link>
                        <Link to="/dashboard/email" className={`sidebar-links ${currentUrl === "messages" && "active"}`}
                        
                        onClick={dave}>
                        <MdEmail size={24} />
                           <h3 className="litenote-dashboard-h-three">Messages</h3>
                           <span className="message-count">26</span>
                        </Link>
                        <Link to="/dashboard/settings" className={`sidebar-links ${currentUrl === "settings" && "active"}`} 
                        
                        onClick={dave}>
                        <MdSettings size={24} />
                           <h3 className="litenote-dashboard-h-three">Settings</h3>
                        </Link>
                        <Link href="/dashboard/logout"  className={`sidebar-links ${currentUrl === "logout" && "active"}`}
                           onClick={dave}
                           >
                        <MdLogout size={24} />
                           <h3 className="litenote-dashboard-h-three">Logout</h3>
                        </Link>
                       
                    </div>
                </aside>
</>
  )
}

export default SideBar