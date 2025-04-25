// SearchPage.jsx
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetSearchResults } from '../../hooks/useGetSearchResults';
import {  MdOutlineFavoriteBorder, MdReadMore } from "react-icons/md"
import {   FaShareAlt,  FaRegBookmark } from "react-icons/fa";
import { useModalContext } from '../../hooks/useModalContext';
import { Typewriter } from 'react-simple-typewriter';
import SearchBar from './SearchBar';
import LoadingCard from '../Profile/LoadingCard';
import Share from '../common/Share';
import ContextMenu from '../common/ContextMenu';
import { useRef } from 'react';
import StoryCard from '../Profile/StoryCard';
import NoContent from '../common/NoContent';
import ErrorMessage from '../common/ErrorMessage';
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const {
    contextMenu,
     shareModal,
 shareRef,
 fireClick,
 setContextMenu,
 shareUrl,
 setShareUrl,
 closeContextMenu,
} = useModalContext()
  const query = searchParams.get('search_query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState([{}, {}, {}])
  const [emptyData, setEmptyData] = useState(false)
   const [preventLoadMore, setPreventLoadMore] = useState(false)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3)
  const { getSearchResults, isLoading, error, data, storyCount } = useGetSearchResults(); 
  useEffect(() => {
    setEmptyData(false)
    getSearchResults(encodeURIComponent(query), page, limit)
  }, [query, page, limit]);
  const lastItemRef= useRef();
  const loadingRef = useRef();
  useEffect(() => {
    console.log(results.length, storyCount)
    if(results.length === storyCount && storyCount > 0){
      setPreventLoadMore(true)
    }
      }, [results, storyCount])
  const updateSearchResults = (prev) => {
    const newBookmarks = data.filter(
      (newSearch) => !prev.some((prevSearch) => prevSearch._id === newSearch._id)
    );
    return [...prev, ...newBookmarks];
  } 
  useEffect(() => {
    if(data.length == 0 && storyCount > 0){
      setPage(1)
    }
      if(data.length > 0){
        console.log(data)
      setEmptyData(false)
   setResults(updateSearchResults)
        }
  }, [data, storyCount])
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
            setPage((prevPage) => prevPage + 1);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.1, }
    );
    if (lastItemRef.current && !isLoading ) {
  if(!preventLoadMore){
  observer.observe(lastItemRef.current);
  }
    
    }                                                                                                                                   
  
    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [lastItemRef, isLoading,  storyCount, preventLoadMore]);
  useEffect(() => {
    console.log(error)
    if(!isLoading){
      if(preventLoadMore && results.length == 0){
        setEmptyData(true)
      }
      if(data.length == 0 && !error && page == 1 && storyCount == 0){
        setEmptyData(true)
      }
      if(storyCount == 0 ){
        setEmptyData(true)
      }
    }
        }, [data, isLoading, storyCount, results, preventLoadMore, limit, page, error])
        const resendRequest = () => {
          setEmptyData(false)
          getSearchResults(encodeURIComponent(query), page, limit)
        }
  useEffect(() => {
setPage(1)
setResults([])
setPreventLoadMore(false)
  }, [query])
  useEffect(() => {
    if(!isLoading){
      if(data.length == 0 && !error){
        setEmptyData(true)
      }
    }
        }, [data, isLoading, error])
  
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
         <div className="litenote-browse-stories" >
         <SearchBar  />    
         </div>
    {
    
    !error &&  
    <>
     {
      emptyData ? 
      <NoContent
      fireClick={
           () => {

           
resendRequest()
           }}
     message={"No Explore Stories To Display"}
      />
      :
      <section className="litenote-browse-stories">
    
      {
   results.length === 0 && 
    <div className="litenote-browse-story-grid" style={{marginTop : "80px"}}>
    <div style={{display :"flex", flexDirection : "column", 
         alignItems : "center", justifyContent : "center", padding : "40px 0px"}}>
    <span className="still-no-stories-loader"></span>
    </div>
 
 
   </div> 
 
 }
      <div className="litenote-browse-story-grid">
 {
     results.map((story, index) => (
       <StoryCard
       isLoading={false}
        shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
     ))
     }
   { isLoading && results.length !== 0 &&
 
   loading.map((story, index) => (
       <LoadingCard
       ref={loadingRef}
       isLoading={true}
       shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
     ))
   
  
   }
   
 <Share  share={shareRef} shareModal={shareModal} shareUrl={shareUrl} setShareUrl={setShareUrl}/>
 <ContextMenu
   state={"feed"}
   contextMenu={contextMenu}
   stories={results}
   shareModal={shareModal}
              setContextMenu={setContextMenu}
              contextMenuData={[
              {id : 1, icon : <FaShareAlt />
              , label : "Share", type : "default"},
              {id : 2, icon : <FaRegBookmark />
              , label : "Bookmark", type : "custom"},
              {id : 4, icon : <MdOutlineFavoriteBorder />
              , label : "Like", type : "custom"},
              {id : 5, icon : <MdReadMore />
               , label : "Read More", type : "default"}
 ]} />
  </div>
  <div ref={lastItemRef}>
  </div>
   {/* <SearchPagination currentValue={currentValue} setCurrentValue={setCurrentValue}/> */}
      </section>
     }
        </>
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
    message={"Sorry, Your Request Has Timed Out, Pls click on the resfresh button"}
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
    
       </div>
    
     </section>
    </>
  );
};

export default SearchResults;
