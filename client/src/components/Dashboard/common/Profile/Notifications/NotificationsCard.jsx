import { useEffect, useState } from "react"
import { useRef } from "react"
import useImageLoad from "../../../../../hooks/useImageLoaded"
const NotificationsCard = ({ notification, currentNotification }) => {
  let isLoading = true
  const [avatarLoading, setAvatarLoading] = useState(true)
  const { loaded, error } = useImageLoad(notification.avatar);
  useEffect(() => {
    if (error) {
      setAvatarLoading(true)
    }
  
    if (loaded === true) {
   setAvatarLoading(false)
    }
  }, [loaded, error])
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
<li className="my-notifications-item active" ref={notify}>
    <img src={notification.avatar} alt="Seun Merrcy" className="my-notifications-avatar" />
    <div style={{display : "flex", flexDirection : "column"}}>
    <span className="my-notifications-name">{notification.username}</span>
    <span className="my-notifications-status">{notification.title}</span>
    </div>
    <div className="my-notifications-content">
        <div className="my-notifications-header">
            <span className="my-notifications-action">{notification.message}</span>
        </div>
        <div className="my-notifications-meta">
            {/* <span className="my-notifications-status">Blogger</span> */}
            <span className="my-notifications-time">{notification.time}</span>
            <a href="#" className="my-notifications-view-button">View Profile</a>
        </div>
    </div>
</li>
}
    </>

  )
}

export default NotificationsCard