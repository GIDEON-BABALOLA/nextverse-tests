import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import ProfilePictureSection from "../../components/Dashboard/common/Profile/ProfilePictureSection";
import PersonalInformationSection from "../../components/Dashboard/common/Profile/PersonalInformationSection";
import PersonalStatisticsSession from "../../components/Dashboard/common/Profile/PersonalStatisticsSession";
import { getAllStickyNotes } from "../../helpers/handleStickyNotes";
import Toast from "../../components/common/Toast";
import useIndexedDB from "../../hooks/useIndexedDB";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGetAUser } from "../../hooks/useGetAUser";
import useWindowSize from "../../hooks/useWindowSize";
  import { FaPhoneAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/components/Dashboard/dashboard-profile-page.css"
import { useState, useEffect } from "react";
import { FaSmileBeam } from "react-icons/fa";
const SettingsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
   const db = useIndexedDB("stickyNotes")
  const { user } = useAuthContext()
  const [dashboardProfile, setDashboardProfile] = useState({
    username : "",
    email : "",
    bio : "",
    picture : "",
    mobile : "",
    password : "currentPassword",
    totalFollowing : 0,
    totalFollowers : 0,
    totalLike : 0,
    totalComments : 0,
    isVerified : false,
    totalStories : 0,
    totalBookmarks : 0,
    totalStickyNotes : 0,
    totalNotes : 0
  })
  const [profile, setProfile] = useState({
    names : true,
    personal : true,
    statistics : true
  })
  useEffect(() => {
    if(db){
getAllStickyNotes(db, "stickyNotes", (savedNotes) => {
  if(savedNotes.length == 0){
setDashboardProfile((prev) => {
  return {...prev, totalStickyNotes : 0}
})
  }
  else{
    setDashboardProfile((prev) => {
      return {...prev, totalStickyNotes : savedNotes.length}
      })
  
}})
    
    
    }
setDashboardProfile((prev) => {
  return {...prev,
 picture : user.picture,
 username : user.username,
 email : user.email,
 bio : user.bio,
 mobile : user.mobile,
 totalFollowers: user.totalfollowers,
 totalFollowing : user.totalfollowing,
 isVerified : user.verification,
}
})
  }, [user, db])
  const startEditing = (params) => {
switch (params) {
  case "names":
    setProfile((prevState) => {
      const { names } = prevState;
      return {...prevState, names : !names}
    })
    
    break;
    case "personal":
      setProfile((prevState) => {
        const { personal } = prevState;
        return {...prevState, personal : !personal}
      })
      
      break;

  default:
    break;
}
  }
      const [contextMenu, setContextMenu] = useState()
  return (
    <>
<Toast />
    <main  className="dashboard-profile-page">
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <span style={{textDecoration:"bolder"}}>
   
   <h4><b>My Profile</b></h4>   </span>
   <section className="our-profile-content">
<ProfilePictureSection profile={profile} startEditing={startEditing}
dashboardProfile={dashboardProfile}
setDashboardProfile={setDashboardProfile}
/>
<PersonalInformationSection profile={profile} startEditing={startEditing}
dashboardProfile={dashboardProfile}
setDashboardProfile={setDashboardProfile}
/>
<PersonalStatisticsSession
dashboardProfile={dashboardProfile}
/>


   </section>
    </main>

    <div className="litenote-dashboard-right" 
    
    style={{
      marginRight: "90px",
    }}>
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div>
    </>
  )
}

export default SettingsPage