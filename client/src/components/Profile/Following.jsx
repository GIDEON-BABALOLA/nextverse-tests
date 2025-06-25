import { useGetUserFollowing } from "../../hooks/useGetUserFollowing";
import FollowingCard from "./FollowingCard"
import NoContent from "../common/NoContent"
import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useProfileContext } from "../../hooks/useProfileContext";
const Following = ({ openModal, setOpenModal }) => {
const { getUserFollowing, isLoading, error, data, followingCount } = useGetUserFollowing()
  const [page, setPage]  = useState(1)
  const [limit, setLimit] = useState(5)
  const lastItemRef = useRef();
  const [preventLoadMore, setPreventLoadMore] = useState(false)
  const [loadingState, setLoadingState] = useState([{}, {}, {}, {}, {}])
  const [emptyData, setEmptyData] = useState(false)
  const [following, setFollowing] = useState([])
  const  { profile } = useProfileContext()
  useEffect(() => {
      if(openModal){
      getUserFollowing(page, limit, profile._id)
      }
      }, [page, limit, openModal, profile])
  useEffect(() => {
    if(following.length === followingCount && followingCount > 0){
      setPreventLoadMore(true)
    }
      }, [following, followingCount])
  const updateMyFollowing = (prev) => {
    const newFollowing = data.filter(
      (newFollowing) => !prev.some((prevFollowing) => prevFollowing._id === newFollowing._id)
    );
    return [...prev, ...newFollowing];
  }
    useEffect(() => {
      if(data.length == 0 && followingCount > 0){
        setPage(1)
      }
        if(data.length > 0){
     setEmptyData(false)
     setFollowing(updateMyFollowing)
          }
    }, [data, followingCount])
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
      }, [lastItemRef, isLoading, following, followingCount, preventLoadMore]);
        useEffect(() => {
          if(!isLoading){
            if(preventLoadMore && following.length == 0){
              setEmptyData(true)
            }
            if(data.length == 0 && !error && page == 1 && followingCount == 0){
              setEmptyData(true)
            }
            if(followingCount == 0 ){
              setEmptyData(true)
            }
          }
              }, [data, isLoading, followingCount, following, preventLoadMore, limit, page, error])
const resendRequest = () => {
  console.log("you")
  setEmptyData(false)
  getUserFollowing(page, limit, profile._id)
  }
  return (
   <>
   {
    !error  &&
    <>
    {
     emptyData ? 
     <div>
       <NoContent message={`This user is not following anyone.`}
              fireClick={
               () => {
   
               
   resendRequest()
               }}
       />
     </div>
     :
           <div style={{display: "flex", flexDirection: "column", alignItems : "flex-start", justifyContent: "space-between", gap: "20px"}}>
             <div style={{display: "flex", flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between"}}>
              <span style={{fontSize: "1.6rem"}}>Following</span>
    <MdClose size={30} style={{cursor: "pointer"}} onClick={() => setOpenModal({
    followersModal: false,
    followingModal: false
      })}/>
              
             </div>
     {
       following.map((following, index) => (
         <FollowingCard
        isLoading={false}
        following={following}
        key={index}/>
       ))
   
     }
       { isLoading &&
       loadingState.map((following, index) => (
         <FollowingCard  
         isLoading={true}
         key={index}/>
       ))
   
     }
      <div ref={lastItemRef} style={{margin : "10px 0px"}} />
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

export default Following