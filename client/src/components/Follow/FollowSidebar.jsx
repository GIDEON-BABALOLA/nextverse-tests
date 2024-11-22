import useWindowSize from "../../hooks/useWindowSize"
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import { MdGridView } from "react-icons/md"
import { CgFeed} from "react-icons/cg"
import ModeToggler from "../common/ModeToggler"
import favour from "../../assets/29.jpg"
const FollowSidebar = () => {
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
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/publish"}>
<MdGridView className="phone-feed-sidebar-icon" />
<span className="phone-feed-sidebar-nav-name">Dashboard</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/feed"}>
<CgFeed className="phone-feed-sidebar-icon" />
<span className="phone-feed-sidebar-nav-name">Feed</span>
</Link>
    </li>
    
</ul>
   </div>
   </div>
   :
    <div className="feed-sidebar">
      <div className="follow-sidebar-first-links">
      <div className="feed-sidebar-icon">
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
    <Link to={"/dashboard/publish"}>
    <MdGridView size={20}  />
    </Link>
    </div>
    <div className="feed-sidebar-icon">
    <Link to={"/feed"}>
    <CgFeed size={20}  />
    </Link>
    </div>
      </div>

    <ModeToggler style={{marginLeft : "0px"}}/>
</div>
}
</>
  )
}

export default FollowSidebar