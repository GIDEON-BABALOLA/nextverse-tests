import {  MdOutlineFavoriteBorder, MdVisibility} from "react-icons/md"
import { FaEllipsisH } from "react-icons/fa"
import { useEffect, useState } from "react"
import useImageLoad from "../../../hooks/useImageLoaded"
const FeedCard = ({ content }) => {
  const [loading, setLoading] = useState(true)
  
  const { loaded, error } = useImageLoad(content.image);
  useEffect(() => {
    if (error) {
      console.log("failed to load images")
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  return (
    <>
    {!loading ?  
    
    
      <div className="litenote-profile-story-card" style={{background : "var(--feed-card-background)"}}>
            <div className="litenote-profile-story-card-inner">
              <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>
              <div className="litenote-profile-story-content">
                <h4 className="litenote-profile-story-title skeleton-title">&nbsp;</h4>
                <p className="litenote-profile-story-category skeleton-subtitle">&nbsp;</p>
                <FaEllipsisH  className="litenote-profile-read-more-share skeleton-options"  />
              
                <a  className="litenote-profile-read-more skeleton-button">&nbsp;</a>
             
              </div>
            </div>
          </div>  
     : 
      <div className="feed-card"> 
    {/* <div className="feed-card-image"> */}
        <img src={content.image}
        className="feed-card-image"
        ></img>
    {/* </div> */}
    <div className="feed-card-content">
    <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
        <div className="feed-card-tag">{content.category}</div>
        
       <span style={{display : "flex", gap : "15px", alignItems : "center"}}>
        
            <span style={{alignItems : "center"}}>
        <MdOutlineFavoriteBorder/> 20
        </span>
        <span style={{alignItems : "center"}}>
        <MdVisibility /> 30
        </span>
        <FaEllipsisH />
        </span>
        
        </div>
        <div className="feed-card-title" style={{marginBottom : "0px"}}>The Impact of Technology on the Workplace: How Technology is Changing</div>
        
        <div className="feed-card-meta">
            {/* <span>3 min read</span> */}
            <span>
            <img src={content.avatar} alt="Author" />
            <span>{content.author}</span>
            </span>
            <span>{content.date}</span>
            <span style={{color : "#777777"}}>{content.time}</span>
        </div>
        
    </div>
</div>

}

    </>
 
  )
}

export default FeedCard