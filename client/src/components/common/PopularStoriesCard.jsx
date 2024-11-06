import {  useEffect, useState } from "react";
import ContextMenu from "../common/ContextMenu";
import { FaShareAlt } from "react-icons/fa";
import { FaEllipsisH,  FaBookmark } from "react-icons/fa";
import { usePopularStoriesContext } from "../../hooks/usePopularStoriesContext"
import { FaMedal } from "react-icons/fa";
import goldMedal from "../../assets/gold-medal.png"
import { FaTimes } from "react-icons/fa";
import useImageLoad from "../../hooks/useImageLoaded";
import useMultipleImageLoad from "../../hooks/useMultipleImageLoaded";

const PopularStoriesCard = ({ fireClick, story, isLoading}) => {
  const { popularStories } = usePopularStoriesContext()
  const position = popularStories.indexOf(story)
  const [pictureLoading, setPictureLoading] = useState(true);
  const [avatarLoading, setAvatarLoading] = useState(true);

  const imageStatus = useMultipleImageLoad([story.picture, story.avatar]);
  useEffect(() => {
    imageStatus.map(({url, loaded, error}) => {
      switch (url) {
        case story.picture:
          console.log(loaded, url, error, "picture")
          if(loaded == true){
            setPictureLoading(false)
          }
          if(error){
            console.log("failed to load picture image")
          }
          break;
          case story.avatar:
            console.log(loaded, url, error, "avatar")
            if(loaded == true){
              setAvatarLoading(false)
            }
            if(error){
              console.log("failed to load avatar image")
            }
          break;
      }
        } )
  }, [imageStatus, story.picture, story.avatar])












  
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
                <img src={story.picture} alt="Story Image" />
              </div>
              }
              
              <div className="litenote-profile-story-content">
             
               <div className="story-card-user-info">
               { avatarLoading ?  <span className="skeleton-story-avatar story-card-avatar"
               style={{alignSelf  :"center"}}
               >&nbsp;</span>
              : <img className="story-card-avatar" src={story.avatar} />
               }
               <span>{story.author}</span>
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