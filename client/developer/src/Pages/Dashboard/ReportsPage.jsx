import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { FaStar, FaRegStar, FaEllipsis} from "react-icons/fa6";
import { MdSaveAlt, MdReport, MdChecklist, MdClose, MdDelete, MdSave, MdAssignmentTurnedIn
 } from "react-icons/md"
import { useState, useEffect, useRef } from "react";
import { MdCalendarToday } from "react-icons/md";
import "../../styles/components/Reports/reports-page.css"
import React from "react";
import Calendar from "../../components/common/Calendar"
const ReportsPage = ({ sidebarRef}) => {
  const reportsListContainer = useRef()
  const [loadPage, setLoadPage] = useState(true)
  const [timeLineHeight, setTimeLineHeight] = useState("")
  const [dashboardToast, setDashboardToast] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false)
      setTimeLineHeight( reportsListContainer.current.offsetHeight + "px")
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
  return (
    <>
    {loadPage ? 
    <>
    <RotationLoader />
    </>
     : <>
    <React.Fragment>
    
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <section  className="litenote-reports-page">
   <div className="litenote-reports-heading">
{/* <span>Reports</span> */}
<h1>Users Statement Of Report</h1>
</div>
   <section className="litenote-reports">


<div className="litenote-reports-box-container">
<section style={{display : "flex", flexDirection : "row"}}>

<div className= "vertical-line" style={{height : timeLineHeight }}></div>
<section ref={reportsListContainer}>
<span className="" style={{marginLeft : "10px"}}> <MdCalendarToday size={15}/>
 &nbsp;August 12, 2022</span>
<div className= "litenote-reports-box">
<div className="reports-right-corner-arrow"></div>
<div className="litenote-reports-box-top">
<div className="litenote-reports-box-profile">
  <div className="litenote-reports-profile-image">
    <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"}/>
  </div>
  <div className="litenote-reports-box-name-user">
<strong>Gideon Babalola</strong>
<span>gideonbabalola69@gmail.com</span>
  </div>
</div>
<div className="litenote-reports-box-reports" style={{color : 'white'}}>
{formatDistanceToNow(new Date("April 3, 2024"), { addSuffix: true })}
</div>
</div>
<div className="litenote-reports-client-comment">
<p>One good thing you cant take away from boxing is that those running the LIVE commentary usually interpret every moment of the fight in such a professional way that you could possibly guess where the fight would lead to</p>
<span className="status-inactive">Opened</span>
<span className="reports-them" style={{float : "right"}}><MdAssignmentTurnedIn size={20}/>Answer</span>
</div>
</div>
<span className="" style={{marginLeft : "10px"}}> <MdCalendarToday size={15}/>
 &nbsp;August 12, 2022</span>
<div className= "litenote-reports-box">
<div className="reports-right-corner-arrow"></div>
<div className="litenote-reports-box-top">
<div className="litenote-reports-box-profile">
  <div className="litenote-reports-profile-image">
    <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"}/>
  </div>
  <div className="litenote-reports-box-name-user">
<strong>Gideon Babalola</strong>
<span>gideonbabalola69@gmail.com</span>
  </div>
</div>
<div className="litenote-reports-box-reports" style={{color : 'white'}}>
{formatDistanceToNow(new Date("April 3, 2024"), { addSuffix: true })}
</div>
</div>
<div className="litenote-reports-client-comment">
<p>One good thing you cant take away from boxing is that those running the LIVE commentary usually interpret every moment of the fight in such a professional way that you could possibly guess where the fight would lead to</p>

<span className="status-active">Closed</span>
<span className="reports-them" style={{float : "right"}}><MdAssignmentTurnedIn size={20}/>Answer</span>
</div>
</div>

{/* <span className="reports-date">August 12, 2022</span> */}
<span className="" style={{marginLeft : "10px"}}> <MdCalendarToday size={15}/>
 &nbsp;August 12, 2022</span>
<div className= "litenote-reports-box">
<div className="reports-right-corner-arrow"></div>
<div className="litenote-reports-box-top">
<div className="litenote-reports-box-profile">
  <div className="litenote-reports-profile-image">
    <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"}/>
  </div>
  <div className="litenote-reports-box-name-user">
<strong>Gideon Babalola</strong>
<span>gideonbabalola69@gmail.com</span>
  </div>
</div>
<div className="litenote-reports-box-reports" style={{color : 'white'}}>
{formatDistanceToNow(new Date("April 3, 2024"), { addSuffix: true })}
</div>
</div>
<div className="litenote-reports-client-comment">
<p>One good thing you cant take away from boxing is that those running the LIVE commentary usually interpret every moment of the fight in such a professional way that you could possibly guess where the fight would lead to</p>
<span className="status-inactive">Opened</span>
<span className="reports-them" style={{float : "right"}}><MdAssignmentTurnedIn size={20}/>Answer</span>
</div>
</div>
{/* <span className="reports-date">August 12, 2022</span> */}
<span className="" style={{marginLeft : "10px"}}> <MdCalendarToday size={15}/>
 &nbsp;August 12, 2022</span>
<div className= "litenote-reports-box">
<div className="reports-right-corner-arrow"></div>
<div className="litenote-reports-box-top">
<div className="litenote-reports-box-profile">
  <div className="litenote-reports-profile-image">
    <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"}/>
  </div>
  <div className="litenote-reports-box-name-user">
<strong>Gideon Babalola</strong>
<span>gideonbabalola69@gmail.com</span>
  </div>
</div>
<div className="litenote-reports-box-reports" style={{color : 'white'}}>
{formatDistanceToNow(new Date("April 3, 2024"), { addSuffix: true })}
</div>
</div>
<div className="litenote-reports-client-comment">
<p>One good thing you cant take away from boxing is that those running the LIVE commentary usually interpret every moment of the fight in such a professional way that you could possibly guess where the fight would lead to</p>
<span className="status-inactive">Opened</span>
<span className="reports-them" style={{float : "right"}}><MdAssignmentTurnedIn size={20}/>Answer</span>
</div>
</div>
</section>
</section>

</div>
   </section>
   </section>
    </React.Fragment>
    <div className="litenote-dashboard-right reports-page-right">
    
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
 
  <Calendar />
    </div>
   
    </>
    }
    </>
  )
}

export default ReportsPage