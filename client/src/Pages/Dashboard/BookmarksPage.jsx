import DashboardToast from "../../components/common/DashboardToast.jsx"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader.jsx';
import RotationLoader from "../../components/Loaders/RotationLoader.jsx"
import { useState, useEffect, useRef } from "react";
import BookmarkCard from "../../components/Dashboard/common/BookmarkCard.jsx";

import "../../styles/components/Dashboard/bookmark-page.css"


const BookmarksPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const [loadPage, setLoadPage] = useState(true)
  const [slideDistance, setSlideDistance] = useState(0)
  const tabRef = useRef()
  const [tabs, setTab] = useState({
    all : true,
    category : false,
    date : false,
    read : false
  })
  let startX, startY, endX, endY;
  const minSwipeDistance = 50;
  const handleTouchStart = (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
console.log("start")
  }
  const handleTouchEnd = (event) => {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    console.log(deltaY)

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right
        tabRef.current.style.animation = "2s slideright forwards"
      } else {
        console.log("swipe left")
         tabRef.current.style.animation = "2s slideleft forwards"
      }
    }
  }
  const clickMe = (e) => {

    switch (e.target.innerText) {
      case "All":
        setSlideDistance(0)
        setTab({
          all : true,
          category : false,
          date : false,
          read : false
        })
        break;
        case "Category":
          setSlideDistance(200)
          setTab({
            all : false,
            category : true,
            date : false,
            read : false
          })
        break;
        case "Date Added":
          setSlideDistance(400)
          setTab({
            all : false,
            category : false,
            date : true,
            read : false
          })
        break;
        case "Read Time":
          setSlideDistance(600)
          setTab({
            all : false,
            category : false,
            date : false,
            read : true
          })
        break;
      default:
        setSlideDistance(0)
        break;
    }
  }
  useEffect(() => {
    console.log(tabs)
    setTimeout(() => {
      setLoadPage(false)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
      // useEffect(() => {
  
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
  
  <div className="bookmark-tabs-wrapper" >
        <div className="bookmark-tabs"  onTouchStart={handleTouchStart}
onTouchEnd={handleTouchEnd}
ref={tabRef}
>
      
        <label htmlFor="tab0"
        style={{color : tabs.all == true && "var(--color-primary)"  }}
         onClick={clickMe} >All</label>

            <label htmlFor="tab1"
            style={{color : 
            tabs.category == true && "var(--color-primary)" }}
             onClick={clickMe}>Category</label>
            
            
            <label htmlFor="tab2" 
            style={{color : tabs.date == true && "var(--color-primary)" }}
            onClick={clickMe}>Date Added</label>
          
            <label htmlFor="tab3"
            style={{color : tabs.read == true && "var(--color-primary)" }}
             onClick={clickMe}>Read Time</label>
            <div className="glider" style={{   transform: `translateX(${slideDistance}px)`}}></div>
        </div>
    </div>
   </div>
 
    <div className="litenote-browse-bookmark-grid"  >
    <BookmarkCard />
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