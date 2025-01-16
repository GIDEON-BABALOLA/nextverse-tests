import { useModalContext } from "../../../hooks/useModalContext"
import StoryCard from "../../Profile/StoryCard"
import "../../../styles/components/Dashboard/stories-preview-page.css"
import ContextMenu from "../../common/ContextMenu"
import { MdDelete, MdReadMore } from "react-icons/md"
import Share from "../../common/Share"
import { FaShareAlt, FaTimes } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"
import { useAuthContext } from "../../../hooks/useAuthContext"
import { useGetUserProfile } from "../../../hooks/useGetUserProfile"
import LoadingCard from "../../Profile/LoadingCard"
import { useGetUserStories } from "../../../hooks/useGetUserStories"
const StoriesPreview = () => {
  const { getUserStories, isLoading, error, data, storyCount } = useGetUserStories();
  const [myStories, setMyStories] = useState([])
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const [preventLoadMore, setPreventLoadMore] = useState(false)
  const [emptyData, setEmptyData] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const { user } = useAuthContext();
  const lastItemRef = useRef();
  const loadingRef = useRef();
  const storyRef = useRef([])
  const {
    contextMenu,
     shareModal,
 shareRef,
 fireClick,
 setContextMenu,
 closeContextMenu
} = useModalContext()
useEffect(() => {
  getUserStories(page, limit)
}, [page, limit])
const updateMyStories = (prev) => {
  const newBookmarks = data.filter(
    (newLike) => !prev.some((prevLike) => prevLike._id === newLike._id)
  );
  return [...prev, ...newBookmarks];
}
useEffect(() => {
  if(data.length == 0 && storyCount > 0){
    setPage(1)
  }
    if(data.length > 0){
      setEmptyData(false)
 setMyStories(updateMyStories)
      }
}, [data, storyCount])
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        observer.unobserve(entry.target); 
      }
    },
    { threshold: 0.1, }
  );
  if (lastItemRef.current && !isLoading ) {
if(!preventLoadMore){
observer.observe(lastItemRef.current);
}
  
  }                                                                                                                                   

  return () => {
    if (lastItemRef.current) {
      observer.unobserve(lastItemRef.current);
    }
  };
}, [lastItemRef, isLoading, myStories, storyCount, preventLoadMore]);
    
  return (
    <section className="litenote-dashboard-notes-preview" onClick={closeContextMenu}
  
    >
    <div className="litenote-dashboard-stories-preview-grid"
    >
      {myStories.map((story, index) => (
      <StoryCard key={index} story={story} fireClick={fireClick}
      isLoading={false}
      />
    ))}
      { isLoading && loadingState.map((story, index) => (
      <LoadingCard
      key={index} story={story} fireClick={fireClick} isLoading={true}/>
    ))}
      </div>
      <Share  share={shareRef} shareModal={shareModal}/>
      <ContextMenu
      stories={myStories}
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