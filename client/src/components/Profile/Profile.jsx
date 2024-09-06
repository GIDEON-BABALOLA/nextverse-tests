import Avatar from "./Avatar"
import Bio from "./Bio"
import Stats from "./Stats"
import StoryCard from "./StoryCard"
import Share from "../common/Share"
import { useState, useRef, useEffect} from "react"
import ContextMenu from "../common/ContextMenu"
import useWindowSize from "../../hooks/useWindowSize"
import { FaShareAlt, FaWifi } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { BiWifiOff } from "react-icons/bi"
import { FaTimes, FaUserAlt, FaRegThumbsUp } from "react-icons/fa";
import { MdReadMore, MdCloudOff, MdOutlineRefresh } from "react-icons/md"
import Toast from "../common/Toast"
const Profile = () => {
  let badInternet = false
const {width, height} = useWindowSize()
const [contextMenu, setContextMenu] = useState()
const fireClick = (e) => {
updateMenuPosition(e.clientX, e.clientY)
contextMenu.current.style.visibility = "visible"
  }
  const updateMenuPosition = (x, y) => {
const maxTopValue = height - contextMenu.current.offsetHeight;
const maxLeftValue = width - contextMenu.current.offsetWidth; 
contextMenu.current.style.left = `${Math.min(maxLeftValue, x)}px`;
contextMenu.current.style.top = `${Math.min(maxTopValue, y)}px`; 
  };
const [shareModal, setShareModal] = useState()
  const username = "Chris"
  const shareRef = useRef()
  const toastRef = useRef()
  const toastProgress = useRef()
    useEffect(() => {
    setShareModal(shareRef)
  }, [setShareModal])
    const closeContextMenu  = (e) => {
      if( e.clientX < parseInt(contextMenu.current.style.left) || e.clientX > parseInt(contextMenu.current.style.left) + contextMenu.current.offsetWidth )
      {
        contextMenu.current.style.visibility = "hidden";
      }else if(
        e.clientY < parseInt(contextMenu.current.style.top) || e.clientY > parseInt(contextMenu.current.style.top) + contextMenu.current.offsetHeight
      ){
        contextMenu.current.style.visibility = "hidden";
      }
  }
  useEffect(() => {
    if (contextMenu) {
      window.addEventListener('scroll', () => {
        contextMenu.current.style.visibility = "hidden";
      });
    }

    return () => {
      if (contextMenu) {
        window.removeEventListener('scroll', () => {
          contextMenu.current.style.visibility = "hidden";
        });
      }
    };
  }, [contextMenu]);

  return (
    <>
<Toast toastRef={toastRef} toastProgress={toastProgress}/>
{   !badInternet ?     <section className="litenote-profile-user-profile" onClick={closeContextMenu}>
        <Share  share={shareRef} shareModal={shareModal}/>
  <div className="litenote-profile-container">
    <div className="litenote-profile-header">
   <Avatar />
      <div className="litenote-profile-info">
 <Bio toastRef={toastRef} toastProgress={toastProgress}/>
        <div className="litenote-profile-stats">
     <Stats />
        </div>
      </div>
    </div>
    <div className="litenote-profile-stories">
      <h3 className="litenote-profile-section-title">{`${username}`} Stories</h3>
      <div className="litenote-profile-stories-grid">
        {/* Dynamically generate user's stories here  */}
       <StoryCard  shareModal={shareModal} fireClick={fireClick}/>
       <ContextMenu
       state={"feed"}
       contextMenu={contextMenu}
       shareModal={shareModal}
                  setContextMenu={setContextMenu}
                  contextMenuData={[
                  {id : 1, icon : <FaShareAlt />
                  , label : "Share"},
                  {id : 2, icon : <FaBookmark />
                  , label : "Bookmark"},
                  {id : 3, icon : <MdReadMore/>
                  , label : "Close"},
                  {id : 4, icon : <FaRegThumbsUp />
                  , label : "Like Story"}
]} />
         {/* Add more story cards as needed  */}
      </div>
    </div>
  </div>
</section>
 : <section className="something-went-wrong">
 <MdCloudOff size={100} color="#777777"/>
 <div><h2>Something went wrong</h2></div>
 <div>We are unable to load this profile, check your connection</div>
 <div><button className="offline-button"
 onClick={() => location.reload()}
 ><MdOutlineRefresh size={20}/> Refresh</button></div>
</section>
}
    </>
  )
}

export default Profile