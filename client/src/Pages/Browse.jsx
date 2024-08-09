import "../styles/components/Browse/browse.css"
import SearchBar from "../components/Browse/SearchBar"
import SearchPagination from "../components/Browse/SearchPagination"
import SearchFilter from "../components/Browse/SearchFilter"
import SearchResult from "../components/Browse/SearchResult"
import SlidingTabs from "../components/Browse/SlidingTabs"
import useWindowSize from "../hooks/useWindowSize"
import StoryCard from "../components/Profile/StoryCard"
import Share from "../components/common/Share"
import ContextMenu from "../components/common/ContextMenu"
import { FaTimes, FaUserAlt, FaRegThumbsUp, FaShareAlt, FaBookmark } from "react-icons/fa";
import RotationLoader from "../components/Loaders/RotationLoader"
import { useEffect, useState, useRef } from "react"
import { MdReadMore } from "react-icons/md"
const BrowsePage = () => {
  const [shareModal, setShareModal] = useState()
  const { width, height } =useWindowSize()
  const shareRef = useRef()
  const [contextMenu, setContextMenu] = useState()
  const [loadResults, setLoadResults] = useState(true)
  useEffect(() => {
setTimeout(() => {
  setLoadResults(false)
}, 2000);
  }, [])
  
  const fireClick = (e) => {
    console.log("here")
    updateMenuPosition(e.clientX, e.clientY)
    contextMenu.current.style.visibility = "visible"
      }
      const updateMenuPosition = (x, y) => {
    const maxTopValue = height - contextMenu.current.offsetHeight;
    const maxLeftValue = width - contextMenu.current.offsetWidth; 
    contextMenu.current.style.left = `${Math.min(maxLeftValue, x)}px`;
    contextMenu.current.style.top = `${Math.min(maxTopValue, y)}px`; 
      };
  useEffect(() => {
    setShareModal(shareRef)
  }, [setShareModal])
  useEffect(() => {
    if (contextMenu) {
      window.addEventListener('scroll', () => {
        contextMenu.current.style.visibility = "hidden";
      });
    }

    return () => {
      if (contextMenu) {
        window.removeEventListener('scroll', () => {
          contextMenu.current.style.visibility = "hidden";
        });
      }
    };
  }, [contextMenu]);
  const closeContextMenu  = (e) => {
    if( e.clientX < parseInt(contextMenu.current.style.left) || e.clientX > parseInt(contextMenu.current.style.left) + contextMenu.current.offsetWidth )
    {
      contextMenu.current.style.visibility = "hidden";
    }else if(
      e.clientY < parseInt(contextMenu.current.style.top) || e.clientY > parseInt(contextMenu.current.style.top) + contextMenu.current.offsetHeight
    ){
      contextMenu.current.style.visibility = "hidden";
    }
}
  return (
    <>

    <section className="litenote-browse-stories" onClick={closeContextMenu}>
   
   <div className="litenote-browse-container">
   
     <h3 className="title-browse">Search Your Favourite Stories</h3>
     {/* <Tooltip text={"Change Your Avatar"}/> */}
  

     <SearchBar  />
     { width < 1200 ? <SearchFilter /> :
       <SlidingTabs />
     }
     

     
  
    
     { loadResults ? 
      <div className="browse-rotation-parent-container">
      <RotationLoader />
      </div>
      :
   
 <>
      <div className="litenote-browse-story-grid"  >
<StoryCard shareModal={shareModal} fireClick={fireClick} />
<Share  share={shareRef} shareModal={shareModal}/>
<ContextMenu
      state={"feed"}
      contextMenu={contextMenu}
      shareModal={shareModal}
                 setContextMenu={setContextMenu}
                 contextMenuData={[
                 {id : 1, icon : <FaShareAlt />
                 , label : "Share"},
                 {id : 2, icon : <FaBookmark />
                 , label : "Bookmark"},
           
                 {id : 4, icon : <FaRegThumbsUp />
                 , label : "Like Story"},
                 {id : 5, icon : <MdReadMore />
                  , label : "Read More"}
]} />
     </div>
     
    
  <SearchPagination />
 </>

     }
   </div>
 </section>
    </>

  )
}

export default BrowsePage