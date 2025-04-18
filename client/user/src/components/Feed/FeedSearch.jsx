
import { FaSearch, FaTimes } from "react-icons/fa"
import LiveSuggestions from "../common/LiveSuggestions"
import useNavigateStory from "../../hooks/useNavigateStory"
import { useState, useEffect } from "react"
import { useGetLiveSearchSuggestions } from "../../hooks/useGetLiveSearchSuggestions"
import "../../styles/components/Feed/feed-search.css"
const FeedSearch = () => {
     const navigateToStory = useNavigateStory();
       const [searchQuery, setSearchQuery] = useState("")
       const [searchResult, setSearchResult] = useState([])
       const [userSearchResult, setUserSearchResult] = useState([])
       const [openModal, setOpenModal] =  useState(false)
        const { getLiveSearchSuggestions, isLoading, error, stories, users, statusCode } = useGetLiveSearchSuggestions()
          useEffect(() => {
        if(stories.length > 0 ){
          console.log(stories)
          setSearchResult(stories);
          setUserSearchResult(users)
        }
          }, [stories])
        const startSearch = (e) => {
          setOpenModal(true)
          setSearchQuery(e.target.value)
          if (e.target.value.length) {
            getLiveSearchSuggestions(e.target.value, 3)
           
          }else{
            setSearchResult([]);
            setUserSearchResult([])
          }
        }
        const chooseOption = (story) => {
          navigateToStory(story)
        }
        const clearSearch = () => {
          console.log("how")
          setSearchQuery("")
          setOpenModal(false)
        }
  return (
   <>
 
<div className="search-container">
  <div className="search-wrapper">
    <FaSearch className="search-icon" />
    <input
      type="text"
      placeholder="Search Anything"
      className="search-input special-modal-client"
      onChange={startSearch}
      onFocus={() => setOpenModal(true)}
            spellCheck={false}
      value={searchQuery}
    />
     { searchQuery.length !== 0 && <FaTimes className="clear-icon" onClick={() => clearSearch()}/> }
  </div>
</div>

<LiveSuggestions 
style={{width : "350px"}}
userSearchResult={userSearchResult}
isLoading={isLoading}
searchQuery={searchQuery}
searchResult={searchResult} chooseOption={chooseOption} openModal={openModal} setOpenModal={setOpenModal}/>
   </>
  )
}

export default FeedSearch