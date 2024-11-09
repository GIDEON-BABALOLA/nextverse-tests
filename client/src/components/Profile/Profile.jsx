import Avatar from "./Avatar"
import Bio from "./Bio"
import Stats from "./Stats"
import StoryCard from "./StoryCard"
import Share from "../common/Share"
import ContextMenu from "../common/ContextMenu"
import { FaEllipsisH, FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useModalContext } from "../../hooks/useModalContext"
import { FaRegThumbsUp } from "react-icons/fa";
import { MdReadMore } from "react-icons/md"
import Toast from "../common/Toast"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect, useState } from "react"
const Profile = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true)
  console.log(user)
  const stories = user["stories"]
  const {
           contextMenu,
            shareModal,
        shareRef,
        fireClick,
        setContextMenu,
        closeContextMenu
     } = useModalContext()
     useEffect(() => {
if(user){
  setIsLoading(false)
}
     }, [user])
  return (
    <>
<Toast/>
     <section className="litenote-profile-user-profile" onClick={closeContextMenu}>
        <Share  share={shareRef} shareModal={shareModal}/>
  <div className="litenote-profile-container">
    <div className="litenote-profile-header" style={{backgroundColor : "#000000",
 
    
     borderRadius : "10px", padding : "30px"}}>
    <div style={{display : "flex", flexDirection : "column", color : "white"}}>
<Avatar image={user["picture"]}/>
   <Bio />
   </div>
      <div className="litenote-profile-info" style={ { color : "white"}}>
 
        <div className="litenote-profile-stats"  style={{   color: "#FF4B33"}}>
     <Stats />
        </div>
      </div>
 
      <span style={{color : "white", alignSelf : "flex-end"}}>
        <FaEllipsisH />
      </span>
    </div>
    
    <div className="litenote-profile-stories">
      <h3 className="litenote-profile-section-title">{user["username"]} Stories</h3>
      <div className="litenote-profile-stories-grid">
        {/* Dynamically generate user's stories here  */}
        {/* {
          dummyData.map((story, index) => (
            <StoryCard  shareModal={shareModal} 
          
            fireClick={fireClick} story={story} key={index}/>
          ))

        } */}
        {
          
          stories.map((story, index) => (
            <StoryCard  shareModal={shareModal} 
             isLoading={isLoading}
            fireClick={fireClick} story={story} key={index}/>
          ))

        }
        
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

    </>
  )
}

export default Profile