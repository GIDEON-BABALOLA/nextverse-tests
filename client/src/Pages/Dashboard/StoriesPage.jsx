import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import "../../styles/components/Dashboard/stories-page.css"
import { useState, useEffect, useRef } from "react";
import TextEditor from "../../components/Dashboard/common/TextEditor";
import useWindowSize from "../../hooks/useWindowSize";
const StoriesPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const {width } =  useWindowSize()
  const [loadPage, setLoadPage] = useState(true)
  const [slideDistance, setSlideDistance] = useState(0)
  const tabRef = useRef()
  const [tabs, setTab] = useState({
    notes : true,
    stories : false,
    articles : false
 
  })
  const slideTab = (e) => {
    console.log(e.target.innerText)
switch (e.target.innerText.split("\n")[0]) {
  case "Notes":
    setSlideDistance(0)
    setTab({
      notes : true,
      stories : false,
      articles : false,
    })
    break;
    case "Stories":
      setSlideDistance( width < 768 ? 110 : 200)
      setTab({
        notes : false,
        stories : true,
        articles : false,
      })
    break;
    case "Articles":
      setSlideDistance( width < 768 ? 220 : 400)
      setTab({
        notes : false,
        stories : false,
        articles : true,
      })
    break;

  default:
    setSlideDistance(0)
    setTab({
      notes : true,
      stories : false,
      articles : false,
    })
    break;
}
  }
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
      useEffect(() => {
  
        if (contextMenu) {
          window.addEventListener('scroll', () => {
            console.log("dave")
            contextMenu.current.style.visibility = "hidden";
          });
        }
    
        return () => {
          if (contextMenu) {
            window.removeEventListener('scroll', () => {
              contextMenu.current.style.visibility = "hidden";
            });
          }
        };
      }, [contextMenu]);
  return (
    <>
    {loadPage ? 
    <>
    <RotationLoader />
    </>
     : <>
    <main>
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
  <div
  style={{marginTop : "10px", fontWeight : 1000, fontFamily : "Poppins"}}
  >  <h3> Hello Gideon Babalola &#128075;</h3></div>
 
   <div className="stories-page-title">
   <div className="container">
	<div className="tabs">
		
		<label
     style={{color : tabs.notes == true && "var(--primary-cocolor)", fontSize : "1.5rem" }}
    onClick={slideTab}
     className="tab" htmlFor="radio-1" >Notes<span className="notification"
     style={{backgroundColor : tabs.notes == true && "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >2</span>
      
     </label>
	
		<label
     style={{color : tabs.stories == true && "var(--primary-cocolor)", fontSize : "1.5rem" }}
    onClick={slideTab}
     className="tab" htmlFor="radio-2"  >Stories
      <span className="notification"
     style={{backgroundColor : tabs.stories == true && "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >3</span>
     </label>

		<label
     style={{color : tabs.articles == true && "var(--primary-cocolor)", fontSize : "1.5rem" }}
     onClick={slideTab}
     className="tab"  htmlFor="radio-3" >Articles
      <span className="notification"
     style={{backgroundColor : tabs.articles == true && "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >5</span>
     </label>
		<span className="stories-glider"
   
     style={{   transform: `translateX(${slideDistance}px)`, width :  width  < 768 ? "110px" : "200px"}} ></span>
	</div>
  </div>
</div>
<TextEditor />


    </main>

    <div className="litenote-dashboard-right reports-page-right-stories">
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div>
    </>
    }
    </>
  )
}

export default StoriesPage