import {  useEffect, useState } from "react";
import ContextMenu from "../common/ContextMenu";
import { FaShareAlt } from "react-icons/fa";
import { FaEllipsisH,  FaBookmark } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import useImageLoad from "../../hooks/useImageLoaded";
import favour from "../../assets/29.jpg"
import great from "../../assets/Great.jpg"
import girl from "../../assets/30.jpg"
const StoryCard = ({ fireClick}) => {
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
  const [loading, setLoading] = useState(true)
  
  const { loaded, error } = useImageLoad(dummyData.map((index) => {return index.image}));
  useEffect(() => {
    if (error) {
      console.log("failed to load images")
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])

  return (
 <> {

  loading ?   dummyData.map((story, index) => (
    <div className="litenote-profile-story-card" key={index}>
            <div className="litenote-profile-story-card-inner">
              <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>
              <div className="litenote-profile-story-content">
                <h4 className="litenote-profile-story-title skeleton-title">&nbsp;</h4>
                <p className="litenote-profile-story-category skeleton-subtitle">&nbsp;</p>
                <FaEllipsisH  className="litenote-profile-read-more-share skeleton-options"  onClick={fireClick}/>
              
                <a  className="litenote-profile-read-more skeleton-button">&nbsp;</a>
             
              </div>
            </div>
          </div>  
  )) :
        dummyData.map((story, index) => (
          <div className="litenote-profile-story-card" key={index}>
            <div className="litenote-profile-story-card-inner">
              <div className="litenote-profile-story-image">
                <img src={story.image} alt="Story Image" />
              </div>
              
              <div className="litenote-profile-story-content">
             
               <div className="story-card-user-info">
               
               <img className="story-card-avatar" src={story.avatar} /><span>Gideon Babalola</span>
             
               </div>
               <FaEllipsisH  className="litenote-profile-read-more-share" style={{position : "relative", bottom : "30px"}}onClick={fireClick}/>
              
               
                <h4 className="litenote-profile-story-title">{story.title}</h4>
                <p className="litenote-profile-story-category">{story.category}</p>
                <div className="story-card-bottom-info">
               <span>{story.date}</span><span>5 min read</span>
               </div>
               
              
                {/* <a href={story.link} className="litenote-profile-read-more">Read More</a> */}
              {/* {
                dummyData.length !== 2 ? <a href={story.link} className="litenote-profile-read-more">Read More</a>  : <a href={story.link} className="litenote-profile-read-more roller"></a>
              }
               */}
             
              </div>
            </div>
          </div>
        ))
 }
 </>
  )
}

export default StoryCard