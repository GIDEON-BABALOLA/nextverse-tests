import { useEffect, useState } from "react";
import useImageLoad from "../../hooks/useImageLoaded";
const Avatar = ({ image }) => {
  const [loading, setLoading] = useState(true)
  const { loaded, error } = useImageLoad(image);
  useEffect(() => {
    if (error) {
      console.log("failed to load images")
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  return (
    <>
        <div className="litenote-profile-image" style={ { marginLeft : "5px"}}>
       { loading ?<div  className="skeleton-image"/> : <img src={image} alt="User Avatar" />
       }
      </div>
    </>
  )
}

export default Avatar