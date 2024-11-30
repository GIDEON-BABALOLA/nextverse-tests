import useImageLoad from "../../hooks/useImageLoaded"
import { useState, useEffect, forwardRef } from "react"
const FollowCard = forwardRef(({ content, isLoading }, ref) => {
  const [avatarLoading, setAvatarLoading] = useState(true)
  const { loaded, error } = useImageLoad(content.picture);
  useEffect(() => {
    if (error) {
      console.log("failed to load images")
    }
  
    if (loaded === true) {
    setAvatarLoading(false)
    }else{
      setAvatarLoading(true)
    }
  }, [loaded, error])
  return (
    <section ref={ref}>
   {
    isLoading ?
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
    {
      avatarLoading ?
      <div className="skeleton-image skeleton-image-follower-avatar"></div>
       : 
      <img src={content.picture} alt="User Avatar" className="follower-avatar" />
    }
                
                <div className="follower-info">
                    <div className="follower-name">{content.username}</div>
                    <div className="follower-username">{content.email}</div>
                </div>
                <button className="follow-button">Follow</button>
            </div>
   }
            </section>
  )
})
FollowCard.displayName = "FollowCard";

export default FollowCard