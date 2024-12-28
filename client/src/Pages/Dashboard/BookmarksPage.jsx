import DashboardToast from "../../components/common/DashboardToast.jsx"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader.jsx';
import RotationLoader from "../../components/Loaders/RotationLoader.jsx"
import { useModalContext } from "../../hooks/useModalContext.jsx";
import { useState, useEffect, useRef } from "react";
import BookmarkList from "../../components/Dashboard/common/BookmarkList.jsx";
import { useGetUserBookmarks } from "../../hooks/useGetUserBookmarks.jsx";
import Tab from "../../components/common/Tab.jsx";
import "../../styles/components/Dashboard/bookmark-page.css"
const BookmarksPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
    const { getUserBookmarks, isLoading, error, data, bookmarkCount } = useGetUserBookmarks();
    const { closeContextMenu } = useModalContext();
  const [tabs, setTab] = useState({
    all : true,
    category : false,
    "date added" : false,
    "read time" : false
  })
      const [contextMenu, setContextMenu] = useState()
  return (

      <>
    <main  onClick={closeContextMenu} >
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <div className="litenote-bookmark-title"  >
   <h3 style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "5px", marginBottom : "10px"}}>
    <span>Filter Your Bookmarks
    </span>
  <span className="bookmark-status-badge"
     >{bookmarkCount}</span>
  </h3>
  <Tab tabs={tabs} setTab={setTab} labelWidth={200} scale={false}/>
   </div>
   
    <div className="litenote-browse-bookmark-grid" style={{marginTop : "0px"}}>
    <BookmarkList data={data} bookmarkCount={bookmarkCount} error={error} isLoading={isLoading} getUserBookmarks={getUserBookmarks}/>
      </div>
    </main>

    <div className="litenote-dashboard-right" style={{left : "-70px", position : "relative"}}>
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    
    </div>
    </>
    
    
  )
}

export default BookmarksPage