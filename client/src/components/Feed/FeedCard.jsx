import {  useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import useNavigateProfile from "../../hooks/useNavigateProfile";
import useNavigateStory from "../../hooks/useNavigateStory";
import useMultipleImageLoad from "../../hooks/useMultipleImageLoaded";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { getMonthNumber } from "../../helpers/getMonthNumber";
import useWindowSize from "../../hooks/useWindowSize";
import { formatNumber } from "../../helpers/formatNumber";
import { useLikeAStory } from "../../hooks/useLikeAStory";
import { useUnLikeAStory } from "../../hooks/useUnlikeAStory";
import { getStoryUrl } from "../../helpers/getStoryUrl";
import { MdVisibility,
   MdOutlineFavoriteBorder,
  MdOutlineVisibility,
  MdOutlineFavorite
} from "react-icons/md";

const FeedCard = ({ fireClick, story, isLoading, view}) => {
  const likeStory = useLikeAStory();
  const unlikeStory = useUnLikeAStory();
  const navigateToStory = useNavigateStory(); 
  const navigateToProfile = useNavigateProfile()
  const { width } = useWindowSize();
  const [pictureLoading, setPictureLoading] = useState(true);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [liking, setLiking]  = useState(false)
  const [unLiking, setUnLiking] = useState(false)
  const [likesCount, setLikesCount] = useState(story.totalLikes)
  const [likedBefore, setLikedBefore] = useState(story.isLiked)
  let storyPicture = ""
  if(isLoading === false){
    //  storyPicture = story.picture[Math.round(Math.random())]
    storyPicture = story.picture[0]
  }

  const imageStatus = useMultipleImageLoad(storyPicture, story.avatar)
  useEffect(() => {
    if (!imageStatus) return; // Ensures imageStatus is defined
  
    imageStatus.forEach(({ url, loaded, error }) => {
      if (url === storyPicture) {
        if (loaded) {
          setPictureLoading(false);
        }
        if (error) {
          setPictureLoading(true)
        }
      } else if (url === story.avatar) {
        if (loaded) {
          setAvatarLoading(false);
        }
        if (error) {
          setAvatarLoading(true)

        }
      }
    });
  }, [imageStatus, story.picture, story.avatar]); // Triggers every time imageStatus changes
  const likeTheStory = () => {
    setLiking(true)
    setLikedBefore(false)
    setLikesCount(likesCount + 1)
    likeStory.likeAStory(story._id)
  }
  const unlikeTheStory = () => {
    setUnLiking(true)
    setLikedBefore(false)
    setLikesCount(likesCount - 1)
    unlikeStory.unlikeAStory(story._id)
  }
  useEffect(() => {
    if(Object.keys(likeStory.data).length  > 0){
      setLikedBefore(false)
      setLiking(false)
    }
    if( likeStory.error !== null){
      setLikesCount(likesCount - 1)
      }
      }, [likeStory.data, likeStory.error])
      useEffect(() => {
        if(Object.keys(unlikeStory.data).length  > 0){
          setLikedBefore(true)
          setUnLiking(false)
      
        }
        if( unlikeStory.error !== null){
          setLikesCount(likesCount + 1)
          }
          }, [unlikeStory.data, unlikeStory.error])
  const renderLikeButton = () => {
    if (Object.keys(likeStory.data).length == 0 && !liking && !likedBefore){
      return (

        <MdOutlineFavoriteBorder 
        onClick={() => likeTheStory()}
        size={20} color="var(--like-icon)"  />
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
         size={20} color="var(--like-icon)"/>
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
        size={20} color="var(--like-icon)"/>

     
  
      )
    }
    if (!unLiking && Object.keys(unlikeStory.data).length > 0 && likedBefore){
      return(
        
      <MdOutlineFavoriteBorder 
         onClick={() => likeTheStory()}
        size={20} color="var(--like-icon)"/>

      
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
 {
  view == "grid" ?
<>
{
  isLoading ? 
  <div className="litenote-profile-story-card">
            <div className="litenote-profile-story-card-inner">
              <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>
              <div className="litenote-profile-story-content">
              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems  : "center", gap : "10px"}}>
 <div className="skeleton-story-avatar " style={{marginBottom : "10px"}}>&nbsp;</div><h4 className="litenote-profile-story-title skeleton-title">&nbsp;</h4>
              </div>
               
              <h4 className="litenote-profile-story-title skeleton-title">&nbsp;</h4>
                <FaEllipsisH  className="litenote-profile-read-more-share skeleton-options"
                  />
              
                <a  className=" skeleton-button">&nbsp;</a>
             
              </div>
            </div>
          </div>  
   :
          <div className="litenote-profile-story-card">
            <div className="litenote-profile-story-card-inner">
            <div onClick={() => { navigateToStory(story)}}  >
            { pictureLoading ?
                <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>:
              <div className="litenote-profile-story-image">
                <img src={storyPicture} alt="Story Image" />
              </div>
              }
            </div>
          
              
              <div className="litenote-profile-story-content">
             
               <div className="story-card-user-info">
               { avatarLoading ?  <span className="skeleton-story-avatar story-card-avatar"
               style={{alignSelf  :"center"}}
               >&nbsp;</span>
              : <img className="story-card-avatar" src={story.avatar} />
               }
               <span onClick={() => { navigateToProfile(story.author)}} >{story.author}</span>
               </div>

               <div className="litenote-profile-read-more-share" style={{position : "relative", bottom : "30px", display : "flex", gap : "10px", alignItems :"center"}} >
               <div style={{color : "White", display : "flex", flexDirection : "row", gap : "5px"}}>
               <span> <MdOutlineVisibility 
               color="var(--visibility-icon)"
               size={20} />&nbsp;
               <span style={{color : "var(--action-icons-text)"}}>{formatNumber(story.totalViews)}</span>
               </span>
<span>&nbsp;
 {
  likedBefore ?  
  <span style={{cursor : "pointer"}}>
{renderUnLikeButton()}
</span>
  :
  <span style={{cursor : "pointer"}}>
{renderLikeButton()}
</span>
 }
 <span  style={{color : "var(--action-icons-text)"}}> {formatNumber(likesCount)}</span>
</span>
               </div>

               <FaEllipsisH  
                 onClick={(e) => fireClick(e, getStoryUrl(story))}
               />
               </div>
              
               
                <h4 className="litenote-profile-story-title">{story.title}</h4>
                <div className="story-card-bottom-info">
               <span className="litenote-profile-story-category">{story.category.charAt(0).toUpperCase() + story.category.slice(1)}</span><span>{story["estimatedReadingTime"]["minutes"] == 0 ? `${story["estimatedReadingTime"]["seconds"]} seconds read` : `${story["estimatedReadingTime"]["minutes"]} minutes read`  }</span>
               </div>
              </div>
            </div>
          </div>
 }
</>
:
<>
        {isLoading ? 
        <div>
          <div className="feed-list-view-card">
<section className="list-view-card-first-section">
    <div className="list-view-card-profile-section">
    <span style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "4px"}}>
    {/* <img src={content.avatar}></img> */}
    <div className="feed-loaders feed-loaders-avatar"></div>
    <div style={{display :"flex", flexDirection : "column", justifyContent : "space-between", gap : "5px"}}>
<span className="feed-loaders feed-loaders-name"><b></b></span>
<span className="feed-loaders feed-loaders-bio"></span>
    </div>


    </span>
    </div>
    <div className="list-view-card-story-section">
<h3 className="feed-loaders feed-loaders-title"></h3>
<h3 className="feed-loaders feed-loaders-first"></h3>
<h3 className="feed-loaders feed-loaders-second"></h3>
    </div>
    { width > 768 && <div style={{display :"flex", flexDirection : "row",
    
    justifyContent: "space-between",
    paddingTop : "35px"
    }}>
    <span style={{display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    gap  : "20px",
    color : "#777777"
    }}>
    <span className="feed-loaders feed-loaders-date"></span>
    <span className="feed-loaders feed-loaders-date"></span>
   
     </span>
    <span style={{display : "flex",
    alignItems : "center",
    justifyContent : "space-between",
    gap : "20px"
    }}>
    <span><MdVisibility 
        color=" white"
        size={20}/></span>
     <span>
     <MdOutlineFavoriteBorder size={20}
        color="#E0245E" /> 
     </span>
        
       
        </span>
    </div>}
</section>






















<section
className="list-view-card-second-section"
>
<div className="feed-loaders feed-loaders-picture"></div>

</section>
</div>
{ width < 768 &&
  <div style={{display :"flex", flexDirection : "row",
    
    justifyContent: "space-between",
    paddingTop : "5px"
    }}>
    <span style={{display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    gap  : "20px",
    color : "#777777"
    }}>
 <span className="feed-loaders feed-loaders-date"></span>
 <span className="feed-loaders feed-loaders-date"></span>
     </span>
    <span style={{display : "flex",
    alignItems : "center",
    justifyContent : "space-between",
    gap : "20px"
    }}>
    <span><MdVisibility 
        color=" white"
        size={20}/></span>
     <span>
     <MdOutlineFavoriteBorder size={20}
        color="#E0245E" />
     </span>
       
        </span>
    </div>
}
</div>
         : 
         <div>
          <div className="feed-list-view-card"
          
          >
<section className="list-view-card-first-section" >
    <div className="list-view-card-profile-section">
    <span style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "4px"}}>
    { avatarLoading ? <div className="feed-loaders feed-loaders-avatar"></div>
:
    <img src={story.avatar}></img>
    }
    <div style={{display :"flex", flexDirection : "column", justifyContent : "space-around"}}>
<span><b>{story.author}</b></span>
<span>Blogger</span>
    </div>


    </span>
    </div>
    <div className="list-view-card-story-section">
{ width < 768 ? <h6>
<b>
{story.title}
</b>
</h6> : <h3>{story.title}</h3>} 
<span onClick={() => { navigateToStory(story)}} style={{cursor : "pointer"}} >
{story.content.slice(0, width < 768 ? 70 : 200)  + "..." }
</span>
    </div>
    { width > 768 && <div style={{display :"flex", flexDirection : "row",
    
    justifyContent: "space-between",
    paddingTop : "35px"
    }}>
    <span style={{display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    gap  : "20px",
    color : "#777777"
    }}>
    <span>
{  
  formatDistanceToNow(new Date(story.date.year, getMonthNumber(`${story.date.month.toLowerCase()}`),
   story.date.day), { addSuffix: true })
   }</span>
<span>{story["estimatedReadingTime"]["minutes"] == 0 ? `${story["estimatedReadingTime"]["seconds"]} seconds read` : `${story["estimatedReadingTime"]["minutes"]} minutes read`  }</span>
    <span style={{cursor :"pointer"}}><FaEllipsisH  
      onClick={(e) => fireClick(e, getStoryUrl(story))}
    /></span>
    
     </span>
    <span style={{display : "flex",
    alignItems : "center",
    justifyContent : "space-between",
    gap : "10px"
    }}>
    <span><MdVisibility 
        color="var(--visibility-icon)"
        size={20}/>&nbsp;
        <span  style={{color : "var(--action-icons-text)"}}>
        {formatNumber(story.totalViews)}
        
        </span>
        </span>
     <span>
        
        {likedBefore ?  
  <span style={{cursor : "pointer"}}>
{renderUnLikeButton()}
</span>
  :
  <span style={{cursor : "pointer"}}>
{renderLikeButton()}
</span>
 }&nbsp;
        <span style={{color : "var(--action-icons-text)"}}>
        {formatNumber(likesCount)}
        </span>
      
     </span>
      
        
       
        </span>
    </div>}
</section>
<section
className="list-view-card-second-section"
>

{
  pictureLoading ? 
<div className="feed-loaders feed-loaders-picture">
</div> 
:
  <img
  onClick={() => { navigateToStory(story)}}  
  style={{cursor : "pointer"}}
src={storyPicture}
>

</img>
}

</section>

</div>
{ width < 768 &&
  <div style={{display :"flex", flexDirection : "row",
    gap : "70px",
    paddingTop : "5px"
    }}>
    <span style={{display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    gap  : "20px",
    color : "#777777"
    }}>
    
    <span>
{  
  formatDistanceToNow(new Date(2024, getMonthNumber(`${story.date.month.toLowerCase()}`),
   story.date.day), { addSuffix: true })
   }</span>
   <span>{story["estimatedReadingTime"]["minutes"] == 0 ? `${story["estimatedReadingTime"]["seconds"]} seconds read` : `${story["estimatedReadingTime"]["minutes"]} minutes read`  }</span>
    <span style={{cursor :"pointer"}}><FaEllipsisH 
    onClick={(e) => fireClick(e, getStoryUrl(story))}
    /></span>
    
     </span>
    <span style={{display : "flex",
    alignItems : "center",
    justifyContent : "space-between",
    gap : "10px"
    }}>
    <span><MdVisibility 
        color="var(--visibility-icon)"
        size={20}/>&nbsp;
        <span  style={{color : "var(--action-icons-text)"}}>
        {formatNumber(story.totalViews)}
        </span>
        

        </span>
     <span>
          {likedBefore ?  
  <span style={{cursor : "pointer"}}>
{renderUnLikeButton()}
</span>
  :
  <span style={{cursor : "pointer"}}>
{renderLikeButton()}
</span>
 }
        &nbsp;
        <span  style={{color : "var(--action-icons-text)"}}>
        {formatNumber(likesCount)}
        </span>
        
     </span>
        
       
        </span>
    </div>
}
</div>

        }
      </>
 }

        
 
 </>
  )
}

export default FeedCard