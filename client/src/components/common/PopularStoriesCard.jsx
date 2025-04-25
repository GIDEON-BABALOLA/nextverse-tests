import {  useEffect, useState } from "react";
import { FaEllipsisH} from "react-icons/fa";
import { usePopularStoriesContext } from "../../hooks/usePopularStoriesContext"
import { FaMedal } from "react-icons/fa";
import useMultipleImageLoad from "../../hooks/useMultipleImageLoaded";
import useNavigateStory from "../../hooks/useNavigateStory";
import useNavigateProfile from "../../hooks/useNavigateProfile";
import { getStoryUrl } from "../../helpers/getStoryUrl";
const PopularStoriesCard = ({ fireClick, story, isLoading, setCurrentStoryDetails}) => {
  console.log(story)
  const { popularStories } = usePopularStoriesContext()
  const navigateToStory = useNavigateStory();
  const navigateToProfile = useNavigateProfile();
  const position = popularStories.indexOf(story)
  const [pictureLoading, setPictureLoading] = useState(true);
  const [avatarLoading, setAvatarLoading] = useState(true);
  let storyPicture = ""
  let storyAvatar = ""
  if(isLoading === false){
    storyPicture = story.picture.url
    storyAvatar = story.userId.picture
  }
  const imageStatus = useMultipleImageLoad(storyPicture, storyAvatar, popularStories);
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
      } else if (url === storyAvatar) {
        if (loaded) {
          setAvatarLoading(false);
        }
        if (error) {
          setAvatarLoading(true)
        }
      }
    });
  }, [imageStatus, storyAvatar, storyPicture, popularStories]); 
  
  // Triggers every time imageStatus changes
  const showMyModal = (e) => {
    setCurrentStoryDetails({ isLiked : story.isLiked, isBookmarked : story.isBookmarked})
    fireClick(e, getStoryUrl(story), story._id)
  }
  return (
 <> {

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
                  onClick={fireClick}
             
                  />
              
                <a  className=" skeleton-button">&nbsp;</a>
             
              </div>
            </div>
          </div>  
   :
          <div className="litenote-profile-story-card">
            <div className="litenote-profile-story-card-inner">
            <div onClick={() => { navigateToStory(story)}}>
            { pictureLoading ?
                <div className="litenote-profile-story-image" >
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
              : <img className="story-card-avatar" src={storyAvatar} />
               }
               <span onClick={() => {navigateToProfile(story.userId.username)}}>{story.userId.username}</span>
               </div>

               <FaEllipsisH
                    size={15}
               className="litenote-profile-read-more-share" style={{position : "relative", bottom : "30px"}}
                  onClick={(e) => showMyModal(e)}  
               />
               <h4 className="litenote-profile-story-title">{story.title}</h4>
           
             {/* <h4 className="litenote-profile-story-title">{story.title}</h4> */}
    
              
                
              
                <div style={{display : "flex", flexDirection  : "row", justifyContent : "space-between"}}>
              <p className="litenote-profile-story-category">{story.category.charAt(0).toUpperCase() + story.category.slice(1)}</p>
             { position == 0 ? <FaMedal color={"#FFD700"} size={20}/>
               : position == 1 ? <FaMedal color={"#C0C0C0"} size={20}/>
              : <FaMedal color={"#CD7F32"} size={20}/>
           }
             </div>
                <div className="story-card-bottom-info">
               {/* <span>{story.date}</span><span>5 min read</span> */}
               </div>
               
            
             
              </div>
            </div>
          </div>
        
 }
 </>
  )
}

export default PopularStoriesCard