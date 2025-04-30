import React, { useEffect } from 'react'
import CommonAvatar from '../../common/CommonAvatar'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { MdCalendarToday, MdAssignmentTurnedIn } from 'react-icons/md'
import { useUpdateAReport } from "../../../hooks/useUpdateAReport"
import { useToastContext } from '../../../hooks/useToastContext'
import LoadingSpinner from "../../../components/Loaders/LoadingSpinner"
const ReportCard = ({ report, isLoading, setReports, setAllReportCount }) => {
  const { showToast } = useToastContext();
  const {updateAReport, isLoading : updateIsLoading, error, data : updateData} = useUpdateAReport();
  const updateReport = (id, status, username, category) => {
    if(status == "closed"){
      updateAReport(id, "opened", username, category)
    }
    if(status == "opened"){
    updateAReport(id, "pending", username, category)
    }
    if(status == "pending"){
      updateAReport(id, "closed", username, category)
    }
  }
  useEffect(() => {
if(error){
  showToast("Error", error.message, false)
}
if(Object.keys(updateData).length !== 0){
  console.log(updateData.report)
setReports((prev) => (
  prev.map((p) => (
    p._id == updateData.report._id
    ? {...p, status : updateData.report.status}
    : p
  ))
))
setAllReportCount((prev) => {
        return {...prev,
          clearedReports : updateData.counts.clearedReports,
          openedReports : updateData.counts.openedReports,
          pendingReports :updateData.counts.pendingReports
        }
})
showToast("Success", updateData.message, true)
}
  }, [updateData, error])
  return (
    <>
    {
    isLoading ? 
    <section>
    <span className="" style={{marginLeft : "10px", display :"flex", gap : "10px"}}> <MdCalendarToday size={15}/>
    <div className='report-loaders' style={{width : "90px", height : "15px"}}>

</div>
    </span>
    <div className= "litenote-reports-box">
<div className="reports-right-corner-arrow"></div>
<div className="litenote-reports-box-top">
<div className="litenote-reports-box-profile">
  <CommonAvatar
   style={{height : "50px", width: "50px", marginRight : "10px"}}
  image=""
  className="litenote-reports-profile-image"

  />
  <div className="litenote-reports-box-name-user" style={{display :"flex", flexDirection : "column", gap : "10px"}}>
<div className='report-loaders' style={{width : "90px", height : "15px"}}></div>
<span className='report-loaders' style={{width : "140px", height : "15px"}}></span>
  </div>
</div>
<div className='report-loaders' style={{width : "90px", height : "15px"}}>

</div>
</div>
<div className="litenote-reports-client-comment">
  <div className='report-loaders' style={{width : "300px", height : "20px"}}></div>
<div className='report-loaders' style={{width : "100%", height : "15px", marginTop : "10px"}}></div>
<div className='report-loaders' style={{width : "100%", height : "15px", marginTop : "10px"}}></div>
</div>
</div>
</section>
    :
    <section>
    <span className="" style={{marginLeft : "10px"}}> <MdCalendarToday size={15}/>
    {report.date}
    </span>
    <div className= "litenote-reports-box">
<div className="reports-right-corner-arrow"></div>
<div className="litenote-reports-box-top">
<div className="litenote-reports-box-profile">
  <CommonAvatar
   style={{height : "50px", width: "50px", marginRight : "10px"}}
  image={report.userId.picture}
  className="litenote-reports-profile-image"

  />
  <div className="litenote-reports-box-name-user">
<strong>{report.userId.username}</strong>
<span>{report.userId.email}</span>
  </div>
</div>
<div className="litenote-reports-box-reports" style={{color : 'white'}}>
{formatDistanceToNow(report.createdAt, { addSuffix: true })}
</div>
</div>
<div className="litenote-reports-client-comment">
  <span style={{fontSize : "1.6rem", fontWeight : 700}}>{report.category[0].toUpperCase() + report.category.slice(1)}</span>
<p>{report.content}</p>
<span className="status-inactive" style={{backgroundColor : report.status == "opened" ? "#991B1B" : report.status == "pending" ? "orange":"#166534"}}>{report.status[0].toUpperCase() + report.status.slice(1)}</span>
{ report.status !== "closed" && <div className="reports-them" style={{float : "right"}}>
  {
    updateIsLoading ?
  <span>
  <LoadingSpinner/>
  </span>
:
  <span onClick={() => updateReport(report._id, report.status, report.userId.username, report.category)}>
  <MdAssignmentTurnedIn size={20}/>Answer
  </span>
}
  </div>
}
{ report.status == "closed" && <div className="reports-them" style={{float : "right"}}>
  {
    updateIsLoading ?
  <span>
  <LoadingSpinner/>
  </span>
:
  <span onClick={() => updateReport(report._id, report.status, report.userId.username, report.category)}>
  <MdAssignmentTurnedIn size={20}/>Reopen
  </span>
}
  </div>
}
</div>
</div>
</section>
}
    </>

  )
}

export default ReportCard