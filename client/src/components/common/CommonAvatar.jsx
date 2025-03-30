
import { useState, useEffect } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
const CommonAvatar = ({ image, ...props}) => {
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
      <span
       {...props}
       className="common-avatar ">&nbsp;</span>
    :
    <img src={image} {...props}></img>
    }
    </>
  )
}

export default CommonAvatar