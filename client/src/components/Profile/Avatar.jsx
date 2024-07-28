import { useEffect, useState } from "react";
import useImageLoad from "../../hooks/useImageLoaded";
const Avatar = () => {
  const [loading, setLoading] = useState(true)
    let profileImage = "https://res.cloudinary.com/doctr0fct/image/upload/v1716408724/Avatars/qsxouazfwl38xzqjzs0n.jpg"
  const { loaded, error } = useImageLoad(profileImage);
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
        <div className="litenote-profile-image">
       { loading ?<div  className="skeleton-picture"/> : <img src={profileImage} alt="User Avatar" />
       }
      </div>
    </>
  )
}

export default Avatar