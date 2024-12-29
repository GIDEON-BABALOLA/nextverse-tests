import "../../styles/components/common/context.css"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useBookmarkAStory } from "../../hooks/useBookmarkAStory"
import { useUnBookmarkAStory } from "../../hooks/useUnBookmarkAStory"
import { useLikeAStory } from "../../hooks/useLikeAStory";
import { useUnLikeAStory } from "../../hooks/useUnlikeAStory";
import { FaRegBookmark, FaBookmark } from "react-icons/fa"
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md"
import { useState } from "react"
const ContextMenu = ({ contextMenuData,
    setContextMenu,
    shareModal,
    contextMenu,
    state,
    currentStoryDetails,
    currentStoryId
}) => {
    const [likedBefore, setLikedBefore] = useState(currentStoryDetails["isLiked"]);
    const [bookmarkedBefore, setBookmarkedBefore] = useState(currentStoryDetails["isBookmarked"]);
    const [bookmarking, setBookmarking] = useState(false)
    const [unBookmarking, setUnBookmarking] = useState(false)
    const [liking, setLiking] = useState(false)
    const [unLiking, setUnLiking] = useState(false)
    const bookmarkStory = useBookmarkAStory();
    const unBookmarkStory  = useUnBookmarkAStory();
    const likeStory = useLikeAStory();
    const unlikeStory = useUnLikeAStory();
    const navigate = useNavigate()
    const context = useRef()
    // const triangle = useRef()
    // const rectangle = useRef()
    useEffect(() => {
        setContextMenu(context)
    }, [setContextMenu])
const likeTheStory = () => {
    setLiking(true)
    setLikedBefore(false)
    likeStory.likeAStory(currentStoryId)
}
const unlikeTheStory = () => {
    setUnLiking(true)
    setLikedBefore(true)
    unlikeStory.unlikeAStory(currentStoryId)
}
const bookmarkAStory = () => {
    setBookmarking(true)
    setBookmarkedBefore(false)
bookmarkStory.bookmarkAStory(currentStoryId)
}
const unBookmarkAStory = () => {
    setUnBookmarking(true)
    setBookmarkedBefore(true)
  unBookmarkStory.unbookmarkAStory(currentStoryId)
}
useEffect(() => {
if(Object.keys(likeStory.data).length  > 0){
    setLikedBefore(false)
    setLiking(false)
}
      }, [likeStory.data, likeStory.error])
useEffect(() => {
if(Object.keys(unlikeStory.data).length  > 0){
    setLikedBefore(true)
    setUnLiking(false)
}
          }, [unlikeStory.data, unlikeStory.error])
useEffect(() => {
 if(Object.keys(bookmarkStory.data).length  > 0){
              setBookmarkedBefore(false)
              setBookmarking(false)
    }
 }, [bookmarkStory.data])
useEffect(() => {
if(Object.keys(unBookmarkStory.data).length  > 0){
                  setBookmarkedBefore(true)
                  setUnBookmarking(false)
                }
}, [unBookmarkStory.data])
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
        if (Object.keys(bookmarkStory.data).length == 0 && !bookmarking && !bookmarkedBefore){
            return (
              <>
              <FaRegBookmark className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"  onClick={() => bookmarkAStory()}
              size={20}  color="#757575"  />
              <span className="phone-feed-sidebar-nav-name">Bookmark</span>
              </>
            )
          }
          if (bookmarking && !bookmarkStory.error && !bookmarkedBefore){
            return (
              <>
              <FaBookmark
              size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"/>
              <span className="phone-feed-sidebar-nav-name">Bookmarking</span>
              </>
            
            )
          }
          if (!bookmarking && Object.keys(bookmarkStory.data).length > 0 && !bookmarkedBefore){
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
          if (bookmarkStory.error && !bookmarkedBefore){
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
        if (Object.keys(unBookmarkStory.data).length == 0 && !unBookmarking && bookmarkedBefore){
            return (
      
               <>
               <FaBookmark
               size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
               onClick={() => unBookmarkAStory()}
               />
               <span className="phone-feed-sidebar-nav-name">UnBookmark</span>
               </>
        
            )
          }
          if (unBookmarking && !unBookmarkStory.error && bookmarkedBefore){
            return (
      
              <>
              <FaRegBookmark
              size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
              />
              <span className="phone-feed-sidebar-nav-name">UnBookmarking</span>
              </>
        
           
        
            )
          }
          if (!unBookmarking && Object.keys(unBookmarkStory.data).length > 0 && bookmarkedBefore){
            return(
    
              <>
              <FaRegBookmark
              size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
              onClick={() => bookmarkAStory()}
              />
              <span className="phone-feed-sidebar-nav-name">Bookmark</span>
              </>
        
            
            )
           
           
              
          }
          if (unBookmarkStory.error && bookmarkedBefore){
            return (
              <>
              <FaBookmark
              size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
              onClick={() => unBookmarkAStory()}
              />
              <span className="phone-feed-sidebar-nav-name">UnBookmark</span>
              </>
            )
          }
    }
    const renderLikeButton = () => {
        if (Object.keys(likeStory.data).length == 0 && !liking && !likedBefore){
          return (

            <MdOutlineFavoriteBorder 
            onClick={() => likeTheStory()}
            size={20} color="var(--actions-button-color)"/>
          )
        }
        if (liking && !likeStory.error && !likedBefore){
          return (
          
                <MdOutlineFavorite 
            
            size={20} color="var(--like-icon)"/>
       
          
          )
        }
        if (!liking && Object.keys(likeStory.data).length > 0 && !likedBefore){
          return (
  <MdOutlineFavorite
          onClick={() => unlikeTheStory()}
           size={20} color="var(--like-icon)"/>
  
          )
        }
        if (likeStory.error && !likedBefore){
          return (
            <MdOutlineFavoriteBorder
            onClick={() => likeTheStory()}
             size={20} color="var(--actions-button-color)"/>
          )
        }
    }
    const renderUnLikeButton = () => {
        if (Object.keys(unlikeStory.data).length == 0 && !unLiking && likedBefore){
            return (
  
  
  <MdOutlineFavorite
              onClick={() => unlikeTheStory()}
               size={20} color="var(--like-icon)"/>
  
  
    
            )
          }
          if (unLiking && !unlikeStory.error && likedBefore){
            return (
              
  <MdOutlineFavoriteBorder 
              size={20} color="var(--actions-button-color)"/>
  
  
  
           
        
            )
          }
          if (!unLiking && Object.keys(unlikeStory.data).length > 0 && likedBefore){
            return(
              
            <MdOutlineFavoriteBorder 
               onClick={() => likeTheStory()}
              size={20} color="var(--actions-button-color)"/>
         
  
            
            )
           
           
              
          }
          if (unlikeStory.error && likedBefore){
            return (
              <MdOutlineFavorite
              onClick={() => unlikeTheStory()}
               size={20} color="var(--like-icon)"/>
            )
          }
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