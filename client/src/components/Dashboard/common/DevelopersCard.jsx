
import { FaXTwitter, FaInstagram,  FaLinkedin } from "react-icons/fa6";
import useImageLoad from "../../../hooks/useImageLoaded";
import { useState, useEffect } from "react";
const DevelopersCard = ({ developer, isLoading }) => {
    const [loading, setLoading] = useState(true)
  
    const { loaded, error } = useImageLoad(developer.picture);
    useEffect(() => {
        if (error) {
          console.log("failed to load images")
        }
        if (loaded === true) {
        setLoading(false)
        }
      }, [loaded, error])
  return (
    <>{

 isLoading ? <div>
 <div className="box">
    <div style={{display : "flex", flexDirection : "column", gap : "6px", width : "100%", alignItems : "center", justifyItems : "center", justifyContent : "center"}}>
<div className="skeletal-image">  </div>
<div className="skeletal-name"></div>
<div className="skeletal-title"></div>
    </div>
    <div className="icons facemenow" >
 <div className="skeletal-icon"></div>
 <div className="skeletal-icon"></div>
 <div className="skeletal-icon"></div>

      
    </div>
   </div>
 </div>
 :
   <div className="box">
   {loading ? 
    
   
   <div style={{display : "flex", flexDirection : "column", gap : "6px", width : "100%", 
  //  padding : "10px",
   alignItems : "center", justifyItems : "center", justifyContent : "center"}}>
   <div className="skeletal-image" style={{ width : "140px" }}>  </div>
    </div>
   :
    <img src={developer.picture} alt="" />
   }
   
    <h3>{developer.username}</h3>
    <h5>{developer.title}</h5>
    <div className="icons">
    <a href={developer["socials"].instagram} target="_blank" rel="noopener noreferrer">
    <FaInstagram />
</a>
<a href={developer["socials"].twitter} target="_blank" rel="noopener noreferrer">
<FaXTwitter />
</a>
<a href={developer["socials"].linkedin} target="_blank" rel="noopener noreferrer">
<FaLinkedin />
</a>
      
    </div>
   </div>
}
    </>
 
  )
}

export default DevelopersCard