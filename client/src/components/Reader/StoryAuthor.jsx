import useImageLoad from "../../hooks/useImageLoaded"
import "../../styles/components/Reader/story-author.css"
import useNavigateProfile from "../../hooks/useNavigateProfile"
import { MdOutlineVisibility, MdOutlineFavorite, MdOutlineFavoriteBorder  } from 'react-icons/md';
import { useLikeAStory } from "../../hooks/useLikeAStory";
import { useUnLikeAStory } from "../../hooks/useUnlikeAStory";
import { useState, useEffect } from "react"
import { useFollowUser } from "../../hooks/useFollowUser"
import { useGetAUser } from "../../hooks/useGetAUser"
import { useAuthContext } from "../../hooks/useAuthContext"
import { formatNumber } from "../../helpers/formatNumber";
const StoryAuthor = ({ author,
  avatar,
  userId,
  isFollowing,
  views,
  likes,
  storyId,
  isLiked
}) => {
  const navigateToProfile = useNavigateProfile();
  const {followUser, error : followError, data} = useFollowUser();
  const likeStory = useLikeAStory();
  const unlikeStory = useUnLikeAStory();
  const { user } = useAuthContext();
  const {getAUser, isLoading : userLoading, data : userData} = useGetAUser();
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState(false)
  const [liking, setLiking]  = useState(false)
  const [unLiking, setUnLiking] = useState(false)
  const [totalLikes, setTotalLikes] = useState(likes)
  const [likedBefore, setLikedBefore] = useState(isLiked)
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
  const likeTheStory = () => {
    setLiking(true)
    setLikedBefore(false)
    likeStory.likeAStory(storyId)
  }
  const unlikeTheStory = () => {
    setUnLiking(true)
    setLikedBefore(false)
    unlikeStory.unlikeAStory(storyId)
  }
  useEffect(() => {
    if(Object.keys(data).length > 0){
      setFollowing(false)
    }
      }, [data])
  useEffect(() => {
if(Object.keys(likeStory.data).length  > 0){
  setLikedBefore(false)
  setLiking(false)
  setTotalLikes(totalLikes + 1)
}
  }, [likeStory.data])
  useEffect(() => {
    if(Object.keys(unlikeStory.data).length  > 0){
      setLikedBefore(true)
      setUnLiking(false)
      setTotalLikes(totalLikes - 1)
    }
      }, [unlikeStory.data])
      const renderLikeButton = () => {
        if (Object.keys(likeStory.data).length == 0 && !liking && !likedBefore){
          return (

            <MdOutlineFavoriteBorder 
            onClick={() => likeTheStory()}
            size={20} color="var(--actions-button-color)"/>
          )
        }
        if (liking && !likeStory.error && !likedBefore){
          return (
          
                <MdOutlineFavorite 
            
            size={20} color="var(--like-icon)"/>
       
          
          )
        }
        if (!liking && Object.keys(likeStory.data).length > 0 && !likedBefore){
          return (
  <MdOutlineFavorite
          onClick={() => unlikeTheStory()}
           size={20} color="var(--like-icon)"/>
  
          )
        }
        if (likeStory.error && !likedBefore){
          return (
            <MdOutlineFavoriteBorder
            onClick={() => likeTheStory()}
             size={20} color="var(--actions-button-color)"/>
          )
        }
          
      };
      const renderUnLikeButton = ()  => {
        if (Object.keys(unlikeStory.data).length == 0 && !unLiking && likedBefore){
          return (


<MdOutlineFavorite
            onClick={() => unlikeTheStory()}
             size={20} color="var(--like-icon)"/>


  
          )
        }
        if (unLiking && !unlikeStory.error && likedBefore){
          return (
            
<MdOutlineFavoriteBorder 
            size={20} color="var(--actions-button-color)"/>



         
      
          )
        }
        if (!unLiking && Object.keys(unlikeStory.data).length > 0 && likedBefore){
          return(
            
          <MdOutlineFavoriteBorder 
             onClick={() => likeTheStory()}
            size={20} color="var(--actions-button-color)"/>
       

          
          )
         
         
            
        }
        if (unlikeStory.error && likedBefore){
          return (
            <MdOutlineFavorite
            onClick={() => unlikeTheStory()}
             size={20} color="var(--like-icon)"/>
          )
        }
      }
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
<span>
{ likedBefore ? 
<span style={{cursor : "pointer"}}>
{renderUnLikeButton()}&nbsp;{formatNumber(totalLikes)}
</span>
: 
<span style={{cursor : "pointer"}}>
{renderLikeButton()}&nbsp;{formatNumber(totalLikes)}
</span>
}

&nbsp;likes</span>
   
    </div>
    </>

  )
}

export default StoryAuthor
