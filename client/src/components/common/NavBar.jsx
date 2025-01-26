import "../../styles/components/common/navbar.css"
import {  Link } from 'react-router-dom'
import { useRef } from "react"
import Headroom from "react-headroom"
import { FaAngleRight } from "react-icons/fa"
import Toast from "../common/Toast"
import NavbarContextMenu from "./NavbarContextMenu"
import { useToastContext } from "../../hooks/useToastContext"
import { HiOutlineLogin } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import Hamburger from 'hamburger-react'
import { MdGridView, MdLogout, MdLightMode, MdDarkMode,
  MdPersonAdd,
  MdLogin, MdSettings, MdManageSearch ,  MdAutoStories }from "react-icons/md"
import { useState, useEffect } from "react"
import useWindowSize from "../../hooks/useWindowSize"
import { useParams } from "react-router-dom"
import { FaUser, FaHome } from "react-icons/fa"
import { CgFeed } from "react-icons/cg";
import Avatar from "./Avatar"
import { MdOpenInNew, MdOutlinePersonAddAlt } from 'react-icons/md';
import useInternetMode from "../../hooks/useInternetMode"
import SpecialModal from "./SpecialModal"
import LogoutConsent from "./LogoutConsent"
import { useAuthContext } from "../../hooks/useAuthContext"
import ModeToggler from "./ModeToggler"
const NavBar = () => {
  const { user } = useAuthContext()
const [isOpen, setOpen] = useState(false)
const [openModal, setOpenModal] = useState("")
  useEffect(() => {
if(width < 768){
  isOpen ? showNavSidebar()  : closeNavSidebar()
}
  }, [isOpen])
  const currentPage = useParams();
  const navSidebarRef = useRef()
  const currentUrl = currentPage["*"]
  const {width, height} = useWindowSize()
  const [contextMenu, setContextMenu] = useState()
  const { online } = useInternetMode()
  function disableScroll() { 
    document.body.classList.add("remove-scrolling"); 
  } 
  function enableScroll() { 
    document.body.classList.remove("remove-scrolling"); 
  } 

  const showNavSidebar = () => {
    navSidebarRef.current.classList.remove("litenote-nav-sidebar-aside-close")
    navSidebarRef.current.style.display='block';
    if(width < 768){
      disableScroll()
    }
   
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
        return
       } else {
        
        closeNavSidebar()
        setOpen(false)
  

       }
     }
   }
  const closeNavSidebar = () => {
    navSidebarRef.current.classList.add("litenote-nav-sidebar-aside-close")
    navSidebarRef.current.style.display = "block";
    if(width < 768){
      enableScroll()
    }
       }
  const showLoggedInUserOptions = (e) => {
    // updateMenuPosition(e.clientX, width < 768 ? e.clientY: 29)
    // updateMenuPosition(width < 768 ? e.clientX: 1090, width < e.clientY ? 45: 50)
    contextMenu.current.style.visibility = "visible"
  contextMenu.current.classList.add("active") 
    updateMenuPosition(e.clientX, e.clientY)   
  }
  const dave = () => {
    closeNavSidebar()
    setOpen(false)
  }
  const updateMenuPosition = (x, y) => {
    const maxTopValue = height - contextMenu.current.offsetHeight;
    const maxLeftValue = width - contextMenu.current.offsetWidth; 
    contextMenu.current.style.left = `${Math.min(maxLeftValue, x)}px`;
    contextMenu.current.style.top = `${Math.min(maxTopValue, y)}px`; 
      }
  return (
<>
<Toast />
<SpecialModal openModal={openModal} setOpenModal={setOpenModal} title="" content={<LogoutConsent

setOpenModal={setOpenModal} />} height={350} width={400}/>
<Headroom >
<header className="navbar-header">
    <nav className="navbar-nav-navbar">
      
      <div className="navbar-logo">
      
        <Link to="/" className="navbar-header-links navbar-header-links-lite-note"
        style={{color : "var(--navbar-header-links-lite-note-color)"}}
        >
         Lite Note  
        

</Link>
      </div>
      
      { 
      width > 767  ?
      <div className="navbar-nav-links">
      <Link to="/" 
     className={`navbar-header-links ${currentUrl === "" && "navbar-active"}`}
   style={{fontSize : "1.3rem"}}  >
        Home
        </Link>
        <Link to="/feed" 
        className={`navbar-header-links ${currentUrl === "feed" && "navbar-active"}`}
         style={{fontSize : "1.3rem"}}  >
        Feed
        </Link>
        {/* <Link to="/publish" className="navbar-header-links" style={{fontSize : "1.3rem"}}  >
        Publish
        </Link> */}
        <Link to="/explore" 
        className={`navbar-header-links ${currentUrl === "explore" && "navbar-active"}`}
         style={{fontSize : "1.3rem"}}  >
        Explore
        </Link>
        <Link
        className={`navbar-header-links ${currentUrl === "profile" && "navbar-active"}`}
         to={ user && `/profile/${user.username}`}  style={{fontSize : "1.3rem"}}  >
        Profile
        </Link>
     
      </div>
      
      :
      <section className="litenote-nav-sidebar-aside" ref={navSidebarRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>


                    <div className="navside navbar-phone-problem-home-page">
                    <span className="close-nav-sidebar"
                    onClick={closeNavSidebar}
                    >
                    <svg  
                    xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" aria-label="Close" role="img" focusable="false" className="ud-icon ud-icon-small" width="24" height="24"><defs><symbol id="icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></symbol></defs><g fill="#2D2F31"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></g></svg>
                 
                    </span>
                                  
      <div className='nav-user-info' style={{cursor : "pointer"}}>
{user ? 
<>
<Avatar image={user["picture"]} className="navbar-context-profile-photo-home"/>
<h4>{user["username"]}</h4>
</>
: 
<>
<div className="defaultavatar">
  <FaUser 
  color="#525252"
  size={20}/>
</div>
<h4>&nbsp;&nbsp;Guest</h4>
</>
}


</div>
                    <Link to="/" className={`nav-sidebar-link ${currentUrl === "" && "active"}`} 
                        onClick={dave}
                    >
                    <FaHome size={24} />
                           <h3 className="litenote-dashboard-h-three">Home</h3>
                           
        </Link>
        <Link to="/feed" className={`nav-sidebar-link ${currentUrl === "feed" && "active"}`} 
                        onClick={dave}
                    >
                    <CgFeed size={24} />
                           <h3 className="litenote-dashboard-h-three">Feed</h3>
                           
        </Link>
        {/* <Link to="/publish"  className={`nav-sidebar-link ${currentUrl === "publish" && "active"}`}
         onClick={dave}
        >
                    <MdAutoStories size={20} />
                           <h3 className="litenote-dashboard-h-three">Publish</h3>
        </Link> */}
        <Link to="/explore"  className={`nav-sidebar-link ${currentUrl === "explore" && "active"}`}
         onClick={dave}
        >
                    <MdManageSearch  size={20} />
                           <h3 className="litenote-dashboard-h-three">Explore</h3>
        </Link>
                    <Link to="/dashboard/profile"  className={`nav-sidebar-link ${currentUrl === "dashboard" && "active"}`}>
                    <MdOutlinePersonAddAlt size={20} />
                           <h3 className="litenote-dashboard-h-three">Edit Profile</h3>
        </Link>
                      
                        
                        <Link to="/dashboard/analytics" className={`nav-sidebar-link ${currentUrl === "users" && "active"}` } 
                           onClick={dave}
                        >
                        
                        <MdGridView size={24} />

                           <h3 className="litenote-dashboard-h-three">Dashboard</h3>
                        </Link>

                        <Link  to="/dashboard/settings"  className={`nav-sidebar-link ${currentUrl === "dashboard/settings" && "active"}`}
                        onClick={dave}
                        >
                        <MdSettings size={24} />
                           <h3 className="litenote-dashboard-h-three">Settings & Privacy</h3>
                        </Link>
                     
                        <Link 
                          to={ user && `/profile/${user.username}`} 
                         className={`nav-sidebar-link ${currentUrl === "profile" && "active"}`} 
                        
                        onClick={dave}>
                        <FaUser size={20} />

                           <h3 className="litenote-dashboard-h-three">My Profile
  
                           </h3>
                        </Link>
                        



                            <Link to="/login" className={`nav-sidebar-link ${currentUrl === "login" && "active"}`} 
                        
                        onClick={dave}>
                        <HiOutlineLogout size={24} />
  
                           <h3 className="litenote-dashboard-h-three special-modal-client">Sign Out</h3>
                        </Link>
                        <div style={{display : "flex", flexDirection : "row", justifyContent : "center", alignItems : "center"}}>
{currentUrl !== "" && <ModeToggler />}
</div>
                      
                      
                     
                     
                    
                       
                    </div>
                </section>
      }
      
      
    </nav>
    {
     width < 768 ? 
     
   <span  className="react-hamburger">
   <Hamburger 
     
      toggled={isOpen} toggle={setOpen} />

   </span>
    
   
     
     : 
<>

{
  
  user ?
  <>
  <div style={{display : "flex", flexDirection : "row", justifyContent : "center", alignItems : "center"}}>
  {currentUrl !== "" && <ModeToggler />}
</div>

    <Avatar className="profile-photo-home"
onClick={showLoggedInUserOptions}
 image={user["picture"]}
 style={{width : width < 768 ? "7%": "3%"}}
 />
  </>
 : 
 <div className="defaultavatar"
 onClick={showLoggedInUserOptions}
 >
      
  <FaUser color="#525252" size={20}/>
 </div>
}
</>

    }



<NavbarContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu}  
setOpenModal={setOpenModal}
contextMenuData={[
   {  
  id : 1,
  icon : <MdGridView className="imags" size={40}/>,
  label : "Dashboard",
  arrow :  online ? ">" : <FaAngleRight size={20} />,
  link : "/dashboard/analytics",
  access : "user"
},
{
  id : 2,
  icon : <FaUser className="imags" size={40}/>,
  label : "Edit Profile",
  arrow :  online ? ">" : <FaAngleRight size={20} />,
  link : "/dashboard/profile",
  access : "user"
},
{
  id : 3,
  icon : <MdSettings className="imags settings-rotate" size={40}/>,
  label : "Settings & Privacy",
  arrow :  online ? ">" : <FaAngleRight size={20} />,
  link : "/dashboard/settings",
  access : "user"
},
{
  id : 5,
  icon : <HiOutlineLogin className="imags" size={40} onClick={() => {setOpenModal(true)}}/>,
  label : "Sign In",
  arrow :   <MdOpenInNew />,
  link : "/login",
  access : "guest"
},
{
  id : 6,
  icon : <MdPersonAdd className="imags" size={40} onClick={() => {setOpenModal(true)}}/>,
  label : "Sign Up",
  arrow :   <MdOpenInNew />,
  link : "/register",
  access : "guest"
}
]}
/>
  </header>
</Headroom>
 

</>
  )
}

export default NavBar