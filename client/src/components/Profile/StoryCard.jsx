import {  useEffect, useState } from "react";
import ContextMenu from "../common/ContextMenu";
import { FaShareAlt } from "react-icons/fa";
import { FaEllipsisH,  FaBookmark } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import useImageLoad from "../../hooks/useImageLoaded";

const StoryCard = ({ fireClick, story}) => {
  const [loading, setLoading] = useState(true)
  
  const { loaded, error } = useImageLoad(story.image);
  useEffect(() => {
    if (error) {
      console.log("failed to load images")
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])

  return (
 <> {

  loading ? 
    <div className="litenote-profile-story-card">
            <div className="litenote-profile-story-card-inner">
              <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>
              <div className="litenote-profile-story-content">
                <h4 className="litenote-profile-story-title skeleton-title">&nbsp;</h4>
                <p className="litenote-profile-story-category skeleton-subtitle">&nbsp;</p>
                <FaEllipsisH  className="litenote-profile-read-more-share skeleton-options"
                  onClick={fireClick}/>
              
                <a  className="litenote-profile-read-more skeleton-button">&nbsp;</a>
             
              </div>
            </div>
          </div>  
   :
          <div className="litenote-profile-story-card">
            <div className="litenote-profile-story-card-inner">
              <div className="litenote-profile-story-image">
                <img src={story.image} alt="Story Image" />
              </div>
              
              <div className="litenote-profile-story-content">
             
               <div className="story-card-user-info">
               
               <img className="story-card-avatar" src={story.avatar} /><span>Gideon Babalola</span>
             
               </div>
               <FaEllipsisH  className="litenote-profile-read-more-share" style={{position : "relative", bottom : "30px"}}onClick={fireClick}/>
              
               
                <h4 className="litenote-profile-story-title">{story.title}</h4>
                <p className="litenote-profile-story-category">{story.category}</p>
                <div className="story-card-bottom-info">
               <span>{story.date}</span><span>5 min read</span>
               </div>
               
            
             
              </div>
            </div>
          </div>
        
 }
 </>
  )
}

export default StoryCard