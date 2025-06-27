import CommonAvatar from "../common/CommonAvatar"
import useNavigateProfile from "../../hooks/useNavigateProfile"
import { useFollowUser } from "../../hooks/useFollowUser"
const FollowingCard = ({ following, isLoading }) => {
  const {followUser, isLoading: buttonLoading, error, data, statusCode} = useFollowUser()
    const navigateToProfile = useNavigateProfile()
  console.log(following)
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
  image={following.picture}
  className="settings-page-avatar"
  />
  <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", cursor: "pointer"}} onClick={() => navigateToProfile(following.username)}>
    <span style={{ fontSize: "1rem"}}>{following.username}</span>
    <span style={{ fontSize: "1rem"}}>{following.bio}</span>
  </div>
  </div>
  <div>
    {
      following.isFollowing ? 
<button style={{outline:"none", border: "none", padding:"7px 16px",  color: "white", borderRadius: "5px"}} className="modal-follow-button-inactive" >
  Following
</button>
      :
<button style={{outline:"none", border: "none", padding:"7px 16px",  color: "white", borderRadius: "5px"}} className="modal-follow-button-active">
  Follow
</button>
    }
  </div>
  </div>
}

    </>
  )
}

export default FollowingCard