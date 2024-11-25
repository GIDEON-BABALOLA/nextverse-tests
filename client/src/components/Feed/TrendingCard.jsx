import FeedAvatar from "./FeedAvatar"
import { useState, useEffect } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
const TrendingCard = ({ trending }) => {
    const [pictureLoading, setPictureLoading] = useState(true)
    const { loaded, error } = useImageLoad(trending.image);
    useEffect(() => {
        if (error) {
            setPictureLoading(true)
          console.log("failed to load images")
        }
      
        if (loaded === true) {
        setPictureLoading(false)
        }
      }, [loaded, error])
  return (
    <div className="feed-trendy-story">
               
    <div>
    <section style={{display : "flex", flexDirection : "row", alignItems : "center", marginBottom  :"5px", gap : "3px"}}>
       <div>

        <FeedAvatar
image={trending.avatar}
alt="Author"
className="feed-profile-images-trending" 
/>
</div> 
    <div><b>Trending in {trending.category}</b> <span style={{color : ""}}>- {trending.date}</span></div>
    </section>
        <div>
        <b>{trending.title}</b></div>
    </div>

    
{
  pictureLoading ? 
<div className="feed-loaders feed-loaders-trending-picture">
</div> 
:
  <img
src={trending.image}
className="story-picture-trending"
>

</img>
}
</div>
  )
}

export default TrendingCard