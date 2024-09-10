import Avatar from "./Avatar"
import Bio from "./Bio"
import Stats from "./Stats"
import StoryCard from "./StoryCard"
import Share from "../common/Share"
import { useState, useRef, useEffect} from "react"
import favour from "../../assets/29.jpg"
import great from "../../assets/Great.jpg"
import girl from "../../assets/30.jpg"
import ContextMenu from "../common/ContextMenu"
import useWindowSize from "../../hooks/useWindowSize"
import { FaShareAlt, FaWifi } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { BiWifiOff } from "react-icons/bi"
import { FaTimes, FaUserAlt, FaRegThumbsUp } from "react-icons/fa";
import { MdReadMore, MdCloudOff, MdOutlineRefresh } from "react-icons/md"
import Toast from "../common/Toast"
const Profile = () => {
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
      console.log("pappy")
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
        {
          dummyData.map((story, index) => (
            <StoryCard  shareModal={shareModal} fireClick={fireClick} story={story} key={index}/>
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