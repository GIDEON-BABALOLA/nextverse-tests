import { useGetUserFollowers } from "../../hooks/useGetUserFollowers";
import { useState } from "react";
import { useProfileContext } from "../../hooks/useProfileContext";
const FollowersCard = ({ openModal }) => {
    const [page, setPage]  = useState(1)
    const [limit, setLimit] = useState(5)
    const { getUserFollowers, isLoading, error, data, statusCode, followersCount } = useGetUserFollowers();
    const  { profile } = useProfileContext()
    useEffect(() => {
    if (skip >= likesCount && likesCount > 0) {
        return;
      }
      getUserFollowers(page, limit, profile._id)
      }, [page, limit, followersCount])
  return (
  <>
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
  </>
  )
}

export default FollowersCard