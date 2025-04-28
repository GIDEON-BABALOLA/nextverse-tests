import FeedAvatar from "./FeedAvatar"
import { useState, useEffect } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { getMonthNumber } from "../../helpers/getMonthNumber";
import useNavigateStory from "../../hooks/useNavigateStory";
import { derivePlainTextFromHtml } from "../../helpers/derivePlainTextFromHtml";
import { useRef } from "react";
const TrendingCard = ({ trending, isLoading }) => {
  console.log(trending)
  const navigateToStory = useNavigateStory();
  const trendingContentRef = useRef();
    const [pictureLoading, setPictureLoading] = useState(true)
    let storyPicture = ""
    if(isLoading === false){
      storyPicture = trending.picture.url
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
      // const derivePlainTextFromHtml = (html) => {
      //   const tag = document.createElement("div")
      //   tag.innerHTML = html;
      //   return tag.innerText
      // }
      useEffect(() => {
if(trending.content){
  const derived = derivePlainTextFromHtml(trending.content)
trendingContentRef.current.innerText = derived.slice(0, 60) + "..."
}
      }, [trending])
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
           image={trending.userId.picture}
           alt="Author"
           className="feed-profile-images-trending" 
           />
           </div> 
               <div><b>Trending in {trending.category}</b> <span style={{color : ""}}> - &nbsp;
<span>
{  
  formatDistanceToNow(trending.createdAt, { addSuffix: true })

   }</span>
               {/* {trending.date} */}
               
               </span></div>
               </section>
                   <div>
                   <b>{trending.title}</b></div>
                   <p ref={trendingContentRef}></p>
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