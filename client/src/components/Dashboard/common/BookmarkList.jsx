import "../../../styles/components/Dashboard/bookmark-card.css"
import { FaRegBookmark, FaShareAlt } from "react-icons/fa";
import {  MdReadMore,  MdOutlineFavoriteBorder } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import StoryCard from "../../Profile/StoryCard";
import LoadingCard from "../../Profile/LoadingCard";
import  { useModalContext } from "../../../hooks/useModalContext"
import ContextMenu from "../../common/ContextMenu";
import ErrorMessage from "../../common/ErrorMessage";
import { FaSearch } from "react-icons/fa";
import useWindowSize from "../../../hooks/useWindowSize";
import { useState } from "react";
import Share from "../../common/Share"
import useNavigatePage from "../../../hooks/useNavigatePage";
import { useRef, useEffect } from "react"
const BookmarkList = ({  getUserBookmarks,
   isLoading,
   error,
   data,
  bookmarkCount,
  bookmarkData,
  setBookmarkData,
  setBookmarkNumber,
setOriginalBookmarkData

 }) => {
  const lastItemRef = useRef();
  const loadingRef = useRef();
  const [page, setPage]  = useState(1)
  const [limit, setLimit] = useState(3)
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const [preventLoadMore, setPreventLoadMore] = useState(false)
  const [emptyData, setEmptyData] = useState(false)
  const { width } = useWindowSize();
  const  navigateToPage = useNavigatePage()
  useEffect(() => {
     if(width < 767){
      setLimit(1)
      setLoadingState([{}])
    }
    else{
      setLimit(3)     
      setLoadingState([{}, {}, {}])
    }
    }, [width])
 useEffect(() => {
        getUserBookmarks(page, limit)
  }, [page, limit, bookmarkCount])
  useEffect(() => {
if(bookmarkData.length === bookmarkCount && bookmarkCount > 0){
  setPreventLoadMore(true)
}
  }, [bookmarkData, bookmarkCount])
  const updateBookmarks = (prev) => {
    const newBookmarks = data.filter(
      (newLike) => !prev.some((prevLike) => prevLike._id === newLike._id)
    );
    return [...prev, ...newBookmarks];
  }
  useEffect(() => {
    if(data.length == 0 && bookmarkCount > 0){
      setPage(1)
    }
      if(data.length > 0){
        setEmptyData(false)
   setBookmarkData(updateBookmarks)
   setOriginalBookmarkData(updateBookmarks)
        }
  }, [data])

    const {
      contextMenu,
       shareModal,
   shareRef,
   shareUrl,
   setShareUrl,
   fireClick,
   setContextMenu
  } = useModalContext()
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
    }, [lastItemRef, isLoading, bookmarkData, bookmarkCount, preventLoadMore]);
    
    useEffect(() => {
      if(!isLoading){
        if(preventLoadMore && bookmarkData.length == 0){
          setEmptyData(true)
        }
        if(data.length == 0 && !error && page == 1 && bookmarkCount == 0){
          setEmptyData(true)
        }
        if(bookmarkCount == 0 ){
          setEmptyData(true)
        }
      }
          }, [data, isLoading, bookmarkCount, bookmarkData, preventLoadMore, limit, page, error])

    const resendRequest = () => {
      setEmptyData(false)
      getUserBookmarks(page, limit)
    }
  return (
    <>
    
  { !error && 
  
  <div className="litenote-dashboard-stories-preview-grid bookmark-no-scroll"
  style={{paddingBottom : "70px", paddingTop : "0px"}}
    >
      {
        emptyData ?
        <div 
        className="litenote-bookmark-empty-data"  
   
        >
<div 
    style={{display :"flex", flexDirection : "column", 
        alignItems : "center", justifyContent : "center", padding : "40px 0px"}}
        className="no-content-section"
        >
        <FaBoxOpen size={200}/>
        <h3
        style={{padding : "0px 70px", textAlign : "center"}}
        >You havent bookmarked any stories, Start exploring and bookmark your favorite stories to find them here later.</h3>
        <div><button className="offline-button"
onClick={() => navigateToPage("/explore")}
 ><FaSearch size={20}/>Explore Stories</button></div> 
        </div>

        
          </div>
       
        :
      <>
      {bookmarkData.map((story, index) => (
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
    <ContextMenu
  state={"feed"}
  contextMenu={contextMenu}
  stories={bookmarkData}
  setStories={setBookmarkData}
  setStoriesNumber={setBookmarkNumber}
  shareModal={shareModal}
             setContextMenu={setContextMenu}
             contextMenuData={[
             {id : 1, icon : <FaShareAlt />
             , label : "Share", type : "default"},
             {id : 2, icon : <FaRegBookmark />
             , label : "Bookmark", type : "custom"},
             {id : 4, icon : <MdOutlineFavoriteBorder />
             , label : "Like", type : "custom"},
             {id : 5, icon : <MdReadMore />
              , label : "Read More", type : "default"}
]} />
      </>
}


   
    </div>
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
<Share 
share={shareRef} shareModal={shareModal} shareUrl={shareUrl} setShareUrl={setShareUrl}
/>
    </>
  )
}

export default BookmarkList