import "../../styles/components/Dashboard/dashboard-toast.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
const GeneralToast = ({generalToast, setGeneralToast, message, buttonText, generalFunction}) => {
  const [trigger, setTrigger] = useState(false)
  const closeGeneralToast = () => {
   setGeneralToast(false)
   setTrigger(false)
  }
  useEffect(() => {
    setTimeout(() => {
      if(generalToast== true){
        setTrigger(true)
      }      
    }, 60);

  }, [generalToast])
  return (
    
    <div className={`litenote-dashboard-slide-up ${trigger ? "show" : ""} `} >
<span>{message}</span>
<span className = "litenote-dashboard-slide-up-button">
<span className="slidesubmitbtn" onClick={
    () => {
generalFunction();
closeGeneralToast();
    }
}>{buttonText}</span>
</span>
    </div>
  )
}

export default GeneralToast