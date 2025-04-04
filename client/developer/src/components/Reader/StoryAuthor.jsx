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
  viewsNumber,
  storyId,
  likes,
  setLikesNumber,
  totalLikes,
  setTotalLikes,
  setLikes,
  liking,
  setLiking,
  unLiking,
  setUnLiking,
  likedBefore,
  setLikedBefore,
  likeStory,
  unlikeStory
}) => {
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
  const likeTheStory = () => {
    console.log("clicked like")
    setLiking(true)
    setLikedBefore(false)
    setTotalLikes(totalLikes + 1)
    setLikesNumber(totalLikes + 1)
    setLikes((prev) => {
      const newLike = [
        {
        likedBy : {
          _id : user["_id"],
          username : user["username"],
          picture : user["picture"],
          bio : user["bio"]
        },
        _id : null
      }
    ]
      return [...newLike, ...prev]
    })
    likeStory.likeAStory(storyId)
  }
  const unlikeTheStory = () => {
    console.log("clicked unlike")
    setUnLiking(true)
    setLikedBefore(true)
    setTotalLikes(totalLikes - 1)
    setLikesNumber(totalLikes - 1)
    const newLikes = likes.filter((like) => like.likedBy._id.toString() !== user["_id"].toString())
    setLikes(newLikes)
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
}
if( likeStory.error !== null){
setLikesNumber(totalLikes - 1)
setTotalLikes(totalLikes - 1)
const newLikes = likes.filter((like) => like.likedBy._id.toString() !== user["_id"].toString())
setLikes(newLikes)
}
  }, [likeStory.data, likeStory.error])
  useEffect(() => {
    if(Object.keys(unlikeStory.data).length  > 0){
      console.log(likes, user["_id"])
      setLikedBefore(true)
      setUnLiking(false)
    }
    if( unlikeStory.error !== null){
      setLikesNumber(totalLikes + 1)
      setTotalLikes(totalLikes + 1)
      setLikes((prev) => {
        const newLike = [
          {
          likedBy : {
            _id : user["_id"],
            username : user["username"],
            picture : user["picture"],
            bio : user["bio"]
          }
        }
      ]
        return [...newLike, ...prev]
      })
    }
      }, [unlikeStory.data, unlikeStory.error, likes, totalLikes, user])
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
  <button 
  className="story-follow-button"
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
<span> <MdOutlineVisibility size={20}/>&nbsp;{formatNumber(viewsNumber)}&nbsp;views</span>
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
