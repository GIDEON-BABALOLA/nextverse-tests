import useImageLoad from "../../hooks/useImageLoaded"
import "../../styles/components/Reader/story-author.css"
import { useState, useEffect } from "react"
import { useFollowUser } from "../../hooks/useFollowUser"
import { useGetAUser } from "../../hooks/useGetAUser"
import { useAuthContext } from "../../hooks/useAuthContext"
const StoryAuthor = ({ author, avatar, userId, isFollowing}) => {
  const {followUser, error : followError, data} = useFollowUser();
  const { user } = useAuthContext();
  const {getAUser, isLoading : userLoading, error : userError, data : userData} = useGetAUser();
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState(false)
  const { loaded, error } = useImageLoad(avatar);
  console.log(user.following)
  useEffect(() => {
    if (error) {
  setLoading(true)
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  //When this component renders
  useEffect(() => {
getAUser(userId, "email bio")
  }, [])
  useEffect(() => {
console.log(userData)
  }, [userData])
  const followAUser = () => {
    console.log(userId)
    setFollowing(true)
    followUser(userData["email"])
  }
  useEffect(() => {
    if(Object.keys(data).length > 0){
      setFollowing(false)
    }
      }, [data])
  return (
    <div className="story-follow-suggestion">
    <div style={{display : "flex", flexDirection : "row", alignItems : "center"}}>
   { loading ? <div className="story-display-avatar-loader"></div> : <img src={avatar} alt={author} />}
    <div style={{display : "flex", flexDirection : "column"}}>
        <span><b>{author}</b></span>
       { userLoading ?  <div className="story-loaders story-loaders-info"></div>  :<span>{userData["email"]}</span> }
       { userLoading ?  <div className="story-loaders story-loaders-info"></div>  :<span>{userData["bio"]}</span> }
    </div>
    </div>






<>
{
  isFollowing ? 
  <button className="story-follow-button"
                > <b>Following</b></button> 

  :
  <>
  { Object.keys(data).length == 0 && !following &&
                  
                  <button className="story-follow-button"
                onClick={() => followAUser()}
                >
                <b>Follow</b>
                </button> 

                }
                {
                  following  && !followError &&
                  <button className="story-follow-button"
                ><span style={{color: "white"}}>Following...</span></button> 

                }
                {
                  !following &&  Object.keys(data).length > 0 &&
                  <button className="story-follow-button"
                > <b>Following</b></button> 

                }
                {
                  followError &&
                   <button className="story-follow-button"
                onClick={() => followAUser()}
                > <b>Follow</b></button> 
                }
  </>
}
</>
</div>
  )
}

export default StoryAuthor