import FeedAvatar from "./FeedAvatar"
const FollowSuggestionCard = ({ isLoading, user }) => {
    console.log(user)
  return (
<>
{
    isLoading ? 
    <div
    className="feed-follow-suggestion"
     style={{display :"flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
<div
style={{display : "flex", flexDirection :"row", alignItems : "center"}}

><div className=" feed-loaders feed-profile-images-following"></div>
<div style={{display :"flex", flexDirection : "column", gap : "5px"}}>
<div className="feed-loaders feed-loaders-follow-text"></div>
<div className="feed-loaders feed-loaders-follow-subtext"></div>

</div>

</div>
<div className="feed-loaders feed-loaders-follow-button"></div>
    </div>
    :
<div className="feed-follow-suggestion">
         <FeedAvatar
image={user["avatar"]}
alt="Author"
className="feed-profile-images-trending" 
/>
         <div>
             <div><b>{user["username"]}</b></div>
             <div>{user["email"]}</div>
         </div>
         <button className="feed-follow-button">Follow</button>
     </div>
}
</>

  )
}

export default FollowSuggestionCard