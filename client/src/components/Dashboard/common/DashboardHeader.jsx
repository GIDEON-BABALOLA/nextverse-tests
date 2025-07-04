import "../../../styles/components/Dashboard/dashboard-header.css"
import { MdMenu, MdLightMode, MdDarkMode} from "react-icons/md"
import { useRef, useState, useEffect } from "react"
import ContextMenu from "../../common/ContextMenu"
import {  MdLogout, MdSettings, MdClose, MdGridView, MdOpenInNew }from "react-icons/md"
import {  FaUser } from 'react-icons/fa';
import useWindowSize from "../../../hooks/useWindowSize"
import NavbarContextMenu from "../../common/NavbarContextMenu"
import { FaAngleRight } from "react-icons/fa"
import useInternetMode from "../../../hooks/useInternetMode"
import { useThemeContext } from "../../../hooks/useThemeContext"
import { useAuthContext } from "../../../hooks/useAuthContext"
import CustomAvatar from "../../common/CustomAvatar"
import SpecialModal from "../../common/SpecialModal"
import LogoutConsent from "../../common/LogoutConsent"
import FeedAvatar from "../../Feed/FeedAvatar"
const DashboardHeader = ({sidebarRef, contextMenu, setContextMenu}) => {
  const { colorMode, dispatch } = useThemeContext()
  const [openModal, setOpenModal] = useState(false)
  const { user } = useAuthContext();
  const {width, height} = useWindowSize()
  const { online } = useInternetMode()
  const themeRef = useRef();
  useEffect(() => {
    if(colorMode == undefined || colorMode == ""){
      themeRef.current.querySelector('span:nth-child(1)').classList.add('active');  
    }
    // }
switch (colorMode) {
  case "dark-mode":
    themeRef.current.querySelector('span:nth-child(2)').classList.add('active');
    themeRef.current.querySelector('span:nth-child(1)').classList.remove('active');
    break;
    case "light-mode":
      themeRef.current.querySelector('span:nth-child(1)').classList.add('active');
      themeRef.current.querySelector('span:nth-child(2)').classList.remove('active');
    break;
}
  }, [colorMode])
  const themeMode = (e) => {
    let id;
    const correctId = e.currentTarget.closest('span').id;
        if(e.target.id == ""){
         id = correctId
        }
    switch (id) {
      case "dark-mode":
        dispatch({type : "dark-mode", payload : "dark-mode"})
        themeRef.current.querySelector('span:nth-child(1)').classList.remove('active');
        themeRef.current.querySelector('span:nth-child(2)').classList.add('active');
        break;
        case "light-mode":
        dispatch({type : "light-mode", payload : "light-mode"})
          themeRef.current.querySelector('span:nth-child(2)').classList.remove('active');
          themeRef.current.querySelector('span:nth-child(1)').classList.add('active');
          break;
      
    
      default:
        break;
    }
  }

  const showLoggedUserOptions = (e) => {
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
    console.log(sidebarRef.current.classList)
 sidebarRef.current.classList.remove("litenote-sidebar-aside-close")
 sidebarRef.current.style.display='block';
sidebarRef.current.classList.add("open")
  }
  return (
    <>
    <SpecialModal openModal={openModal} setOpenModal={setOpenModal} title="" content={<LogoutConsent

setOpenModal={setOpenModal} />} height={350} width={400}/>
    <div className="litenote-dashboard-top">
    <button id="menu-btn" onClick={showSidebar}>
      <span>
        <MdMenu />
      </span>
    </button>
    <div className="litenote-dashboard-theme-toggler"  ref={themeRef}>
    <span className="" id = "light-mode" onClick={themeMode}>
    <MdLightMode />
    </span>
    <span id = "dark-mode"  onClick={themeMode}>
    <MdDarkMode  />
      </span>
    </div>
    
         <div className="litenote-dashboard-profile">
            <div className="info  profile-text">
          {/* it is meant to be p here */}
                <div style={{fontSize : "1.2rem"}}>Hey, <b>{user["username"]}</b>
                </div>
                <small className=" small-avatar-text">{user["role"]}</small>
            </div>
            <div>
             <CustomAvatar
         image={user["picture"]}
         className="sideman-new-man "
         alt="Dashboard Profile Picture"
         style={{cursor : "pointer"}}
         onClick={showLoggedUserOptions}
          />
             </div>
       
    </div>

    <NavbarContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu}
    setOpenModal={setOpenModal}
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
    </>
  
  )
}

export default DashboardHeader