
import { FaAngleDown } from "react-icons/fa"
import FeedAvatar from "./FeedAvatar"
import TrendingCard from "./TrendingCard"
import { useEffect } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
import { useGetPopularStories } from "../../hooks/useGetPopularStories"
import { useState } from "react"
const FeedTrendingStories = () => {
    const { getPopularStories, isLoading, error, data, statusCode } = useGetPopularStories()
    const [loadingData, setLoadingData] = useState([{}, {}])
    useEffect(() => {
        console.log("how")
        getPopularStories("all", 4)
    }, [])
    useEffect(() => {
if(data.length > 0){
    console.log(data)
}
    }, [data])
    const [numberOfTrendingStories, setNumberOfTrendingStories] = useState(2)
const showMore = () => {
    setNumberOfTrendingStories(4)
}
const showLess = () => {
    setNumberOfTrendingStories(2)
}
  return (
    <section>
    <div style={{marginTop  : "30px"}}>
        <h3><b>Trending Stories</b></h3>
  
          { !isLoading && data.slice(0, numberOfTrendingStories).map((content, index) => (
<TrendingCard key={index} trending={content} isLoading={isLoading}/>
        ))}
        {  isLoading && loadingData.map((content, index) => (
<TrendingCard key={index} trending={content} isLoading={true}/>
        ))}
            </div>
            <div className="feed-trendy-story-image"></div>
           { !isLoading && <span>
            { numberOfTrendingStories == 2  ? <div className="feed-first" onClick={showMore}>Show more <FaAngleDown /></div>
             : <div className="feed-first" onClick={showLess}>Show Less <FaAngleDown /></div>}
            </span>
           }

    </section>
  )
}

export default FeedTrendingStories