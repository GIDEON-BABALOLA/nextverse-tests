import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import "../../styles/components/Dashboard/stories-page.css"
import { useState, useEffect, useRef } from "react";
import TextEditor from "../../components/Dashboard/common/TextEditor";
import { FaAngleDown } from "react-icons/fa"
import NotesPreview from "../../components/Dashboard/common/NotesPreview";
import StoriesPreview from "../../components/Dashboard/common/StoriesPreview";
import useWindowSize from "../../hooks/useWindowSize";
import StickyNotes from "../../components/Dashboard/common/StickyNotes";
import PublishTab from "./PublishTab";
const StoriesPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const {width } =  useWindowSize()
  const [stickyNotesCount, setStickyNotesCount ] = useState(JSON.parse(localStorage.getItem("stickyNotes"))?.length || 0 )
  const selectMenu = useRef() 
  const list = useRef()
  const selectButton = useRef()
  const [loadPage, setLoadPage] = useState(true)
  const [active, setActive] = useState(false)
  const [slideDistance, setSlideDistance] = useState(0)
  const [tabs, setTab] = useState({
    write : true,
    notes : false,
    stories : false,
    "sticky notes" : false
  })
  const [counts, setCounts] = useState({
    write : 0,
    notes : 0,
    stories : 0,
    "sticky notes" : 0
  })
      const [contextMenu, setContextMenu] = useState()
  return (
    <>

 

     
    <main style={{display : "flex", flexDirection : "column"}}>
    
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
  <div
  className="show-me-hello"
  >  <h3> Hello Gideon Babalola <span className="hand-stories"> &#128075;</span></h3></div>
 <div className="stories-page-title">
 <PublishTab 
 tabs={tabs}
setTab={setTab}
labelWidth={200}
scale={true}
counts={counts}
/>
 </div>


   
{tabs.write && <TextEditor />}
{tabs.notes && <NotesPreview />}
{tabs.stories && <StoriesPreview />}
{tabs["sticky notes"] && <StickyNotes 
  stickyNotesCount={stickyNotesCount}
  setStickyNotesCount={setStickyNotesCount}
/>}


    </main>

    <div className="litenote-dashboard-right reports-page-right-stories">
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>

    </div>

    
    </>
  )
}

export default StoriesPage