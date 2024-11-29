import { FaSearch, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"
import FeedTrendingStories from "./FeedTrendingStories"
import FeedTopics from "./FeedTopics"
import FollowSuggestion from "./FollowSuggestion"
const FeedRightSidebar = ({ feedCategory, setFeedCategory}) => {
  return (
    <div className="feed-right-sidebar">
  
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <FaSearch className="search-mag" />
    <input
      type="text"
      placeholder="Search Anything"
      className="feed-search-bar"
      style={{
        paddingLeft: '35px', // Add padding to the left to accommodate the search icon
        paddingRight: '35px', // Add padding to the right to accommodate the times icon
        width: '100%',
      }}
    />
    <FaTimes
    className="searchX" />
  </div>
</div>

       <div className="feed-behind">
       <FollowSuggestion />

    </div>
<FeedTrendingStories />
       <FeedTopics feedCategory={feedCategory} setFeedCategory={setFeedCategory}/>
     
    </div>
  )
}

export default FeedRightSidebar