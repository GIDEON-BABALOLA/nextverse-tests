import { Link } from "react-router-dom"
import favour from "../../assets/29.jpg"
import { FaHome  } from "react-icons/fa"
import "../../styles/components/Reader/story-sidebar.css"
import { useModalContext } from "../../hooks/useModalContext"
import useWindowSize from "../../hooks/useWindowSize"
import Share from "../common/Share"
import { MdOutlineBookmark, MdCreate,  MdOutlineFavoriteBorder,
  MdOutlineBookmarks,
  MdOutlineShare,
  MdOutlineCreate
 } from "react-icons/md"
 import { FaCommentAlt } from "react-icons/fa"
 import ModeToggler from "../common/ModeToggler"
 import { FaRegBookmark } from "react-icons/fa"
const StorySidebar = ({ setOpenModal, openModal}) => {
  const { width } = useWindowSize()
  const { shareModal, shareRef } = useModalContext()
  const openShare = () => {
    shareModal.current.showModal()
    shareModal.current.classList.add("slide-dow")
  }
const openCommentLikeModal = () => {
  setOpenModal(!openModal)
}
  return (
    <>
    { width < 768 ?
   <div className="galacticus">
   <div className="phone-feed-sidebar-menu">
<ul className="phone-feed-sidebar-list">
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/profile"}>
<img src={favour} alt="Author" className="feed-man"/>
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
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/bookmarks"}>

    <FaRegBookmark className="phone-feed-sidebar-icon" />


<span className="phone-feed-sidebar-nav-name">Bookmarks</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/stories"}>
<MdOutlineFavoriteBorder className="phone-feed-sidebar-icon" />
<span className="phone-feed-sidebar-nav-name">Like</span>
</Link>
    </li>
    
    <li className="phone-feed-sidebar-item">
<span className="phone-feed-sidebar-nav-link">
<MdOutlineShare className="phone-feed-sidebar-icon" onClick={() => {openShare()}}/>
<span className="phone-feed-sidebar-nav-name">Share</span>
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

     <img src={favour} alt="Author" className="feed-man"/>

     </Link>
   </div>
    <div className="feed-sidebar-icon">
    <Link to={"/"}>
    <FaHome size={20} />
    </Link>
    </div>
    <div className="feed-sidebar-icon">
    <Link to={"/dashboard/bookmarks"}>
    <FaRegBookmark size={20}  />
    </Link>
  
    </div>
    <div className="feed-sidebar-icon">
    <Link>
    <MdOutlineFavoriteBorder size={20}  onClick={() => { openCommentLikeModal()}}/>
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
    <FaCommentAlt size={20} onClick={() => { openCommentLikeModal()}}/>
    </Link>
    </div>
      </div>
      
  
    <ModeToggler style={{marginLeft : "0px"}}/>
</div>
}
<Share  share={shareRef} shareModal={shareModal}/>
</>

  )
}

export default StorySidebar