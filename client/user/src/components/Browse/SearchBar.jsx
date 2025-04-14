

import "../../styles/components/Browse/searchbar.css"
import {FaSearch, FaTimes} from "react-icons/fa"
import { useState, useEffect, useRef } from "react"
import { FaMicrophone } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import LoadingSpinner from "../Loaders/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import toast from "react-hot-toast"
const SearchBar = () => {
  const { width } = useWindowSize()
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
  const navigate = useNavigate();
  const resultBox = useRef()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const startListening = () => SpeechRecognition.startListening({ continuous: true })
  useEffect(() => {
if(transcript == ""){
toast.error("No Internet")
}
    setSearchQuery(transcript)
    }, [transcript])
  let availableKeywords = [
    "HTML",
    "CSS",
    "Easy Tutorials",
    "Web Design Tutorial",
    "JavaScript",
    "Where to learn coding online",
    "where to learn web design",
    "How to create a website"
  ]
  const searchStory = () => {
    if(searchQuery.length !== 0){
      navigate(`/explore/search?search_query=${searchQuery}`);
    }
    // SpeechRecognition.stopListening()
    // const filteredResults = availableKeywords.filter((keyword) =>
    //   keyword.toLowerCase().includes(transcript.toLowerCase())
    // );
    // setSearchResult(filteredResults);
  }
  const startSearch = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length) {
      const filteredResults = availableKeywords.filter((keyword) =>
        keyword.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResult(filteredResults);
    }else{
      setSearchResult([]);
      resultBox.current.innerHtml = ""
    }
  }
  const getHighlightedText = (text, highlight) => {
const parts = text.split(new RegExp(`(${highlight})`, "gi"))
return <span>{
  parts.map((part, index) => {
    return part.toLowerCase() === searchQuery.toLocaleLowerCase() ? (
      <b key={index}>{part}</b>
    ) : (
      part
    )
  })
}
</span>
  }
  const clearInput = () => {
    setSearchQuery("")
     setSearchResult([]);
      resultBox.current.innerHtml = ""
  }
  const chooseOption = (e) => {
    setSearchQuery(e.target.innerText)
      setSearchResult([]);
      resultBox.current.innerHtml = ""
  }
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

{/* <SoundWave /> */}

</div>
<div className="litenote-browse-search-result-box" ref={resultBox}>
{  searchResult.length !== 0 && <ul>
{
  searchResult.map((search) => (
    <li key={search} onClick={chooseOption} className="browse-list-option">
<section>
{/* {search} */}
{getHighlightedText(search, searchQuery)}
<div style={{color : "#8f8f8f"}}>
      by gideon babalola
    </div>
</section>
 <section style={{color : "#8f8f8f", fontSize : '10px'}}>
    4 minutes read
    </section>

    
    </li>
  )) 


}
</ul>
}
</div>
    </div>

    </>
  )
}

export default SearchBar