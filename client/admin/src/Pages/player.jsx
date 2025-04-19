import "../styles/components/Browse/browse.css"
import SearchBar from "../components/Browse/SearchBar"
import SearchPagination from "../components/Browse/SearchPagination"
import LoadingCard from "../components/Profile/LoadingCard"
import Share from "../components/common/Share"
import ContextMenu from "../components/common/ContextMenu"
import {  FaRegThumbsUp, FaShareAlt, FaBookmark } from "react-icons/fa";
import { useEffect, useState, useRef} from "react"
import useWindowSize from "../hooks/useWindowSize"
import { useModalContext } from "../hooks/useModalContext"
import Tab from "../components/common/Tab"
import { MdReadMore } from "react-icons/md"
import ErrorMessage from "../components/common/ErrorMessage"
import { useGetExploreStories } from "../hooks/useGetExploreStories"
import ExploreCard from "../components/common/ExploreCard"
const ExplorePage = () => {
  const { width } = useWindowSize()
  const lastItemRef= useRef();

  const [tabs, setTab] = useState({
    technology : true,
    fiction : false,
    adventure : false,
    nonfiction : false,
    romance : false,
    memoir : false
  })
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [category, setCategory] = useState(Object.keys(tabs).find(key => tabs[key] === true))
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState([])
  const [stories, setStories] = useState([])
  const { getExploreStories, isLoading, error, data, storyCount } = useGetExploreStories()
  const {
    contextMenu,
     shareModal,
 shareRef,
 fireClick,
 setContextMenu,
 closeContextMenu
} = useModalContext()
useEffect(() => {
  getExploreStories(page, limit, category)
}, [page, category, limit])
const handleCategoryChange = () => {
  // setCategoryChanged(true)
let selectedCategory;
 selectedCategory = Object.keys(tabs).find(key => tabs[key]);
 if(selectedCategory == "nonfiction"){
  selectedCategory = "non-fiction"
          }
if (category !== selectedCategory) {
  setStories([])
setCategory(selectedCategory)
}  
}
useEffect(() => {
handleCategoryChange()
}, [tabs])
 //Set up Intersection Observer
 useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1);
        observer.unobserve(entry.target); // Pause observer to prevent duplicate triggers
      }
    },
    { threshold: 0.1, rootMargin: "" } // Adjust threshold as needed
  );

  if (lastItemRef.current && !isLoading) {
    observer.observe(lastItemRef.current);
  }
  return () => {
    if (lastItemRef.current) {
      observer.unobserve(lastItemRef.current);
    }
  };
}, [lastItemRef, isLoading, hasMore]);
useEffect (() => {
  const skip = (page - 1) * limit
  const maximum = ((storyCount / limit) + 1) - 1
  if(skip >= storyCount){
    setPage(Math.floor((Math.random() * maximum) + 1))
  }

}, [storyCount, page, limit])
function filterUniqueById(data) {
  return data.reduce((accumulator, current) => {
    // Check if there's an item in the accumulator with the same id
    if (!accumulator.some(item => item._id === current._id)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
}
useEffect(() => {
    if(data.length > 0){
    const oldStories = stories.map((story) => {
      return {...story, isLoading : false}
    })
    const newStories = data.map((story) => {
      return {...story, isLoading : true}
    })
  
const storiesToBeSent = [...oldStories, ...newStories]
const exploreStories = filterUniqueById(storiesToBeSent)
   setStories(exploreStories)
  }

}, [data, isLoading])
useEffect(() => {
if(width < 767){
  setLimit(1)
  setLoading([{}])
}else{
  setLimit(3)
  setLoading([{}, {}, {}])
}
}, [width])
useEffect(() => {
  setPage(1);
}, [category, tabs]);


const loadingRef = useRef(null);
const isVisibleInViewport = (element) => {
  const rect = element?.getBoundingClientRect()
  return (
      rect?.top >= 0 &&
      rect?.left >= 0 &&
      rect?.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect?.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}


const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      const currentScrollY = window.scrollY;
    
      // If the user is trying to scroll down, prevent the scroll
      if (currentScrollY > lastScrollY && isVisibleInViewport(loadingRef.current)) {
        e.preventDefault()
        window.scrollTo(0, lastScrollY); // Reset the scroll position to the last known position
      } else {
        // Update the last scroll position if scrolling up
        setLastScrollY(currentScrollY);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Only re-run the effect when lastScrollY changes


const resendRequest = () => {
  getExploreStories(page, limit, category)
}
  return (
    <>

    <section className="" onClick={closeContextMenu} >
   
   <div className="litenote-browse-container">
   
     <h3 className="title-browse">Search Your Favourite Stories</h3>
     <SearchBar  />    
     <div className="litenote-browse-stories-tabs">
     <Tab tabs={tabs} setTab={setTab}  />
     </div>
     {hasMore &&
     <>
     { !error ? 
     <section className="litenote-browse-stories">
     <div className="litenote-browse-story-grid">
  {
    stories.map((story, index) => (
      <ExploreCard
       shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
    ))
  }
  { isLoading && 

  loading.map((story, index) => (
      <LoadingCard
      ref={loadingRef}
      isLoading={true}
      shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
    ))
  
 
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
 </div>
 <div ref={lastItemRef}>

 </div>
  {/* <SearchPagination currentValue={currentValue} setCurrentValue={setCurrentValue}/> */}
     </section>
      :
      <ErrorMessage title={"Something went wrong"} 
  message={"We are unable to load this content, check your connection"}
  height={80}
  fireClick = {resendRequest}
 />
     }
     </>
     }
     {/* {!hasMore && 
     <>
     <div style={{display : "flex", flexDirection : "row", width : "100%", alignItems : "center",
     justifyContent : "center", margin : "90px auto" 
     }}>
      Sorry, But the page you are looking for does not exist
     </div>
     </>

     } */}
   </div>

 </section>
    </>

  )
}

export default ExplorePage


