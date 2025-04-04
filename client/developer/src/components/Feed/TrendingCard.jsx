import FeedAvatar from "./FeedAvatar"
import { useState, useEffect } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { getMonthNumber } from "../../helpers/getMonthNumber";
import useNavigateStory from "../../hooks/useNavigateStory";
const TrendingCard = ({ trending, isLoading }) => {
  const navigateToStory = useNavigateStory();
    const [pictureLoading, setPictureLoading] = useState(true)
    let storyPicture = ""
    if(isLoading === false){
      storyPicture = trending.picture
    }
  
    const { loaded, error } = useImageLoad(storyPicture);
    useEffect(() => {
        if (error) {
            setPictureLoading(true)
        }
      
        if (loaded === true) {
        setPictureLoading(false)
        }
      }, [loaded, error, trending.picture])
  return (
    <>
      {
        isLoading ? <div style={{display :"flex", flexDirection : "row", alignItems : "center",
        justifyContent : "space-between", padding : "10px 0px"
        }}>
        <div className="">
        <div style={{display : "flex", flexDirection : "column", gap : "5px"}}>
        <div className="feed-loaders feed-loaders-trending-title"></div>
        <div className="feed-loaders feed-loaders-trending-title"></div>
        <div className="feed-loaders feed-loaders-trending-continuation"></div>
        </div>
     
        </div>
        <div className="feed-loaders feed-loaders-trending-picture">

        </div>
        </div>
        : 
        <div className="feed-trendy-story" onClick={() => { navigateToStory(trending)}}   >
               
               <div>
               <section style={{display : "flex", flexDirection : "row", alignItems : "center", marginBottom  :"5px", gap : "3px"}}>
                  <div>
           
                   <FeedAvatar
           image={trending.avatar}
           alt="Author"
           className="feed-profile-images-trending" 
           />
           </div> 
               <div><b>Trending in {trending.category}</b> <span style={{color : ""}}> - &nbsp;
<span>
{  
  formatDistanceToNow(new Date(2024, getMonthNumber(`${trending.date.month.toLowerCase()}`),
   trending.date.day), { addSuffix: true })

   }</span>
               {/* {trending.date} */}
               
               </span></div>
               </section>
                   <div>
                   <b>{trending.title}</b></div>
                   <p>{trending.content.slice(0, 60)}...</p>
               </div>
           
               
           {
             pictureLoading ? 
           <div className="feed-loaders feed-loaders-trending-picture">
           </div> 
           :
             <img
           src={storyPicture}
           className="story-picture-trending"
           >
           
           </img>
           }
           </div>
      }
    </>

  )
}

export default TrendingCard