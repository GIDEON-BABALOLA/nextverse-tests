import NotificationsCard from "./NotificationsCard"
import { useEffect, useRef } from "react";
import { useState } from "react"
const NotificationsList = ({notificationsData, currentNotification, isLoading, loadingState}) => {
  return (
   <>
   {
    isLoading ?
    <ul className="notification-list" id="notificationList">
    {loadingState.map((item, index) => (
     <NotificationsCard 
     currentNotification={currentNotification}
     isLoading={true}
     key={index}
    notification={item}/>
    ))}
   
   </ul>
    :
    <>
   <ul className="notification-list" id="notificationList">
       {notificationsData.map((item, index) => (
        <NotificationsCard 
        currentNotification={currentNotification}
        isLoading={isLoading}
        key={index} notification={item}/>
       ))}
      
      </ul>
    </>
   }
   </>
 
  )
}
export default NotificationsList