import FeedCard from "../Dashboard/common/FeedCard"
import ContextMenu from "../common/ContextMenu"
import ErrorMessage from "../common/ErrorMessage"
import { FaShareAlt, FaBookmark, FaRegThumbsUp } from "react-icons/fa"
import Share from "../common/Share"
import { useRef, useEffect, useState } from "react"
import { MdReadMore } from "react-icons/md"
import { useModalContext } from "../../hooks/useModalContext"
import { usePopulateFeed } from "../../hooks/usePopulateFeed"
import { generateRandomPage } from "../../helpers/generateRandomPage"
import useWindowSize from "../../hooks/useWindowSize"
const FeedList = ({ view}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [category, setCategory] = useState("adventure")
  const [feedStories, setFeedStories] = useState([])
  const { width } = useWindowSize();
  const [categoryChanged, setCategoryChanged] = useState(null);
  const { contextMenu, setContextMenu, shareRef,  shareModal, fireClick } = useModalContext();
  const  { populateFeed, isLoading, error, data, statusCode, storyCount } = usePopulateFeed(); 
  const [loading, setLoading] = useState([])
  const lastItemRef = useRef();
  const loadingRef = useRef();
  useEffect(() => {
    if(data.length > 0){
      // console.log(data.length)
      const newStories = data.map((story) => {
        return {...story, loading : false}
      })
    setFeedStories((prev) => {
      return [...prev, ...newStories]
    })
    }
    
    }, [data])
  useEffect(() => {
    const skip = (page - 1) * limit;
    if (skip >= storyCount && storyCount > 0) {
      const randomPage = generateRandomPage(page)
      setPage(randomPage);
      return;
    }
    populateFeed(page, limit, category);
  }, [page, category,  limit]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          console.log("Observed last item, loading new page...");
          if(!categoryChanged){
            setPage((prevPage) => prevPage + 1);
          }else{
              setCategoryChanged(false)
          }
          observer.unobserve(entry.target); // Pause observer to prevent duplicate triggers
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );
  
    if (lastItemRef.current && !isLoading) {
      observer.observe(lastItemRef.current);
    }
  
    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [lastItemRef, isLoading, data, categoryChanged]);
  useEffect(() => {
    if(width < 768){
      setLimit(4)
      setLoading([{}])
    }
    else if(width < 767){
      setLimit(3)
      setLoading([{}])
    }
    else{
      setLimit(4)
      setLoading([{}, {}, {}, {}])
    }
    }, [width])
const resendRequest = () => {
  populateFeed(1, limit, category)
}
  return (

    <>
   {
    !error &&  
    <section>
    {
      
      view.grid && 
      <> 
      <div className="feed-grid">
{feedStories.map((content, index) => (
   
 <FeedCard story={content}
 isLoading={false}
 fireClick={fireClick}
  key={index} view={"grid"}/>
))

}  

{ 
isLoading &&  feedStories.length !== 0  &&
loading.map((story, index) => (
    <FeedCard
    ref={loadingRef}
    isLoading={true}
    view={"grid"}
    shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
  ))
}
       </div>
      <div ref={lastItemRef}>
      </div>
      </>
       }
       { view.list &&
       <>
       <div className="feed-list-view">
       {feedStories.map((content, index) => (
           <>
 <FeedCard story={content} key={index}
 isLoading={false}
 view={"list"}
 fireClick={fireClick}

 />
<hr  style={{color : "#9CA3AF"}}/>

</>
       ))}



       </div>
       { 
isLoading  && feedStories.length !== 0 &&
loading.map((story, index) => (
    <FeedCard
    ref={loadingRef}
    isLoading={true}
    view={"list"}
    shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
  ))
}
       <div ref={lastItemRef}>
       </div>
       </>
       }
    </section>
    }
    {error && 
    
    <div style={{paddingBottom : "100px"}}>


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
message={"We are unable to load this content, Pls click on the refresh button"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
}
</div>
}

{
  feedStories.length === 0 && 
   <div>
   <div style={{
    display : "flex",
    flexDirection : "row",
    padding : "200px 0px",
    justifyContent : "space-around",
    alignItems : "space-around",
    
    height : "100vh"}}>
   <span className="still-no-stories-loader"></span>
   </div>


  </div> 

}
    <Share  share={shareRef} shareModal={shareModal}/>
<ContextMenu
  state={"feed"}
  contextMenu={contextMenu}
  shareModal={shareModal}
             setContextMenu={setContextMenu}
             contextMenuData={[
             {id : 1, icon : <FaShareAlt />
             , label : "Share"},
             {id : 2, icon : <FaBookmark />
             , label : "Bookmark"},
       
             {id : 4, icon : <FaRegThumbsUp />
             , label : "Like Story"},
             {id : 5, icon : <MdReadMore />
              , label : "Read More"}
]} />
    </>
  )
}

export default FeedList