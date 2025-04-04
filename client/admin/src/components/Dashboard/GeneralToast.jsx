import "../../styles/components/Dashboard/dashboard-toast.css"
import { useEffect, useState, useRef } from "react"
const GeneralToast = ({generalToast, setGeneralToast, message, buttonText, generalFunction}) => {
  const [trigger, setTrigger] = useState(false)
    const generalToastRef = useRef()
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
  const closeSpecialModal  = (e) => {
    if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"
      || Object.values(e.target.classList).includes("special-modal-client")
    ){
      return;
    }
          if( e.clientX < parseInt(generalToastRef.current.getBoundingClientRect().left) || e.clientX > parseInt(generalToastRef.current.getBoundingClientRect().left) + generalToastRef.current.getBoundingClientRect().width)
            {
              setGeneralToast(false);
              setTrigger(false)
            }else if(
              e.clientY < parseInt(generalToastRef.current.getBoundingClientRect().top) || e.clientY > parseInt(generalToastRef.current.getBoundingClientRect().top) + generalToastRef.current.getBoundingClientRect().height
            ){
              setGeneralToast(false);
              setTrigger(false)
            }
        
    
    }
useEffect(() => {
  document.addEventListener("click", (e) => {
    if(generalToastRef.current){
      closeSpecialModal(e)
    }
  })
  return () =>{
    document.removeEventListener('click', (e) => {
      if(generalToastRef.current){
        closeSpecialModal(e)
      }
    }
  )
  }
  }, [])
  return (
    
    <div className={`litenote-dashboard-slide-up ${trigger ? "show" : ""} `}
    ref={generalToastRef}
    >
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