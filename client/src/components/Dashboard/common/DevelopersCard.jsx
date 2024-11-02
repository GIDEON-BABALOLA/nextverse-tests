
import { FaXTwitter, FaInstagram,  FaLinkedin } from "react-icons/fa6";
import useImageLoad from "../../../hooks/useImageLoaded";
import { useState, useEffect } from "react";
const DevelopersCard = ({ developer }) => {
    const [loading, setLoading] = useState(true)
  
    const { loaded, error } = useImageLoad(developer.image);
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

 !loaded ? <div>
 <div className="box">
    <div style={{display : "flex", flexDirection : "row", width : "100%", alignItems : "center", justifyItems : "center", justifyContent : "center"}}>
<div className="skeleton-image skeleton-image-developer-avatar">  </div>
    </div>
    <h3>{developer.name}</h3>
    <h5>{developer.role}</h5>
    <div className="icons">
    <a href={developer.instagram} target="_blank" rel="noopener noreferrer">
    <FaInstagram />
</a>
<a href={developer.twitter} target="_blank" rel="noopener noreferrer">
<FaXTwitter />
</a>
<a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
<FaLinkedin />
</a>
      
    </div>
   </div>
 </div>
 :
   <div className="box">
    <img src={developer.avatar} alt="" />
    <h3>{developer.name}</h3>
    <h5>{developer.role}</h5>
    <div className="icons">
    <a href={developer.instagram} target="_blank" rel="noopener noreferrer">
    <FaInstagram />
</a>
<a href={developer.twitter} target="_blank" rel="noopener noreferrer">
<FaXTwitter />
</a>
<a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
<FaLinkedin />
</a>
      
    </div>
   </div>
}
    </>
 
  )
}

export default DevelopersCard