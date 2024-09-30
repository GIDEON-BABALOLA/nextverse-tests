
import SpinnerLoader from "../Loaders/SpinnerLoader";
import { useState } from "react";
import { useToastContext } from "../../hooks/useToastContext";
import { MdVerified } from "react-icons/md";
const Bio = () => {
  const { showToast } = useToastContext()
  const [spin,  setSpin] = useState(false)
  const username = "Chris James"
  const followUser = () => {
    setSpin(true)
showToast()
setTimeout(() => {
  setSpin(false)
}, 5000);
  }
  return (
   <>

            <h2 className="litenote-profile-name">{`${username}`} 
            {/* <FcRating style={{marginLeft : "1%"}} /> */}
            <MdVerified style={{marginLeft : "1%", color : "black", fill : "#FF4B33"}}/>
          {/* <span className="checkbot">
    
          <FaCertificate style={{color : "#ff5e62", margin: "1%"}} />
            <FaCheck className="checkman"  size={14}/> 
          </span> */}
          <button 
          
          className="follow"
          onClick={followUser}
          ><span className="follow-text"> 
          {spin ? 
          
        <span className="spinner-loader-container">
        <SpinnerLoader  width={13}/>
        </span>
        
      
        : "follow"}
     
          </span></button> 
          </h2>
          <span><b>Technical Writer</b></span>
        <p className="litenote-profile-bio">I love sharing my life experiences and connecting with others.</p>
   </>
  )
}

export default Bio