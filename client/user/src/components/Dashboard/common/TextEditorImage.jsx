
import { useState, useEffect } from "react"
import useImageLoad from "../../../hooks/useImageLoaded"
const CommonAvatar = ({ image, ...props}) => {
  console.log(image)
  const [loading, setLoading] = useState(true)
  const { loaded, error } = useImageLoad(image);
  useEffect(() => {
    if (error) {
      console.log("dave")
setLoading(true)
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  return (
    <>{ loading ? 
      <div
       {...props}
       className="text-editor-loaders text-editor-small-image-preview"></div>
    :
    <img src={image} {...props}></img>
    }
    </>
  )
}

export default CommonAvatar