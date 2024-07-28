import { FaCheck } from "react-icons/fa"
import { FaTimes } from "react-icons/fa"
import "../../styles/components/common/toast.css"
import { useEffect, useRef } from "react"

const Toast = ({toastRef, toastProgress}) => {
  const closeToast = () => {
    toastRef.current.classList.remove("active")
    setTimeout(() => {
      toastProgress.current.classList.remove("active")
    }, 5500);

  }
  return ( 
    <div className="litenote-toast" ref={toastRef}>
        <div className="litenote-toast-content">
        <span className="toast-check">
        <FaCheck  size={20}/>
        </span>
 <div className="litenote-toast-message">
<span className="litenote-toast-text text-1">
Success
</span>
<span className="litenote-toast-text text-2">Your Changes has been saved</span>
 </div>
        </div>
<FaTimes className="toast-close" size={26} onClick={closeToast}/>
<div className="litenote-toast-progress" ref={toastProgress}>

</div>
    </div>
  )
}

export default Toast