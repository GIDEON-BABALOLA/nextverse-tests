

import { useRef, useEffect } from "react";
import LoadingSpinner from "../Loaders/LoadingSpinner";
import CommonAvatar from "./CommonAvatar";
import { MdClose } from "react-icons/md"
import { useState, } from "react";
import useNavigateProfile from "../../hooks/useNavigateProfile";
import "../../styles/components/common/live-suggestions.css"
const LiveSuggestions = ( { searchResult, userSearchResult, chooseOption, openModal, setOpenModal, isLoading, searchQuery,  ...props }) => {
  const [recent, setRecents] = useState([])
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("userSearchResult")) || [];
    setRecents(storedUsers);
  }, []); // runs once on component mount

    const liveSuggestionsRef = useRef()
    const navigateToProfile = useNavigateProfile()
    const closeLiveSuggestions  = (e) => {
        if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"
          || Object.values(e.target.classList).includes("special-modal-client")
        ){
          return;
        }
        console.log(liveSuggestionsRef.current.getBoundingClientRect())
              if( e.clientX < parseInt(liveSuggestionsRef.current.getBoundingClientRect().left) || e.clientX > parseInt(liveSuggestionsRef.current.getBoundingClientRect().left) + liveSuggestionsRef.current.getBoundingClientRect().width)
                {
                  setOpenModal(false)
                }else if(
                  e.clientY < parseInt(liveSuggestionsRef.current.getBoundingClientRect().top) || e.clientY > parseInt(liveSuggestionsRef.current.getBoundingClientRect().top) + liveSuggestionsRef.current.getBoundingClientRect().height
                ){
                  setOpenModal(false)
                }
            
        
        }
        useEffect(() => {
          document.addEventListener("click", (e) => {
            if(liveSuggestionsRef.current){
              closeLiveSuggestions(e)
            }
          })
          return () =>{
            document.removeEventListener('click', (e) => {
              if(liveSuggestionsRef.current){
                closeLiveSuggestions(e)
              }
            }
          )
          }
          }, [openModal])
          const handleUserClick = (user) => {
            const { username } = user
            navigateToProfile(username)
            let users = JSON.parse(localStorage.getItem("userSearchResult")) || [];
            const exists = users.some((user) => user.username === username)
            if(!exists){
            users.push(user);
            localStorage.setItem("userSearchResult", JSON.stringify(users))
            }
          }
          const clearRecent = (user) => {
const { username } = user;
const newRecents = recent.filter((user) => user.username !== username)
setRecents(newRecents)
localStorage.setItem("userSearchResult", JSON.stringify(newRecents))
          }
          const clearAll = () => {
            setRecents([])
            localStorage.removeItem("userSearchResult")
          }
  return (
    <div
    ref={liveSuggestionsRef}
    className={`litenote-browse-search-result-box ${openModal  == false  ? "inactive" : ""}`}> 
    
      { recent.length !== 0 && userSearchResult && searchQuery.length == 0 &&
      <ul {...props}>
      <>
        <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", cursor : "pointer", alignItems : "center", padding :"10px 10px"}}>
        <span style={{fontSize : "1.7rem", fontWeight : 600}} className="recent-color" >Recent</span>
        <span className="clear-all-color" onClick={() => clearAll()}>Clear all</span>
      </div>
      {
  recent.map((search) => (
    <li key={search} className="browse-list-option">
<section className="users-place" onClick={() => { handleUserClick(search)}}>
<CommonAvatar 
style={{width : "40px", height : "40px"}}
image={search.picture} className="users-place-picture"/>
<div>
  <span style={{fontSize : "1.2rem", fontWeight : 600}}>{search.username}</span>
    </div>
</section>
<section>
  <MdClose size={20} onClick={() => {clearRecent(search)}}/>
</section>


    
    </li>
  )) 
}
      </>
      </ul>
}
{  searchResult.length !== 0 && searchQuery &&
<ul {...props}>
      <>
      {isLoading ? 
       <div style={{display :"flex", flexDirection : "column", 
        alignItems : "center", justifyContent : "center", padding : "80px 0px"}}>
<LoadingSpinner style={{color : "var(--loading-spinner-color-for-search)"}}/>
   </div>  : 
  <>
  {
  searchResult.map((search) => (
    <li key={search} onClick={
      () => {
      chooseOption(search)}} className="browse-list-option">
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
{   userSearchResult && <hr style={{ color: "white", backgroundColor: "var(--users-place-color)",  height: "2px" }} /> }
{
  userSearchResult && userSearchResult.map((search) => (
    <li key={search} className="browse-list-option"  onClick={() => { handleUserClick(search)}}>
<section className="users-place">
<CommonAvatar 
style={{width : "40px", height : "40px"}}
image={search.picture} className="users-place-picture"/>
<div>
  <span style={{fontSize : "1.2rem", fontWeight : 600}}>{search.username}</span>
    </div>
</section>
<section>
  {/* <MdClose size={20}/> */}
</section>


    
    </li>
  )) 
}
  </>

    }
      </>
      </ul>
  
}

    
    </div>
  )
}

export default LiveSuggestions