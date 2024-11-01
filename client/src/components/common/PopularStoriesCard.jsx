import {  useEffect, useState } from "react";
import ContextMenu from "../common/ContextMenu";
import { FaShareAlt } from "react-icons/fa";
import { FaEllipsisH,  FaBookmark } from "react-icons/fa";
import { usePopularStoriesContext } from "../../hooks/usePopularStoriesContext"
import { FaMedal } from "react-icons/fa";
import goldMedal from "../../assets/gold-medal.png"
import { FaTimes } from "react-icons/fa";
import useImageLoad from "../../hooks/useImageLoaded";

const PopularStoriesCard = ({ fireClick, story, isLoading}) => {
  const { popularStories } = usePopularStoriesContext()
  const position = popularStories.indexOf(story)
  console.log(isLoading)
  console.log("gidiboy")
  const [loading, setLoading] = useState(true)
  
  const { loaded, error } = useImageLoad(story.picture);
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

  isLoading ? 
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
              { loading ?
                <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>:
              <div className="litenote-profile-story-image">
                <img src={story.picture} alt="Story Image" />
              </div>
              }
              
              <div className="litenote-profile-story-content">
             
               <div className="story-card-user-info">
               
               <img className="story-card-avatar" src={story.avatar} /><span>Gideon Babalola</span>
             
               </div>

               <FaEllipsisH  className="litenote-profile-read-more-share" style={{position : "relative", bottom : "30px"}}onClick={fireClick}/>
               <h4 className="litenote-profile-story-title">{story.title}</h4>
           
             {/* <h4 className="litenote-profile-story-title">{story.title}</h4> */}
    
              
                
              
                <div style={{display : "flex", flexDirection  : "row", justifyContent : "space-between"}}>
              <p className="litenote-profile-story-category">{story.category}</p>
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