import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import "../../styles/components/Dashboard/notifications.css"
import useWindowSize from "../../hooks/useWindowSize";
import { useState, useEffect, useRef } from "react";
import "../../styles/components/Dashboard/messages-page.css"
const NotificationsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
    const { width } = useWindowSize();
  const [loadPage, setLoadPage] = useState(true)
  console.log(width)
  const [attachmentLine, setAttachmentLine] = useState(0)
  const slideLine = (e) => {
    console.log(e.target.offsetLeft)
        setAttachmentLine(e.target.offsetLeft)
        }
        useEffect(() => {
            if(width > 1200){
                setAttachmentLine(215)
            }else{
                setAttachmentLine(0)
            }

        }, [width])
  
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
  return (
    <>
    {loadPage ? 
    <>
    <RotationLoader />
    </>
     : <>
    <main className="litenote-dashboard-messages-page">
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   {/* <div className="my-notifications-preview-label">Preview Mode</div> */}
    <div className="my-notifications-container">
        <div className="my-notifications-header">
            <h1>Notifications</h1>
        </div>
        <div className="my-notifications-tabs">
            <span className="my-notifications-tab active" data-tab="stories"
             onClick={(e) => slideLine(e)}
            >
                Stories <span className="my-notifications-badge">2</span>
            </span>
            <span className="my-notifications-tab" data-tab="profile"
            onClick={(e) => slideLine(e)}
            >Profile</span>
            <div
   className="slideline-notification" style={{left : attachmentLine + "px"}}></div>
        </div>
        <ul className="notification-list" id="notificationList">
        
        <li className="my-notifications-item">
                <img src="http://localhost:5173/src/assets/3.jpg" alt="Seun Merrcy" className="my-notifications-avatar" />
                <div style={{display : "flex", flexDirection : "column"}}>
                <span className="my-notifications-name">Seun Merrcy</span>
                <span className="my-notifications-status">Blogger</span>
                </div>
                <div className="my-notifications-content">
                    <div className="my-notifications-header">
                        <span className="my-notifications-action"> Just Followed You</span>
                    </div>
                    <div className="my-notifications-meta">
                        {/* <span className="my-notifications-status">Blogger</span> */}
                        <span className="my-notifications-time">3min ago</span>
                        <a href="#" className="my-notifications-view-button">View Profile</a>
                    </div>
                </div>
            </li>
            <li className="my-notifications-item">
                <img src="http://localhost:5173/src/assets/3.jpg" alt="Seun Merrcy" className="my-notifications-avatar" />
                <div style={{display : "flex", flexDirection : "column"}}>
                <span className="my-notifications-name">Seun Merrcy</span>
                <span className="my-notifications-status">Blogger</span>
                </div>
                <div className="my-notifications-content">
                    <div className="my-notifications-header">
                        <span className="my-notifications-action"> Just Followed You</span>
                    </div>
                    <div className="my-notifications-meta">
                        {/* <span className="my-notifications-status">Blogger</span> */}
                        <span className="my-notifications-time">3min ago</span>
                        <a href="#" className="my-notifications-view-button">View Profile</a>
                    </div>
                </div>
            </li>
            <li className="my-notifications-item">
                <img src="http://localhost:5173/src/assets/3.jpg" alt="Seun Merrcy" className="my-notifications-avatar" />
                <div style={{display : "flex", flexDirection : "column"}}>
                <span className="my-notifications-name">Seun Merrcy</span>
                <span className="my-notifications-status">Blogger</span>
                </div>
                <div className="my-notifications-content">
                    <div className="my-notifications-header">
                        <span className="my-notifications-action"> Just Followed You</span>
                    </div>
                    <div className="my-notifications-meta">
                        {/* <span className="my-notifications-status">Blogger</span> */}
                        <span className="my-notifications-time">3min ago</span>
                        <a href="#" className="my-notifications-view-button">View Profile</a>
                    </div>
                </div>
            </li>
            <li className="my-notifications-item">
                <img src="http://localhost:5173/src/assets/3.jpg" alt="Seun Merrcy" className="my-notifications-avatar" />
                <div style={{display : "flex", flexDirection : "column"}}>
                <span className="my-notifications-name">Seun Merrcy</span>
                <span className="my-notifications-status">Blogger</span>
                </div>
                <div className="my-notifications-content">
                    <div className="my-notifications-header">
                        <span className="my-notifications-action"> Just Followed You</span>
                    </div>
                    <div className="my-notifications-meta">
                        {/* <span className="my-notifications-status">Blogger</span> */}
                        <span className="my-notifications-time">3min ago</span>
                        <a href="#" className="my-notifications-view-button">View Profile</a>
                    </div>
                </div>
            </li>
         
        </ul>
    </div>
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

export default NotificationsPage