import DashboardToast from "../../components/common/DashboardToast.jsx"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader.jsx';
import RotationLoader from "../../components/Loaders/RotationLoader.jsx"
import { useState, useEffect, useRef } from "react";
import BookmarkList from "../../components/Dashboard/common/BookmarkList.jsx";
import Tab from "../../components/common/Tab.jsx";
import "../../styles/components/Dashboard/bookmark-page.css"


const BookmarksPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const [loadPage, setLoadPage] = useState(true)
  const [tabs, setTab] = useState({
    all : true,
    category : false,
    "date added" : false,
    "read time" : false
  })
  useEffect(() => {
    console.log(tabs)
    setTimeout(() => {
      setLoadPage(false)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
  
      //   if (contextMenu) {
      //     window.addEventListener('scroll', () => {
      //       console.log("dave")
      //       contextMenu.current.style.visibility = "hidden";
      //     });
      //   }
    
      //   return () => {
      //     if (contextMenu) {
      //       window.removeEventListener('scroll', () => {
      //         contextMenu.current.style.visibility = "hidden";
      //       });
      //     }
      //   };
      // }, [contextMenu]);
  return (
    <>
    {loadPage ? 
    <>
    <RotationLoader />
    </>
     : <>
    <main>
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <div className="litenote-bookmark-title">
   <h4>
  Filter Your Bookmarks
  </h4>
    <Tab tabs={tabs} setTab={setTab}/>
   </div>
 
    <div className="litenote-browse-bookmark-grid" style={{marginTop : "20px"}}>
    <BookmarkList />
      </div>
    </main>

    <div className="litenote-dashboard-right" style={{left : "-70px", position : "relative"}}>
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    
    </div>
    </>
    }
    </>
  )
}

export default BookmarksPage