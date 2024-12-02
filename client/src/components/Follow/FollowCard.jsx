import useImageLoad from "../../hooks/useImageLoaded"
import { useState, useEffect, forwardRef } from "react"
import { useFollowUser } from "../../hooks/useFollowUser"
const FollowCard = forwardRef(({ content, isLoading }, ref) => {
  const [avatarLoading, setAvatarLoading] = useState(true)
  const { loaded, error } = useImageLoad(content.picture);
  const [following, setFollowing] = useState(false)
  const {followUser, isLoading : followIsLoading, error  : followError, data } = useFollowUser()
  const followAUser = () => {
    setFollowing(true)
followUser(content.email)
  }
  useEffect(() => {
if(Object.keys(data).length > 0){
  setFollowing(false)
  console.log("wnwjjw")
  console.log("data")
}
  }, [data])
  useEffect(() => {
    if (error) {
  setAvatarLoading(true)
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
                { Object.keys(data).length == 0 && !following &&
                  
                  <button className="follow-button"
                onClick={() => followAUser()}
                >Follow</button> 

                }
                {
                  following  && !followError &&
                  <button className="follow-button"
                ><span style={{color: "white"}}>Following...</span></button> 

                }
                {
                  !following &&  Object.keys(data).length > 0 &&
                  <button className="follow-button"
                >Following</button> 

                }
                {
                  followError &&
                   <button className="follow-button"
                onClick={() => followAUser()}
                >Follow</button> 
                }
            </div>
   }
            </section>
  )
})
FollowCard.displayName = "FollowCard";

export default FollowCard