
import { FaAngleDown } from "react-icons/fa"
import FeedAvatar from "./FeedAvatar"
import TrendingCard from "./TrendingCard"
import useImageLoad from "../../hooks/useImageLoaded"
import { useState } from "react"
const FeedTrendingStories = () => {
    const [numberOfTrendingStories, setNumberOfTrendingStories] = useState(2)
const showMore = () => {
    if(numberOfTrendingStories <= 5){
        setNumberOfTrendingStories(numberOfTrendingStories + 1)
    }
}
const showLess = () => {
    if(numberOfTrendingStories > 1){
        setNumberOfTrendingStories(numberOfTrendingStories - 1)
    }
}
    const trendingData = [
        {
category : "adventure",
date : "2 months",
title : "The pros and cons of the new iPhone - Tips and tricks",
image : "https://c4.wallpaperflare.com/wallpaper/591/844/1024/spider-man-spider-video-games-superhero-wallpaper-preview.jpg",
avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"
        },
        {
category : "fiction",
date : "2 months",
title : "The pros and cons of the new iPhone - Tips and tricks",
image : "https://res.cloudinary.com/dxbrs5gvb/image/upload/v1729853244/Story/nextverse74%40gmail.com/txpt4p3kcvn0kknlnd6e.jpg",
avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"
        },
        {
            category : "fiction",
            date : "2 months",
            title : "The pros and cons of the new iPhone - Tips and tricks",
            image : "https://res.cloudinary.com/dxbrs5gvb/image/upload/v1729853244/Story/nextverse74%40gmail.com/txpt4p3kcvn0kknlnd6e.jpg",
            avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"
                    },
                    {
                        category : "fiction",
                        date : "2 months",
                        title : "The pros and cons of the new iPhone - Tips and tricks",
                        image : "https://res.cloudinary.com/dxbrs5gvb/image/upload/v1729853244/Story/nextverse74%40gmail.com/txpt4p3kcvn0kknlnd6e.jpg",
                        avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"
                                },
                                {
                                    category : "fiction",
                                    date : "2 months",
                                    title : "The pros and cons of the new iPhone - Tips and tricks",
                                    image : "https://res.cloudinary.com/dxbrs5gvb/image/upload/v1729853244/Story/nextverse74%40gmail.com/txpt4p3kcvn0kknlnd6e.jpg",
                                    avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"
                                            }
    ]
  return (
    <section>
    <div style={{marginTop  : "30px"}}>
        <h3><b>Trending Stories</b></h3>
        {trendingData.slice(0, numberOfTrendingStories).map((content, index) => (
<TrendingCard key={index} trending={content}/>
        ))}
            </div>
            <div className="feed-trendy-story-image"></div>
            { numberOfTrendingStories < 5  ? <div className="feed-first" onClick={showMore}>Show more <FaAngleDown /></div>
             : <div className="feed-first" onClick={showLess}>Show Less <FaAngleDown /></div>}
    </section>
  )
}

export default FeedTrendingStories