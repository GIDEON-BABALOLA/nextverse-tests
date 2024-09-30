
import { useState, useEffect } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
const Avatar = ({ image, ...props}) => {
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
    <>{ loading ? 
      <div className=" skeleton-image skeleton-image-avatar" ></div>
    :
    <img src={image} {...props}></img>
    }
    </>
  )
}

export default Avatar