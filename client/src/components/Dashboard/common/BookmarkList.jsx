import "../../../styles/components/Dashboard/bookmark-card.css"
import { FaEllipsisH } from "react-icons/fa";
import { FaRegBookmark, FaBookOpen, FaTimes, FaShareAlt } from "react-icons/fa";
import { MdClose, MdShare, MdDelete, MdReadMore, MdBookmark, MdOutlineFavoriteBorder } from "react-icons/md";
import {useGetUserBookmarks} from "../../../hooks/useGetUserBookmarks"
import { FaBoxOpen } from "react-icons/fa";
import StoryCard from "../../Profile/StoryCard";
import LoadingCard from "../../Profile/LoadingCard";
import  { useModalContext } from "../../../hooks/useModalContext"
import ContextMenu from "../../common/ContextMenu";
import { isVisibleInViewport } from "../../../helpers/isVisibleInViewPort";
import NoContent from "../../common/NoContent";
import ErrorMessage from "../../common/ErrorMessage";
import { FaSearch } from "react-icons/fa";
import useWindowSize from "../../../hooks/useWindowSize";
import { MdOutlineRefresh } from "react-icons/md";
import { useState } from "react";
import Share from "../../common/Share"
import useNavigatePage from "../../../hooks/useNavigatePage";
import { useRef, useEffect } from "react"
const BookmarkList = ({  getUserBookmarks,
   isLoading,
   specialId,
   error,
   data,
  bookmarkCount,
  bookmarkData,
  setBookmarkData,
  setBookmarkNumber,
bookmarkNumber,
setOriginalBookmarkData

 }) => {
  const lastItemRef = useRef();
  const loadingRef = useRef();
  const [page, setPage]  = useState(1)
  const [limit, setLimit] = useState(3)
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const [emptyData, setEmptyData] = useState(false)
  const [loadMore, setLoadMore] = useState(true)
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
   /* React Hook useEffect has a missing dependency: 'getUserBookmarks'. Either include it or remove the dependency array. If 'getUserBookmarks' changes too often, find the parent component that defines it and wrap that definition in useCallback */
 useEffect(() => {
  const skip = (page - 1) * limit;
    if (skip >= bookmarkCount && bookmarkCount > 0) {
        setPage(1)
      return;
    }
        getUserBookmarks(page, limit)
     
  }, [page, limit, bookmarkCount])
  useEffect(() => {
    if(bookmarkData.slice("-1")[0]?._id !== specialId){
      setLoadMore(false)
    }
  }, [bookmarkData, specialId])
  
  const updateBookmarks = (prev) => {
    const newBookmarks = data.filter(
      (newLike) => !prev.some((prevLike) => prevLike._id === newLike._id)
    );
    return [...prev, ...newBookmarks];
  }
  useEffect(() => {
    if(data.length > 0){
      setEmptyData(false)
 setBookmarkData(updateBookmarks)
 setOriginalBookmarkData(updateBookmarks)
    }

  
  }, [data, error, isLoading])

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
            console.log("I am intersecting")
              setPage((prevPage) => prevPage + 1);
            observer.unobserve(entry.target); // Pause observer to prevent duplicate triggers
          }
        },
        { threshold: 0.1, } // Adjust threshold as needed
      );
    
      if (lastItemRef.current && !isLoading ) {
        observer.observe(lastItemRef.current);
        
      }
    
      return () => {
        if (lastItemRef.current) {
          observer.unobserve(lastItemRef.current);
        }
      };
    }, [lastItemRef, isLoading, data]);
    useEffect(() => {
      if(!isLoading){
        if(data.length == 0 && !error && page == 1 && bookmarkCount == 0){
          setEmptyData(true)
        }else{
          setEmptyData(false)
        }
        if(bookmarkCount == 0 ){
          setEmptyData(true)
        }
        const skip = (page - 1) * limit;
  //       if(skip > bookmarkCount  && bookmarkCount > 0 && bookmarkData.length !== bookmarkCount){
  //         console.log("wow")
  //     setPage((prev) => {
  //       const totalPages = Math.ceil(bookmarkCount / limit);
  // console.log(prev, totalPages)
  //       // Ensure the page stays within valid bounds
  //       const newPage = Math.min(prev, totalPages);
  //       return newPage
  //     });
  //       }
      }
          }, [data, isLoading, bookmarkCount, limit, page])

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
      style={{display : !loadMore && "none"}}
      ref={loadingRef}
      key={index} story={story} fireClick={fireClick} isLoading={true}/>
    ))}
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


    <div ref={lastItemRef} style={{margin : "40px 0px"}}>
      </div>
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