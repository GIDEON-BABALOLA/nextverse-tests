import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import "../../styles/components/Dashboard/notifications.css"
import useWindowSize from "../../hooks/useWindowSize";
import { useState, useEffect, useRef } from "react";
import "../../styles/components/Dashboard/messages-page.css"
import NotificationsTab from "../../components/Dashboard/common/Profile/Notifications/NotificationsTab";
import NotificationsList from "../../components/Dashboard/common/Profile/Notifications/NotificationsList";
import NotificationsCard from "../../components/Dashboard/common/Profile/Notifications/NotificationsCard";
import NoContent from "../../components/common/NoContent";
import { useGetMyNotifications } from "../../hooks/useGetMyNotifications";
import ErrorMessage from "../../components/common/ErrorMessage";
const NotificationsPage = ({sidebarRef}) => {
  const { getMyNotifications, isLoading, error, data, statusCode, notificationCount, currentNotificationCount } = useGetMyNotifications()
  const [currentNotification, setCurrentNotification] = useState({
    story : true,
    profile : false
  })
  const { width } = useWindowSize();
  const [dashboardToast, setDashboardToast]  = useState(true)
  const [notificationData, setNotificationData] = useState([])
  const [preventLoadMore, setPreventLoadMore] = useState(false)
  const [emptyData, setEmptyData] = useState(false)
  const [attachmentLine, setAttachmentLine] = useState(0)
  const [page, setPage]  = useState(1)
  const [limit, setLimit] = useState(5)
  const [contextMenu, setContextMenu] = useState()
  const [loadingState, setLoadingState] = useState([{}, {}, {}, {}, {}])
  const lastItemRef = useRef();
  useEffect(() => {
    if(width < 767){
     setLimit(5)
     setLoadingState([{}, {}, {}, {}, {}])
   }
   else{
     setLimit(5)     
     setLoadingState([{}, {}, {}, {}, {}])
   }
   }, [width])
  useEffect(() => {
  const category = Object.keys(currentNotification).find(key => currentNotification[key] === true)
getMyNotifications(page, limit, category)
  }, [page, limit, currentNotification])
  const updateNotifications = (prev) => {
    const newNotifications = data.filter(
      (newNotification) => !prev.some((prevNotification) => prevNotification._id === newNotification._id)
    );
    return [...prev, ...newNotifications];
  }
  useEffect(() => {
  console.log("Dave")
    if(data.length == 0 && currentNotificationCount > 0){
      setPage(1)
    }
      if(data.length > 0){
        setPreventLoadMore(false)
    setEmptyData(false)
   setNotificationData(updateNotifications)
        }
  }, [data, currentNotificationCount])
  useEffect(() => {
    setPage(1);
setNotificationData([])
  }, [currentNotification]);
  useEffect(() => {
    if(notificationData.length === currentNotificationCount && currentNotificationCount > 0){
      setPreventLoadMore(true)
    }
      }, [notificationData, currentNotification, currentNotificationCount])
  const resendRequest = () => {
    const category = Object.keys(currentNotification).find(key => currentNotification[key] === true)
    getMyNotifications(page, limit, category)
  }
  const changeNotificationState = () => {
    setCurrentNotification((prevState) => {
        const { story, profile } = prevState;
        return { story : !story, profile : !profile}
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
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isLoading) {
                setPage((prevPage) => prevPage + 1);
              observer.unobserve(entry.target); 
            }
          },
          { threshold: 0.1, }
        );
        if (lastItemRef.current && !isLoading ) {
      if(!preventLoadMore){
      observer.observe(lastItemRef.current);
      }
        
        }                                                                                                                                   
      
        return () => {
          if (lastItemRef.current) {
            observer.unobserve(lastItemRef.current);
          }
        };
      }, [lastItemRef, isLoading, notificationData, preventLoadMore]);
      useEffect(() => {
        if(!isLoading){
          if(preventLoadMore && notificationData.length == 0){
            setEmptyData(true)
          }
          if(data.length == 0 && !error && page == 1 && currentNotificationCount == 0){
            setEmptyData(true)
          }
          if(currentNotificationCount == 0 ){
            setEmptyData(true)
          }
        }
            }, [data, isLoading, currentNotificationCount, notificationData, preventLoadMore, limit, page, error])
  return (
    <>
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
notificationCount={notificationCount}
       />
       {error && <>


{ error?.code == "ERR_NETWORK" ? 
  <ErrorMessage title={"Check Your Internet Connection"} 
message={"We are unable to load this content, check your connection"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
:
error?.code == "ERR_CANCELED"

?
<ErrorMessage title={"Timeout Error"} 
message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
:
<ErrorMessage title={"Something went wrong"} 
message={"We are unable to load this content,Pls click on the refresh button"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
}
</>
}
{emptyData ?  <NoContent
       fireClick={
            () => {

            
resendRequest()
            }}
      message={"You don't have any notifications"}
       />

:
<>
       {notificationData.map((item, index) => (
        <NotificationsCard 
        currentNotification={currentNotification}
        isLoading={false}
        key={index} notification={item}/>
       ))}
             { isLoading && loadingState.map((story, index) => (
             <NotificationsCard
             key={index} story={story}  isLoading={true}/>
           ))}
       <div ref={lastItemRef} style={{margin : "40px 0px"}}>
        <span>Load more</span>
       </div>
       </>
}

    </div>
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

export default NotificationsPage