import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import "../../styles/components/Dashboard/notifications.css"
import useWindowSize from "../../hooks/useWindowSize";
import { useState, useEffect, useRef } from "react";
import "../../styles/components/Dashboard/messages-page.css"
import NotificationsTab from "../../components/Dashboard/common/Profile/Notifications/NotificationsTab";
import NotificationsList from "../../components/Dashboard/common/Profile/Notifications/NotificationsList";

const NotificationsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
    const { width } = useWindowSize();
  const [loadPage, setLoadPage] = useState(true)
  const [currentNotification, setCurrentNotification] = useState({
    profile : true,
    stories : false
  })
  const dummyNotifications = [
    {
username :"Gideon Babalola",
avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg",
title : "Writer",
message : "Just Followed You",
time : "2 days ago",
type : "profile"
    },
    {
        username :"Jacob David",
        avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507546/Avatars/i5fs4w9lukc3zdcqmiam_fnlvfi.jpg",
        title : "Writer",
        message : "Just Followed You",
        time : "3 mins ago",
        type : "profile"
            },
            {
                username :"Samuel Arise",
                avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507550/Avatars/nqygbbqcueadblm4mxjo_ntgxmg.jpg",
                title : "Writer",
                message : "Just Liked Your Story",
                time : "2 days ago",
                type : "story"
                    },  
                    
                    
                    {
                        username :"Femi Jacobs",
                        avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507567/Avatars/xeny3iz73ogfcbaarisv_wox5wd.jpg",
                        title : "Writer",
                        message : "Commented On Your Story",
                        time : "4 mins ago",
                        type : "story"
                            },
                            {
                                username :"Deborah Kingston",
                                avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg",
                                title : "Writer",
                                message : "Just Liked Your Story",
                                time : "3 days ago",
                                type : "story"
                                    },
                                    {
                                      username :"Gideon Babalola",
                                      avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg",
                                      title : "Writer",
                                      message : "Just Followed You",
                                      time : "2 days ago",
                                      type : "profile"
                                          },
                                          {
                                              username :"Jacob David",
                                              avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507546/Avatars/i5fs4w9lukc3zdcqmiam_fnlvfi.jpg",
                                              title : "Writer",
                                              message : "Just Followed You",
                                              time : "3 mins ago",
                                              type : "profile"
                                                  },
                                                  {
                                                      username :"Samuel Arise",
                                                      avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507550/Avatars/nqygbbqcueadblm4mxjo_ntgxmg.jpg",
                                                      title : "Writer",
                                                      message : "Just Liked Your Story",
                                                      time : "2 days ago",
                                                      type : "story"
                                                          },  
                                                          
                                                          
                                                          {
                                                              username :"Femi Jacobs",
                                                              avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507567/Avatars/xeny3iz73ogfcbaarisv_wox5wd.jpg",
                                                              title : "Writer",
                                                              message : "Commented On Your Story",
                                                              time : "4 mins ago",
                                                              type : "story"
                                                                  },
                                                                  {
                                                                      username :"Deborah Kingston",
                                                                      avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg",
                                                                      title : "Writer",
                                                                      message : "Just Liked Your Story",
                                                                      time : "3 days ago",
                                                                      type : "story"
                                                                          },

                            
  ]
  const [attachmentLine, setAttachmentLine] = useState(0)
  const changeNotificationState = () => {
    setCurrentNotification((prevState) => {
        const { stories, profile } = prevState;
        return { stories : !stories, profile : !profile}
    })
  }
  const slideLine = (e) => {
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
       <NotificationsTab slideLine={slideLine} attachmentLine={attachmentLine}
changeNotificationState={changeNotificationState}
currentNotification={currentNotification}
       />
       <NotificationsList 
       
       notifications={dummyNotifications} currentNotification={currentNotification}/>
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