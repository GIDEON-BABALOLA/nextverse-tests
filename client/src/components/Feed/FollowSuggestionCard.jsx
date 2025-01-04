import FeedAvatar from "./FeedAvatar"
import { useFollowUser } from "../../hooks/useFollowUser"
import useNavigateProfile from "../../hooks/useNavigateProfile"
import { useState, useEffect } from "react"
const FollowSuggestionCard = ({ isLoading, user }) => {
  const navigateToProfile  = useNavigateProfile();
  const {followUser, data, error : followError } = useFollowUser()
  const [following, setFollowing] = useState(false)
  const followAUser = () => {
    setFollowing(true)
followUser(user.email)
  }
  const renderFollowButton = () => {
    if(Object.keys(data).length == 0 && !following){
      return (
        <button className="feed-follow-button"
        onClick={() => followAUser()}
        >Follow</button> 
      )
    }
    if(following  &&  !followError){
      return(
        <button className="feed-follow-button"
                ><span style={{color: "white"}}>Following...</span></button> 
      )
    }
    if(  !following &&  Object.keys(data).length > 0 ){
return(
  <button className="feed-follow-button"
                >Following</button> 
)
    }
if(followError){
  return (
    <button className="feed-follow-button"
    onClick={() => followAUser()}
    >Follow</button>
  )
}
  }
  useEffect(() => {
    if(Object.keys(data).length > 0){
      setFollowing(false)
    }
      }, [data])
  return (
<>
{
    isLoading ? 
    <div
    className="feed-follow-suggestion"
     style={{display :"flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
<div
style={{display : "flex", flexDirection :"row", alignItems : "center"}}

><div className=" feed-loaders feed-profile-images-following"></div>
<div style={{display :"flex", flexDirection : "column", gap : "5px"}}>
<div className="feed-loaders feed-loaders-follow-text"></div>
<div className="feed-loaders feed-loaders-follow-subtext"></div>

</div>

</div>
<div className="feed-loaders feed-loaders-follow-button"></div>
    </div>
    :
<div className="feed-follow-suggestion">
         <FeedAvatar
image={user["picture"]}
alt="Author"
className="feed-profile-images-trending" 
/>
         <div>
             <div onClick={() => { navigateToProfile(user["username"])}}><b>{user["username"]}</b></div>
             <div>{user["bio"]}</div>
         </div>
   {renderFollowButton()}
     </div>
}
</>

  )
}

export default FollowSuggestionCard