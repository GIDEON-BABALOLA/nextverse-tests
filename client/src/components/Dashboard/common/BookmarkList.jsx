import "../../../styles/components/Dashboard/bookmark-card.css"
import { FaEllipsisH } from "react-icons/fa";
import { FaRegBookmark, FaBookOpen, FaTimes, FaShareAlt } from "react-icons/fa";
import { MdClose, MdShare, MdDelete, MdReadMore, MdBookmark } from "react-icons/md";
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
import { useRef, useEffect } from "react"
const BookmarkList = ({  getUserBookmarks, isLoading, error, data, bookmarkCount }) => {
  const lastItemRef = useRef();
  const loadingRef = useRef();
  const [page, setPage]  = useState(1)
  const [limit, setLimit] = useState(3)
  const [bookmarkData, setBookmarkData] = useState([])
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const [emptyData, setEmptyData] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentStoryDetails, setCurrentStoryDetails] = useState({
    isLiked : "",
    isBookmarked : ""
  })
  const { width } = useWindowSize();
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
  return;
      }
        getUserBookmarks(page, limit)
     
  }, [page, limit, bookmarkCount])
  useEffect(() => {

    if(data.length > 0){
      setEmptyData(false)
      setBookmarkData((prev) => {
        const newLikes = data.filter(
          (newLike) => !prev.some((prevLike) => prevLike.bookmarkId._id === newLike.bookmarkId._id)
        );
        return [...prev, ...newLikes];
      });
      // setLikesNumber(likesCount)
      
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
              setPage((prevPage) => prevPage + 1);
            observer.unobserve(entry.target); // Pause observer to prevent duplicate triggers
          }
        },
        { threshold: 0.1, } // Adjust threshold as needed
      );
    
      if (lastItemRef.current && !isLoading) {
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
        if(data.length == 0 && !error){
          setEmptyData(true)
        }
      }
          }, [data, isLoading, error])
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        // If the user is trying to scroll down, prevent the scroll
        if(isLoading){
          if (currentScrollY > lastScrollY && isVisibleInViewport(loadingRef.current, 0.1)) {
            window.scrollTo(0, lastScrollY); // Reset the scroll position to the last known position
          } else {
            // Update the last scroll position if scrolling up
            setLastScrollY(currentScrollY);
          }
        }
    
      };
    
      // Add the scroll event listener
      window.addEventListener("scroll", handleScroll);
    
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollY, isLoading]);
    const resendRequest = () => {
      setEmptyData(false)
      getUserBookmarks(page, limit)
    }
  return (
    <>
    
  { !error && 
  
  <div className="litenote-dashboard-stories-preview-grid bookmark-no-scroll"
    >
      {
        emptyData ?
        <div 
        className="litenote-bookmark-title"  
   
        >

<h4>
You havent bookmarked any stories yet! Start exploring and bookmark your favorite stories to find them here later.
</h4>


        <div><button className="offline-button"
 onClick={() => fireClick()}
 ><FaSearch size={20}/>Explore Stories</button></div>
        
          </div>
       
        :
      <>
      {bookmarkData.map((story, index) => (
      <StoryCard key={index} story={story.bookmarkId} fireClick={fireClick}
      setCurrentStoryDetails={setCurrentStoryDetails}
      />
    ))}
      { isLoading && loadingState.map((story, index) => (
      <LoadingCard
      ref={loadingRef}
      key={index} story={story} fireClick={fireClick} isLoading={true}/>
    ))}
      </>
}


    <div ref={lastItemRef} style={{margin : "90px 0px"}}>
      </div>
    <ContextMenu
       state={"feed"}
       contextMenu={contextMenu}
       shareModal={shareModal}
                  setContextMenu={setContextMenu}
                  contextMenuData={[
                  {id : 1, icon : <FaShareAlt />
                  , label : "Share"},
                  {id : 2, icon : <FaRegBookmark />
                  , label : "UnBookmark"},
                  {id : 3, icon : <MdReadMore/>
                  , label : "Read More"},
                  {id : 4, icon : <FaTimes />
                  , label : "Close"}
]} />
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