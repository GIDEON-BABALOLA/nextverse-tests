import DashboardToast from "../../components/common/DashboardToast.jsx"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader.jsx';
import RotationLoader from "../../components/Loaders/RotationLoader.jsx"
import { useModalContext } from "../../hooks/useModalContext.jsx";
import { useState, useEffect, useRef, useCallback } from "react";
import BookmarkList from "../../components/Dashboard/common/BookmarkList.jsx";
import { useGetUserBookmarks } from "../../hooks/useGetUserBookmarks.jsx";
import Tab from "../../components/common/Tab.jsx";
import "../../styles/components/Dashboard/bookmark-page.css"
const BookmarksPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
    const { getUserBookmarks, isLoading, error, data, bookmarkCount } = useGetUserBookmarks();
    const { closeContextMenu } = useModalContext();
    const [bookmarkData, setBookmarkData] = useState([])
    const [originalBookmarkData, setOriginalBookmarkData] = useState([])
    const [bookmarkNumber, setBookmarkNumber] = useState(bookmarkCount)
  const [tabs, setTab] = useState({
    all : true,
    category : false,
    "date added" : false,
    "read time" : false
  })
  const filterBookmarkAccordingToCategory = useCallback(() => {
    console.log("I am here")
      const newData = [...originalBookmarkData].sort((a, b) => String(a.category).localeCompare(String(b.category)))
      setBookmarkData(newData)
  },
  [originalBookmarkData]
)
  const filterBookmarkAccordingToReadTime = useCallback(() => {
const newData = [...originalBookmarkData]
.sort((a, b) => 
( a.estimatedReadingTime.minutes + ( a.estimatedReadingTime.seconds / 60)) -
( b.estimatedReadingTime.minutes + ( b.estimatedReadingTime.seconds / 60)))
setBookmarkData(newData)
  },
  [originalBookmarkData]
)
  const filterBookmarkAccordingToDateAdded = useCallback(() => {
    //This sorts the data from newest to oldest, biggest to smallest
    const newData = [...originalBookmarkData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    //This sorts the data from oldest to newest, smallest to biggest
    // const newData = [...originalBookmarkData].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    setBookmarkData(newData)
  },
[originalBookmarkData])
  useEffect(() => {
    if (tabs["category"]) {
      console.log("Here I am")
      filterBookmarkAccordingToCategory();
    } else if (tabs["read time"]) {
      filterBookmarkAccordingToReadTime();
    } else if (tabs["date added"]) {
      filterBookmarkAccordingToDateAdded();
    } else if (tabs["all"]) {
      setBookmarkData(originalBookmarkData);
    }
  }, [tabs, filterBookmarkAccordingToCategory, filterBookmarkAccordingToDateAdded, filterBookmarkAccordingToReadTime, originalBookmarkData]);
  
  useEffect(() => {
setBookmarkNumber(bookmarkCount)
  }, [bookmarkCount])
      const [contextMenu, setContextMenu] = useState()
  return (

      <>
    <main  onClick={closeContextMenu}>
    <div className="litenote-dashboard-right" style={{left : "150px", position : "relative", cursor : "pointer"}}>
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    
    </div>
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <div className="litenote-bookmark-title" >
   <h3 style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "5px"}}>
    <span>Filter Your Bookmarks
    </span>
  <span className="bookmark-status-badge"
     >{bookmarkNumber}</span>
  </h3>
  <Tab tabs={tabs} setTab={setTab} labelWidth={200} scale={false}/>
   </div>
   
    <div className="litenote-browse-bookmark-grid">
    <BookmarkList
    bookmarkData={bookmarkData}
    setBookmarkData={setBookmarkData}
    setOriginalBookmarkData={setOriginalBookmarkData}
    setBookmarkNumber={setBookmarkNumber}
    bookmarkNumber={bookmarkNumber}
    data={data} bookmarkCount={bookmarkCount} error={error} isLoading={isLoading} getUserBookmarks={getUserBookmarks}/>
      </div>
    </main>
    </>
    
    
  )
}

export default BookmarksPage