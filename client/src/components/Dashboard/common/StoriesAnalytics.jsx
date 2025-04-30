import { MdVisibility, MdMenuBook, MdFolderShared, MdAdd } from "react-icons/md"
import "../../../styles/components/Dashboard/stories-analytics.css"
import { useEffect } from "react";
import { FaRegBookmark, FaRegThumbsUp, FaRegShareFromSquare  } from "react-icons/fa6";
import { MdOutlineModeComment } from "react-icons/md";
import { useGetStoryAnalytics } from "../../../hooks/useGetStoryAnalytics";
import useNavigateStory from "../../../hooks/useNavigateStory";
import { Link } from "react-router-dom"
const StoriesAnalytics = () => {
const navigateToStory = useNavigateStory();
const { getStoryAnalytics, isLoading, error, data } = useGetStoryAnalytics();
useEffect(() => {
getStoryAnalytics();
}, [])
useEffect(() => {
console.log(data);

}, [data])

  return (
    <div className="litenote-dashboard-stories-analytics">
    <h2 className='litenote-dashboard-h-two'>Stories Analytics</h2>
    <div className="litenote-dashboard-item stories">
        <div className="litenote-dashboard-icon">
         <MdMenuBook />
        </div>
        <div className="litenote-dashboard-right"  onClick={() => navigateToStory(data.mostRecentStory[0])}>
            <div className="litenote-dashboard-info">
                <h3 className="litenote-dashboard-h-three">Recent Stories</h3>
                <small className="litenote-dashboard-text-muted">Last 24 Hours </small>
            </div>
            <h5 className="litenote-dashboard-success litenote-dashboard-h-five">+59%</h5>
        </div>
        </div>
        <div className="litenote-dashboard-item liked"  onClick={() => navigateToStory(data.mostLikedStory[0])}>
        <div className="litenote-dashboard-icon" style={{backgroundColor :"#F44336"}}>
         <FaRegThumbsUp />
        </div>
        <div className="litenote-dashboard-right">
            <div className="litenote-dashboard-info">
                <h3 className="litenote-dashboard-h-three">Most Liked</h3>
                <small className="litenote-dashboard-text-muted">Last 24 Hours </small>
            </div>
            <h5 className="litenote-dashboard-danger litenote-dashboard-h-five">+50%</h5>
        </div>
    </div>
    <div className="litenote-dashboard-item bookmarked"  onClick={() => navigateToStory(data.mostBookmarkedStory[0])}>
        <div className="litenote-dashboard-icon" style={{backgroundColor : "#FF9800"}}>
         <FaRegBookmark />
        </div>
        <div className="litenote-dashboard-right">
            <div className="litenote-dashboard-info">
                <h3 className="litenote-dashboard-h-three">Most Bookmarked</h3>
                <small className="litenote-dashboard-text-muted">Last 24 Hours </small>
            </div>
            <h5 className="litenote-dashboard-danger litenote-dashboard-h-five">+50%</h5>
        </div>
    </div>
    <div className="litenote-dashboard-item views"  onClick={() => navigateToStory(data.mostViewedStory[0])}>
        <div className="litenote-dashboard-icon" style={{backgroundColor  : "#2196F3"}}>
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
    <div className="litenote-dashboard-item comment"  onClick={() => navigateToStory(data.mostCommentedStory[0])}>
        <div className="litenote-dashboard-icon" style={{backgroundColor : "#FF5722"}}>
         <MdOutlineModeComment  />
        </div>
        <div className="litenote-dashboard-right">
            <div className="litenote-dashboard-info">
                <h3 className="litenote-dashboard-h-three">Most Comments</h3>
                <small className="litenote-dashboard-text-muted">Last 24 Hours </small>
            </div>
            <h5 className="litenote-dashboard-danger litenote-dashboard-h-five">+50%</h5>
        </div>
    </div>
    <Link to="/dashboard/publish" style={{textDecoration : "none"}}>
    <div className="litenote-dashboard-item add">
     <MdAdd size={20}/>
   <h3 className="litenote-dashboard-h-three">Add Stories</h3>
    </div>
    </Link>

    
 </div>
  )
}

export default StoriesAnalytics