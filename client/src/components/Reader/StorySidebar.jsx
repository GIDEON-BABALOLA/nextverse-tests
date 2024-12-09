import { Link } from "react-router-dom"
import { FaHome, FaShareAlt  } from "react-icons/fa"
import "../../styles/components/Reader/story-sidebar.css"
import { useModalContext } from "../../hooks/useModalContext"
import { getStoryUrl } from "../../helpers/getStoryUrl"
import useWindowSize from "../../hooks/useWindowSize"
import Share from "../common/Share"
import { MdOutlineFavoriteBorder, MdOutlineShare} from "react-icons/md"
 import { FaRegCommentAlt } from "react-icons/fa"
 import ModeToggler from "../common/ModeToggler"
 import { useAuthContext } from "../../hooks/useAuthContext"
 import { FaRegBookmark } from "react-icons/fa"
const StorySidebar = ({ setOpenModal, openModal, toggleDrawer, story}) => {
  const { user } = useAuthContext();
  const { width } = useWindowSize()
  const { shareModal, shareRef,  setShareUrl, shareUrl  } = useModalContext()
  const openShare = () => {
    console.log(setShareUrl)
   setShareUrl(getStoryUrl(story))
    shareModal.current.showModal()
    shareModal.current.classList.add("slide-dow")
  }
const openCommentLikeModal = () => {
  if(width < 768){
toggleDrawer()
  }else{
    setOpenModal(!openModal)
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
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/stories"}>
<MdOutlineFavoriteBorder className="phone-feed-sidebar-icon" />
<span className="phone-feed-sidebar-nav-name">Like</span>
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