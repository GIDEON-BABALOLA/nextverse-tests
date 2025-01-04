import "../../styles/components/Home/popularstories.css"
import PopularStoriesCard from "../common/PopularStoriesCard"
import { useModalContext } from "../../hooks/useModalContext"
import { FaShareAlt, FaBookmark, FaTimes } from "react-icons/fa"
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdClose } from "react-icons/md"
import { MdReadMore,  } from "react-icons/md"
import Tab from "../common/Tab"
import ContextMenu from "../common/ContextMenu"
import Share from "../common/Share"
import { useState, useRef, useEffect } from "react"
import { useGetPopularStories } from "../../hooks/useGetPopularStories"
import { usePopularStoriesContext } from "../../hooks/usePopularStoriesContext"
import ErrorMessage from "../common/ErrorMessage"
import { useAuthContext } from "../../hooks/useAuthContext"
import NoContent from "../common/NoContent"
const PopularStories = () => {
  const { user } = useAuthContext();
  const { getPopularStories, isLoading, error, data, statusCode } = useGetPopularStories()
  const { setPopularStories, popularStories } = usePopularStoriesContext()
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const [emptyData, setEmptyData] = useState(false)
  const [currentStoryDetails, setCurrentStoryDetails] = useState({
    isLiked : "",
    isBookmarked : ""
  })
  const popularStoriesRef = useRef()
  const {
    contextMenu,
     shareModal,
     shareUrl,
     setShareUrl,
 shareRef,
 fireClick,
 setContextMenu,
 closeContextMenu
} = useModalContext()
const resendRequest = () => {
  setEmptyData(false)
  let selectedCategory;
  selectedCategory = Object.keys(tabs).find(key => tabs[key] === true);
  if(selectedCategory == "nonfiction"){
    selectedCategory = "non-fiction"
            }
  getPopularStories(selectedCategory, 3, user?._id || "")
}
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
          let selectedCategory;
          selectedCategory = Object.keys(tabs).find(key => tabs[key] === true);
          if(selectedCategory == "nonfiction"){
  selectedCategory = "non-fiction"
          }
          setEmptyData(false)
          getPopularStories(selectedCategory, 3, user?._id || "")
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
  
  }, [tabs, user])
  useEffect(() => {
    setEmptyData(false)
    if(data.length > 1){
      setEmptyData(false)
      setPopularStories(data)
    }
  }, [data, statusCode, setPopularStories])
  useEffect(() => {
    if(!isLoading){
      if(data.length == 0 && !error){
        setEmptyData(true)
      }
    }
        }, [data, isLoading, error])
  return (
   <>
       <section className="popular-stories-featured-stories" onClick={closeContextMenu} ref={popularStoriesRef}>
    <Share  share={shareRef} shareModal={shareModal} shareUrl={shareUrl} setShareUrl={setShareUrl}/>
      <h2>Popular Stories</h2>
    <Tab tabs={tabs} setTab={setTab}  
    labelWidth={200}
    scale={true}
         style={{display : "flex", justifyContent : "center", marginBottom : "20px"}}

          
         />
         {
          emptyData ?
          <NoContent 
          fireClick={
            () => {

            
resendRequest()
            }}
          message={"There is no popular stories"} />
           :
          <div className="popular-stories-story-grid">
      { !error && 
      data.map((story, index) => (
<PopularStoriesCard
setCurrentStoryDetails={setCurrentStoryDetails}
isLoading={isLoading}
error={error}
 key={index} story={story} fireClick={fireClick}/>
      ))
      }
{error && <>


      { error?.code == "ERR_NETWORK" ? 
        <ErrorMessage title={"Check Your Internet Connection"} 
  message={"We are unable to load this content, check your connection"}
  height={60}
  type={error.code}
  fireClick = {resendRequest}
 />
      :
      error?.code == "ERR_CANCELED"

      ?
      <ErrorMessage title={"Timeout Error"} 
  message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
  height={60}
  type={error.code}
  fireClick = {resendRequest}
 />
      :
      <ErrorMessage title={"Something went wrong"} 
  message={"We are unable to load this content,Pls click on the refresh button"}
  height={60}
  type={error.code}
  fireClick = {resendRequest}
 />
      }
      </>
}
{
  data.length === 0 && !error &&

      loadingState.map((story, index) => (
<PopularStoriesCard
isLoading={true}
error={error}
 key={index} story={story} fireClick={fireClick}/>
      ))
      
}

      <ContextMenu
       state={"feed"}
       contextMenu={contextMenu}
       stories={popularStories}
       shareModal={shareModal}
       currentStoryDetails={currentStoryDetails}
       setCurrentStoryDetails={setCurrentStoryDetails}
                  setContextMenu={setContextMenu}
                  contextMenuData={[
                  {id : 1, icon : <FaShareAlt />
                  , label : "Share", type : "default"},
                  {id : 2, icon : <FaBookmark />
                  , label : "Bookmark", type : "custom"},
                  {id : 3, icon : <MdOutlineFavorite />
                  , label : "Like", type :"custom"},
                  {id : 4, icon : <FaTimes/>
                    , label : "Close", type : "default"},
]} />
         {/* Featured stories will be dynamically added here  */}
      </div>
         }
   
    </section>
   
   </>
  )
}

export default PopularStories