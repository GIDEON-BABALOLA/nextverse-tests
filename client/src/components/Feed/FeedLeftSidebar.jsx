import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import { MdBookmarks, MdFormatListBulleted, MdCreate, MdGridView   } from "react-icons/md"
import ModeToggler from "../common/ModeToggler"
const FeedLeftSidebar = ({ view, changeView }) => {
  return (
    <div className="feed-sidebar">
      <div style={{marginTop : "90px"}}>

    
        <div className="feed-sidebar-icon">
        <Link to={"/dashboard/profile"}>

         <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"} alt="Author" className="feed-man"/>

         </Link>
       </div>
        <div className="feed-sidebar-icon">
        <Link to={"/"}>
        <FaHome size={20} color="var(--icon-color)"   />
        </Link>
        </div>
        <div className="feed-sidebar-icon">
        <Link to={"/dashboard/bookmarks"}>
        <MdBookmarks size={20} color="
        var(--icon-color) 
        "  />
        </Link>
    
      
        </div>
        <div className="feed-sidebar-icon" style={{background : view.list && "var(--feed-sidebar-icon)", borderRadius : view.list && "50%",
        color : view.list ?  "var(--feed-sidebar-icon-color)" : " var(--icon-color) "
        }}><MdFormatListBulleted 
        onClick={changeView}
        size={20} 
        /><span style={{display : "none"}} >list</span></div>
        <div className="feed-sidebar-icon">
        <Link to={"/dashboard/stories"}>
        <MdCreate size={20}  color=" var(--icon-color)"  />
        </Link>
        </div>
        <div className="feed-sidebar-icon" 
        style={{background : view.grid && "var(--feed-sidebar-icon)", borderRadius : view.grid && "50%",
        color : view.grid ?  "var(--feed-sidebar-icon-color)" : " var(--icon-color) "}}
        >
        <MdGridView size={20}
        onClick={changeView}
        
         /><span style={{display : "none"}}>grid</span></div>
       
       </div>
       
     <ModeToggler />
    
    </div>
  )
}

export default FeedLeftSidebar