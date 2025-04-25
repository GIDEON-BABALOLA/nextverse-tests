import "../../styles/components/Dashboard/dashboard-toast.css"
import { useEffect, useState } from "react"
const FollowToast = ({followToast, setFollowToast, loadPage, message}) => {
  const [trigger, setTrigger] = useState(false)
  const closeDashboardToast = () => {
   setFollowToast({ toast : false, message : ""})
   setTrigger(false)
  }
  useEffect(() => {
      if(followToast.toast == true){
        setTrigger(true)
      }      
  }, [followToast.toast])
  return (
    
    <div className={`litenote-dashboard-slide-up ${trigger ? "show" : ""} `} >
<span className="follow-toast-message">{message}</span>
<span className = "litenote-dashboard-slide-up-button">
<span href="/" className="slidesubmitbtn" onClick={closeDashboardToast}>Close</span>
</span>
    </div>
  )
}

export default FollowToast