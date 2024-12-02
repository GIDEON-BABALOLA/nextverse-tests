
import { useState, useEffect } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
const FeedAvatar = ({ image, ...props}) => {
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
       className="feed-loaders feed-loader-avatar"></div>
    :
    <img src={image} {...props}></img>
    }
    </>
  )
}

export default FeedAvatar