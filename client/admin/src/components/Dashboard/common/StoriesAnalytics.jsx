import { MdVisibility, MdMenuBook, MdFolderShared, MdAdd } from "react-icons/md"
import "../../../styles/components/Dashboard/stories-analytics.css"
import { Link } from "react-router-dom"
const StoriesAnalytics = () => {
  return (
    <div className="litenote-dashboard-stories-analytics">
    <h2 className='litenote-dashboard-h-two'>Stories Analytics</h2>
    <div className="litenote-dashboard-item stories">
        <div className="litenote-dashboard-icon">
         <MdMenuBook />
        </div>
        <div className="litenote-dashboard-right">
            <div className="litenote-dashboard-info">
                <h3 className="litenote-dashboard-h-three">Recent Stories</h3>
                <small className="litenote-dashboard-text-muted">Last 24 Hours </small>
            </div>
            <h5 className="litenote-dashboard-success litenote-dashboard-h-five">+59%</h5>
        </div>
        </div>
    <div className="litenote-dashboard-item views">
        <div className="litenote-dashboard-icon">
         <MdVisibility />
        </div>
        <div className="litenote-dashboard-right">
            <div className="litenote-dashboard-info">
                <h3 className="litenote-dashboard-h-three">Most Viewed</h3>
                <small className="litenote-dashboard-text-muted">Last 24 Hours </small>
            </div>
            <h5 className="litenote-dashboard-success litenote-dashboard-h-five">+69%</h5>
        </div>
        </div>
    <div className="litenote-dashboard-item shared">
        <div className="litenote-dashboard-icon">
         <MdFolderShared />
        </div>
        <div className="litenote-dashboard-right">
            <div className="litenote-dashboard-info">
                <h3 className="litenote-dashboard-h-three">Most Shared</h3>
                <small className="litenote-dashboard-text-muted">Last 24 Hours </small>
            </div>
            <h5 className="litenote-dashboard-danger litenote-dashboard-h-five">+50%</h5>
        </div>
    </div>
    <Link to="/dashboard/stories" style={{textDecoration : "none"}}>
    <div className="litenote-dashboard-item add">
     <MdAdd size={20}/>
   <h3 className="litenote-dashboard-h-three">Add Stories</h3>
    </div>
    </Link>

    
 </div>
  )
}

export default StoriesAnalytics