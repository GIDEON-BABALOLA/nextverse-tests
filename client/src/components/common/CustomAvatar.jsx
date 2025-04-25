
import { useState, useEffect } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
const CustomAvatar = ({ image, ...props}) => {
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
      {...props} className="feed-loaders feed-loader-avatar" style={{width : "80%", height :"80%"}}></div>
    :
    <img src={image} {...props}></img>
    }
    </>
  )
}

export default CustomAvatar