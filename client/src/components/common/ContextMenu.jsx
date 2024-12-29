import "../../styles/components/common/context.css"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useBookmarkAStory } from "../../hooks/useBookmarkAStory"
import { useUnBookmarkAStory } from "../../hooks/useUnBookmarkAStory"
import { useLikeAStory } from "../../hooks/useLikeAStory";
import { useUnLikeAStory } from "../../hooks/useUnlikeAStory";
import { useState } from "react"
const ContextMenu = ({ contextMenuData,
    setContextMenu,
    shareModal,
    contextMenu,
    state,
    currentStoryDetails
}) => {
    const [likedBefore, setLikedBefore] = useState(currentStoryDetails["isLiked"]);
    const [bookmarkedBefore, setBookmarkedBefore] = useState(currentStoryDetails["isBookmarked"]);
    const [bookmarking, setBookmarking] = useState(false)
    const bookmarkAStory = useBookmarkAStory();
    const unBookmarkAStory  = useUnBookmarkAStory();
    const likeAStory = useLikeAStory();
    const unlikeAStory = useUnLikeAStory();
    const navigate = useNavigate()
    const context = useRef()
    // const triangle = useRef()
    // const rectangle = useRef()
    useEffect(() => {
        setContextMenu(context)
    }, [setContextMenu])

    const openShare = (e) => {

        switch (e.target.innerText) {
            case "Share":
                     shareModal.current.showModal()
                     shareModal.current.classList.add("slide-dow")
                break;
            case "Close Options" : 
            contextMenu.current.style.visibility = "hidden"
            break;
                case "Bookmark":
                
                break;
                case "Home":
                    navigate("/")
                    
                break;
                case "Settings":
                    navigate("/dashboard/settings")
                    
                break;
                case "Dashboard":
                navigate("/dashboard/analytics")
                break;
                case "Close":
                    contextMenu.current.style.visibility = "hidden"
                break;
        
            default:
                break;
        }
    }
    const renderBookmarkButton  = () => {
        if (Object.keys(bookmarkAStory.data).length == 0 && !bookmarking && !bookmarkedBefore){
            return (
              <>
              <FaRegBookmark className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"  onClick={() => bookmarkAStory()}
              size={20}  color="#757575"  />
              <span className="phone-feed-sidebar-nav-name">Bookmark</span>
              </>
            )
          }
          if (bookmarking && !bookmarkAStory.error && !bookmarkedBefore){
            return (
              <>
              <FaBookmark
              size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"/>
              <span className="phone-feed-sidebar-nav-name">Bookmarking</span>
              </>
            
            )
          }
          if (!bookmarking && Object.keys(bookmarkAStory.data).length > 0 && !bookmarkedBefore){
            return (
  
              <>
              <FaBookmark
              size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
              onClick={() => unBookmarkAStory()}
              />
              <span className="phone-feed-sidebar-nav-name">Bookmarked</span>
              </>
        
            )
          }
          if (bookmarkAStory.error && !bookmarkedBefore){
            return (
              <>
              
              <FaRegBookmark
              size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
              onClick={() => bookmarkAStory()}
              />
              <span className="phone-feed-sidebar-nav-name">Bookmark</span>
              </>
            )
          }
    }
    const renderUnBookmarkButton = () => {

    }
    const renderLikeButton = () => {

    }
    const renderUnLikeButton = () => {

    }
  return (
    <>    

        <ul className="litenote-context" 
        style={{
    width:"200px",
    margin: 0,
    paddingLeft: 0,
    position: "fixed",
    fontSize:"18px",
    visibility: "hidden",
    marginTop : state == "header" ? "3%" : "0",
    fontFamily: "Poppins, sans-serif", // Corrected line
}}
        ref={context}>
        {state == "header" &&
        <>

         </>
        }
        {
            contextMenuData.map(((item, id) => (
                <li className="litenote-context-link" key={id} onClick={openShare}
                 data-name={item.label} 
                //  onMouseOver={showColor}
                // onMouseLeave={closeColor}
                >
                    {item.icon}<span className="litenote-context-label">{item.label}</span>
                </li>
            
            )))
        }
</ul></>
  )
}

export default ContextMenu