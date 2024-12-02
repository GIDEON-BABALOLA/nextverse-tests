import "../styles/components/Browse/browse.css"
import SearchBar from "../components/Browse/SearchBar"
// import SearchPagination from "../components/Browse/SearchPagination"
import LoadingCard from "../components/Profile/LoadingCard"
import Share from "../components/common/Share"
import ContextMenu from "../components/common/ContextMenu"
import {  FaRegThumbsUp, FaShareAlt, FaBookmark } from "react-icons/fa";
import NoContent from "../components/common/NoContent.jsx"
import { useEffect, useState, useRef} from "react"
import useWindowSize from "../hooks/useWindowSize"
import ChatBot from "../components/ChatBot/ChatBot.jsx"
import { useModalContext } from "../hooks/useModalContext"
import ConnectivityToast from "../components/common/connectivityToast.jsx"
import Tab from "../components/common/Tab"
import { MdReadMore } from "react-icons/md"
import { Typewriter } from 'react-simple-typewriter'
import ErrorMessage from "../components/common/ErrorMessage"
import StoryCard from "../components/Profile/StoryCard"
import { useGetExploreStories } from "../hooks/useGetExploreStories"
import { generateRandomPage } from "../helpers/generateRandomPage"
import { isVisibleInViewport } from "../helpers/isVisibleInViewPort.jsx"
const ExplorePage = () => {
  const { width } = useWindowSize()
  const lastItemRef= useRef();
  const loadingRef = useRef(null);
  const [tabs, setTab] = useState({
    all : true,
    technology : false,
    fiction : false,
    adventure : false,
    nonfiction : false,
    romance : false,
    memoir : false
  })
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [emptyData, setEmptyData] = useState(false)
  const [category, setCategory] = useState(Object.keys(tabs).find(key => tabs[key] === true))
  const [loading, setLoading] = useState([])
  const [stories, setStories] = useState([])
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categoryChanged, setCategoryChanged] = useState(null)
  const { getExploreStories, isLoading, error, data,  storyCount } = useGetExploreStories()
  const {
    contextMenu,
     shareModal,
 shareRef,
 fireClick,
 setContextMenu,
 closeContextMenu
} = useModalContext()
useEffect(() => {
  setEmptyData(false)
  const skip = (page - 1) * limit;
  if (skip >= storyCount && storyCount > 0) {
    const randomPage = generateRandomPage(page)
    setPage(randomPage);
    return;
  }
  getExploreStories(page, limit, category);
}, [page, category,limit]);
useEffect(() => {
  setPage(1); // Reset to the first page when the category changes
  setStories([]); // Clear current stories to avoid mixing old and new category data
}, [category, tabs]);

useEffect(() => {
if(data.length > 0){
  setEmptyData(false)
  const newStories = data.map((story) => {
    return {...story, loading : false}
  })
setStories((prev) => {
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
      }, [data, isLoading, error])
const handleCategoryChange = () => {
let selectedCategory;
 selectedCategory = Object.keys(tabs).find(key => tabs[key]);

 if(selectedCategory == "nonfiction"){
  selectedCategory = "non-fiction"
          }
if (category !== selectedCategory) {
  setPage(1);
setCategoryChanged(true)
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
    // If the user is trying to scroll down, prevent the scroll
    if(isLoading){
      if (currentScrollY > lastScrollY && isVisibleInViewport(loadingRef.current, 0.1)) {
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
  setLimit(2)
  setLoading([{}, {}])
}
else if(width < 767){
  setLimit(1)
  setLoading([{}])
}
else{
  setLimit(3)
  setLoading([{}, {}, {}])
}
}, [width])
const resendRequest = () => {
  setEmptyData(false)
    getExploreStories(1, limit, category)
}
  return (
    <>

    <section className="litenote-explore-page" onClick={closeContextMenu} >
   
   <div className="litenote-browse-container">
   
     <h3 className="title-browse" style={{marginTop : "50px"}}>Search Your Favourite
     <span style={{color : "var(--typewriter-text)"}}>
     &nbsp;<Typewriter
          style={{color : "white"}}
        words={['Stories', 'adventure', 'drama']}
        loop={5} // The number of times to loop through the words (0 for infinite)
        cursor
        cursorStyle="|"
        typeSpeed={70} // Speed in ms for typing
        deleteSpeed={50} // Speed in ms for deleting
        delaySpeed={1000} // Delay between each word
      />
     </span>
        
     </h3>
     
     <SearchBar  />    
     <div className="litenote-browse-stories" >
     <Tab tabs={tabs} setTab={setTab} labelWidth={165} />
    
     </div>
    { emptyData ? 
 <NoContent
       fireClick={
            () => {

            
resendRequest()
            }}
      message={"No Explore Stories To Display"}
       />
    : <>
{

!error &&  
 
     <section className="litenote-browse-stories">

     {
  stories.length === 0 && 
   <div className="litenote-browse-story-grid" style={{marginTop : "80px"}}>
   <div style={{display :"flex", flexDirection : "column", 
        alignItems : "center", justifyContent : "center", padding : "40px 0px"}}>
   <span className="still-no-stories-loader"></span>
   </div>


  </div> 

}
     <div className="litenote-browse-story-grid">
{
    stories.map((story, index) => (
      <StoryCard
      isLoading={story.loading}
       shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
    ))
    }
  { isLoading && stories.length !== 0 &&

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
}


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
message={"We are unable to load this content, Pls click on the refresh button"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
}
</>
}

     
     </>
    }

   </div>

 </section>
 <ChatBot />
 <ConnectivityToast />
    </>

  )
}

export default ExplorePage