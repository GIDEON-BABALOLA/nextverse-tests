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
    setCurrentStoryDetails,
    currentStoryId
}) => {
    const [likedBefore, setLikedBefore] = useState("");
    const [bookmarkedBefore, setBookmarkedBefore] = useState("");
    const [bookmarking, setBookmarking] = useState(false)
    const [unBookmarking, setUnBookmarking] = useState(false)
    const [liking, setLiking] = useState(false)
    const [unLiking, setUnLiking] = useState(false)
    const bookmarkStory = useBookmarkAStory();
    const unBookmarkStory  = useUnBookmarkAStory();
    const likeStory = useLikeAStory();
    const unlikeStory = useUnLikeAStory();
    const navigate = useNavigate();
    const context = useRef()
    useEffect(() => {
        setContextMenu(context)
    }, [setContextMenu])
      useEffect(() => {
        console.log(currentStoryDetails["isLiked"], currentStoryDetails["isBookmarked"])
    setCurrentStoryDetails(currentStoryDetails)
    setLikedBefore(currentStoryDetails["isLiked"])
    setBookmarkedBefore(currentStoryDetails["isBookmarked"])
      }, [currentStoryDetails])
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
    const renderBookmarkButton  = (label, id) => {
        if (Object.keys(bookmarkStory.data).length == 0 && !bookmarking && !bookmarkedBefore){
            return (
                       <li className="litenote-context-link" key={id} onClick={openShare}
          data-name={label} 
         >
              <FaRegBookmark
               size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
               onClick={() => bookmarkAStory()}
               />
             <span className="litenote-context-label">Bookmark</span>
         </li> 
            )
          }
          if (bookmarking && !bookmarkStory.error && !bookmarkedBefore){
            return (
                <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <FaBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                     />
                   <span className="litenote-context-label">Bookmarking</span>
               </li> 
            
            )
          }
          if (!bookmarking && Object.keys(bookmarkStory.data).length > 0 && !bookmarkedBefore){
            return (
                <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <FaBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                     onClick={() => unBookmarkAStory()}
                     />
                   <span className="litenote-context-label">Bookmarked</span>
               </li> 
        
            )
          }
          if (bookmarkStory.error && !bookmarkedBefore){
            return (
                <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <FaRegBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                     onClick={() => bookmarkAStory()}
                     />
                   <span className="litenote-context-label">Bookmark</span>
               </li>    
            )
          }
    }
    const renderUnBookmarkButton = (label, id) => {
        if (Object.keys(unBookmarkStory.data).length == 0 && !unBookmarking && bookmarkedBefore){
            return (
                 <li className="litenote-context-link" key={id} onClick={openShare}
          data-name={label} 
         >
              <FaBookmark
               size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
               onClick={() => unBookmarkAStory()}
               />
             <span className="litenote-context-label">UnBookmark</span>
         </li> 
            )
          }
          if (unBookmarking && !unBookmarkStory.error && bookmarkedBefore){
            return (
                <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <FaRegBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                     />
                   <span className="litenote-context-label">UnBookmarking</span>
               </li> 
            )
          }
          if (!unBookmarking && Object.keys(unBookmarkStory.data).length > 0 && bookmarkedBefore){
            return(
    
              
    <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <FaRegBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                     onClick={() => bookmarkAStory()}
                     />
                   <span className="litenote-context-label">Bookmark</span>
               </li> 

    
              
        
            
            )
           
           
              
          }
          if (unBookmarkStory.error && bookmarkedBefore){
            return (        
    <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <FaBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                     onClick={() => unBookmarkAStory()}
                     />
                   <span className="litenote-context-label">UnBookmark</span>
               </li> 
            )
          }
    }
    const renderLikeButton = (label, id) => {
        if (Object.keys(likeStory.data).length == 0 && !liking && !likedBefore){
          return (
            <li className="litenote-context-link" key={id} onClick={openShare}
            data-name={label} 
           >
                <MdOutlineFavoriteBorder
                 size={20}  color="var(--actions-button-color)"
                 onClick={() => likeTheStory()}
                 />
               <span className="litenote-context-label">Like</span>
           </li> 
          )
        }
        if (liking && !likeStory.error && !likedBefore){
          return (
            <li className="litenote-context-link" key={id} onClick={openShare}
            data-name={label} 
           >
                <MdOutlineFavorite
                 size={20}  color="var(--like-icon)"
                 />
               <span className="litenote-context-label">Liking</span>
           </li> 
       
          
          )
        }
        if (!liking && Object.keys(likeStory.data).length > 0 && !likedBefore){
          return (
            <li className="litenote-context-link" key={id} onClick={openShare}
            data-name={label} 
           >
                <MdOutlineFavorite
                 size={20}  color="var(--like-icon)"
                 onClick={() => unlikeTheStory()}
                 />
               <span className="litenote-context-label">Liked</span>
           </li> 
  
          )
        }
        if (likeStory.error && !likedBefore){
          return (
            <li className="litenote-context-link" key={id} onClick={openShare}
            data-name={label} 
           >
                <MdOutlineFavoriteBorder
                 size={20}   color="var(--actions-button-color)"
                 onClick={() => likeTheStory()}
                 />
               <span className="litenote-context-label">Like</span>
           </li> 

          )
        }
    }
    const renderUnLikeButton = (label, id) => {
        if (Object.keys(unlikeStory.data).length == 0 && !unLiking && likedBefore){
            return (
                <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <MdOutlineFavorite
                     size={20}  color="var(--like-icon)" 
                     onClick={() => unlikeTheStory()}
                     />
                   <span className="litenote-context-label">unLike</span>
               </li> 
            )
          }
          if (unLiking && !unlikeStory.error && likedBefore){
            return (
                <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <MdOutlineFavoriteBorder
                     size={20}  color="var(--actions-button-color)" 
                     />
                   <span className="litenote-context-label">unLiking</span>
               </li> 
            )
          }
          if (!unLiking && Object.keys(unlikeStory.data).length > 0 && likedBefore){
            return(
                <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <MdOutlineFavoriteBorder
                     size={20}  color="var(--actions-button-color)" 
                     onClick={() => likeTheStory()}
                     />
                   <span className="litenote-context-label">unLiked</span>
               </li> 
         
  
            
            )
           
           
              
          }
          if (unlikeStory.error && likedBefore){
            return (
                <li className="litenote-context-link" key={id} onClick={openShare}
                data-name={label} 
               >
                    <MdOutlineFavorite
                     size={20} color="var(--like-icon)"
                     onClick={() => unlikeTheStory()}
                     />
                   <span className="litenote-context-label">unLike</span>
               </li> 
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
               
        <> {
           item.type  == "custom" ? 
           <>
           {item.label === "Bookmark" && (
             bookmarkedBefore
               ? renderUnBookmarkButton(item.label, id)
               : renderBookmarkButton(item.label, id)
           )}
           {item.label === "Like" && (
             likedBefore
               ? renderUnLikeButton(item.label, id)
               : renderLikeButton(item.label, id)
           )}
         </>
            :
                <li className="litenote-context-link" key={id} onClick={openShare}
                 data-name={item.label} 
                >
                    {item.icon}<span className="litenote-context-label">{item.label}</span>
                </li>
}
               </>
        
            
            )))
        }
</ul></>
  )
}

export default ContextMenu