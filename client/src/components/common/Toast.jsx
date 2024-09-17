import { FaCheck } from "react-icons/fa"
import { FaTimes } from "react-icons/fa"
import "../../styles/components/common/toast.css"
import { useToastContext } from "../../hooks/useToastContext"
const Toast = () => {
  const { closeToast, toastProgress, toastRef, mode } = useToastContext()
  return ( 
    <div className="litenote-toast" ref={toastRef}
    style={{fontFamily : "Poppins", fontWeight : "2rem"}}
    >
        <div className="litenote-toast-content">
        <span className="toast-check" >
       { mode ? <FaCheck  size={20}/> :  <FaTimes size={20}/>} 
        </span>
 <div className="litenote-toast-message">
<span className="litenote-toast-text text-1"
style={{fontSize : "1.3rem", textDecoration : "bolder"}}
>
</span>
<span className="litenote-toast-text text-2"
style={{fontSize : "1.2rem",
display : "flex", alignItems : "center", flexWrap : "wrap", justifyContent : "center",
flexDirection : "column"
}}
></span>
 </div>
        </div>
<FaTimes className="toast-close" size={26} onClick={closeToast}/>
<div className="litenote-toast-progress" ref={toastProgress}>

</div>
    </div>
  )
}

export default Toast