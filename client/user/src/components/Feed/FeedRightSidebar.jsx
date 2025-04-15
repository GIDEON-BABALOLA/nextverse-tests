import { FaSearch, FaTimes } from "react-icons/fa"
import LiveSuggestions from "../common/LiveSuggestions"
import FeedTrendingStories from "./FeedTrendingStories"
import FeedTopics from "./FeedTopics"
import FollowSuggestion from "./FollowSuggestion"
import { useState, useEffect } from "react"
import { useGetLiveSearchSuggestions } from "../../hooks/useGetLiveSearchSuggestions"
const FeedRightSidebar = ({ feedCategory, setFeedCategory}) => {
   const [searchQuery, setSearchQuery] = useState("")
   const [searchResult, setSearchResult] = useState([])
   const [openModal, setOpenModal] =  useState(true)
    const { getLiveSearchSuggestions, isLoading, error, data, statusCode } = useGetLiveSearchSuggestions()
      useEffect(() => {
    if(data.length > 0 ){
      console.log(data)
      setSearchResult(data);
    }
      }, [data])
    const startSearch = (e) => {
      setOpenModal(true)
      setSearchQuery(e.target.value)
      if (e.target.value.length) {
        getLiveSearchSuggestions(e.target.value)
       
      }else{
        setSearchResult([]);
      }
    }
    const chooseOption = () => {

    }
  return (
    <div className="feed-right-sidebar">
  
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <FaSearch className="search-mag" />
    <input
      type="text"
      placeholder="Search Anything"
      className="feed-search-bar"
      onChange={startSearch}
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
<LiveSuggestions 
style={{width : "350px"}}
searchResult={searchResult} chooseOption={chooseOption} openModal={openModal} setOpenModal={setOpenModal}/>

       <div className="feed-behind">
       <FollowSuggestion />

    </div>
<FeedTrendingStories />
       <FeedTopics feedCategory={feedCategory} setFeedCategory={setFeedCategory}/>
     
    </div>
  )
}

export default FeedRightSidebar