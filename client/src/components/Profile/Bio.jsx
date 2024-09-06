import { FaCheck } from "react-icons/fa";
import { FaCertificate } from "react-icons/fa";
import SpinnerLoader from "../Loaders/SpinnerLoader";
import { useState } from "react";
import { FcRating } from "react-icons/fc";
import { MdVerified } from "react-icons/md";
const Bio = ({ toastRef, toastProgress }) => {
  const [spin,  setSpin] = useState(false)
  const username = "Chris James"
  const followUser = () => {
    setSpin(true)
toastRef.current.classList.add("active")
toastProgress.current.classList.add("active")
setTimeout(() => {
  setSpin(false)
  toastRef.current.classList.remove("active")
}, 5000);
setTimeout(() => {
  toastProgress.current.classList.remove("active")
}, 5500);
  }
  return (
   <>

            <h2 className="litenote-profile-name">{`${username}`} 
            {/* <FcRating style={{marginLeft : "1%"}} /> */}
            <MdVerified style={{marginLeft : "1%", color : "black", fill : "#FF5E62"}}/>
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
        <SpinnerLoader />
        </span>
        
      
        : "follow"}
     
          </span></button> 
          </h2>
        <p className="litenote-profile-bio">I love sharing my life experiences and connecting with others.</p>
   </>
  )
}

export default Bio