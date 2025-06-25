import { useGetUserFollowers } from "../../hooks/useGetUserFollowers";
import ErrorMessage from "../common/ErrorMessage";
import { MdClose } from "react-icons/md";
import FollowerCard  from "./FollowerCard"
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useProfileContext } from "../../hooks/useProfileContext";
const Followers = ({ openModal, setOpenModal }) => {
    const { getUserFollowers, isLoading, error, data, followersCount } = useGetUserFollowers();
    const [page, setPage]  = useState(1)
    const [limit, setLimit] = useState(5)
    const lastItemRef = useRef();
    const [preventLoadMore, setPreventLoadMore] = useState(false)
    const [loadingState, setLoadingState] = useState([{}, {}, {}, {}, {}])
    const [emptyData, setEmptyData] = useState(false)
    const [followers, setFollowers] = useState([])
    const { profile } = useProfileContext()
useEffect(() => {
      if(openModal){
      getUserFollowers(page, limit, profile._id)
      }
      }, [page, limit, followersCount, openModal])
 useEffect(() => {
    if(followers.length === followersCount && followersCount > 0){
      setPreventLoadMore(true)
    }
      }, [followers, followersCount])
  const updateMyFollowers = (prev) => {
    const newFollowers = data.filter(
      (newFollower) => !prev.some((prevFollower) => prevFollower._id === newFollower._id)
    );
    return [...prev, ...newFollowers];
  }
   useEffect(() => {
      if(data.length == 0 && followersCount > 0){
        setPage(1)
      }
        if(data.length > 0){
     setEmptyData(false)
     setFollowers(updateMyFollowers)
          }
    }, [data, followersCount])
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
      }, [lastItemRef, isLoading, followers, followersCount, preventLoadMore]);
        useEffect(() => {
          if(!isLoading){
            if(preventLoadMore && followers.length == 0){
              setEmptyData(true)
            }
            if(data.length == 0 && !error && page == 1 && followersCount == 0){
              setEmptyData(true)
            }
            if(followersCount == 0 ){
              setEmptyData(true)
            }
          }
              }, [data, isLoading, followersCount, followers, preventLoadMore, limit, page, error])
  const resendRequest = () => {
  setEmptyData(false)
   getUserFollowers(page, limit, profile._id)
  }
  return (
 <>
   {
    !error  &&
    <>
    {
     emptyData ? 
     <div>
       <NoContent message={`This user has no followers.<`}
              fireClick={
               () => {
   
               
   resendRequest()
               }}
       />
     </div>
     :
     <div style={{display: "flex", flexDirection: "column", alignItems : "flex-start", justifyContent: "space-between", gap: "20px"}}>
     <div style={{display: "flex", flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between"}}>
      <span style={{fontSize: "1.6rem"}}>Followers</span>
      <MdClose size={30} style={{cursor: "pointer"}} onClick={() => setOpenModal({
    followersModal: false,
    followingModal: false
      })}/>
     </div>
     {
       followers.map((follower, index) => (
         <FollowerCard  
        isLoading={false}
        follower={follower}
        key={index}
        />
       ))
   
     }
       { isLoading &&
       loadingState.map((follower, index) => (
         <FollowerCard  
          isLoading={true}
          key={index}/>
       ))
   
     }
      <div ref={lastItemRef} style={{margin : "40px 0px"}} />
   </div>
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
 </>
  )
}

export default Followers