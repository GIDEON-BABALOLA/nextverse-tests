import "../../styles/components/Dashboard/dashboard-toast.css"
import useWindowSize from "../../hooks/useWindowSize"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
const DashboardToast = ({dashboardToast, setDashboardToast, loadPage}) => {
  const currentPage = useParams();
  // console.log(linkRef.current.innerText)
  const currentUrl = Object.values(currentPage)[0].split("/")[1]
  const {width} = useWindowSize()
  const [trigger, setTrigger] = useState(false)
  const closeDashboardToast = () => {
   setDashboardToast(false)
   setTrigger(false)
  }
  useEffect(() => {
    setTimeout(() => {
      if(dashboardToast== true){
        setTrigger(true)
      }      
    }, 60);

  }, [loadPage])
  return (
    
    <div className={`litenote-dashboard-slide-up ${trigger ? "show" : ""} `} >
<span>{width < 768 ? `Switched To The  ${currentUrl.split("")[0].toUpperCase().concat(currentUrl.split("").slice(1).join(""))} Page` : `You Have successfully Switched To The ${currentUrl.split("")[0].toUpperCase().concat(currentUrl.split("").slice(1).join(""))} Page`}</span>
<span className = "litenote-dashboard-slide-up-button">
<span href="/" className="slidesubmitbtn" onClick={closeDashboardToast}>Confirm</span>
</span>
    </div>
  )
}

export default DashboardToast