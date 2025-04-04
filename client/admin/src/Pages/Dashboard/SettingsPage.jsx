import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import { useState, useEffect } from "react";
import "../../styles/components/Dashboard/dashboard-settings-page.css"
import CommonAvatar from "../../components/common/CommonAvatar";
import ToggleSwitch from "../../components/Dashboard/common/ToogleSwitch";
import Toast from "../../components/common/Toast";
import { FaRegUser, FaRegTrashAlt  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import { useToastContext } from "../../hooks/useToastContext";
import { MdLockOutline } from "react-icons/md";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import DeleteConsent from "../../components/common/DeleteConsent";
import { useDeleteMyAccount } from "../../hooks/useDeleteMyAccount";
import { useSettingsContext } from "../../hooks/useSettingsContext";
const SettingsPage = ({ sidebarRef}) => {
  const [dashboardToast, setDashboardToast]  = useState(true)
const { showToast } = useToastContext();
const { checkbox, handleChange } = useSettingsContext();
  const router = useNavigate();
  const { deleteMyAccount, isLoading, error, data, statusCode } = useDeleteMyAccount();
  const { user } = useAuthContext()
  const [openModal, setOpenModal] = useState(false)
  const [contextMenu, setContextMenu] = useState()
  const handleAccountDeletion = () => {
    deleteMyAccount()
  }
  useEffect(() => {
if(Object.keys(data).length !== 0  && statusCode == 200){
  showToast("Success", data.message, true)
  setOpenModal(false)
  setTimeout(() => {
    router("/login")
  }, 2000);
}
  }, [ statusCode, data, showToast])
  useEffect(() => {
if(error){
  showToast("Error", error.message, false)
}
  }, [error, showToast])
  return (
    <>
     <Toast />
    <main style={{marginRight : "-20px"}} className="dashboard-settings-main-page">
    <DeleteConsent openModal={openModal} setOpenModal={setOpenModal}
                    title={"Are you sure you want to delete?"}
                    message={"This action will permanently delete your Account. This cannot be undone"}
                    buttonText ={"Delete Account"}
                    deleteFunction={handleAccountDeletion}
                    isLoading={isLoading}
    />
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
  <CommonAvatar
  style={{height : "80px", width: "80px"}}
  image={user.picture}
  className="settings-page-avatar"
  />
  <div>
  <h3>{user.username}</h3>
  <h6 style={{color: "#9CA3AF"}}>{user.email}</h6>
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
<ToggleSwitch id={"push"} handleChange={handleChange} checked={checkbox.push} />
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>Email Notifications</h5>
<ToggleSwitch id={"email"} handleChange={handleChange} checked={ checkbox.email}  />
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>SMS Notifications</h5>
<ToggleSwitch id={"sms"} handleChange={handleChange} checked={checkbox.sms} />
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
<h5>Change Theme Mode</h5>
<ToggleSwitch id={"theme"} handleChange={handleChange} checked={ checkbox.theme} />
</div>

<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>Ads Preferences</h5>
<ToggleSwitch  id={"adsPreferences"} handleChange={handleChange} checked={checkbox.adsPreferences} />
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
<ToggleSwitch id={"twoFactor"} handleChange={handleChange} checked={ checkbox.twoFactor} />
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between", alignItems : "center", }}    >
<h5>Allow Third-Party Cookies In Browser</h5>
<ToggleSwitch id={"cookies"} handleChange={handleChange} checked={ checkbox.cookies} />
</div>
<div style={{display : "flex", flexDirection : "row", justifyContent  : "space-between"}}>
<h5>Allow In-app Notifications</h5>
<ToggleSwitch id={"inAppNotifications"} handleChange={handleChange} checked={checkbox.inAppNotifications} />
</div>
</div>
<Link to={"/dashboard/profile"}>
<button className = "edit-profile-button-long">Change Password</button>
</Link>

</div>



<div className="delete-profile-settings-card">
<div style={{display : "flex", flexDirection : "row", alignItems : "baseline", gap : "20px"}}>
<FaRegTrashAlt  color="#B91C1C" size={20}/>
<h2>Danger Zone</h2>
</div>
<div style={{display : "flex", flexDirection : "row", alignItems :"center", gap : "20px", paddingTop : "10px"}}>
<h5>Permanently delete your account and all of your content.</h5>
</div>
<button className = " edit-profile-button-long edit-profile-button-delete special-modal-client"
onClick={ () => {setOpenModal(true)}}
>Delete Account</button>
</div>

</section>

</div>
    </main>

    <div className="litenote-dashboard-right">
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div>
    </>

  )
}

export default SettingsPage