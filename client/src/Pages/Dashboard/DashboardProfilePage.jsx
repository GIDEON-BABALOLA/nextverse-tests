import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import ProfilePictureSection from "../../components/Dashboard/common/Profile/ProfilePictureSection";
import PersonalInformationSection from "../../components/Dashboard/common/Profile/PersonalInformationSection";
import PersonalStatisticsSession from "../../components/Dashboard/common/Profile/PersonalStatisticsSession";
import useWindowSize from "../../hooks/useWindowSize";
import { MdOutlineCreate, MdOutlineEmail, MdLockOutline, MdOutlineLock, MdContactPhone  } from "react-icons/md";
import { MdOutlineThumbUpAlt,
   MdOutlineInsertComment,
   MdAutoStories,
   MdBookmarks,
   MdNotes,
   MdOutlineStickyNote2,
   MdEmojiPeople,
   MdGroup,
   MdVerifiedUser,
   MdOutlinePersonPin,
   MdVisibility
  } from "react-icons/md";
  import { FaPhoneAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/components/Dashboard/dashboard-profile-page.css"
import profileImage from "../../assets/29.jpg"
import { useState, useEffect } from "react";
import { FaSmileBeam } from "react-icons/fa";
const SettingsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const { width } =  useWindowSize()
  const [loadPage, setLoadPage] = useState(true)
  const [profile, setProfile] = useState({
    names : true,
    personal : true,
    statistics : true
  })
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
    <main  className="dashboard-profile-page">
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <span style={{textDecoration:"bolder"}}>
   
   <h4><b>My Profile</b></h4>   </span>
   <section className="our-profile-content">
   <ProfilePictureSection profile={profile} startEditing={startEditing} />
<PersonalInformationSection profile={profile} startEditing={startEditing}/>
<PersonalStatisticsSession />


   </section>
    </main>

    <div className="litenote-dashboard-right" 
    
    style={{
      marginRight: "90px",
    }}>
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div>
    </>
    }
    </>
  )
}

export default SettingsPage