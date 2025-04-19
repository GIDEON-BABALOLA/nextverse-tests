
import { useState, useEffect } from "react"
import useImageLoad from "../../../../hooks/useImageLoaded"
import "../../../../styles/components/Dashboard/dashboard-profile-page.css"
const ProfileAvatar = ({ image, ...props}) => {
  console.log(image)
  const [loading, setLoading] = useState(true)
  const { loaded, error } = useImageLoad(image);
  useEffect(() => {
    if (error) {
     setLoading(true)
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  return (
    <>{ loading ? 
      <div
      {...props} className="dashboard-profile-loaders dashboard-profile-loaders-avatar" style={{width : "80%", height :"80%", cursor : "pointer"}}></div>
    :
    <img src={image} {...props}></img>
    }
    </>
  )
}

export default ProfileAvatar