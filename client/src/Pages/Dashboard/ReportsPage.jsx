import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import CommonAvatar from "../../components/common/CommonAvatar";
import ReportCard from "../../components/Dashboard/common/ReportCard";
import RotationLoader from "../../components/Loaders/RotationLoader"
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ErrorMessage from "../../components/common/ErrorMessage"
import Toast from "../../components/common/Toast"
import NoContent from "../../components/common/NoContent";
import { useGetAllReports } from "../../hooks/useGetAllReports";
import { FaStar, FaRegStar, FaEllipsis} from "react-icons/fa6";
import { MdSaveAlt, MdReport, MdChecklist, MdClose, MdDelete, MdSave, MdAssignmentTurnedIn
 } from "react-icons/md"
import { useState, useEffect, useRef } from "react";
import { MdCalendarToday } from "react-icons/md";
import "../../styles/components/Reports/reports-page.css"
import React from "react";
import Calendar from "../../components/common/Calendar"
const ReportsPage = ({ sidebarRef}) => {
  const initialReportCount = {
    totalReports : 0,
    clearedReports :0,
    openedReports :0,
    pendingReports :0
}
const [allReportCount, setAllReportCount] = useState(initialReportCount)
  const lastItemRef = useRef()
  const  {getAllReports, isLoading, error, data: reportData, reportCount} = useGetAllReports();
  const reportsListContainer = useRef()
  const [loadPage, setLoadPage] = useState(false)
  const [loadingState, setLoadingState] = useState([{}, {}, {}])
  const [timeLineHeight, setTimeLineHeight] = useState("")
  const [preventLoadMore, setPreventLoadMore] = useState(false)
  const [emptyData, setEmptyData] = useState(false)
  const [dashboardToast, setDashboardToast] = useState(true)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3)
  const [reports, setReports] = useState([])
  useEffect(() => {
    getAllReports(page, limit)
    setTimeout(() => {
      setTimeLineHeight( reportsListContainer.current.offsetHeight + "px")      
    }, 2000);
      }, [page, limit])
      useEffect(() => {
        if(reports.length === reportCount && reportCount > 0){
          console.log(reportCount);
          
          setPreventLoadMore(true)
        }
          }, [reports, reportCount])
const updateMyReports = (prev) => {
  const months = [
    'January',   'February',
    'March',     'April',
    'May',       'June',
    'July',      'August',
    'September', 'October',
    'November',  'December'
  ]
  const newReports = reportData.map((report) => {
    const fullDate = report.createdAt.split("T")[0].split("-")
        return {...report, date : months[parseInt(fullDate[1]) - 1] + " " + fullDate[2] + ", " + fullDate[0]}
      }).filter(
              (newReport) => !prev.some((prevReport) => prevReport._id === newReport._id)
            );
            return [...prev, ...newReports];
}
      useEffect(() => {
if(reportData.length == 0 && reportCount > 0){
  setPage(1)
}
if(reportData.length > 0){
  setEmptyData(false)
  setReports(updateMyReports)
}
      }, [reportData, reportCount])
      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isLoading) {
                setPage((prevPage) => prevPage + 1);
              observer.unobserve(entry.target); 
            }
          },
          { threshold: 0.1, }
        );
        if (lastItemRef.current && !isLoading ) {
      if(!preventLoadMore){
      observer.observe(lastItemRef.current);
      }
        
        }                                                                                                                                   
      
        return () => {
          if (lastItemRef.current) {
            observer.unobserve(lastItemRef.current);
          }
        };
      }, [lastItemRef, isLoading, reports, reportCount, preventLoadMore]);
      useEffect(() => {
        if(!isLoading){
          if(preventLoadMore && reports.length == 0){
            setEmptyData(true)
          }
          if(reportData.length == 0 && !error && page == 1 && reportCount == 0){
            setEmptyData(true)
          }
          if(reportCount == 0 ){
            setEmptyData(true)
          }
        }
            }, [reportData, isLoading, reportCount, reports, preventLoadMore, limit, page, error])
      const resendRequest = () => {
        setEmptyData(false)
        getAllReports(page, limit)
      }
      const [contextMenu, setContextMenu] = useState()
      useEffect(() => {
console.log(reports)
      },[reports])
      
  return (
    <>
    <Toast />
    <React.Fragment>
    
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <section  className="litenote-reports-page">
   <div className="litenote-reports-heading">
{/* <span>Reports</span> */}
<h1>Users Statement Of Report</h1>
</div>
{ !error &&
   <section className="litenote-reports">
<div className="litenote-reports-box-container">
<section style={{display : "flex", flexDirection : "row"}}>

{
  emptyData ? 
  <div>
  <NoContent message={`There are currently no reports`}
         fireClick={
          () => {

          
resendRequest()
          }}
  />
</div> :
<>
<div className= "vertical-line" style={{height : timeLineHeight }} />
<section ref={reportsListContainer}>
 {
  reports.map((report, index) => (
    
<ReportCard report={report} key={index} isLoading={false} setReports={setReports}
setAllReportCount={setAllReportCount}
/>
  
  ))
 }
     { isLoading &&
       loadingState.map((report, index) => (
         <ReportCard  
          isLoading={true}
          report={report} key={index}/>
       ))
   
     }
     { !preventLoadMore && <div ref={lastItemRef} style={{margin : "40px 0px"}} >load more</div> }
</section>
</>
}

</section>

</div>
   </section>
   
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
   </section>
    </React.Fragment>
    <div className="litenote-dashboard-right reports-page-right">
    
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div>
    <div className="litenote-dashboard-right reports-page-right" style={{marginTop : "30px"}}>
 
  <Calendar allReportCount={allReportCount} setAllReportCount={setAllReportCount}/>
    </div>
    </>
  )
}

export default ReportsPage