import "../../styles/components/common/context.css"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useBookmarkAStory } from "../../hooks/useBookmarkAStory"
import { useUnBookmarkAStory } from "../../hooks/useUnBookmarkAStory"
import { useLikeAStory } from "../../hooks/useLikeAStory";
import { useUnLikeAStory } from "../../hooks/useUnlikeAStory";
import { FaRegBookmark, FaBookmark } from "react-icons/fa"
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md"
import { useModalContext } from "../../hooks/useModalContext"
import { useToastContext } from "../../hooks/useToastContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import useNavigateStory from "../../hooks/useNavigateStory"
import { useState } from "react"
import { useParams } from "react-router-dom"
const ContextMenu = ({ contextMenuData,
    setContextMenu,
    shareModal,
    setDeleteModal,
    contextMenu,
    stories,
    setStoriesNumber,
    setStories,
    state,
    title
}) => {
    const {  currentStoryId } = useModalContext()
    const navigateToStory = useNavigateStory();
    const { user } = useAuthContext();
    const { showToast } = useToastContext();
    const [likedBefore, setLikedBefore] = useState("");
    const [editStories, setEditStories] = useState([])
    const [bookmarkedBefore, setBookmarkedBefore] = useState("")
    const [bookmarking, setBookmarking] = useState(false)
    const [unBookmarking, setUnBookmarking] = useState(false)
    const [liking, setLiking] = useState(false)
    const [unLiking, setUnLiking] = useState(false)
    const [bookmarkData, setBookmarkData] = useState([])
    const [unbookmarkData, setUnbookmarkData] = useState([])
    const [likeData, setLikeData] = useState([])
    const [unlikeData, setUnlikeData] = useState([])
    const bookmarkStory = useBookmarkAStory();
    const unBookmarkStory  = useUnBookmarkAStory();
    const likeStory = useLikeAStory();
    const currentPage = useParams();
    const unlikeStory = useUnLikeAStory();
    const navigate = useNavigate();
    const context = useRef()
    useEffect(() => {
        setContextMenu(context)
    }, [setContextMenu])
      useEffect(() => {
        const isLiked = editStories.find(story => story._id == currentStoryId)?.isLiked;
        const isBookmarked = editStories.find(story => story._id == currentStoryId)?.isBookmarked;
        setLikedBefore(isLiked)
        setBookmarkedBefore(isBookmarked)
        setBookmarkData([])
        setUnbookmarkData([])
        setLikeData([])
        setUnlikeData([])
      }, [currentStoryId])
      useEffect(() => {
        const filteredStories = stories.map(({ _id, isLiked, isBookmarked}) => ({ _id, isLiked, isBookmarked}));
setEditStories(filteredStories)
      }, [stories])
const likeTheStory = () => {
  if(user == null){
    showToast("Error", "Unable To Like, Try Logging In", false)
    return
  }
    setLiking(true)
    setLikedBefore(false)
    likeStory.likeAStory(currentStoryId)
}
const unlikeTheStory = () => {
  if(user == null){
    showToast("Error", "Unable To Undo Like, Try Logging In", false)
    return
  }
    setUnLiking(true)
    setLikedBefore(true)
    unlikeStory.unlikeAStory(currentStoryId)
}
const bookmarkAStory = () => {
if(user == null){
  showToast("Error", "Unable To Bookmark, Try Logging In", false)
  return
}
setBookmarking(true)
setBookmarkedBefore(false)

bookmarkStory.bookmarkAStory(currentStoryId)
}
const unBookmarkAStory = () => {
  if(user == null){
    showToast("Error", "Unable To Undo Bookmark, Try Logging In", false)
    return
  }
setUnBookmarking(true)
setBookmarkedBefore(true)
unBookmarkStory.unbookmarkAStory(currentStoryId)
}
useEffect(() => {
if(Object.keys(likeStory.data).length  > 0){
    setLikeData(Object.keys(likeStory.data))
    setLikedBefore(false)
    setLiking(false)
    setEditStories(prevStories =>
      prevStories.map(story =>
        story._id === currentStoryId ? { ...story, isLiked : true } : story
      )
    );
}
      }, [likeStory.data, likeStory.error])
useEffect(() => {
if(Object.keys(unlikeStory.data).length  > 0){
  setUnlikeData(Object.keys(unlikeStory.data))
    setLikedBefore(true)
    setUnLiking(false)
    setEditStories(prevStories =>
      prevStories.map(story =>
        story._id === currentStoryId ? { ...story, isLiked : false } : story
      )
    );
}
          }, [unlikeStory.data, unlikeStory.error])
useEffect(() => {
 if(Object.keys(bookmarkStory.data).length  > 0){
  setBookmarkData(Object.keys(bookmarkStory))
              setBookmarkedBefore(false)
              setBookmarking(false)
              setEditStories(prevStories =>
                prevStories.map(story =>
                  story._id === currentStoryId ? { ...story, isBookmarked : true } : story
                )
              );
    }
 }, [bookmarkStory.data])
useEffect(() => {
if(Object.keys(unBookmarkStory.data).length  > 0){
  if(currentPage["*"].split("/").includes("bookmarks")){
    const newStories = stories.filter((story) => story._id !== currentStoryId)
    setStories(newStories)
    setStoriesNumber((prev) => {
      return prev - 1; 
    })
    contextMenu.current.style.visibility = "hidden";
  }
  setUnbookmarkData(Object.keys(unBookmarkStory))
                  setBookmarkedBefore(true)
                  setUnBookmarking(false)
                  setEditStories(prevStories =>
                    prevStories.map(story =>
                      story._id === currentStoryId ? { ...story, isBookmarked : false } : story
                    )
                  );
                }
}, [unBookmarkStory.data])
const openAStory = () => {
  const author = stories.find(story => story._id == currentStoryId)?.author;
  const title = stories.find(story => story._id == currentStoryId)?.title;
  navigateToStory({_id : currentStoryId, author : author, title : title})
}
    const openShare = (e) => {
console.log(e.target.innerText)
        switch (e.target.innerText) {
            case "Share":
                     shareModal.current.showModal()
                     shareModal.current.classList.add("slide-dow")
                break;
            case "Close Options" : 
            contextMenu.current.style.visibility = "hidden"
            break;
                case "Delete":
                setDeleteModal(true)
                break;
                case "Home":
                    navigate("/")
                    
                break;
                case "Read More" :
               openAStory()
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
        if (bookmarkData.length == 0 && !bookmarking && !bookmarkedBefore){
            return (
                       <li className="litenote-context-link" key={id}    onClick={() => bookmarkAStory()}
          data-name={label} 
          
         >
              <FaRegBookmark
               size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
            
               />
             <span className="litenote-context-label">Bookmark</span>
         </li> 
            )
          }
          if (bookmarking && !bookmarkStory.error && !bookmarkedBefore){
            return (
                <li className="litenote-context-link" key={id} 
                data-name={label} 
               >
                    <FaBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                     />
                   <span className="litenote-context-label">Bookmarking</span>
               </li> 
            
            )
          }
          if (!bookmarking && bookmarkData.length > 0 && !bookmarkedBefore){
            return (
                <li className="litenote-context-link" key={id}     onClick={() => unBookmarkAStory()}
                data-name={label} 
               >
                    <FaBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                 
                     />
                   <span className="litenote-context-label">Bookmarked</span>
               </li> 
        
            )
          }
          if (bookmarkStory.error && !bookmarkedBefore){
            return (
                <li className="litenote-context-link" key={id}    onClick={() => bookmarkAStory()}
                data-name={label} 
               >
                    <FaRegBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                  
                     />
                   <span className="litenote-context-label">Bookmark</span>
               </li>    
            )
          }
    }
    const renderUnBookmarkButton = (label, id) => {
        if (unbookmarkData.length == 0 && !unBookmarking && bookmarkedBefore){
            return (
                 <li className="litenote-context-link" key={id}    onClick={() => unBookmarkAStory()}
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
          if (unBookmarking && !unBookmarkStory.error && bookmarkedBefore){
            return (
                <li className="litenote-context-link" key={id} 
                data-name={label} 
               >
                    <FaRegBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                     />
                   <span className="litenote-context-label">Bookmarked</span>
               </li> 
            )
          }
          if (!unBookmarking && unbookmarkData.length > 0 && bookmarkedBefore){
            return(
    
              
    <li className="litenote-context-link" key={id}   onClick={() => bookmarkAStory()}
                data-name={label} 
               >
                    <FaRegBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                   
                     />
                   <span className="litenote-context-label">Bookmark</span>
               </li> 
 )              
          }
          if (unBookmarkStory.error && bookmarkedBefore){
            return (        
    <li className="litenote-context-link" key={id}  onClick={() => unBookmarkAStory()}
                data-name={label} 
               >
                    <FaBookmark
                     size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
                    
                     />
                   <span className="litenote-context-label">Bookmarked</span>
               </li> 
            )
          }
    }
    const renderLikeButton = (label, id) => {
        if (likeData.length == 0 && !liking && !likedBefore){
          return (
            <li className="litenote-context-link" key={id}    onClick={() => likeTheStory()}
            data-name={label} 
           >
                <MdOutlineFavoriteBorder
                 size={20}  color="var(--actions-button-color)"
                 />
               <span className="litenote-context-label">Like</span>
           </li> 
          )
        }
        if (liking && !likeStory.error && !likedBefore){
          return (
            <li className="litenote-context-link" key={id} 
            data-name={label} 
           >
                <MdOutlineFavorite
                 size={20}  color="var(--like-icon)"
                 />
               <span className="litenote-context-label">Liking</span>
           </li> 
       
          
          )
        }
        if (!liking && likeData.length > 0 && !likedBefore){
          return (
            <li className="litenote-context-link" key={id}   onClick={() => unlikeTheStory()}
            data-name={label} 
           >
                <MdOutlineFavorite
                 size={20}  color="var(--like-icon)"
               
                 />
               <span className="litenote-context-label">Liked</span>
           </li> 
  
          )
        }
        if (likeStory.error && !likedBefore){
          return (
            <li className="litenote-context-link" key={id} onClick={() => likeTheStory()}
            data-name={label} 
           >
                <MdOutlineFavoriteBorder
                 size={20}   color="var(--actions-button-color)"
                 
                 />
               <span className="litenote-context-label">Like</span>
           </li> 

          )
        }
    }
    const renderUnLikeButton = (label, id) => {
        if (unlikeData.length == 0 && !unLiking && likedBefore){
            return (
                <li className="litenote-context-link" key={id}  onClick={() => unlikeTheStory()}
                data-name={label} 
               >
                    <MdOutlineFavorite
                     size={20}  color="var(--like-icon)" 
                     />
                   <span className="litenote-context-label">Liked</span>
               </li> 
            )
          }
          if (unLiking && !unlikeStory.error && likedBefore){
            return (
                <li className="litenote-context-link" key={id}
                data-name={label} 
               >
                    <MdOutlineFavoriteBorder
                     size={20}  color="var(--actions-button-color)" 
                     />
                   <span className="litenote-context-label">Liked</span>
               </li> 
            )
          }
          if (!unLiking && unlikeData.length > 0 && likedBefore){
            return(
                <li className="litenote-context-link" key={id}    onClick={() => likeTheStory()}
                data-name={label} 
               >
                    <MdOutlineFavoriteBorder
                     size={20}  color="var(--actions-button-color)" 
                     />
                   <span className="litenote-context-label">Like</span>
               </li> 
         
  
            
            )
           
           
              
          }
          if (unlikeStory.error && likedBefore){
            return (
                <li className="litenote-context-link" key={id} 
                data-name={label} 
                onClick={() => unlikeTheStory()}
               >
                    <MdOutlineFavorite
                     size={20} color="var(--like-icon)"
                    
                     />
                   <span className="litenote-context-label">Liked</span>
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
        {title && 
        
        <>
        <li className="litenote-context-link"
        style={{textAlign : "center",
          fontSize : "1.1rem",
          
          whiteSpace : "wrap" }}
        >{title}
       </li>
          <hr />
        </>
     
        }
      
        {
            contextMenuData.map(((item, id) => (
               
        <> {
           item.type  == "custom" ? 
           <>
           {item.label === "Bookmark" && (
             bookmarkedBefore
               ?
               
                renderUnBookmarkButton(item.label, id)
              
               :
             renderBookmarkButton(item.label, id)
              
           )}
           {item.label === "Like" && (
             likedBefore
               ? renderUnLikeButton(item.label, id)
               : renderLikeButton(item.label, id)
           )}
         </>
            :
                <li className={`litenote-context-link ${item.label == "Delete" && `special-modal-client`}`} key={id} onClick={openShare}
                 data-name={item.label} 
                 
                >
                    {item.icon}<span className={`litenote-context-label ${item.label == "Delete" && `special-modal-client`}`}>{item.label}</span>
                </li>
}
               </>
        
            
            )))
        }
</ul></>
  )
}

export default ContextMenu