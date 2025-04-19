import FeedTrendingStories from "./FeedTrendingStories"
import FeedTopics from "./FeedTopics"
import FollowSuggestion from "./FollowSuggestion"
import FeedSearch from "./FeedSearch"
const FeedRightSidebar = ({ feedCategory, setFeedCategory}) => {
  return (
    <div className="feed-right-sidebar">
  
 <FeedSearch />

       <div className="feed-behind">
       <FollowSuggestion />

    </div>
<FeedTrendingStories />
       <FeedTopics feedCategory={feedCategory} setFeedCategory={setFeedCategory}/>
     
    </div>
  )
}

export default FeedRightSidebar