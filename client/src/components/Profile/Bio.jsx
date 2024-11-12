
import SpinnerLoader from "../Loaders/SpinnerLoader";
import { useState } from "react";
import { useToastContext } from "../../hooks/useToastContext";
import { useProfileContext } from "../../hooks/useProfileContext";
import { MdVerified } from "react-icons/md";
const Bio = ({ isLoading }) => {
  const { showToast } = useToastContext()
  const { profile } = useProfileContext()
  const [spin,  setSpin] = useState(false)

  const followUser = () => {
    setSpin(true)
showToast()
setTimeout(() => {
  setSpin(false)
}, 5000);
  }
  return (
   <>
   { isLoading ? <section style={{display : "flex", flexDirection : "column", gap : "6px", alignItems : "flex-start"}}>
   <div style={{display : "flex", flexDirection : "row", gap : "6px", alignItems : "center"}}>
<div className="profile-loader profile-loader-username"></div>
{/* <div className="profile-loader profile-loader-verification"></div> */}
<div className="profile-loader profile-loader-follow-button"></div>

</div>
<div  style={{display : "flex", flexDirection : "column", gap : "6px", alignItems : "flex-start"}}>
<div className="profile-loader profile-loader-title"></div>
<div className="profile-loader profile-loader-bio"></div>
</div>
   </section>
    :
<section>
            <h2 className="litenote-profile-name">{profile["username"]} 
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
</section>
   }

   </>
  )
}

export default Bio