import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import profileImage from "../../assets/29.jpg"
import { useState, useEffect } from "react";
import "../../styles/components/Dashboard/dashboard-settings-page.css"
import { FaRegUser, FaRegTrashAlt  } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
const SettingsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const [loadPage, setLoadPage] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
      useEffect(() => {
  
        if (contextMenu) {
          window.addEventListener('scroll', () => {
            console.log("dave")
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
<button className = "edit-profile-button">Edit Profile</button>
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
<input type="checkbox" id="toggle-check"/>
<label htmlFor="toggle-check" className="toggle-button"></label>
</span>
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>Email Notifications</h5>
<span className="toggle-container">
<input type="checkbox" id="toggle-check"/>
<label htmlFor="toggle-check" className="toggle-button"></label>
</span>
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>SMS Notifications</h5>
<span className="toggle-container">
<input type="checkbox" id="toggle-check"/>
<label htmlFor="toggle-check" className="toggle-button"></label>
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
<input type="checkbox" id="toggle-check"/>
<label htmlFor="toggle-check" className="toggle-button"></label>
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