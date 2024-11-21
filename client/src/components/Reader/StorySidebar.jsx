import { Link } from "react-router-dom"
import favour from "../../assets/29.jpg"
import { FaHome  } from "react-icons/fa"
import "../../styles/components/Reader/story-sidebar.css"
import useWindowSize from "../../hooks/useWindowSize"
import { MdOutlineBookmark, MdCreate,  MdOutlineFavoriteBorder,
  MdOutlineBookmarks,
  MdOutlineShare,
  MdOutlineCreate
 } from "react-icons/md"
 import ModeToggler from "../common/ModeToggler"
 import { FaRegBookmark } from "react-icons/fa"
const StorySidebar = () => {
  const { width } = useWindowSize()
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
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/stories"}>
<MdOutlineShare className="phone-feed-sidebar-icon" />
<span className="phone-feed-sidebar-nav-name">Write</span>
</Link>
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
    <Link to={"/dashboard/bookmarks"}>
    <MdOutlineFavoriteBorder size={20}  />
    </Link>
  
    </div>
    <div className="feed-sidebar-icon">
    <Link to={"/dashboard/stories"}>
    <MdOutlineShare size={20}  />
    </Link>
    </div>
      </div>
  
    <ModeToggler style={{marginLeft : "0px"}}/>
</div>
}
</>
  )
}

export default StorySidebar