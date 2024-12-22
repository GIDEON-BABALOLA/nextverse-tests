import useWindowSize from "../../hooks/useWindowSize"
import SidebarItem from "../common/SidebarItem"
import FeedAvatar from "../Feed/FeedAvatar"
import { useAuthContext } from "../../hooks/useAuthContext"
import useNavigatePage from "../../hooks/useNavigatePage"
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import { MdGridView } from "react-icons/md"
import { CgFeed} from "react-icons/cg"
import ModeToggler from "../common/ModeToggler"
const FollowSidebar = () => {
  const { width } = useWindowSize()
  const { user } = useAuthContext();
  const navigatePage = useNavigatePage();
  return (
    <>
    { width < 768 ?
   <div className="galacticus">
   <div className="phone-feed-sidebar-menu">
<ul className="phone-feed-sidebar-list">
    <li className="phone-feed-sidebar-item">
<span className="phone-feed-sidebar-nav-link"
      onClick={() => { navigatePage(`/profile/${user["username"]}`)}} 
>
<FeedAvatar 
image={user["picture"]}
className="feed-man"
alt="Author" 

/>
<span className="phone-feed-sidebar-nav-name">Profile</span>
</span>
    </li>
    <li className="phone-feed-sidebar-item">
<span className="phone-feed-sidebar-nav-link" onClick={() => { navigatePage("/")}}>
<FaHome className="phone-feed-sidebar-icon"  />
<span className="phone-feed-sidebar-nav-name">Home</span>
</span>
    </li>
    <li className="phone-feed-sidebar-item">
<span className="phone-feed-sidebar-nav-link" onClick={() => { navigatePage("/dashboard/analytics")}}>
<MdGridView className="phone-feed-sidebar-icon" />
<span className="phone-feed-sidebar-nav-name">Dashboard</span>
</span>
    </li>
    <li className="phone-feed-sidebar-item">
<span className="phone-feed-sidebar-nav-link" onClick={() => { navigatePage("/feed")}}>
<CgFeed className="phone-feed-sidebar-icon" />
<span className="phone-feed-sidebar-nav-name">Feed</span>
</span>
    </li>
    
</ul>
   </div>
   </div>
   :
    <div className="feed-sidebar">
      <div className="follow-sidebar-first-links">
      <div className="feed-sidebar-icon">
    <span   onClick={() => { navigatePage(`/profile/${user["username"]}`)}} >
    <FeedAvatar 
image={user["picture"]}
className="feed-man"
alt="Author" 
/>

     </span>
   </div>
    <div className="feed-sidebar-icon">
    <span style={{cursor : "pointer"}} onClick={() => { navigatePage("/")}} >
      <SidebarItem icon={ <FaHome size={20} color="#757575"/>} title="Home"/>
   
    </span>
    </div>
    <div className="feed-sidebar-icon" onClick={() => { navigatePage("/dashboard/analytics")}}>
    <span  style={{cursor : "pointer"}}>
      <SidebarItem icon={ <MdGridView size={20}  color="#757575" />} title="Dashboard"/>
   
    </span>
    </div>
    <div className="feed-sidebar-icon" onClick={() => { navigatePage("/feed")}}>
    <span  style={{cursor : "pointer"}}>
      <SidebarItem icon={<CgFeed size={20} color="#757575"/> } title="Feed" />
    
    </span>
    </div>
      </div>

    <ModeToggler style={{marginLeft : "0px"}}/>
</div>
}
</>
  )
}

export default FollowSidebar