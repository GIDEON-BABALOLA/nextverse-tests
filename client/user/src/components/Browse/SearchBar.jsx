

import "../../styles/components/Browse/searchbar.css"
import LiveSuggestions from "../common/LiveSuggestions";
import {FaSearch, FaTimes} from "react-icons/fa"
import { useState, useEffect, useRef } from "react"
import { FaMicrophone } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useGetLiveSearchSuggestions } from "../../hooks/useGetLiveSearchSuggestions"
import { useToastContext } from "../../hooks/useToastContext";
import LoadingSpinner from "../Loaders/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast"
const SearchBar = () => {
  const { getLiveSearchSuggestions, isLoading, error, data, statusCode } = useGetLiveSearchSuggestions()
  const [openModal, setOpenModal] = useState(true)
  const [searchParams] = useSearchParams();
  const { showToast } = useToastContext();
  const query = searchParams.get('search_query');
  const { width } = useWindowSize()
  const { transcript, resetTranscript } = useSpeechRecognition()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const startListening = () => SpeechRecognition.startListening({ continuous: true })
  useEffect(() => {
if(transcript == ""){
toast.error("No Internet")
}
    setSearchQuery(transcript)
    }, [transcript])
  useEffect(() => {
if(data.length > 0 ){
  setSearchResult(data);
}
  }, [data])
  const searchStory = () => {
    if(searchQuery.length == 0){
      showToast("Error", "Pls Enter A word To Search For", false)
    }else{
      const cleanSearchQuery = searchQuery.trim().replace(/\s+/g, "+")
      navigate(`/explore/search?search_query=${cleanSearchQuery}`);
    }
    SpeechRecognition.stopListening()
  }
  const triggerEnter = (e) => {
     if(e.key == "Enter"){
      searchStory()
     }
  }
  const startSearch = (e) => {
    setOpenModal(true)
    setSearchQuery(e.target.value)
    if (e.target.value.length) {
      getLiveSearchSuggestions(e.target.value)
     
    }else{
      setSearchResult([]);
    }
  }
  const clearInput = () => {
    setSearchQuery("")
    setSearchResult([]);
    resetTranscript()
  }
  const chooseOption = (title) => {
    setSearchQuery(title)
    setSearchResult([]);
    if(title){
      const cleanSearchQuery = title.trim().replace(/\s+/g, "+")
      navigate(`/explore/search?search_query=${cleanSearchQuery}`);
    }
  }
  useEffect(() => {
    if(query){
setSearchQuery(query)
    }
  }, [query])
  return (
    <>
      <div className="litenote-browse-search-box">
<div className="litenote-browse-search-row">

<button className="litenote-browse-search-button">   
</button>
<input 
value={searchQuery}
className="litenote-browse-search-input"
type="text"
id="input-box"
onKeyDown={triggerEnter}
placeholder=" Search Your Favourite Stories"
autoComplete="off"
onChange={startSearch}
/>
<button className="litenote-browse-search-button">
  { searchQuery.length !== 0 &&  <FaTimes className="fa-magnifying-glass" 
   size={50} onClick={clearInput}/> }

<button className="litenote-browse-trigger-search-button" onClick={searchStory}>
<MdSearch color="white" style={{fontWeight : 500}} size={20}/>
{/* <LoadingSpinner /> */}
</button>
   
   
</button>
 
 { width > 1200 &&
 <span className="litenote-browse-microphone">
   <FaMicrophone style={{fontWeight : 500}} size={20} onClick={startListening}/>
   </span> 
   }
</div>
{/* <div className="litenote-browse-search-result-box" >
{  searchResult.length !== 0 && <ul>
{
  searchResult.map((search) => (
    <li key={search} onClick={
      () => {
      chooseOption(search.title)}} className="browse-list-option">
<section>
{search.title}
<div style={{color : "#8f8f8f"}}>
      by {search.userId.username}
    </div>
</section>
 <section style={{color : "#8f8f8f", fontSize : '10px'}}>
 {search["estimatedReadingTime"]["minutes"] == 0 ? `${search["estimatedReadingTime"]["seconds"]} seconds read` : `${search["estimatedReadingTime"]["minutes"]} minutes read`  }
    </section>

    
    </li>
  )) 


}
</ul>
}
</div> */}
<LiveSuggestions chooseOption={chooseOption} searchResult={searchResult}
openModal={openModal}
setOpenModal={setOpenModal}
/>
    </div>

    </>
  )
}

export default SearchBar