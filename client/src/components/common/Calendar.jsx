
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { useGetAllReportsStatistics } from "../../hooks/useGetAllReportsStatistics"
import "../../styles/components/common/calendar.css"
import { useRef, useEffect, useState } from "react"
const Calendar = ({ allReportCount, setAllReportCount }) => {
    const { getAllReportsStatistics, isLoading, error,  statusCode, reportCount } = useGetAllReportsStatistics()
    useEffect(() => {
getAllReportsStatistics()
    }, [])
    useEffect(() => {
console.log(reportCount)
if(Object.keys(reportCount).length !== 0){
    setAllReportCount(reportCount)
}
    }, [reportCount])
    let date = new Date()
    const daysTag= useRef()
    const currentDate = useRef()
    const [currentMonth, setCurrentMonth] = useState(date.getMonth())
    const [currentYear, setCurrentYear] = useState(date.getFullYear())
    const [currentTime, setCurrentTime] = useState()
    useEffect(() => {

        setInterval(() => {
            var newTime = new Date().toLocaleTimeString()
        setCurrentTime(newTime)
        }, 1000);
    }, [])
const nextCalendar = () => {
    if(currentMonth >  10){
        setCurrentYear(currentYear + 1)
        setCurrentMonth(0)
        return;
    }
    setCurrentMonth(currentMonth + 1)

}
const previousCalendar = () => {
   if(currentMonth < 1){
    setCurrentYear(currentYear - 1)
    setCurrentMonth(11)
    return
   }
    setCurrentMonth(currentMonth - 1)
}
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sunday", "Monday",  "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
useEffect(() => {
 
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1 ).getDay(); //getting the first day of month
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //getting the last date of month
    let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(); //getting the last day of month
    let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate() //getting last date of previous month
    let liTag = ""
   for(let i = firstDayOfMonth; i > 0; i--){ //creating li of previous month last days
    liTag = liTag + `<li class="calendar-day-inactive">${lastDateofLastMonth - i + 1}</li>`;
   }
    for(let i = 1; i <= lastDateOfMonth; i++){ //creating li of all days of current month
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "calendar-day-active" : "";

       liTag = liTag + `<li class="${isToday}">${i}</li>`
    }
    for(let i = lastDayOfMonth; i < 6; i++){ //creating li of next month first days
        liTag = liTag + `<li class="calendar-day-inactive">${i - lastDayOfMonth + 1}</li>`;
     }
    daysTag.current.innerHTML = liTag;
    currentDate.current.innerText = `${months[currentMonth]} ${currentYear}`

}, [currentMonth, currentYear, daysTag])



  return (
    <div className="calendar-wrapper">
<header>
    <p  className="current-date"
    ref={currentDate}
    ></p>
    <div className="calendar-icons">
<MdChevronLeft 
onClick={previousCalendar}
size={5}/>
<MdChevronRight 
onClick={nextCalendar}
 />
    </div>
    
</header>
<div className="calendar">
<ul className="weeks">
    <li>Sun</li>
    <li>Mon</li>
    <li>Tue</li>
    <li>Wed</li>
    <li>Thu</li>
    <li>Fri</li>
    <li>Sat</li>
</ul>
<ul 
className="days"
ref={daysTag}
>
</ul>
</div>

{/* <div className="more-calendar-details">
<div className="more-today">Today&nbsp;&nbsp;<span style={{color : "#7380EC", fontWeight : "bolder"}}>|</span></div>
<div className="more-calendar-time-details">
<span className="more-time">{currentTime}</span>
<span style={{textAlign : "left"}}>{`${days[date.getDay()]}, ${" "} ${months[date.getMonth()]} ${" "} ${date.getDay()}, ${date.getFullYear()}`}</span>
</div>
</div> */}
<div style={{display : "flex", flexDirection : "row", justifyContent : 'center'}}>
<hr style={{width : "250px"}}/>
</div>

<div>
<span className="report-analytics-title">
<h5>Reports Analytics</h5>
</span>
<div className="reports-analytics-container">
    <div className="reports-analytics-container-child"  >
    <div>
        <span style={{fontSize : "1.4rem", marginRight : "10px", flex : 1}}>{allReportCount.totalReports}</span>
        <span style={{color : "#7380EC", fontWeight : "bolder", fontSize : "2rem"}} >|</span>
        </div>
        <div className="reports-child-child">
        <span style={{color : "#aaa"}}   >User Reports</span>
        <span>Total Reports</span>
        <span></span>
        </div>
    </div>
    <div  className="reports-analytics-container-child">
    <div>
        <span style={{fontSize : "1.4rem", marginRight : "10px", flex : 1}}>{allReportCount.clearedReports}</span>
        <span style={{color : "#166534", fontWeight : "bolder", fontSize : "2rem"}} >|</span>
        </div>
        <div className="reports-child-child">
        <span style={{color : "#aaa"}}   >Reports Cleared</span>
        <span>Reports Answered</span>
        </div>
    </div>
    <div  className="reports-analytics-container-child">
    <div>
        <span style={{fontSize : "1.4rem", marginRight : "10px"}}>{allReportCount.openedReports}</span>
        <span style={{color : "#991B1B", fontWeight : "bolder", fontSize : "2rem"}} >|</span>
        </div>
        <div className="reports-child-child">
        <span style={{color : "#aaa"}}    >Active Reports</span>
        <span>Reports Unanswered</span>
        </div>
       
    </div>
    <div  className="reports-analytics-container-child">
    <div>
        <span style={{fontSize : "1.4rem", marginRight : "10px"}}>{allReportCount.pendingReports}</span>
        <span style={{color : "orange", fontWeight : "bolder", fontSize : "2rem"}} >|</span>
        </div>
        <div className="reports-child-child">
        <span style={{color : "#aaa"}}> Pending Reports</span>
        <span>Reports Unanswered</span>
        </div>
       
    </div>
</div>
</div>

    </div>
  )
}

export default Calendar