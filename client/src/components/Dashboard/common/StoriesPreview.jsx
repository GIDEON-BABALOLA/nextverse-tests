import { useModalContext } from "../../../hooks/useModalContext"
import StoryCard from "../../Profile/StoryCard"
import "../../../styles/components/Dashboard/stories-preview-page.css"
import ContextMenu from "../../common/ContextMenu"
import { MdDelete, MdReadMore } from "react-icons/md"
import Share from "../../common/Share"
import { FaShareAlt, FaTimes } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"
import ErrorMessage from "../../common/ErrorMessage"
import LoadingCard from "../../Profile/LoadingCard"
import { useGetUserStories } from "../../../hooks/useGetUserStories"
import useWindowSize from "../../../hooks/useWindowSize"
import { FaBoxOpen, FaSearch } from "react-icons/fa"
import DeleteConsent from "../../common/DeleteConsent"
import { FaTrash, FaRegTrashAlt, FaTrashAlt } from "react-icons/fa";
import { useDeleteAStory } from "../../../hooks/useDeleteAStory"
import { useToastContext } from "../../../hooks/useToastContext"
import Toast from "../../common/Toast"
const StoriesPreview = ({ setCounts, setTab, setSlideDistance }) => {
  const { getUserStories, isLoading, error, data, storyCount } = useGetUserStories();
  const deleteStory = useDeleteAStory();
  const [openModal, setOpenModal] = useState(false)
  const { width } = useWindowSize();
  const [myStories, setMyStories] = useState([])
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const [preventLoadMore, setPreventLoadMore] = useState(false)
  const [emptyData, setEmptyData] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const lastItemRef = useRef();
  const loadingRef = useRef();
  const { showToast } = useToastContext()
  const {
    contextMenu,
     shareModal,
 shareRef,
 fireClick,
 setContextMenu,
 shareUrl,
 setShareUrl,
 closeContextMenu,
 currentStoryId
} = useModalContext()
useEffect(() => {
  if(deleteStory.error){
showToast("Error", deleteStory.error, false)
  }
}, [deleteStory.error, showToast])
useEffect(() => {
  console.log("me")
  setCounts((prev) => {
    return {...prev, stories :storyCount}
  })
    }, [storyCount, setCounts])
    useEffect(() => {
if(!deleteStory.error && Object.keys(deleteStory.data).length > 0 ){
  setOpenModal(false)
  setCounts((prev) => {
    return {...prev, stories : prev.stories - 1}
  })
  const newStories = [...myStories].filter((story) => story._id !== currentStoryId)
  setMyStories(newStories)
}
    }, [deleteStory.data, deleteStory.error])
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
console.log(emptyData)
}, [emptyData])
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
      const deleteAStory = () => {
deleteStory.deleteAStory(currentStoryId)
      }
const resendRequest = () => {
  setEmptyData(false)
  getUserStories(page, limit)
}
const startWriting = () => {
setSlideDistance(0)
setTab({
  write : true,
  notes : false,
  stories : false,
  "sticky notes" : false
})
}
  return (
    <section className="litenote-dashboard-notes-preview" onClick={closeContextMenu}
    >
      <Toast />
                <DeleteConsent openModal={openModal} setOpenModal={setOpenModal}
                title={"Are you sure you want to delete?"}
                message={"This action will permanently delete your Story. This cannot be undone"}
                buttonText ={"Delete Story"}
                deleteFunction={deleteAStory}
                error={deleteStory.error}
                isLoading={deleteStory.isLoading}
                />
    <div className="litenote-dashboard-stories-preview-grid"
    >
              { !error && <>

              {
                emptyData ? 
  <div 
      style={{display :"flex", flexDirection : "column", 
          alignItems : "center", justifyContent : "center", padding : "40px 0px"}}
          className="no-content-section"
          >
          <FaBoxOpen size={200}/>
          <h3
          style={{padding : "0px 70px", textAlign : "center"}}
          >You havent Written any story, Click the button below to start writing</h3>
          <div><button className="offline-button"
          onClick={() => startWriting()}
   ><FaSearch size={20}/>Start Writing</button></div> 
          </div>
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
      <Share 
share={shareRef} shareModal={shareModal} shareUrl={shareUrl} setShareUrl={setShareUrl}
/>
      <ContextMenu
      stories={myStories}
       state={"feed"}
       contextMenu={contextMenu}
       setDeleteModal={setOpenModal}
       shareModal={shareModal}
                  setContextMenu={setContextMenu}
                  contextMenuData={[
                  {id : 1, icon : <FaShareAlt />
                  , label : "Share"},
                  {id : 2, icon : <FaTrash/>
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