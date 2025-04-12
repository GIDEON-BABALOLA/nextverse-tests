import "../../styles/components/Dashboard/dashboard-toast.css"
import useWindowSize from "../../hooks/useWindowSize"
import { useParams } from "react-router-dom"
import { useRef } from "react"
import { useEffect, useState } from "react"
const DashboardToast = ({dashboardToast, setDashboardToast, customContent}) => {
  const currentPage = useParams();
  const myDashboardToastRef  = useRef()
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
  }, [dashboardToast])
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if(myDashboardToastRef.current){
        closeDashboardToastOnClick(e)
      }
  ``
    })
    return () =>{
      document.removeEventListener('click', (e) => {
        if(myDashboardToastRef.current){
          closeDashboardToastOnClick(e)
        }
      }
    )
    }
    }, [])
  const closeDashboardToastOnClick  = (e) => {
    console.log(e.target.classList)
    if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"
      || Object.values(e.target.classList).includes("special-modal-client")
    ){
      return;
    }
          if( e.clientX < parseInt(myDashboardToastRef.current.getBoundingClientRect().left) || e.clientX > parseInt(myDashboardToastRef.current.getBoundingClientRect().left) + myDashboardToastRef.current.getBoundingClientRect().width)
            {
              setDashboardToast(false)
              setTrigger(false)
            }else if(
              
              e.clientY < parseInt(myDashboardToastRef.current.getBoundingClientRect().top) || e.clientY > parseInt(myDashboardToastRef.current.getBoundingClientRect().top) + myDashboardToastRef.current.getBoundingClientRect().height
            ){
              setTrigger(false)
              setDashboardToast(false)
            }
        
    
    }
  return (
    
    <div className={`litenote-dashboard-slide-up ${trigger ? "show" : ""} `} 
    ref={myDashboardToastRef}
    >
      {
customContent ? 
<span>{customContent}</span>
:
<>
<span>{width < 768 ? `Switched To The  ${currentUrl.split("")[0].toUpperCase().concat(currentUrl.split("").slice(1).join(""))} Page` : `You Have successfully Switched To The ${currentUrl.split("")[0].toUpperCase().concat(currentUrl.split("").slice(1).join(""))} Page`}</span>
<span href="/" className="slidesubmitbtn" onClick={closeDashboardToast}>Confirm</span>
</>
      }
<span className = "litenote-dashboard-slide-up-button">
</span>
    </div>
  )
}

export default DashboardToast