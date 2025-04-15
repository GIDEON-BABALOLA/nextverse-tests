import { useRef, useEffect } from "react";
const LiveSuggestions = ( { searchResult, chooseOption, openModal, setOpenModal, ...props }) => {
    const liveSuggestionsRef = useRef()
    const closeLiveSuggestions  = (e) => {
        console.log(e.target.classList)
        if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"
          || Object.values(e.target.classList).includes("special-modal-client")
        ){
          return;
        }
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
        ``
          })
          return () =>{
            document.removeEventListener('click', (e) => {
              if(liveSuggestionsRef.current){
                closeLiveSuggestions(e)
              }
            }
          )
          }
          }, [])
  return (
    <div className={`litenote-browse-search-result-box ${!openModal && "inactive"}`} ref={liveSuggestionsRef}>
    {  searchResult.length !== 0 && <ul
     {...props}
    >
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
    </div>
  )
}

export default LiveSuggestions