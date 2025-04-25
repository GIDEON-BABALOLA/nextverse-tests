const NotificationsTab = ({slideLine, 
  currentNotification,
  attachmentLine,
  changeNotificationState,
  notificationCount
}) => {
  console.log(notificationCount)
  return (
    <div className="my-notifications-tabs">
    <span className={`my-notifications-tab ${currentNotification["story"] && "active"}` } data-tab="stories"
     onClick={(e) => {slideLine(e);
     changeNotificationState()
     }}
    >
        Stories <span className="my-notifications-badge">{notificationCount.story}</span>
    </span>
    <span className={`my-notifications-tab ${currentNotification["profile"] && "active"}` } data-tab="profile"
    onClick={(e) => {slideLine(e);
    changeNotificationState()
    }}
    >Profile
 <span className="my-notifications-badge">{notificationCount.profile}</span>
    </span>
    {/* <div
className="slideline-notification" style={{left : attachmentLine + "px"}}></div> */}
</div>
  )
}

export default NotificationsTab