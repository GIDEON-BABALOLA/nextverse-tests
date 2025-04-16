
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
      className="search-input"
      onChange={startSearch}
      value={searchQuery}
    />
     { searchQuery.length !== 0 && <FaTimes className="clear-icon" onClick={() => clearSearch()}/> }
  </div>
</div>

<LiveSuggestions 
style={{width : "350px"}}
isLoading={isLoading}
searchResult={searchResult} chooseOption={chooseOption} openModal={openModal} setOpenModal={setOpenModal}/>
   </>
  )
}

export default FeedSearch