import gideon from "../../../assets/3.jpg"
import { useModalContext } from "../../../hooks/useModalContext"
import StoryCard from "../../Profile/StoryCard"
import "../../../styles/components/Dashboard/stories-preview-page.css"
import ContextMenu from "../../common/ContextMenu"
import { MdDelete, MdReadMore } from "react-icons/md"
import Share from "../../common/Share"
import { FaShareAlt, FaRegThumbsUp, FaTimes } from "react-icons/fa"
const StoriesPreview = () => {
  const {
    contextMenu,
     shareModal,
 shareRef,
 fireClick,
 setContextMenu,
 closeContextMenu
} = useModalContext()
    const myStories = [
        {
          title: "Mastering the Art of Photography",
          category: "Photography",
          image: "https://c4.wallpaperflare.com/wallpaper/760/955/638/artwork-landscape-sky-mountains-wallpaper-preview.jpg",
          link: "#",
          avatar : gideon,
          date : "March 17, 2024"
        },
        {
          title: "A Guide to Sustainable Living",
          category: "Lifestyle",
          image: "https://c4.wallpaperflare.com/wallpaper/591/844/1024/spider-man-spider-video-games-superhero-wallpaper-preview.jpg",
          link: "#", 
          avatar : gideon,
          date : "March 17, 2025"
    
        },
        {
          title: "Top 10 Hiking Trails in the US",
          category: "Adventure",
          image: "https://c4.wallpaperflare.com/wallpaper/114/1008/41/one-piece-monkey-d-luffy-hd-wallpaper-preview.jpg",
          link: "#",
          avatar : gideon,
          date : "March 17, 2020"
        },
        {
          title: "Top 10 Hiking Trails in the US",
          category: "Adventure",
          image: "https://c4.wallpaperflare.com/wallpaper/114/1008/41/one-piece-monkey-d-luffy-hd-wallpaper-preview.jpg",
          link: "#",
          avatar : gideon,
          date : "March 17, 2020"
        },
        {
          title: "Top 10 Hiking Trails in the US",
          category: "Adventure",
          image: "https://c4.wallpaperflare.com/wallpaper/114/1008/41/one-piece-monkey-d-luffy-hd-wallpaper-preview.jpg",
          link: "#",
          avatar : gideon,
          date : "March 17, 2020"
        },
        {
          title: "Top 10 Hiking Trails in the US",
          category: "Adventure",
          image: "https://c4.wallpaperflare.com/wallpaper/114/1008/41/one-piece-monkey-d-luffy-hd-wallpaper-preview.jpg",
          link: "#",
          avatar : gideon,
          date : "March 17, 2020"
        }
      ]
      
    
  return (
    <section className="litenote-dashboard-notes-preview" onClick={closeContextMenu}>
    <div className="litenote-dashboard-stories-preview-grid">
          {myStories.map((story, index) => (
<StoryCard key={index} story={story} fireClick={fireClick}/>
      ))
      }
      </div>
      <Share  share={shareRef} shareModal={shareModal}/>
      <ContextMenu
       state={"feed"}
       contextMenu={contextMenu}
       shareModal={shareModal}
                  setContextMenu={setContextMenu}
                  contextMenuData={[
                  {id : 1, icon : <FaShareAlt />
                  , label : "Share"},
                  {id : 2, icon : <MdDelete />
                  , label : "Delete"},
                  {id : 3, icon : <MdReadMore/>
                  , label : "Read More"},
                  {id : 4, icon : <FaTimes />
                  , label : "Close"}
]} />
    </section>
  )
}

export default StoriesPreview