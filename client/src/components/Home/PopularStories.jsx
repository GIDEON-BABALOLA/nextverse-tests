import "../../styles/components/Home/popularstories.css"
import StoryCard from "../Profile/StoryCard"
import favour from "../../assets/29.jpg"
import great from "../../assets/Great.jpg"
import { useModalContext } from "../../hooks/useModalContext"
import { FaShareAlt, FaBookmark, FaRegThumbsUp } from "react-icons/fa"
import { MdReadMore,  } from "react-icons/md"
import Tab from "../common/Tab"
import ContextMenu from "../common/ContextMenu"
import Share from "../common/Share"
import { useState, useRef, useEffect } from "react"
const PopularStories = () => {
  const {
    contextMenu,
     shareModal,
 shareRef,
 fireClick,
 setContextMenu,
 closeContextMenu
} = useModalContext()


  const featuredStories = [
    {
      title: "Mastering the Art of Photography",
      category: "Photography",
      image: "https://c4.wallpaperflare.com/wallpaper/760/955/638/artwork-landscape-sky-mountains-wallpaper-preview.jpg",
      link: "#",
      avatar : favour,
      date : "March 17, 2024"
    },
    {
      title: "A Guide to Sustainable Living",
      category: "Lifestyle",
      image: "https://c4.wallpaperflare.com/wallpaper/591/844/1024/spider-man-spider-video-games-superhero-wallpaper-preview.jpg",
      link: "#", 
      avatar : great,
      date : "March 17, 2025"

    },
    {
      title: "Top 10 Hiking Trails in the US",
      category: "Adventure",
      image: "https://c4.wallpaperflare.com/wallpaper/114/1008/41/one-piece-monkey-d-luffy-hd-wallpaper-preview.jpg",
      link: "#",
      avatar : favour,
      date : "March 17, 2020"
    }
  ]
  const [tabs, setTab] = useState({
    all : true,
    fiction : false,
    adventure : false,
    nonfiction : false
  })

  return (
   <>
    <section className="popular-stories-featured-stories" onClick={closeContextMenu}>
    <Share  share={shareRef} shareModal={shareModal}/>
      <h2>Popular Stories</h2>
    <Tab tabs={tabs} setTab={setTab}  
    
         style={{display : "flex", justifyContent : "center", marginBottom : "20px"}}

          
         />
      <div className="popular-stories-story-grid">
      {featuredStories.map((story, index) => (
<StoryCard key={index} story={story} fireClick={fireClick}/>
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
         {/* Featured stories will be dynamically added here  */}
      </div>
    </section>
   </>
  )
}

export default PopularStories