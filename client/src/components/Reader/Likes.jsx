import { useGetStoryLikes } from "../../hooks/useGetStoryLikes"
import "../../styles/components/Reader/likes.css"
import ErrorMessage from "../common/ErrorMessage";
import { MdClose } from "react-icons/md"
import { formatNumber } from "../../helpers/formatNumber";
import {  useEffect, useRef,  useState } from "react"
import LikeCard from "./LikeCard"
const Likes = ({ id, likeModal, likesDrawerOpen, setLikeModal, onClose, likes, setLikes, likesNumber, setLikesNumber }) => {
  const { getStoryLikes, isLoading, error, data, statusCode, likesCount } = useGetStoryLikes()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [loadingState, setLoadingState] = useState([{}, {}, {}, {}, {}])
  const [emptyData, setEmptyData] = useState(false)
  const lastItemRef = useRef();
  const likesSectionRef = useRef();
  useEffect(() => {
    if(likeModal){
      console.log("twice first")
      const skip = (page * limit);
      console.log(page, limit)
      if (skip >= likesCount && likesCount > 0) {
  return;
      }
        getStoryLikes(page, limit, id)
     }
     if(likesDrawerOpen){
      console.log(likesDrawerOpen)
      console.log("twice second")
      const skip = (page * limit);
      console.log(page, limit)
      console.log(skip, likesCount)
      if (skip >= likesCount && likesCount > 0) {
  return;
      }
        getStoryLikes(page, limit, id)
     }
  }, [page, limit, likeModal, likesDrawerOpen, id, likesCount])
  useEffect(() => {

    if(data.length > 0){
      setEmptyData(false)
      setLikes((prev) => {
        const newLikes = data.filter(
          (newLike) => !prev.some((prevLike) => prevLike.likedBy._id === newLike.likedBy._id)
        );
        return [...prev, ...newLikes];
      });
      setLikesNumber(likesCount)
      
    }

  
  }, [data,  likesCount, error, isLoading])
  useEffect(() => {
    if(!isLoading){
      if(data.length == 0 && !error && page == 1 && likesNumber == 0){
        setEmptyData(true)
      }else{
        setEmptyData(false)
      }
      if(likesNumber == 0 ){
        // setEmptyData(true)
      }
  }
  }, [likesNumber, isLoading, data, error, page])
  useEffect(() => {
    const observer = new 
    IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && data.length !== 0 ) {
       console.log("I am intersecting")
            setPage((prevPage) => prevPage + 1);
          observer.unobserve(entry.target); // Pause observer to prevent duplicate triggers
        }
      },
      { threshold: 0.1, } // Adjust threshold as needed
    );
  
    if (lastItemRef.current && !isLoading) {
      observer.observe(lastItemRef.current);
    }
  
    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [lastItemRef, isLoading, data]);
  const closeLikeModal = () => {
    if(likeModal){
    setLikeModal(!likeModal); 
    }
    if(likesDrawerOpen){
      onClose()
    }
  }
   const resendRequest = () => {
    getStoryLikes(page, limit, id)
  }
  return (
   <section>
    <span style={{display : "flex", flexDirection : "row", alignItems : "center", justifyContent : "space-between"}}>
      <span style={{display : "flex", flexDirection : "row", alignItems : "center", justifyContent : "space-between", gap : "6px"}}>
      <span style={{fontSize : "2rem"}} className="likes-title">Likes</span>
      <span className="comment-badge">{formatNumber(likesNumber)}</span>
      </span>

    
    <span onClick={() => closeLikeModal()}
      style={{cursor : "pointer"}}
      className="likes-close-icon"
      >
    <MdClose size={30} 
      />
    </span>
    </span>

    <hr />
    {
emptyData ? <div style={{padding :"40px 0px", display :"flex", flexDirection : "column", justifyContent : "space-between", gap : "5px"}}>
  <h2>No Likes Yet</h2>
  <span>Be The First To Like This Story</span>
  
  </div>
:
    <>
    {!error &&
    <div className="likes-section" ref={likesSectionRef}>
{
        likes.map((like, index) => (
<LikeCard key={index} like={like} isLoading={false}/>
 
 
        ))
        }
        {
          isLoading &&
        loadingState.map((like, index) => (
          <LikeCard key={index} like={like} isLoading={true}/>
           
           
                  ))
                }
      
<div ref={lastItemRef}>

</div>
    </div>
} 
</>
}
{error && <>

{ error?.code == "ERR_NETWORK" ? 
  <ErrorMessage title={"Check Your Internet Connection"} 
message={"We are unable to load this content, check your connection"}
height={50}
type={error.code}
fireClick = {resendRequest}
/>
:
error?.code == "ERR_CANCELED"

?
<ErrorMessage title={"Timeout Error"} 
message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
height={50}
type={error.code}
fireClick = {resendRequest}
/>
:
<ErrorMessage title={"Something went wrong"} 
message={"We are unable to load this content, Pls click on the refresh button"}
height={50}
type={error.code}
fireClick = {resendRequest}
/>
}
</>
}
   </section>
  )
}

export default Likes