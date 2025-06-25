import { useGetUserFollowing } from "../../hooks/useGetUserFollowing";
import { useProfileContext } from "../../hooks/useProfileContext";
const FollowingCard = ({ openModal }) => {
const { getUserFollowing, isLoading, error, data, statusCode, followingCount } = useGetUserFollowing()
  const  { profile } = useProfileContext()
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

export default FollowingCard