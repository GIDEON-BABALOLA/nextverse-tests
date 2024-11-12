import { useEffect, useState } from "react";
import useImageLoad from "../../hooks/useImageLoaded";
import { useProfileContext } from "../../hooks/useProfileContext";
const Avatar = () => {
  const [loading, setLoading] = useState(true)
  const { profile } = useProfileContext();
  const { loaded, error } = useImageLoad(profile["picture"]);
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
       { loading ?
       <div  className="skeleton-image"/> : <img src={profile["picture"]} alt="User Avatar" />
       }
      </div>
    </>
  )
}

export default Avatar