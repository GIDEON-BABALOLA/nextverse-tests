import { useModalContext } from "../../../hooks/useModalContext"
import StoryCard from "../../Profile/StoryCard"
import "../../../styles/components/Dashboard/stories-preview-page.css"
import ContextMenu from "../../common/ContextMenu"
import { MdDelete, MdReadMore } from "react-icons/md"
import Share from "../../common/Share"
import { FaShareAlt, FaTimes } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"
import ErrorMessage from "../../common/ErrorMessage"
import { useAuthContext } from "../../../hooks/useAuthContext"
import { useGetUserProfile } from "../../../hooks/useGetUserProfile"
import LoadingCard from "../../Profile/LoadingCard"
import { useGetUserStories } from "../../../hooks/useGetUserStories"
import useWindowSize from "../../../hooks/useWindowSize"
import NoContent from "../../common/NoContent"
const StoriesPreview = () => {
  const { getUserStories, isLoading, error, data, storyCount } = useGetUserStories();
  const { width } = useWindowSize();
  const [myStories, setMyStories] = useState([])
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const [preventLoadMore, setPreventLoadMore] = useState(false)
  const [emptyData, setEmptyData] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const lastItemRef = useRef();
  const loadingRef = useRef();
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
useEffect(() => {
  if(width < 767){
    console.log("how")
   setLimit(1)
   setLoadingState([{}])
 }
 else{
  console.log("why")
   setLimit(3)     
   setLoadingState([{}, {}, {}])
 }
 }, [width])
useEffect(() => {
  if(myStories.length === storyCount && storyCount > 0){
    setPreventLoadMore(true)
  }
    }, [myStories, storyCount])
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
useEffect(() => {
  if(!isLoading){
    if(preventLoadMore && myStories.length == 0){
      setEmptyData(true)
    }
    if(data.length == 0 && !error && page == 1 && storyCount == 0){
      setEmptyData(true)
    }
    if(storyCount == 0 ){
      setEmptyData(true)
    }
  }
      }, [data, isLoading, storyCount, myStories, preventLoadMore, limit, page, error])
const resendRequest = () => {
  setEmptyData(false)
  getUserStories(page, limit)
}
  return (
    <section className="litenote-dashboard-notes-preview" onClick={closeContextMenu}
  
    >
    <div className="litenote-dashboard-stories-preview-grid"
    >
              { !error && <>

              {
                emptyData ? 
                <NoContent />
                :
              
              <>
        
          {myStories.map((story, index) => (
      <StoryCard key={index} story={story} fireClick={fireClick}
      isLoading={false}
      />
    ))}
      { isLoading && loadingState.map((story, index) => (
      <LoadingCard
      ref={loadingRef}
      key={index} story={story} fireClick={fireClick} isLoading={true}/>
    ))}
      <div ref={lastItemRef} style={{margin : "40px 0px"}}>
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
              
      </>
}
        </> }
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
      </div>
    </section>
  )
}

export default StoriesPreview