const NotificationsTab = ({slideLine, attachmentLine, changeNotificationState}) => {
  return (
    <div className="my-notifications-tabs">
    <span className="my-notifications-tab active" data-tab="stories"
     onClick={(e) => {slideLine(e);
     changeNotificationState()
     }}
    >
        Stories <span className="my-notifications-badge">2</span>
    </span>
    <span className="my-notifications-tab" data-tab="profile"
    onClick={(e) => {slideLine(e);
    changeNotificationState()
    }}
    >Profile</span>
    <div
className="slideline-notification" style={{left : attachmentLine + "px"}}></div>
</div>
  )
}

export default NotificationsTab