import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import "../../styles/components/Dashboard/stories-page.css"
import { useState, useEffect, useRef } from "react";
import TextEditor from "../../components/Dashboard/common/TextEditor";
import { FaAngleDown } from "react-icons/fa"
import NotesPreview from "../../components/Dashboard/common/NotesPreview";
import useWindowSize from "../../hooks/useWindowSize";
import StickyNotes from "../../components/Dashboard/common/StickyNotes";
import { FaPlus } from "react-icons/fa";
import colors from "../../assets/colors.json"
import SearchFilter  from "../../components/Browse/SearchFilter"
const StoriesPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const {width } =  useWindowSize()
  const selectMenu = useRef() 
  const list = useRef()
  const selectButton = useRef()
  console.log(width)
  const [loadPage, setLoadPage] = useState(true)
  const [active, setActive] = useState(false)
  const [slideDistance, setSlideDistance] = useState(0)
  const [tabs, setTab] = useState({
    write : true,
    notes : false,
    stories : false,
    stickyNotes : false
 
  })
  const chooseOption = (e) => {
    console.log(e.target.innerText.split("\n")[0])
    switch (e.target.innerText.split("\n")[0]) {
      case "Write":
        setTab({
          write : true,
          notes : false,
          stories : false,
          stickyNotes : false,
        })
        break;
        case "Notes":
          setTab({
            write : false,
            notes : true,
            stories : false,
            stickyNotes : false,
          })
          break;
          case "Stories":
            setTab({
              write : false,
              notes : false,
              stories : true,
              stickyNotes : false,
            })
            break;
            case "Sticky Notes":
              setTab({
                write : false,
                notes : false,
                stories : false,
                stickyNotes : true,
              })
              break;
    
      default:
        break;
    }
    setActive(!active)
    console.log(e.target.innerText)
    selectButton.current.innerText = e.target.innerText.split("\n")[0]
    list.current.style.padding = "20px";
    setTimeout(() => {
        list.current.style.display = "none";
      }, 500);
   
  }
  const openOption = () => {
    list.current.style.display = "block";
    setActive(!active)
    if(active === true){
        list.current.style.padding = "20px";
        list.current.style.display = "block";
      setTimeout(() => {
        list.current.style.display = "none";
      }, 500);
    }
  }
  const slideTab = (e) => {
    console.log(e.target.innerText)
switch (e.target.innerText.split("\n")[0]) {
  case "Write":
    setSlideDistance( width < 768 ? 140 : 0)
    setTab({
      write : true,
      notes : false,
      stories : false,
      stickyNotes : false,
    })
    break;
  case "Notes":
    setSlideDistance( width < 768 ? 140 : 170)
    setTab({
      write : false,
      notes : true,
      stories : false,
      stickyNotes : false,
    })
    break;
    case "Stories":
      setSlideDistance( width < 768 ? 140 : 340)
      setTab({
        write : false,
        notes : false,
        stories : true,
        stickyNotes : false,
      })
    break;
    case "Sticky Notes":
      setSlideDistance( width < 768 ? 280 : 510)
      setTab({
        notes : false,
        stories : false,
        stickyNotes : true,
      })
    break;

  default:
    setSlideDistance(0)
    setTab({
      notes : true,
      stories : false,
      stickyNotes : false,
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
     
    <main style={{display : "flex", flexDirection : "column"}}>
    
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
  <div
  className="show-me-hello"
  >  <h3> Hello Gideon Babalola <span className="hand-stories"> &#128075;</span></h3></div>
 
   { width > 768 ? <div className="stories-page-title">
    <div className="container stories-tabs-wrapper">
	<div className="tabs">
  
  <label
     style={{color : tabs.write == true && "var(--primary-cocolor)", fontSize : "1.5rem" }}
    onClick={slideTab}
     className="tab" htmlFor="radio-1" >Write
      
     </label>
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
     style={{color : tabs.stickyNotes == true && "var(--primary-cocolor)", fontSize : "1.5rem", whiteSpace : "" }}
     onClick={slideTab}
     className="tab"  htmlFor="radio-3" >Sticky Notes
      <span className="notification"
     style={{backgroundColor : tabs.stickyNotes == true && "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >5</span>
     </label>
		<span className="stories-glider"
   
     style={{   transform: `translateX(${slideDistance}px)`, width :  width  < 768 ? "120px" : "180px"}} ></span>
	</div>
  </div> 
</div> :
<div className={`litenote-stories-select-menu  ${active ? 'active' : ''}`} ref={selectMenu}>
<div className="litenote-stories-select-btn"  onClick={openOption}>
<span className="litenote-stories-sBtn-text" ref={selectButton} >Filter By Category</span>
<FaAngleDown  className="litenote-angle-down"/>
</div>
<ul className={`litenote-stories-options ${active ? 'show' : 'close'}`} ref={list}>
    <li className="litenote-stories-option"  onClick={chooseOption}>
{/* <FaFeatherAlt  className="litenote-browse-react-icons"/> */}
<span className="litenote-stories-option-text">Write</span>
    </li>
    <li className="litenote-stories-option"  onClick={chooseOption}>

        <span className="litenote-stories-option-text">Notes</span>
           <span className="dropdown-stories-select-notification"
     style={{backgroundColor : "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >3</span>
            </li>
                    <li className="litenote-stories-option"  onClick={chooseOption}>
{/* <FaHeart className="litenote-browse-react-icons"/> */}
                        <span className="litenote-stories-option-text">Stories</span>
                        <span className="dropdown-stories-select-notification"
     style={{backgroundColor :  "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >4</span>
                            </li>
                            <li className="litenote-stories-option"  onClick={chooseOption}>
                               {/* <FaRobot className="litenote-browse-react-icons" /> */}
                                <span className="litenote-stories-option-text">Sticky Notes</span>
                                    </li>
                             
</ul>
    </div>
   }
{tabs.write && <TextEditor />}
{tabs.notes && <NotesPreview />}
{tabs.stickyNotes && <StickyNotes />}


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