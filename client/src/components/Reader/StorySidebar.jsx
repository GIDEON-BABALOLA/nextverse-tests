
import { FaHome, FaShareAlt  } from "react-icons/fa"
import "../../styles/components/Reader/story-sidebar.css"
import { useModalContext } from "../../hooks/useModalContext"
import { getStoryUrl } from "../../helpers/getStoryUrl"
import useWindowSize from "../../hooks/useWindowSize"
import Share from "../common/Share"
import { useBookmarkAStory } from "../../hooks/useBookmarkAStory"
import { useUnBookmarkAStory } from "../../hooks/useUnBookmarkAStory"
import { MdOutlineFavoriteBorder, MdOutlineShare, MdOutlineFavorite} from "react-icons/md"
import FeedAvatar from "../Feed/FeedAvatar"
import useNavigatePage from "../../hooks/useNavigatePage"
import SidebarItem from "../common/SidebarItem"
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
  const navigatePage = useNavigatePage();
  useEffect(() => {
  setBookmarkedBefore(isBookmarked)
  }, [isBookmarked])
  
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
  setUnBookmarking(true)
  setBookmarkedBefore(true)
unbookmarkStory.unbookmarkAStory(story._id)
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
      useEffect(() => {
console.log(unbookmarkStory.error)
      }, [unbookmarkStory.error])
const renderBookmarkButton = () => {
  if (Object.keys(bookmarkStory.data).length == 0 && !bookmarking && !bookmarkedBefore){
    return (
width > 767 ?
<SidebarItem icon={<FaRegBookmark
      onClick={() => bookmarkAStory()}
      size={20}  color="#757575"/>} title="Bookmark"/>
      
      :
      <>
      <FaRegBookmark className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"  onClick={() => bookmarkAStory()}
      size={20}  color="#757575"  />
      <span className="phone-feed-sidebar-nav-name">Bookmark</span>
      </>
    )
  }
  if (bookmarking && !bookmarkStory.error && !bookmarkedBefore){
    return (
      width > 767 ?
      <SidebarItem icon={<FaBookmark
        size={20}  color="#757575"/>} title="Bookmarking" />
      
      :
      <>
      <FaBookmark
      size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"/>
      <span className="phone-feed-sidebar-nav-name">Bookmarking</span>
      </>
    
    )
  }
  if (!bookmarking && Object.keys(bookmarkStory.data).length > 0 && !bookmarkedBefore){
    return (
      width > 767 ?
      <SidebarItem icon={ <FaBookmark
        onClick={() => unBookmarkAStory()}
        size={20}  color="#757575"/>} title="Bookmarked"/>
     
      :
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
      width > 767 ?
      <SidebarItem icon={ <FaRegBookmark
        onClick={() => bookmarkAStory()}
        size={20}  color="#757575"/>} title="Bookmark"/>
     
      :
      <>
      
      <FaRegBookmark
      size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
      onClick={() => bookmarkAStory()}
      />
      <span className="phone-feed-sidebar-nav-name">Bookmark</span>
      </>
    )
  }
    
};
const renderUnBookmarkButton = ()  => {
  if (Object.keys(unbookmarkStory.data).length == 0 && !unBookmarking && bookmarkedBefore){
    return (
      width > 767 ?
      <SidebarItem icon={ <FaBookmark
        onClick={() => unBookmarkAStory()}
        size={20}  color="#757575"/>} title="UnBookmark" />
      
       :
       <>
       <FaBookmark
       size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
       onClick={() => unBookmarkAStory()}
       />
       <span className="phone-feed-sidebar-nav-name">Bookmarked</span>
       </>

    )
  }
  if (unBookmarking && !unbookmarkStory.error && bookmarkedBefore){
    return (
      width > 767 ?
      <SidebarItem icon={<FaRegBookmark
        size={20}  color="#757575"/>} title="UnBookmarking"/>
      
      :
      <>
      <FaRegBookmark
      size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
      />
      <span className="phone-feed-sidebar-nav-name">Bookmark</span>
      </>

   

    )
  }
  if (!unBookmarking && Object.keys(unbookmarkStory.data).length > 0 && bookmarkedBefore){
    return(
width > 767 ?
<SidebarItem icon={<FaRegBookmark
      onClick={() => bookmarkAStory()}
      size={20}  color="#757575"/>} title="Bookmark"/>
      
      :
      <>
      <FaRegBookmark
      size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
      onClick={() => bookmarkAStory()}
      />
      <span className="phone-feed-sidebar-nav-name">Bookmark</span>
      </>

    
    )
   
   
      
  }
  if (unbookmarkStory.error && bookmarkedBefore){
    return (
      width > 767
      ?
      <SidebarItem icon={<FaBookmark
        onClick={() => unBookmarkAStory()}
        size={20}  color="#757575"/>} title="UnBookmark"/>
      
      :
      <>
      <FaBookmark
      size={20}  color="#757575" className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link"
      onClick={() => unBookmarkAStory()}
      />
      <span className="phone-feed-sidebar-nav-name">Bookmarked</span>
      </>
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
<div className="phone-feed-sidebar-nav-link" to={"/dashboard/profile"}>
<FeedAvatar
         image={user["picture"]}
         className="feed-man"
         alt="Author"
         style={{cursor : "pointer"}}
         onClick={() => { navigatePage(`/profile/${user["username"]}`)}} 
          />
<span className="phone-feed-sidebar-nav-name">Profile</span>
</div>
    </li>
    <li className="phone-feed-sidebar-item">
<div className="phone-feed-sidebar-nav-link"   >
{
      bookmarkedBefore ? 
  <span className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link">{renderUnBookmarkButton()}</span>
      
      :
    <span className="phone-feed-sidebar-icon phone-feed-sidebar-nav-link">{renderBookmarkButton()}</span>
      

    }
</div>
    </li>
    <li className="phone-feed-sidebar-item">
<div className="phone-feed-sidebar-nav-link" 
onClick={() => openShare()}
>

    <FaShareAlt className="phone-feed-sidebar-icon" />


<span className="phone-feed-sidebar-nav-name">Share</span>
</div>
    </li>
    <li className="phone-feed-sidebar-item">
<div className="phone-feed-sidebar-nav-link">
<MdOutlineFavoriteBorder className="phone-feed-sidebar-icon" onClick={() => { openLikesModal()}}/>
{/* <MdOutlineFavorite size={20} fill="#ff5e62"/> */}
<span className="phone-feed-sidebar-nav-name">Likes</span>
</div>
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
    <div style={{cursor : "pointer"}}>
    <FeedAvatar
         image={user["picture"]}
         className="feed-man"
         style={{cursor : "pointer"}}
         alt="Author"
         onClick={() => { navigatePage(`/profile/${user["username"]}`)}} 
          />
     </div>
   </div>
    <div className="feed-sidebar-icon">

    <SidebarItem icon={<FaHome size={20} color="#757575" onClick={() => { navigatePage("/");}} />} title="Home"  />
  
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
   <SidebarItem icon={<MdOutlineFavoriteBorder size={20}  onClick={() => { openLikesModal()}} color="#757575"/>} title="Likes"/>
    
    
  
    </div>
    <div className="feed-sidebar-icon">
<SidebarItem icon={ <MdOutlineShare size={20} 
     onClick={() => {openShare()}}   

color="#757575"
    />} title="Share"/>
   
    
    </div>
    <div className="feed-sidebar-icon">
<SidebarItem icon={<FaRegCommentAlt size={20} onClick={() => { openCommentLikeModal()}} color="#757575"/>} title="Comments"/>
    
  
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