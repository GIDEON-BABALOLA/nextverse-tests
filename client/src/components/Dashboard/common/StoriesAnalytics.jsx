import { MdVisibility, MdMenuBook, MdFolderShared, MdAdd } from "react-icons/md"
import "../../../styles/components/Dashboard/stories-analytics.css"
import { useEffect, useState } from "react";
import { FaRegBookmark, FaRegThumbsUp, FaRegShareFromSquare  } from "react-icons/fa6";
import { MdOutlineModeComment } from "react-icons/md";
import { useGetStoryAnalytics } from "../../../hooks/useGetStoryAnalytics";
import { useGetStoryMetrics } from "../../../hooks/useGetStoryMetrics";
import useNavigateStory from "../../../hooks/useNavigateStory";
import ErrorMessage from "../../common/ErrorMessage"
import { Link } from "react-router-dom"
import Percentage from "./Percentage";
const StoriesAnalytics = () => {
const navigateToStory = useNavigateStory();
const { getStoryAnalytics, isLoading, error, data } = useGetStoryAnalytics();
const [loadingState] = useState([{}, {}, {}, {}, {}])
const { getStoryMetrics, data : metricsData, isLoading : metricsIsLoading} = useGetStoryMetrics();
useEffect(() => {
getStoryMetrics();
getStoryAnalytics();

}, [])
useEffect(() => {
console.log(metricsData)
}, [metricsData])
useEffect(() => {
console.log(data);
}, [data])
const resendRequest = () => {
    getStoryAnalytics();
}
  return (
    <div className="litenote-dashboard-stories-analytics">
    <h2 className='litenote-dashboard-h-two'>Stories Analytics</h2>
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
{ !error &&
    <>
    {
    isLoading ?
    <>
    {loadingState.map((content, index) => (
    <div className="recent-stories-loader"
    key={index}
    style={{width : "100%", height : "60px", margin : "10px 0px",  borderRadius : "10px"}}>
</div>
    ))

    }
    </>
:
<>
    <div className="litenote-dashboard-item stories">
        <div className="litenote-dashboard-icon">
         <MdMenuBook />
        </div>
        <div className="litenote-dashboard-right"  onClick={() => navigateToStory(data.mostRecentStory[0])}>
            <div className="litenote-dashboard-info">
                <h3 className="litenote-dashboard-h-three">Recent Stories</h3>
                <small className="litenote-dashboard-text-muted">Last 24 Hours </small>
            </div>
            { metricsIsLoading ? <div className="recent-stories-loader" style={{width : "30px", height : "10px"}}></div> : <Percentage trend={metricsData.stories.trend} value={metricsData.stories.percentage}/> }
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
             { metricsIsLoading ?  <div className="recent-stories-loader" style={{width : "30px", height : "10px"}}></div>  : <Percentage trend={metricsData.likes.trend} value={metricsData.likes.percentage}/> }
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
             { metricsIsLoading ? <div className="recent-stories-loader" style={{width : "30px", height : "10px"}}></div>  : <Percentage trend={metricsData.bookmarks.trend} value={metricsData.bookmarks.percentage}/> }
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
             {metricsIsLoading ? <div className="recent-stories-loader" style={{width : "30px", height : "10px"}}></div>  : <Percentage trend={metricsData.views.trend} value={metricsData.views.percentage}/> }
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
            { metricsIsLoading ? <div className="recent-stories-loader" style={{width : "30px", height : "10px"}}></div> : <Percentage trend={metricsData.comments.trend} value={metricsData.comments.percentage}/> }
        </div>
    </div>
    </>
}
    </>
}
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