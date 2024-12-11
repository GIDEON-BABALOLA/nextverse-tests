import useImageLoad from "../../hooks/useImageLoaded"
import "../../styles/components/Reader/story-author.css"
import useNavigateProfile from "../../hooks/useNavigateProfile"
import { MdOutlineVisibility, MdOutlineFavorite, MdOutlineFavoriteBorder  } from 'react-icons/md';
import { useState, useEffect } from "react"
import { useFollowUser } from "../../hooks/useFollowUser"
import { useGetAUser } from "../../hooks/useGetAUser"
import { useAuthContext } from "../../hooks/useAuthContext"
import { formatNumber } from "../../helpers/formatNumber";
const StoryAuthor = ({ author, avatar, userId, isFollowing, views, likes}) => {
  const navigateToProfile = useNavigateProfile();
  const {followUser, error : followError, data} = useFollowUser();
  const { user } = useAuthContext();
  const {getAUser, isLoading : userLoading, data : userData} = useGetAUser();
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState(false)
  const [imPossibleToFollow, setImPossibleToFollow] = useState(false)
  const { loaded, error } = useImageLoad(avatar);
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
    if(userId === user["_id"]){
setImPossibleToFollow(true)
    }
    else{
    setImPossibleToFollow(false)
    }
  }, [userData])
  const followAUser = () => {
    setFollowing(true)
    followUser(userData["email"])
  }
  useEffect(() => {
    if(Object.keys(data).length > 0){
      setFollowing(false)
    }
      }, [data])
  return (
    <>
        <div className="story-follow-suggestion">
    <div style={{display : "flex", flexDirection : "row", alignItems : "center", cursor : "pointer"}}>
   { loading ? <div className="story-display-avatar-loader"></div> : <img src={avatar} alt={author} />}
    <div style={{display : "flex", flexDirection : "column"}}>
        <span onClick={() => { navigateToProfile(author)}}><b>{author}</b></span>
       { userLoading ?  <div className="story-loaders story-loaders-info"></div>  :<span>{userData["bio"]}</span> }
       <div>
     
       </div>
    </div>
   
    </div>
    





{

!imPossibleToFollow &&
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
                ><span>Following...</span></button> 

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
}

</div>
      <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", gap : "5px"}}>
<span> <MdOutlineVisibility size={20}/>&nbsp;{formatNumber(views)}&nbsp;views</span>
<span><MdOutlineFavorite size={20} fill="#ff5e62"/>&nbsp;{formatNumber(likes)}&nbsp;likes</span>
   
    </div>
    </>

  )
}

export default StoryAuthor