import "../styles/components/Browse/browse.css"
import SearchBar from "../components/Browse/SearchBar"
import SearchPagination from "../components/Browse/SearchPagination"
import SearchFilter from "../components/Browse/SearchFilter"
import SearchResult from "../components/Browse/SearchResult"
import SlidingTabs from "../components/Browse/SlidingTabs"
import useWindowSize from "../hooks/useWindowSize"
import StoryCard from "../components/Profile/StoryCard"
import Share from "../components/common/Share"
import favour from "../assets/29.jpg"
import great from "../assets/Great.jpg"
import girl from "../assets/30.jpg"
import ContextMenu from "../components/common/ContextMenu"
import {  FaRegThumbsUp, FaShareAlt, FaBookmark } from "react-icons/fa";
import RotationLoader from "../components/Loaders/RotationLoader"
import { useEffect, useState, useRef } from "react"
import { MdReadMore } from "react-icons/md"
const BrowsePage = () => {
  const [shareModal, setShareModal] = useState()
  const { width, height } =useWindowSize()
  const shareRef = useRef()
  const [contextMenu, setContextMenu] = useState()
  const [loadResults, setLoadResults] = useState(true)
  const dummyData = [
    {
      title: "Exploring the Hidden Gems of Italy",
      category: "Travel",
      image: "https://c4.wallpaperflare.com/wallpaper/764/505/66/baby-groot-4k-hd-superheroes-wallpaper-preview.jpg",
      link: "#",
      avatar : favour,
      date : "March 17, 2020"
    },
    {
      title: "The Best Street Foods Around the World",
      category: "Food",
      image: "https://c4.wallpaperflare.com/wallpaper/384/350/430/digital-art-artwork-cyber-cyberpunk-neon-hd-wallpaper-preview.jpg",
      link: "#",
      avatar : girl,
      date : "March 17, 2023"
    },
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
    },
    {
      title: "The Future of Technology: What to Expect",
      category: "Technology",
      image: "https://c4.wallpaperflare.com/wallpaper/221/116/854/joaquin-phoenix-joker-batman-fire-car-hd-wallpaper-preview.jpg",
      link: "#",
      avatar : great,
      date : "March 17, 2020"
    },
    {
      title: "Mindfulness and Meditation: A Beginner's Guide",
      category: "Health",
      image: "https://c4.wallpaperflare.com/wallpaper/288/472/57/the-sun-minimalism-japan-sword-warrior-hd-wallpaper-preview.jpg",
      link: "#",
      avatar : girl,
      date : "March 17, 2020"
    },
    {
      title: "Exploring Ancient Ruins Around the World",
      category: "History",
      image: "https://c4.wallpaperflare.com/wallpaper/611/838/413/spiderman-hd-4k-superheroes-wallpaper-preview.jpg",
      link: "#",
      avatar : girl,
      date : "March 17, 2020"
    },
    {
      title: "Creating Beautiful Garden Spaces",
      category: "Gardening",
      image: "https://c4.wallpaperflare.com/wallpaper/135/692/935/astronaut-space-black-background-artwork-hd-wallpaper-preview.jpg",
      link: "#",
      avatar : great,
      date : "March 17, 2020"
    },
    {
      title: "Understanding the Stock Market Basics",
      category: "Finance",
      image: "https://c4.wallpaperflare.com/wallpaper/663/947/813/oldboy-japanese-digital-art-artwork-wallpaper-preview.jpg",
      link: "#",
      avatar : girl,
      date : "March 17, 2020"
    }
  ]
  useEffect(() => {
setTimeout(() => {
  setLoadResults(false)
}, 2000);
  }, [])
  
  const fireClick = (e) => {
    console.log("here")
    updateMenuPosition(e.clientX, e.clientY)
    contextMenu.current.style.visibility = "visible"
      }
      const updateMenuPosition = (x, y) => {
    const maxTopValue = height - contextMenu.current.offsetHeight;
    const maxLeftValue = width - contextMenu.current.offsetWidth; 
    contextMenu.current.style.left = `${Math.min(maxLeftValue, x)}px`;
    contextMenu.current.style.top = `${Math.min(maxTopValue, y)}px`; 
      };
  useEffect(() => {
    setShareModal(shareRef)
  }, [setShareModal])
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
    };
  }, [contextMenu]);
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
  return (
    <>

    <section className="litenote-browse-stories" onClick={closeContextMenu}>
   
   <div className="litenote-browse-container">
   
     <h3 className="title-browse">Search Your Favourite Stories</h3>
     {/* <Tooltip text={"Change Your Avatar"}/> */}
  

     <SearchBar  />
     { width < 1200 ? <SearchFilter /> :
       <SlidingTabs />
     }
     

     
  
    
     { loadResults ? 
      <div className="browse-rotation-parent-container">
      <RotationLoader />
      </div>
      :
   
 <>
      <div className="litenote-browse-story-grid">{
        dummyData.map((story, index) => (
          <StoryCard shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
        ))

      }
<Share  share={shareRef} shareModal={shareModal}/>
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
           
                 {id : 4, icon : <FaRegThumbsUp />
                 , label : "Like Story"},
                 {id : 5, icon : <MdReadMore />
                  , label : "Read More"}
]} />
     </div>
     
    
  <SearchPagination />
 </>

     }
   </div>
 </section>
    </>

  )
}

export default BrowsePage