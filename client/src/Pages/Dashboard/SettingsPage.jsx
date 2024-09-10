import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import profileImage from "../../assets/29.jpg"
import { useState, useEffect } from "react";
import colors from "../../assets/colors.json"
import { FaPlus } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import "../../styles/components/Dashboard/dashboard-settings-page.css"
import { FaRegUser, FaRegTrashAlt  } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
const SettingsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const devops = (e) => {
    let settingsData = JSON.stringify({
 notifications : {
  push : false,
  email : false,
  sms : false
 },
 personalization: {
  darkMode  : false,
  stickyNoteColor : false,
  stickyNoteShape : false
 },
 security : {
  twoFactorAuthentication : false,
  cookiesInBrowser : false,
  restoreDefaultSettings : false,
 }
  })
    localStorage.setItem("Settings", settingsData)
console.log(e.target.checked)
  }
  const [loadPage, setLoadPage] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
      // useEffect(() => {
  
      //   if (contextMenu) {
      //     window.addEventListener('scroll', () => {
      //       console.log("dave")
      //       contextMenu.current.style.visibility = "hidden";
      //     });
      //   }
    
      //   return () => {
      //     if (contextMenu) {
      //       window.removeEventListener('scroll', () => {
      //         contextMenu.current.style.visibility = "hidden";
      //       });
      //     }
      //   };
      // }, [contextMenu]);
  return (
    <>
    {loadPage ? 
    <>
    <RotationLoader />
    </>
     : <>
    <main style={{marginRight : "-20px"}} className="dashboard-settings-main-page">
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
<div className="dashboard-settings-main-page">
<div className="dashboard-settings-page-title">
  <h2>Settings</h2>
</div>
<section className="dashboard-settings-inner">
<div className="dashboard-settings-page-profile-card">
<div style={{display : "flex", flexDirection : "row", alignItems : "baseline", gap : "20px"}}>
<FaRegUser color="#4338CA" size={20}/>
<h2>Profile</h2>
</div>
<div style={{display : "flex", flexDirection : "row", alignItems :"center", gap : "20px", paddingTop : "10px"}}>
  <img src={profileImage} style={{width : "10%", borderRadius : "50%"}}/>
  <div>
  <h3>Gideon Babalola</h3>
  <h6 style={{color: "#9CA3AF"}}>gideonbabalola69@gmail.com</h6>
  </div>
</div>
<Link to={"/dashboard/profile"}>
<button className = "edit-profile-button" >Edit Profile</button>
</Link>
</div>
<div className="dashboard-settings-page-profile-card">
<div style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "10px"}}>
<MdNotificationsNone color="#4338CA" size={30}/>
<h2>Notifications</h2>

</div>
<div style={{marginTop : "15px", display :"flex", flexDirection : "column", gap : "10px", color : "#9CA3AF"}}>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between",}}    >
<h5>Push Notifications</h5>
<span className="toggle-container">
<input type="checkbox" id="push-notification-toggle-check"/>
<label htmlFor="push-notification-toggle-check" className="toggle-button"></label>
</span>
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>Email Notifications</h5>
<span className="toggle-container">
<input type="checkbox" id="email-notification-toggle-check"/>
<label htmlFor="email-notification-toggle-check" className="toggle-button"></label>
</span>
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>SMS Notifications</h5>
<span className="toggle-container">
<input type="checkbox" id="sms-notification-toggle-check"/>
<label htmlFor="sms-notification-toggle-check" className="toggle-button"></label>
</span>
</div>
</div>
</div>

<div className="dashboard-settings-page-profile-card">
<div style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "10px"}}>
<MdNotificationsNone color="#4338CA" size={30}/>
<h2>Personalization</h2>

</div>
<div style={{marginTop : "15px", display :"flex", flexDirection : "column", gap : "10px", color : "#9CA3AF"}}>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between",}}    >
<h5>Enable Dark Mode</h5>
<span className="toggle-container">
<input type="checkbox" id="push-notification-toggle-check"/>
<label htmlFor="push-notification-toggle-check" className="toggle-button"></label>
</span>
</div>
<div style={{display : "flex",
alignItems : "center",
 marginTop : "10px", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>Default Sticky Note Color</h5>

{/* <input type="checkbox" id="default-sticky-note-color-toggle-check" onChange={devops}/>
<label htmlFor="default-sticky-note-color-toggle-check" className="toggle-button"></label> */}
 <div className="sticky-notes-color-controls"
 style={{position : "initial", flexDirection : "row", padding : "0.5em",}}>
      {/* <div  className="sticky-notes-color-add-btn">
            <FaPlus />
        </div> */}
            {colors.map((color, index) => (
            
              <div
              key={index}
            className="sticky-notes-color"
            style={{ backgroundColor: color.colorHeader, height : "20px", width : "20px" }}
        ></div>
        

            ))}
            {/* <div className="sticky-notes-color"><MdOutlineRectangle 
            className="sticky-notes-color"
            color="white"/></div>
                <div className="sticky-notes-color"><MdOutlineRectangle 
            className="sticky-notes-color parallelogram"
            color="white"/></div> */}
        </div> 
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>Default Sticky Note Shape</h5>
<span className="toggle-container">
<input type="checkbox" id="default-sticky-note-shape-toggle-check"/>
<label htmlFor="default-sticky-note-shape-toggle-check" className="toggle-button"></label>
</span>
</div>
</div>
</div>
<div className="dashboard-settings-page-profile-card">
<div style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "10px"}}>
<MdLockOutline color="#4338CA" size={30}/>
<h2>Security</h2>

</div>
<div style={{marginTop : "15px", display :"flex", flexDirection : "column", gap : "10px", color : "#9CA3AF"}}>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between", alignItems : "center", }}    >
<h5>Two Factor Authentication</h5>
<span className="toggle-container">
<input type="checkbox" id="two-factor-authentication-toggle-check"/>
<label htmlFor="two-factor-authentication-toggle-check" className="toggle-button"></label>
</span>
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between", alignItems : "center", }}    >
<h5>Allow Cookies In Browser</h5>
<span className="toggle-container">
<input type="checkbox" id="cookies-in-browser-toggle-check"/>
<label htmlFor="cookies-in-browser-toggle-check" className="toggle-button"></label>
</span>
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between", alignItems : "center", }}    >
<h5>Restore Default Settings</h5>
<span className="toggle-container">
<input type="checkbox" id="two-factor-authentication-toggle-check"/>
<label htmlFor="two-factor-authentication-toggle-check" className="toggle-button"></label>
</span>
</div>
</div>
<button className = "edit-profile-button-long">Change Password</button>
</div>



<div className="delete-profile-settings-card">
<div style={{display : "flex", flexDirection : "row", alignItems : "baseline", gap : "20px"}}>
<FaRegTrashAlt  color="#B91C1C" size={20}/>
<h2>Danger Zone</h2>
</div>
<div style={{display : "flex", flexDirection : "row", alignItems :"center", gap : "20px", paddingTop : "10px"}}>
<h5>Permanently delete your account and all of your content.</h5>
</div>
<button className = " edit-profile-button-long edit-profile-button-delete ">Delete Account</button>
</div>

</section>

</div>
    </main>

    <div className="litenote-dashboard-right">
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div>
    </>
    }
    </>
  )
}

export default SettingsPage