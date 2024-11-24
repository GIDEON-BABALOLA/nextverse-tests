
import { MdOutlineBookmarks, MdFormatListBulleted, MdOutlineCreate, MdGridView } from "react-icons/md"
import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"
import FeedAvatar from "./FeedAvatar"
import { useAuthContext } from "../../hooks/useAuthContext"
const FeedBottomNav = ({ view, changeView }) => {
    const { user } = useAuthContext()
  return (
    <div className="galacticus">
   <div className="phone-feed-sidebar-menu">
<ul className="phone-feed-sidebar-list">
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/profile"}>
<FeedAvatar
         image={user["picture"]}
         className="feed-man"
         alt="Author"
          />
<span className="phone-feed-sidebar-nav-name">Profile</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/"}>
<FaHome className="phone-feed-sidebar-icon"  color=" var(--icon-color)"/>
<span className="phone-feed-sidebar-nav-name">Home</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/bookmarks"}>

    <MdOutlineBookmarks className="phone-feed-sidebar-icon" color=" var(--icon-color)"/>


<span className="phone-feed-sidebar-nav-name">Bookmarks</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
    <Link className={`phone-feed-sidebar-nav-link ${ view.list && "active-structure"}`} >
<MdFormatListBulleted className="phone-feed-sidebar-icon" onClick={changeView}/>
<span className="phone-feed-sidebar-nav-name">List</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/stories"}>
<MdOutlineCreate className="phone-feed-sidebar-icon" color=" var(--icon-color)"/>
<span className="phone-feed-sidebar-nav-name">Write</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item ">
<Link className={`phone-feed-sidebar-nav-link ${ view.grid && "active-structure"}`} >
<MdGridView className="phone-feed-sidebar-icon " onClick={changeView}  />
<span className="phone-feed-sidebar-nav-name">Grid</span>
{/* <div className="feed-sidebar-icon" style={{background : "#F5F5F5", borderRadius : "50%"}}><MdGridView size={20} /></div> */}
</Link>
    </li>
</ul>
   </div>
   </div>
  )
}

export default FeedBottomNav