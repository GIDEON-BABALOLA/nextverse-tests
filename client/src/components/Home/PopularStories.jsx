import "../../styles/components/Home/popularstories.css"
import StoryCard from "../Profile/StoryCard"
import favour from "../../assets/29.jpg"
import great from "../../assets/Great.jpg"
import girl from "../../assets/30.jpg"
import { FaShareAlt, FaBookmark, FaRegThumbsUp } from "react-icons/fa"
import { MdReadMore,  } from "react-icons/md"
import useWindowSize from "../../hooks/useWindowSize"
import ContextMenu from "../common/ContextMenu"
import Share from "../common/Share"
import { useState, useRef, useEffect } from "react"
const PopularStories = () => {
  const { width, height} = useWindowSize()
  const [shareModal, setShareModal] = useState()
  const [contextMenu, setContextMenu] = useState()
  const shareRef = useRef()
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
  const fireClick = (e) => {
    updateMenuPosition(e.clientX, e.clientY)
    contextMenu.current.style.visibility = "visible"
      }
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
      setShareModal(shareRef)
    }, [setShareModal])
      const updateMenuPosition = (x, y) => {
        const maxTopValue = height - contextMenu.current.offsetHeight;
        const maxLeftValue = width - contextMenu.current.offsetWidth; 
        contextMenu.current.style.left = `${Math.min(maxLeftValue, x)}px`;
        contextMenu.current.style.top = `${Math.min(maxTopValue, y)}px`; 
          };
          useEffect(() => {
            console.log(contextMenu)

            if (contextMenu) {
              window.addEventListener('scroll', () => {
                if(contextMenu.current){
                contextMenu.current.style.visibility = "hidden";
                }
              });
            }
        
            return () => {
              if (contextMenu) {
               
                window.removeEventListener('scroll', () => {
                  if(contextMenu.current){
                  contextMenu.current.style.visibility = "hidden";
                  }
                  
                });
              }
            }


          }, [contextMenu]);
        
  return (
   <>
    <section className="popular-stories-featured-stories" onClick={closeContextMenu}>
    <Share  share={shareRef} shareModal={shareModal}/>
      <h2>Popular Stories</h2>
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