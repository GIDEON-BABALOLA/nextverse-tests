import FeedCard from "./FeedCard"
import FeedLoadingCard from "./FeedLoadingCard"
import ContextMenu from "../common/ContextMenu"
import ErrorMessage from "../common/ErrorMessage"
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md"
import { FaShareAlt, FaBookmark, FaRegThumbsUp } from "react-icons/fa"
import Share from "../common/Share"
import { useRef, useEffect, useState } from "react"
import { MdReadMore } from "react-icons/md"
import { useModalContext } from "../../hooks/useModalContext"
import { usePopulateFeed } from "../../hooks/usePopulateFeed"
import NoContent from "../common/NoContent"
import { generateRandomPage } from "../../helpers/generateRandomPage"
import { isVisibleInViewport } from "../../helpers/isVisibleInViewPort"
import useWindowSize from "../../hooks/useWindowSize"
const FeedList = ({ view, feedCategory}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [emptyData, setEmptyData] = useState(false)
  const [feedStories, setFeedStories] = useState([])
  const [lastScrollY, setLastScrollY] = useState(0);
  const { width } = useWindowSize();
  const [categoryChanged, setCategoryChanged] = useState(null);
  const { contextMenu,
setContextMenu,
shareRef,
shareModal,
fireClick,
shareUrl,
setShareUrl
} = useModalContext();
  const  { populateFeed, isLoading, error, data, storyCount } = usePopulateFeed(); 
  const [loading, setLoading] = useState([])
  const lastItemRef = useRef();
  const loadingRef = useRef(null);
  useEffect(() => {
    setEmptyData(false)
    const category = Object.keys(feedCategory).find(key => feedCategory[key] === true)
    const skip = (page - 1) * limit;
    if (skip >= storyCount && storyCount > 0) {
      const randomPage = generateRandomPage(page)
      setPage(randomPage);
      return;
    }
    populateFeed(page, limit, category);
  }, [page, feedCategory,limit]);
  useEffect(() => {
    setPage(1); // Reset to the first page when the category changes
    setFeedStories([]); // Clear current stories to avoid mixing old and new category data
  }, [feedCategory]);
  useEffect(() => {
    if(data.length > 0){
      setEmptyData(false)
      const newStories = data.map((story) => {
        return {...story, loading : false}
      })
    setFeedStories((prev) => {
      return [...prev, ...newStories]
    })
    }  
    }, [data])

    useEffect(() => {
if(!isLoading){
  if(data.length == 0 && !error){
    setEmptyData(true)
  }
}
    }, [data, isLoading])
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isLoading) {
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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if(isLoading){
        if (currentScrollY > lastScrollY && isVisibleInViewport(loadingRef.current, 0.8)) {
          window.scrollTo(0, lastScrollY); // Reset the scroll position to the last known position
        } else {
          // Update the last scroll position if scrolling up
          setLastScrollY(currentScrollY);
        }
      }

    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isLoading]);
  // Only re-run the effect when lastScrollY changes
  useEffect(() => {
    if(width < 768){
      setLimit(4)
      setLoading([{}, {}, {}])
    }
    else if(width < 767){
      setLimit(4)
      setLoading([{}, {}, {}])
    }
    else{
      setLimit(4)
      setLoading([{}, {}, {}, {}])
    }
    }, [width])
const resendRequest = () => {
  setEmptyData(false)
  console.log(feedCategory)
  const category = Object.keys(feedCategory).find(key => feedCategory[key] === true)
  console.log(category)
  populateFeed(1, limit, category)
}
  return (
    <>
    { !error &&
    <section>
    {
emptyData ? 
<div style={{padding : "70px 0px", height : "100vh"}}>
<NoContent
message={"Empty Feed"}
fireClick={() => resendRequest()}
 />
</div>

 :
    
    <div>

<section>
  <> 
  <div className={`${view.grid ? "feed-grid" : "feed-list-view"}`}>
{feedStories.map((content, index) => (

<FeedCard story={content}
isLoading={false}
fireClick={fireClick}
key={index} view={`${view.grid ? "grid" : "list"}`}/>
))

}  

{ 
isLoading &&  feedStories.length !== 0  &&
loading.map((story, index) => (
<FeedLoadingCard
ref={loadingRef}
isLoading={true}
view={`${view.grid ? "grid" : "list"}`}
shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
))
}
   </div>
  <div ref={lastItemRef}>
  </div>
  </>
</section>

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
<Share  share={shareRef} shareModal={shareModal} shareUrl={shareUrl} setShareUrl={setShareUrl}/>
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
   
         {id : 4, icon : <MdOutlineFavorite />
         , label : "Like Story"},
         {id : 5, icon : <MdReadMore />
          , label : "Read More"}
]} />
    </div>
    
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


    </>
  )
}

export default FeedList