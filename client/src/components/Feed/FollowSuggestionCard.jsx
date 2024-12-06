import FeedAvatar from "./FeedAvatar"
import { useFollowUser } from "../../hooks/useFollowUser"
import useNavigateProfile from "../../hooks/useNavigateProfile"
import { useState, useEffect } from "react"
const FollowSuggestionCard = ({ isLoading, user }) => {
  const navigateToProfile  = useNavigateProfile();
  console.log(user)
  const {followUser, data, error : followError } = useFollowUser()
  const [following, setFollowing] = useState(false)
  const followAUser = () => {
    setFollowing(true)
followUser(user.email)
  }
  useEffect(() => {
    if(Object.keys(data).length > 0){
      setFollowing(false)
      console.log("wnwjjw")
      console.log("data")
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
           { Object.keys(data).length == 0 && !following &&
                  
                  <button className="feed-follow-button"
                onClick={() => followAUser()}
                >Follow</button> 

                }
                {
                  following  &&  !followError &&
                  <button className="feed-follow-button"
                ><span style={{color: "white"}}>Following...</span></button> 

                }
                {
                  !following &&  Object.keys(data).length > 0 &&
                  <button className="feed-follow-button"
                >Following</button> 

                }
                {
                  followError &&
                   <button className="feed-follow-button"
                onClick={() => followAUser()}
                >Follow</button> 
                }
     </div>
}
</>

  )
}

export default FollowSuggestionCard