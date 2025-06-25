import CommonAvatar from "../common/CommonAvatar"
import useNavigateProfile from "../../hooks/useNavigateProfile"
const FollowerCard = ({ follower, isLoading }) => {
  const navigateToProfile = useNavigateProfile()
  console.log(follower)
  return (
    
    <>
{
  isLoading ? 
  <div style={{display: "flex", flexDirection: "row", justifyContent : "space-between"}}>
  <div style={{display: "flex", flexDirection: "row", alignItems : "center", justifyContent: "space-between", gap: "10px"}}>
    <CommonAvatar
  style={{height : "60px", width: "60px"}}
  image={""}
  className="settings-page-avatar"
  />
  <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "5px"}}>
    <div className="profile-loaders-username profile-loaders"></div>
    <div className="profile-loaders-username profile-loaders"></div>
  </div>
  </div>
  <div>

  </div>
  </div>
  :
<div style={{display: "flex", flexDirection: "row", justifyContent : "space-between", alignItems : "center", width:"100%"}}>
  <div style={{display: "flex", flexDirection: "row", alignItems : "center", justifyContent: "space-between", gap: "10px"}}>
    <CommonAvatar
  style={{height : "60px", width: "60px"}}
  image={follower.picture}
  className="settings-page-avatar"
  />
  <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", cursor: "pointer"}} onClick={() => navigateToProfile(follower.username)}>
    <span style={{ fontSize: "1rem"}}>{follower.username}</span>
    <span style={{ fontSize: "1rem"}}>{follower.bio}</span>
  </div>
  </div>
  <div>
    {
      follower.isFollowing ? 
<button style={{outline:"none", border: "none", padding:"7px 16px",  color: "white", borderRadius: "5px"}} className="modal-follow-button-inactive">
  Following
</button> 
      :
<button style={{outline:"none", border: "none", padding:"7px 16px", color: "white", borderRadius: "5px"}} className="modal-follow-button-active"  >
  Follow
</button>
    }
  </div>
  </div>
}

    </>
  )
}

export default FollowerCard