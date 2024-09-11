import useImageLoad from "../../hooks/useImageLoaded"
import { useState, useEffect } from "react"
const FollowCard = ({ content }) => {
  const [loading, setLoading] = useState(true)
  
  const { loaded, error } = useImageLoad(content.avatar);
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
   {
    loading ?
    <div className="follower-item">
      <div className="skeleton-image skeleton-image-follower-avatar"></div>
      <div className="follower-info">
                    <div className="follower-name skeleton-image skeleton-image-follower-name"></div>
                    <div className="follower-username skeleton-image skeleton-image-follower-username"></div>
                </div>
                <div className=" skeleton-image skeleton-image-follow"></div>
    </div>
    :
    <div className="follower-item">
                <img src={content.avatar} alt="User Avatar" className="follower-avatar" />
                <div className="follower-info">
                    <div className="follower-name">{content.username}</div>
                    <div className="follower-username">{content.bio}</div>
                </div>
                <button className="follow-button">Follow</button>
            </div>
   }
            </>
  )
}

export default FollowCard