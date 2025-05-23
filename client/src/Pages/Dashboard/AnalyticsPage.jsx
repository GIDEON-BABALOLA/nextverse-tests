

import { useEffect, useState, useRef } from 'react';
import { 
  MdAnalytics, 
  MdBarChart, 
  MdInsights, 
  MdStackedLineChart, 
  MdGroups,
} from 'react-icons/md';
import { FaCommentDollar} from "react-icons/fa"
import RecentStories from '../../components/Dashboard/common/RecentStories';
import AnalyticsCard from '../../components/Dashboard/common/AnalyticsCard';
import RecentUpdates from '../../components/Dashboard/common/RecentUpdates';
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import StoriesAnalytics from '../../components/Dashboard/common/StoriesAnalytics';
import DashboardToast from '../../components/common/DashboardToast';
import ConnectivityToast from '../../components/common/connectivityToast';
import RotationLoader from '../../components/Loaders/RotationLoader';
import { useGetGlobalMetrics } from '../../hooks/useGetGlobalMetrics';
import { useGetStoryMetrics } from '../../hooks/useGetStoryMetrics';
const AnalyticsPage = ({sidebarRef}) => {
  const  { getGlobalMetrics, isLoading : globalMetricsLoading, error : globalMetricsError,  data: globalMetricsData } = useGetGlobalMetrics();
  const { getStoryMetrics, isLoading : storyMetricsLoading, error : storyMetricsError,  data: storyMetricsData }  = useGetStoryMetrics();
    let time = new Date().toLocaleTimeString();
    const [timed, setTime] = useState(time)
    const [loadPage, setLoadPage] = useState(true)
    const [dashboardToast, setDashboardToast] = useState(true)
    const month = ["january", "febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const datetime = new Date()
    useEffect(() => {
  getGlobalMetrics()
  getStoryMetrics()
        setInterval(() => {
            var newTime = new Date().toLocaleTimeString()
        setTime(newTime)
        }, 1000);
        setLoadPage(false)
    }, [])
    useEffect(() => {
console.log(storyMetricsData);
    }, [storyMetricsData])
    const [contextMenu, setContextMenu] = useState()
  return (
   <>
   { loadPage ? 
    <>
    <RotationLoader /> 
    </>
   :<>
             <main className='analytics-page-main'>
             <ConnectivityToast />
             <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
     <h1 className='litenote-dashboard-h-one'>Dashboard</h1>
     <div className="litenote-dashboard-date">
       {/* <input type="date" /> */}
       {month[datetime.getMonth()]} {datetime.getDate()} {datetime.getFullYear()}{"   :   "}
       {timed}
     </div>
   
     <div className="litenote-dashboard-insights">
     <AnalyticsCard className={"litenote-dashboard-Stories cadre"}
      r={36}
    cardPercent={storyMetricsLoading ? 0 : storyMetricsData.stories.percentage}
    cardTotal={globalMetricsLoading ? 0 : globalMetricsData.storyCount}
    trend={ storyMetricsLoading ? 0 :  storyMetricsData.stories.trend}
    storyMetricsLoading={storyMetricsLoading}
    globalMetricsLoading={globalMetricsLoading}
    cardTitle={"Total Stories"}
    cx={38}
    cy={38}
    cardIcon={<MdAnalytics className='icon-dashboard'  size={20}/>}
    />



{/* <!--    --------End of stories--------- --> */}

<AnalyticsCard 
    className={"litenote-dashboard-authors cadre"}
    cardPercent={storyMetricsLoading ? 0 : storyMetricsData.bookmarks.percentage}
    cardTotal={globalMetricsLoading ?  0 : globalMetricsData.bookmarkCount}
    trend={ storyMetricsLoading ? 0 :  storyMetricsData.bookmarks.trend}
    storyMetricsLoading={storyMetricsLoading}
    globalMetricsLoading={globalMetricsLoading}
    cardTitle={"Total Bookmarks"}
    cx={38}
    cy={38}
    r={36}
    cardIcon={  <MdBarChart className='icon-dashboard' size={20}/>}
/>
{/* <!--    --------End of authors--------- --> */}

<AnalyticsCard
className={"litenote-dashboard-views cadre"}
cardPercent={storyMetricsLoading ? 0 : storyMetricsData.views.percentage}
cardTotal={globalMetricsLoading ? 0 : globalMetricsData.viewCount}
trend={ storyMetricsLoading ? 0 : storyMetricsData.views.trend}
storyMetricsLoading={storyMetricsLoading}
globalMetricsLoading={globalMetricsLoading}
cardTitle={"Total Views"}
cx={38}
cy={38}
r={36}
cardIcon={<MdInsights className='icon-dashboard' size={20}/>}
 />
<AnalyticsCard 
    className={"litenote-dashboard-likes cadre"}
    cardPercent={storyMetricsLoading ? 0 : storyMetricsData.likes.percentage}
    cardTotal={globalMetricsLoading ? 0 : globalMetricsData.likeCount}
    trend={ storyMetricsLoading ? 0 : storyMetricsData.likes.trend}
    storyMetricsLoading={storyMetricsLoading}
    globalMetricsLoading={globalMetricsLoading}
    cardTitle={"Total likes"}
    cx={38}
    cy={38}
    r={36}
    cardIcon={<MdStackedLineChart  className='icon-dashboard' size={20}/>}

/>
<AnalyticsCard 
    className={"litenote-dashboard-users cadre"}
    cardPercent={storyMetricsLoading ? 0 : storyMetricsData.users.percentage}
    cardTotal={globalMetricsLoading ? 0 : globalMetricsData.userCount}
    trend={ storyMetricsLoading ? 0 : storyMetricsData.users.trend}
    storyMetricsLoading={storyMetricsLoading}
    globalMetricsLoading={globalMetricsLoading}
    cardTitle={"Total Users"}
    cx={38}
    cy={38}
    r={36}
    cardIcon={<MdGroups  className='icon-dashboard' size={20}/>}

/>
<AnalyticsCard 
    className={"litenote-dashboard-comments cadre"}
    cardPercent={storyMetricsLoading ? 0 : storyMetricsData.comments.percentage}
    cardTotal={globalMetricsLoading ? 0 : globalMetricsData.commentCount}
    trend={storyMetricsLoading ? 0 : storyMetricsData.comments.trend}
    storyMetricsLoading={storyMetricsLoading}
    globalMetricsLoading={globalMetricsLoading}
    cardTitle={"Total Comments"}
    cx={38}
    cy={38}
    r={36}
    cardIcon={<FaCommentDollar  className='icon-dashboard' size={20}/>}

/>
{/* <!--    --------End of  likes--------- --> */}   
</div>
{/* <!-- END OF  INSIGHTS --> */}
<RecentStories />
         </main>
       {/* <!--  ---------- END OF MAIN------------- --> */}

    <div className="litenote-dashboard-right">
     <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
      {/* <!--   end of top --> */}
 <RecentUpdates />
 
     {/* <!--  ----------------END OF UPDATES---------- --> */}
     
   <StoriesAnalytics />
    </div>
    </>
    
   }
   </>
   
  )
}

export default AnalyticsPage