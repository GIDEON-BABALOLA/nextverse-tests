// SearchPage.jsx
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetSearchResults } from '../../hooks/useGetSearchResults';
import { useModalContext } from '../../hooks/useModalContext';
import LoadingCard from '../Profile/LoadingCard';
import Share from '../common/Share';
import ContextMenu from '../common/ContextMenu';
import StoryCard from '../Profile/StoryCard';
import NoContent from '../common/NoContent';
import ErrorMessage from '../common/ErrorMessage';
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const  { closeContextMenu, showModal} = useModalContext()
  const query = searchParams.get('search_query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState([{}, {}, {}])
  const [emptyData, setEmptyData] = useState(false)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3)
  const { getSearchResults, isLoading, error, data, statusCode, storyCount } = useGetSearchResults(); 
  useEffect(() => {
    getSearchResults(encodeURIComponent(query), page, limit)
  }, [query, page, limit]);
const resendRequest = () => {
  getSearchResults(encodeURIComponent(query), page, limit)
}
  return (
    <>
        <section className="litenote-explore-page" onClick={closeContextMenu} >
       
       <div className="litenote-browse-container">
         <div className="litenote-browse-stories" >
        
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
      
    <Share  share={shareRef} shareModal={shareModal} shareUrl={shareUrl} setShareUrl={setShareUrl}/>
    <ContextMenu
      state={"feed"}
      contextMenu={contextMenu}
      stories={stories}
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
    
         
         </>
        }
    
       </div>
    
     </section>
    </>
  );
};

export default SearchResults;
