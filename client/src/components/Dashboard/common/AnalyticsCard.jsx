import { 
  } from 'react-icons/md';
  import "../../../styles/components/Dashboard/analytics-card.css"
  import Counter from "../../Profile/Counter"
  import CircularProgress from './CircularProgress';
const AnalyticsCard = ({cardTitle, cardTotal, cx, cy, r, cardPercent, className, cardIcon}) => {
  return (
   <>
      <div className={className} >
      <span>
      {cardIcon}
      </span>
   <div className="litenote-dashboard-middle">
    <div className="litenote-dashboard-left">
         <h3 className='litenote-dashboard-h-three'>{cardTitle}</h3> 
         <h1 className='litenote-dashboard-h-one'><Counter end={parseInt(cardTotal)}/></h1> 
        </div>
<CircularProgress end={parseInt(cardPercent)}/>
 </div>
 <small className="litenote-dashboard-text-muted">Last 24 Hours </small>
   </div>


   </>
  )
}

export default AnalyticsCard