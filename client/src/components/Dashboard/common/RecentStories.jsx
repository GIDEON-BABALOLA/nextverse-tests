import TableRow from "./TableRow"
import "../../../styles/components/Dashboard/recent-stories.css"
import RotationLoader from "../../Loaders/RotationLoader"
import { useGetExploreStories } from "../../../hooks/useGetExploreStories"
import ArrowKeyDetector from "../../../hooks/useArrowKeys"
import DashboardPagination from "./DashboardPagination"
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react"
const dummyStories = [
    {
title : "The Endless Journey",
author : "Dave James",
category : "Adventure",
date : "3/28/2024",
readTime : "10mins"
    }, 
    {
title : "Love Conquers All ",
category : "Romance",
author : "John Elvis",
date : "6/28/2024 ",
readTime : "5mins"
    },
    {
title : "The Mythical Realm",
author : "Dora Cardie",
category : "Friction",
date : "7/28/2024",
readTime : "10mins"
    }, 
    {
title : "The Science Behind Exercise",
author : "itness Zone",
category : "Non Friction",
date : "11/28/2024",
readTime : "8mins"   
    },
    {
        title : "The Mythical Realm",
        author : "Dora Cardie",
        category : "Friction",
        date : "7/28/2024",
        readTime : "10mins"
            }, 
            {
        title : "The Science Behind Exercise",
        author : "itness Zone",
        category : "Non Friction",
        date : "11/28/2024",
        readTime : "8mins"   
            },
]
const RecentStories = () => {
   const  {getExploreStories, isLoading, error, data, statusCode, storyCount} = useGetExploreStories();
const [recentStories, setRecentStories] = useState([])
const [loadingState, setLoadingState] = useState([{}, {}, {}, {}, {}, {}])
const [page, setPage] = useState(1)
   useEffect(() => {
if(data.length > 0){
    setRecentStories(data)
}
   }, [data])
   const handlePageChange = (event, value) => {
    setPage(value); // update page state
    console.log(value); // you can fetch new data here
  };
   useEffect(() => {
getExploreStories(page, 6, "all")
   }, [page])
  return (
    <>
       <div className="litenote-dashboard-recent-stories"
    style={{backgroundColor :"#f6f6f9"}}
    >
        <div 
        className="recent-stories-title-and-pagination">
    <h2  className="litenote-dashboard-h-two"style={{fontWeight : 900, fontSize : "20px"}}>All Stories</h2>
    <Pagination
  page={page} // <- this is crucial
  onChange={(e, value) => setPage(value)}
  count={Math.ceil(storyCount / 6)}
  variant="outlined"
  color="primary"
  shape="rounded"
/>
    </div>
    <table >
         { !isLoading && <thead className="table-heading-dash">
            <tr>
            <th style={{ display: "table-cell" }}>S/N</th>
    <th style={{ display: "table-cell" }}>Title</th>
    <th style={{ display: "table-cell" }}>Authors</th>
    <th style={{ display: "table-cell" }}>Category</th>
    <th style={{ display: "table-cell" }}>Date</th>
    <th style={{ display: "table-cell" }}>Read Time</th>
            </tr>
            
            <tr className="tri"></tr>
        </thead>
}
       
        <tbody> 
        { !isLoading && recentStories.map((content, index) => (
<TableRow key={index}
    title={content.title}
    serialNumber={index + 1}
    author={content.author}
    category={content.category}
    date={content.createdAt.split("T")[0]}
    readTime={content.estimatedReadingTime}
    isLoading={false}
    id={content._id}
/>
        ))}


{ isLoading && <>

    <div className="table-row-loader">
                <div>S/N</div>
                <div>Title</div>
                <div> Authors</div>
                <div>Category</div>
                <div>Date</div>
                <div>Read Time </div>
            </div>
    {loadingState.map((content, index) => (
<TableRow key={index}
    isLoading={true}
/>
        ))
    }
</>
}
        </tbody>
    </table>
</div>
<ArrowKeyDetector 
 backBtn={() => setPage((prev) => Math.max(prev - 1, 1))}
 nextBtn={() => setPage((prev) => Math.min(prev + 1, Math.ceil(storyCount / 6)))}
 
/>
    </>
 
  )
}

export default RecentStories