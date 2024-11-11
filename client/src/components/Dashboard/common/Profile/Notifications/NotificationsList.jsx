import NotificationsCard from "./NotificationsCard"
const NotificationsList = ({notifications, currentNotification}) => {
  return (
  <>{
    currentNotification["stories"] ? 
 <ul className="notification-list" id="notificationList">
     {notifications.filter((item) => item.type !== "profile").map((item, index) => (
      <NotificationsCard 
      currentNotification={currentNotification}
      key={index} notification={item}/>
     ))}
    
    </ul>
    :
    <ul className="notification-list" id="notificationList">
     {notifications.filter((item) => item.type !== "story").map((item, index) => (
      <NotificationsCard
      currentNotification={currentNotification}
       key={index} notification={item}/>
     ))}
    
    </ul>

  }
  </>
 
  )
}
export default NotificationsList