import { useEffect, useState } from "react"
import { useRef } from "react"
import CommonAvatar from "../../../../common/CommonAvatar"
import useNavigateStory from "../../../../../hooks/useNavigateStory"
import useNavigateProfile from "../../../../../hooks/useNavigateProfile"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { compactFormatDistanceToNow } from "../../../../../helpers/formatDate"
// import { FaEllipsisH } from "react-icons/fa";
const NotificationsCard = ({ notification, currentNotification, isLoading }) => {
  console.log(notification)
  const navigateToStory = useNavigateStory();
  const navigateToProfile = useNavigateProfile()
  const notify = useRef()
  useEffect(() => {
    if(Object.values(notify.current.classList).includes("active")){
      notify.current.classList.remove("active")
      setTimeout(() => {
        notify.current.classList.add("active")
      }, 1);
    }
  }, [currentNotification])
  return (
    <>
    { 
      isLoading ?
      <li className="my-notifications-item active" ref={notify}>
      <div className="notifications-loader notifications-loader-image"></div>
    <div style={{display : "flex", flexDirection : "column"}}>
    <span className="notifications-loader notifications-loader-username"></span>
    <span className="notifications-loader notifications-loader-title"></span>
    </div>
    <div className="my-notifications-content">
        <div className="my-notifications-header">
        <span className="notifications-loader notifications-loader-message">&nbsp;</span>
        </div>
        <div className="my-notifications-meta" 
        >
            {/* <span className="my-notifications-status">Blogger</span> */}
            <span className="notifications-loader notifications-loader-title"></span>
            <span className="notifications-loader notifications-loader-title"></span>
        </div>
    </div>
</li>
:
<li className={ `my-notifications-item active ${!notification.isRead && "new"}`} ref={notify}>
    <CommonAvatar
  style={{height : "60px", width: "60px"}}
  image={notification.actor.picture}
  className="my-notifications-avatar"
  onClick={() => { navigateToProfile(notification.actors.username)}}
  />
    <div style={{display : "flex", flexDirection : "column"}}>
    <span className="my-notifications-name" onClick={() => { navigateToProfile(notification.actor.username)}}>{notification.actor.username}</span>
    <span className="my-notifications-status">{notification.actor.bio}</span>
    </div>
    <div className="my-notifications-content">
        <div className="my-notifications-header">
            <span className="my-notifications-action">{notification.message}</span>
        </div>
        <div className="my-notifications-meta">
            {/* <span className="my-notifications-status">Blogger</span> */}
            <span className="my-notifications-time">{notification.time}</span>
           {  currentNotification.profile &&   <span href="#" className="my-notifications-view-button" onClick={() => { navigateToProfile(notification.referenceId.username)}}>View Profile  </span> }
           {  currentNotification.story && <span href="#" className="my-notifications-view-button" onClick={() => { navigateToStory(notification.referenceId)}} >View Story  </span> }
           <span className="my-notification-date">
            {compactFormatDistanceToNow(notification.createdAt)}
            {/* { formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })} */}
            </span>

        </div>
    </div>
    {/* <div>
      <FaEllipsisH />
    </div> */}
</li>
}
    </>

  )
}

export default NotificationsCard