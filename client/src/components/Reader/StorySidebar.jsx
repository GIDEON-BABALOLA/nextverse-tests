import { Link } from "react-router-dom"
import { FaHome, FaShareAlt  } from "react-icons/fa"
import "../../styles/components/Reader/story-sidebar.css"
import { useModalContext } from "../../hooks/useModalContext"
import { getStoryUrl } from "../../helpers/getStoryUrl"
import useWindowSize from "../../hooks/useWindowSize"
import Share from "../common/Share"
import { useBookmarkAStory } from "../../hooks/useBookmarkAStory"
import { useUnBookmarkAStory } from "../../hooks/useUnBookmarkAStory"
import { MdOutlineFavoriteBorder, MdOutlineShare, MdOutlineFavorite} from "react-icons/md"
 import { FaRegCommentAlt } from "react-icons/fa"
 import ModeToggler from "../common/ModeToggler"
 import { useAuthContext } from "../../hooks/useAuthContext"
 import { FaRegBookmark, FaBookmark } from "react-icons/fa"
 import { useState, useEffect } from "react"
const StorySidebar = ({ 
setOpenModal,
openModal,
likeModal,
setLikeModal,
toggleDrawer,
toggleLikesDrawer,
isBookmarked,
story}) => {
  const { user } = useAuthContext();
  const { width } = useWindowSize()
  const { shareModal, shareRef,  setShareUrl, shareUrl  } = useModalContext()
  const [bookmarking, setBookmarking] = useState(false);
  const [unBookmarking, setUnBookmarking] = useState(false);
  const [bookmarkedBefore, setBookmarkedBefore] = useState(isBookmarked)
  const bookmarkStory = useBookmarkAStory();
  const unbookmarkStory = useUnBookmarkAStory();
  const openShare = () => {
    console.log(setShareUrl)
   setShareUrl(getStoryUrl(story))
    shareModal.current.showModal()
    shareModal.current.classList.add("slide-dow")
  }
  const openLikesModal = () => {
    if(width < 768){
      toggleLikesDrawer()
        }else{
          setLikeModal(!likeModal)
        }
  }
const openCommentLikeModal = () => {
  if(width < 768){
toggleDrawer()
  }else{
    setOpenModal(!openModal)
  }

}
const bookmarkAStory = () => {
setBookmarking(true)
setBookmarkedBefore(false)
bookmarkStory.bookmarkAStory(story._id)
}
const unBookmarkAStory = () => {
  setBookmarkedBefore(false)
  setUnBookmarking(true)
unbookmarkStory.unBookmarkAStory(story._id)
}
  useEffect(() => {
if(Object.keys(bookmarkStory.data).length  > 0){
  setBookmarkedBefore(false)
  setBookmarking(false)
}
  }, [bookmarkStory.data])
  useEffect(() => {
    if(Object.keys(unbookmarkStory.data).length  > 0){
      setBookmarkedBefore(true)
      setUnBookmarking(false)
    }
      }, [unbookmarkStory.data])
const renderBookmarkButton = () => {
  if (Object.keys(bookmarkStory.data).length == 0 && !bookmarking && !bookmarkedBefore){
    return (

      <FaRegBookmark
      onClick={() => bookmarkAStory()}
      size={20}  color="#757575"/>
    )
  }
  if (bookmarking && !bookmarkStory.error && !bookmarkedBefore){
    return (
      <FaBookmark
      size={20}  color="#757575"/>
    
    )
  }
  if (!bookmarking && Object.keys(bookmarkStory.data).length > 0 && !bookmarkedBefore){
    return (
      <FaBookmark
      onClick={() => unBookmarkAStory()}
      size={20}  color="#757575"/>

    )
  }
  if (bookmarkStory.error && !bookmarkedBefore){
    return (
      <FaRegBookmark
      onClick={() => bookmarkAStory()}
      size={20}  color="#757575"/>
    )
  }
    
};
const renderUnBookmarkButton = ()  => {
  if (Object.keys(unbookmarkStory.data).length == 0 && !unBookmarking && bookmarkedBefore){
    return (
       <FaBookmark
       onClick={() => unBookmarkAStory()}
       size={20}  color="#757575"/>

    )
  }
  if (unBookmarking && !unbookmarkStory.error && bookmarkedBefore){
    return (
      <FaRegBookmark
      size={20}  color="#757575"/>

   

    )
  }
  if (!unBookmarking && Object.keys(unbookmarkStory.data).length > 0 && bookmarkedBefore){
    return(

      <FaRegBookmark
      onClick={() => bookmarkAStory()}
      size={20}  color="#757575"/>

    
    )
   
   
      
  }
  if (unbookmarkStory.error && bookmarkedBefore){
    return (
      <FaBookmark
      onClick={() => unBookmarkAStory()}
      size={20}  color="#757575"/>
    )
  }
}
  return (
    <>
    { width < 768 ?
   <div className="galacticus">
   <div className="phone-feed-sidebar-menu">
<ul className="phone-feed-sidebar-list">
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/profile"}>
<img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"} alt="Author" className="feed-man"/>
<span className="phone-feed-sidebar-nav-name">Profile</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/"}>
<FaHome className="phone-feed-sidebar-icon"  />
<span className="phone-feed-sidebar-nav-name">Home</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" 
onClick={() => openShare()}
>

    <FaShareAlt className="phone-feed-sidebar-icon" />


<span className="phone-feed-sidebar-nav-name">Share</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link">
<MdOutlineFavoriteBorder className="phone-feed-sidebar-icon" onClick={() => { openLikesModal()}}/>
{/* <MdOutlineFavorite size={20} fill="#ff5e62"/> */}
<span className="phone-feed-sidebar-nav-name">Likes</span>
</Link>
    </li>
    

    <li className="phone-feed-sidebar-item">
<span className="phone-feed-sidebar-nav-link" style={{cursor : "pointer"}}>
<FaRegCommentAlt size={20}  onClick={() => { openCommentLikeModal()}}/>
<span className="phone-feed-sidebar-nav-name">Comments</span>
</span>
    </li>
</ul>
   </div>
   </div>
   :
    <div className="story-sidebar">
      <div className="story-sidebar-first-links">
      <div className="story-sidebar-icon">
    <Link to={"/dashboard/profile"}>

     <img src={user["picture"]} alt="Author" className="feed-man"/>

     </Link>
   </div>
    <div className="feed-sidebar-icon">
    <Link to={"/"}>
    <FaHome size={20} />
    </Link>
    </div>
    <div className="feed-sidebar-icon">
    <span >
    {
      bookmarkedBefore ? 
      <span>{renderUnBookmarkButton()}</span>
      :
      <span>{renderBookmarkButton()}</span>

    }
    </span>
  
    </div>
    <div className="feed-sidebar-icon">
    <Link>
    <MdOutlineFavoriteBorder size={20}  onClick={() => { openLikesModal()}}/>
    </Link>
  
    </div>
    <div className="feed-sidebar-icon">
    <Link>
    <MdOutlineShare size={20} 
     onClick={() => {openShare()}}   


    />
    </Link>
    </div>
    <div className="feed-sidebar-icon">
    <Link>
    <FaRegCommentAlt size={20} onClick={() => { openCommentLikeModal()}}/>
    </Link>
    </div>
      </div>
      
  
    <ModeToggler style={{marginLeft : "0px"}}/>
</div>
}
<Share  share={shareRef} shareModal={shareModal} setShareUrl={setShareUrl} shareUrl={shareUrl}/>
</>

  )
}

export default StorySidebar