import { Link } from "react-router-dom"
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SidebarItem from "../common/SidebarItem";
import { FaHome } from "react-icons/fa"
import { useAuthContext } from "../../hooks/useAuthContext"
import useNavigatePage from "../../hooks/useNavigatePage";
import { MdBookmarks, MdFormatListBulleted, MdCreate, MdGridView   } from "react-icons/md"
import ModeToggler from "../common/ModeToggler"
import FeedAvatar from "./FeedAvatar"
const FeedLeftSidebar = ({ view, changeView }) => {
  const  navigatePage  = useNavigatePage()
  const { user } = useAuthContext();
  return (
    <div className="feed-sidebar">
      <div style={{marginTop : "90px"}}>

    
        <div className="feed-sidebar-icon">
        <div>


         <FeedAvatar
         image={user["picture"]}
         className="feed-man"
         alt="Author"
         onClick={() => { navigatePage(`/profile/${user["username"]}`)}} 
          />

         </div>
       </div>
        <div className="feed-sidebar-icon">
      
   <SidebarItem icon={<FaHome size={20} color="var(--icon-color)"   onClick={() => { navigatePage("/")}}  />} title="Home" />


        </div>
        <div className="feed-sidebar-icon">
       <SidebarItem icon={<MdBookmarks size={20} color=" var(--icon-color)" onClick={() => { navigatePage("/dashboard/bookmarks")}}  />} title="Bookmarks" />

     
      
      
    
      
        </div>
        <div className="feed-sidebar-icon" style={{background : view.list && "var(--feed-sidebar-icon)", borderRadius : view.list && "50%",
        color : view.list ?  "var(--feed-sidebar-icon-color)" : " var(--icon-color) "
        }}>
             <SidebarItem icon={    <MdFormatListBulleted 
        onClick={changeView}
        size={20} 
        color="var(--feed-sidebar-icon-color)"
        />} title="List View"/>
    
        </div>
        <div className="feed-sidebar-icon">
        <SidebarItem icon={<MdCreate size={20}  color=" var(--icon-color)"
        onClick={() => { navigatePage("/dashboard/publish")}} 
        />} title="Write"/>
        
        
        </div>
        <div className="feed-sidebar-icon" 
        style={{background : view.grid && "var(--feed-sidebar-icon)", borderRadius : view.grid && "50%",
        color : view.grid ?  "var(--feed-sidebar-icon-color)" : " var(--icon-color) "}}
        >
          <SidebarItem icon={ <MdGridView size={20} onClick={changeView} 
            color="var(--feed-sidebar-icon-color)"
          />} title="Grid View"/>
       
         <span style={{display : "none"}}>grid</span></div>
       
       </div>
       
     <ModeToggler />
    
    </div>
  )
}

export default FeedLeftSidebar