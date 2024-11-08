import "../../styles/components/Home/popularstories.css"
import StoryCard from "../Profile/StoryCard"
import PopularStoriesCard from "../common/PopularStoriesCard"
import favour from "../../assets/29.jpg"
import great from "../../assets/Great.jpg"
import { useModalContext } from "../../hooks/useModalContext"
import { FaShareAlt, FaBookmark, FaRegThumbsUp } from "react-icons/fa"
import { MdReadMore,  } from "react-icons/md"
import Tab from "../common/Tab"
import ContextMenu from "../common/ContextMenu"
import Share from "../common/Share"
import { useState, useRef, useEffect } from "react"
import { useGetPopularStories } from "../../hooks/useGetPopularStories"
import { usePopularStoriesContext } from "../../hooks/usePopularStoriesContext"
import ErrorMessage from "../common/ErrorMessage"
import { useToastContext } from "../../hooks/useToastContext"
const PopularStories = () => {
  const { getPopularStories, isLoading, error, data, statusCode } = useGetPopularStories()
  const { setPopularStories, popularStories } = usePopularStoriesContext()
  const popularStoriesRef = useRef()
  const {
    contextMenu,
     shareModal,
 shareRef,
 fireClick,
 setContextMenu,
 closeContextMenu
} = useModalContext()
  const [tabs, setTab] = useState({
    technology : true,
    fiction : false,
    adventure : false,
    nonfiction : false,
    romance : false,
    memoir : false
  })
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Popular Stories Is Been Observed")
          let selectedCategory;
          selectedCategory = Object.keys(tabs).find(key => tabs[key] === true);
          if(selectedCategory == "nonfiction"){
  selectedCategory = "non-fiction"
          }
          getPopularStories(selectedCategory, 3)
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // 10% of the element needs to be visible
    );
    if (popularStoriesRef.current) {
      observer.observe(popularStoriesRef.current);
    }
    
    return () => {
      if (popularStoriesRef.current) {
        observer.unobserve(popularStoriesRef.current);
      }
    };
  
  }, [tabs])
  useEffect(() => {
    if(data.length > 1){
      setPopularStories(data)
    }

   
  }, [data, statusCode, setPopularStories])
  return (
   <>
    <section className="popular-stories-featured-stories" onClick={closeContextMenu} ref={popularStoriesRef}>
    <Share  share={shareRef} shareModal={shareModal}/>
      <h2>Popular Stories</h2>
    <Tab tabs={tabs} setTab={setTab}  
    
         style={{display : "flex", justifyContent : "center", marginBottom : "20px"}}

          
         />
      <div className="popular-stories-story-grid">
      { !error && popularStories.map((story, index) => (
<PopularStoriesCard
isLoading={isLoading}
error={error}
 key={index} story={story} fireClick={fireClick}/>
      ))
      }
      { error && <ErrorMessage title={"Something went wrong"} 
  message={"We are unable to load this content, check your connection"}
  height={60}
 />
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