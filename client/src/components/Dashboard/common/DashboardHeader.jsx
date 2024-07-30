import "../../../styles/components/Dashboard/dashboard-header.css"
import { MdMenu, MdLightMode, MdDarkMode} from "react-icons/md"
import image from "../../../assets/3.jpg"
import { useRef, useState, useEffect } from "react"
import ContextMenu from "../../common/ContextMenu"
import {  MdLogout, MdSettings, MdClose, MdGridView, MdOpenInNew }from "react-icons/md"
import { FaHome, FaUserAlt, FaUser } from 'react-icons/fa';
import useWindowSize from "../../../hooks/useWindowSize"
import NavbarContextMenu from "../../common/NavbarContextMenu"
import { FaAngleRight } from "react-icons/fa"
import useInternetMode from "../../../hooks/useInternetMode"
const DashboardHeader = ({sidebarRef, contextMenu, setContextMenu}) => {
  const {width, height} = useWindowSize()
  const { online } = useInternetMode()
  const themeRef = useRef();
  const toggleTheme  = () => {
    document.body.classList.toggle('dark-theme-variables');
     themeRef.current.querySelector('span:nth-child(1)').classList.toggle('active');
 themeRef.current.querySelector('span:nth-child(2)').classList.toggle('active');
  }

  const showLoggedUserOptions = (e) => {
    console.log("dave")
    // if(width > 768){
    //   return
    // }
    // updateMenuPosition(e.clientX, e.clientY)
    // updateMenuPosition(e.clientX, width < 768 ? 45: 29)
    updateMenuPosition(width < 768 ? e.clientX: 1090, width < e.clientY ? 45: 50)
contextMenu.current.style.visibility = "visible"
contextMenu.current.classList.add("active")    
  }
  const updateMenuPosition = (x, y) => {
    const maxTopValue = height - contextMenu.current.offsetHeight;
    const maxLeftValue = width - contextMenu.current.offsetWidth; 
    contextMenu.current.style.left = `${Math.min(maxLeftValue, x)}px`;
    contextMenu.current.style.top = `${Math.min(maxTopValue, y)}px`; 
      };
  const showSidebar = () => {
    console.log("dave")
       sidebarRef.current.classList.remove("litenote-sidebar-aside-close")
 sidebarRef.current.style.display='block';
  }
  useEffect(() => {

    if (contextMenu) {
      window.addEventListener('scroll', () => {
        contextMenu.current.style.visibility = "hidden";
      });
    }

    return () => {
      if (contextMenu) {
        window.removeEventListener('scroll', () => {
          contextMenu.current.style.visibility = "hidden";
        });
      }
    };
  }, [contextMenu]);
    const userName = "Gideon"
  return (
    <div className="litenote-dashboard-top">
    <button id="menu-btn" onClick={showSidebar}>
      <span>
        <MdMenu />
      </span>
    </button>
    <div className="litenote-dashboard-theme-toggler" width onClick={toggleTheme} ref={themeRef}>
    <span className="active">
    <MdDarkMode />
    </span>
    <span>
    <MdLightMode />
      </span>
    </div>
    
         <div className="litenote-dashboard-profile">
            <div className="info  profile-text">
          {/* it is meant to be p here */}
                <div>Hey, <b>{userName}</b>
                </div>
                <small className="text-muted" style={{color : "#7d8da1"}}>Admin</small>
            </div>
            <div> <img  
            style={{cursor: "pointer"}}
             className="litenote-dashboard-profile-again-photo" src={image} alt=""
            onClick={showLoggedUserOptions}
             /></div>
       
    </div>

    <NavbarContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu}
contextMenuData={[
  {
  id : 1,
  icon : <MdGridView className="imags" size={40}/>,
  label : "Dashboard",
  arrow :  online ? ">" : <FaAngleRight />,
  link : "/dashboard/analytics"
},
{
  id : 2,
  icon : <FaUser className="imags" size={40}/>,
  label : "Edit Profile",
  arrow :  online ? ">" : <FaAngleRight />,
     link : "/dashboard/profile"
},
{
  id : 3,
  icon : <MdSettings className="imags settings-rotate" size={40}/>,
  label : "Settings & Privacy",
  arrow :  online ? ">" : <FaAngleRight />,
     link : "/dashboard/settings"
},
{
  id : 4,
  icon : <MdLogout className="imags" size={40}/>,
  label : "Sign Out",
  arrow :   <MdOpenInNew />,
     link : "/"
},

]}
/>
    </div>
  )
}

export default DashboardHeader