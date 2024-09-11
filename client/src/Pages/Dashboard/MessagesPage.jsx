import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import { useState, useEffect } from "react";
import "../../styles/components/Dashboard/messages-page.css"
const SettingsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
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
    <main className="litenote-dashboard-messages-page">
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <h2>
   Thank you for your patience! This feature is in development, and we’re excited to bring it to you soon
   </h2>
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