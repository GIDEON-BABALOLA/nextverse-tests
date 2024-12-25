import "../../../styles/components/Dashboard/bookmark-card.css"
import { FaEllipsisH } from "react-icons/fa";
import { FaRegBookmark, FaBookOpen, FaTimes, FaShareAlt } from "react-icons/fa";
import { MdClose, MdShare, MdDelete, MdReadMore, MdBookmark } from "react-icons/md";
import {useGetUserBookmarks} from "../../../hooks/useGetUserBookmarks"
import StoryCard from "../../Profile/StoryCard";
import LoadingCard from "../../Profile/LoadingCard";
import  { useModalContext } from "../../../hooks/useModalContext"
import ContextMenu from "../../common/ContextMenu";
import useWindowSize from "../../../hooks/useWindowSize";
import { useState } from "react";
import Share from "../../common/Share"
import { useRef, useEffect } from "react"
const BookmarkList = () => {
  const lastItemRef = useRef();
  const { getUserBookmarks, isLoading, error, data, statusCode, bookmarkCount } = useGetUserBookmarks();
  const [page, setPage]  = useState(1)
  const [limit, setLimit] = useState(20)
  const [bookmarkData, setBookmarkData] = useState([])
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const { width } = useWindowSize();
  useEffect(() => {
    if(width < 768){
      setLimit(2)
      setLoadingState([{}, {}])
    }
    else if(width < 767){
      setLimit(1)
      setLoadingState([{}])
    }
    else{
      setLimit(3)
      setLoadingState([{}, {}, {}])
    }
    }, [width])
 useEffect(() => {
      const skip = (page * limit);
      if (skip >= bookmarkCount && bookmarkCount > 0) {
  return;
      }
        getUserBookmarks(page, limit)
     
  }, [page, limit])
  useEffect(() => {

    if(data.length > 0){
      console.log(data)
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
   fireClick,
   setContextMenu,
   closeContextMenu
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
    
      if (lastItemRef.current && !isLoading) {
        observer.observe(lastItemRef.current);
      }
    
      return () => {
        if (lastItemRef.current) {
          observer.unobserve(lastItemRef.current);
        }
      };
    }, [lastItemRef, isLoading, data]);
  return (
    <>
  <div className="litenote-dashboard-stories-preview-grid"
onClick={closeContextMenu}
    >
    {bookmarkData.map((story, index) => (
      <StoryCard key={index} story={story.bookmarkId} fireClick={fireClick}/>
    ))}
      { isLoading && loadingState.map((story, index) => (
      <LoadingCard key={index} story={story} fireClick={fireClick} isLoading={true}/>
    ))}

    <div ref={lastItemRef}></div>
    <ContextMenu
       state={"feed"}
       contextMenu={contextMenu}
       shareModal={shareModal}
                  setContextMenu={setContextMenu}
                  contextMenuData={[
                  {id : 1, icon : <FaShareAlt />
                  , label : "Share"},
                  {id : 2, icon : <MdBookmark />
                  , label : "UnBookmark"},
                  {id : 3, icon : <MdReadMore/>
                  , label : "Read More"},
                  {id : 4, icon : <FaTimes />
                  , label : "Close"}
]} />
    </div>
    </>
  )
}

export default BookmarkList