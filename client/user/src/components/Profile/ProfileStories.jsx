
import Share from "../common/Share"
import ContextMenu from "../common/ContextMenu"
import { useModalContext } from "../../hooks/useModalContext"
import { FaShareAlt, FaBookmark } from "react-icons/fa"
import { MdOutlineFavorite, MdReadMore } from "react-icons/md"
import NoContent from "../../components/common/NoContent"
import ErrorMessage from "../common/ErrorMessage"
import { useRef } from "react"
import StoryCard from "../../components/Profile/StoryCard"
import { useGetUserStories } from "../../hooks/useGetUserStories"
import { useState, useEffect } from "react"
const ProfileStories = ({ username }) => {
  const  { getUserStories, isLoading, error, data, statusCode, storyCount } = useGetUserStories();
  const { lastItemRef } = useRef();
  const { shareModal, shareRef, fireClick, contextMenu, setContextMenu} = useModalContext()
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const [preventLoadMore, setPreventLoadMore] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [emptyData, setEmptyData] = useState(false)
  const [stories, setStories] = useState([])
  useEffect(() => {
    getUserStories(page, limit, username)
  }, [page, limit, username])
  useEffect(() => {
    if(stories.length === storyCount && storyCount > 0){
      setPreventLoadMore(true)
    }
      }, [stories, storyCount])
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
   setStories(updateMyStories)
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
  }, [lastItemRef, isLoading, stories, storyCount, preventLoadMore]);
  useEffect(() => {
    if(!isLoading){
      if(preventLoadMore && stories.length == 0){
        setEmptyData(true)
      }
      if(data.length == 0 && !error && page == 1 && storyCount == 0){
        setEmptyData(true)
      }
      if(storyCount == 0 ){
        setEmptyData(true)
      }
    }
        }, [data, isLoading, storyCount, stories, preventLoadMore, limit, page, error])
  const resendRequest = () => {
    setEmptyData(false)
    getUserStories(page, limit, username)
  }
  return (
   <>
     <Share  share={shareRef} shareModal={shareModal}/>

   {
    !error  &&
    <>
    {
     emptyData ? 
     <div>
       <NoContent message={`${username} Has Not Created Any Story`}
              fireClick={
               () => {
   
               
   resendRequest()
               }}
       />
     </div>
     :
     <div className="litenote-profile-stories-grid">
     {
       stories.map((story, index) => (
         <StoryCard  shareModal={shareModal} 
          isLoading={isLoading}
         fireClick={fireClick} story={story} key={index}/>
       ))
   
     }
       { isLoading &&
       loadingState.map((story, index) => (
         <StoryCard  shareModal={shareModal} 
          isLoading={true}
         fireClick={fireClick} story={story} key={index}/>
       ))
   
     }
      <div ref={lastItemRef} style={{margin : "40px 0px"}} />
    <ContextMenu
    state={"feed"}
    contextMenu={contextMenu}
    stories={stories}
    shareModal={shareModal}
               setContextMenu={setContextMenu}
               contextMenuData={[
               {id : 1, icon : <FaShareAlt />
               , label : "Share", type : "default"},
               {id : 2, icon : <FaBookmark />
               , label : "Bookmark", type : "custom"},
               {id : 3, icon : <MdOutlineFavorite />
                 , label : "Like", type : "custom"},
               {id : 4, icon : <MdReadMore/>
               , label : "Read More"}
   ]} />
   </div>
}
   </> 
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
   </>
  )
}

export default ProfileStories