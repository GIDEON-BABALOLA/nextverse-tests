import { FaWifi} from "react-icons/fa"
import { MdClose, MdOutlineNetworkWifi } from "react-icons/md"
import "../../styles/components/common/connectivity-toast.css"
import { useEffect, useRef } from "react"
import { BiWifiOff } from "react-icons/bi"
import useInternetMode from "../../hooks/useInternetMode"
const ConnectivityToast = () => {
  const { online, offline } = useInternetMode()
  const toastWrapper = useRef()
  const toastRef = useRef()
  const titleRef = useRef()
  const subTitle = useRef()
  const wifiIcon = useRef()
  const closeIcon = useRef()
  const closeInternetMode = () => {
toastWrapper.current.classList.add("hide")
  }
  const offlineCall = () => {
    toastWrapper.current.classList.remove("hide")
    toastRef.current.classList.add("offline")
    titleRef.current.innerText = "You are offline now"
    subTitle.current.innerHTML = "Oops! Internet is disconnected, <span onClick={location.reload()}><u>refresh page</u></span>"
  }
  const onlineCall = () => {
    toastWrapper.current.classList.remove("hide")
    toastRef.current.classList.remove("offline")
    titleRef.current.innerText = "You are Online now"
    subTitle.current.innerText  = " Hurray! Internet is connected"
  }
  useEffect(()=>{
    switch (true) {
      case online:
        toastWrapper.current.classList.remove("visibility")
        onlineCall()
        setTimeout(() => {
          toastWrapper.current.classList.add("hide")
        }, 5000);
        break;
        case offline:
          toastWrapper.current.classList.remove("visibility")
        offlineCall()
        setTimeout(() => {
          toastWrapper.current.classList.add("hide")
        }, 5000);
        break;
    
      default:
        toastWrapper.current.classList.add("visibility")
        break;
    }
  }, [offline, online])

  return <div className="connectivity-toast-wrapper" ref={toastWrapper}>
  <div className="connectivity-toast" ref={toastRef}>
<div className="connectivity-toast-content">
<span className="connectivity-toast-wifi-icon" ref={wifiIcon}>
{ online ? <FaWifi /> : <BiWifiOff />}
</span>

<div className="connectivity-toast-details">
<span className="toast-details-span"
ref={titleRef}
></span>
<p ref={subTitle}>
</p>
</div>
</div>
<span className="connectivity-toast-close-icon" ref={closeIcon} onClick={closeInternetMode}>
<MdClose />
</span>
  </div>

  </div>
  
}

export default ConnectivityToast