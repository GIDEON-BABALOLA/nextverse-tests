import {  useEffect, useState } from "react";
import ContextMenu from "../common/ContextMenu";
import { FaShareAlt } from "react-icons/fa";
import { FaEllipsisH,  FaBookmark } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import useImageLoad from "../../hooks/useImageLoaded";
import useMultipleImageLoad from "../../hooks/useMultipleImageLoaded";

const StoryCard = ({ fireClick, story, isLoading}) => {
  const [pictureLoading, setPictureLoading] = useState(true);
  const [avatarLoading, setAvatarLoading] = useState(true);
 const storyPicture = story.picture[Math.round(Math.random())]
  const imageStatus = useMultipleImageLoad(storyPicture, story.avatar)
  useEffect(() => {
    if (!imageStatus) return; // Ensures imageStatus is defined
  
    imageStatus.forEach(({ url, loaded, error }) => {
      if (url === storyPicture) {
        if (loaded) {
          console.log("Picture loaded successfully");
          setPictureLoading(false);
        }
        if (error) {
          setPictureLoading(true)
          console.log("Failed to load picture image");
        }
      } else if (url === story.avatar) {
        console.log(loaded, error, url, "avatar");
        if (loaded) {
          console.log("Avatar loaded successfully");
          setAvatarLoading(false);
        }
        if (error) {
          setAvatarLoading(true)
          console.log("Failed to load avatar image");
        }
      }
    });
  }, [imageStatus, story.picture, story.avatar]); // Triggers every time imageStatus changes
  // const { loaded, error } = useImageLoad(story.image);
  // useEffect(() => {
  //   if (error) {
  //     console.log("failed to load images")
  //   }
  
  //   if (loaded === true) {
  //   setLoading(false)
  //   }
  // }, [loaded, error])

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
                  onClick={fireClick}/>
              
                <a  className=" skeleton-button">&nbsp;</a>
             
              </div>
            </div>
          </div>  
   :
          <div className="litenote-profile-story-card">
            <div className="litenote-profile-story-card-inner">
            { pictureLoading ?
                <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>:
              <div className="litenote-profile-story-image">
                <img src={storyPicture} alt="Story Image" />
              </div>
              }
              
              <div className="litenote-profile-story-content">
             
               <div className="story-card-user-info">
               { avatarLoading ?  <span className="skeleton-story-avatar story-card-avatar"
               style={{alignSelf  :"center"}}
               >&nbsp;</span>
              : <img className="story-card-avatar" src={story.avatar} />
               }
               <span>Gideon Babalola</span>
             
               </div>
               <FaEllipsisH  className="litenote-profile-read-more-share" style={{position : "relative", bottom : "30px"}}onClick={fireClick}/>
              
               
                <h4 className="litenote-profile-story-title">{story.title}</h4>
                <div className="story-card-bottom-info">
               <span className="litenote-profile-story-category">{story.category.charAt(0).toUpperCase() + story.category.slice(1)}</span><span>{story["estimatedReadingTime"]["minutes"] == 0 ? `${story["estimatedReadingTime"]["seconds"]} seconds read` : `${story["estimatedReadingTime"]["minutes"]} minutes read`  }</span>
               </div>
              </div>
            </div>
          </div>
        
 }
 </>
  )
}

export default StoryCard