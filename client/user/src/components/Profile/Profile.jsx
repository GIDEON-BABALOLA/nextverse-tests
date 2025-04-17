import Avatar from "./Avatar"
import Bio from "./Bio"
import Stats from "./Stats"
import StoryCard from "./StoryCard"
import Share from "../common/Share"
import ContextMenu from "../common/ContextMenu"
import { FaEllipsisH, FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useModalContext } from "../../hooks/useModalContext"
import { useProfileContext } from "../../hooks/useProfileContext"
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md"
import ProfileStories from "./ProfileStories"
import { useParams } from "react-router-dom"
import ErrorMessage from "../common/ErrorMessage"
import NoContent from "../common/NoContent"
import { MdReadMore } from "react-icons/md"
import { useGetUserProfile } from "../../hooks/useGetUserProfile"
import { useEffect, useState } from "react"
const Profile = () => {
  const { username } = useParams();
  const { dispatch, profile } = useProfileContext()
  const { getUserProfile, data, isLoading, error, isFollowing } = useGetUserProfile();
  useEffect(() => {
console.log(decodeURIComponent(username))
    getUserProfile(decodeURIComponent(username));
  }, [username])
  const resendRequest = () => {
    getUserProfile(decodeURIComponent(username))
  }
  useEffect(() => {
  if(Object.keys(data).length > 1){
    dispatch({ type: "LOAD_PROFILE", payload:data });
  }
  }, [data, dispatch])
  const { closeContextMenu } = useModalContext()
  return (
    <>
<div>
{  !error   &&
 <section className="litenote-profile-user-profile" onClick={() => closeContextMenu()}>
<div className="litenote-profile-container">
<div className="litenote-profile-header" style={{


borderRadius : "10px", padding : "30px"}}>
<div style={{display : "flex", flexDirection : "column", color : "white"}}>
<Avatar isLoading={isLoading}/>
<Bio isLoading={isLoading} isFollowing={isFollowing} />
</div>
<div className="litenote-profile-info" style={ { color : "white"}}>

  <div className="litenote-profile-stats"  style={{   color: "#FF4B33"}}>
 <Stats isLoading={isLoading}/>
  </div>
</div>

<span style={{color : "white", alignSelf : "flex-end"}}>
  <FaEllipsisH />
</span>
</div>

<div className="litenote-profile-stories">
{isLoading ? <div className="profile-loader profile-loader-bio"></div> : <h3 className="litenote-profile-section-title">{profile["username"]} Stories</h3>}
<ProfileStories username={username}/>
</div>
</div>
</section> 

 }
 {error && <>


{ error?.code == "ERR_NETWORK" ? 
  <ErrorMessage title={"Check Your Internet Connection"} 
message={"We are unable to load this content, check your connection"}
height={90}
type={error.code}
fireClick = {resendRequest}
/>
:
error?.code == "ERR_CANCELED"

?
<ErrorMessage title={"Timeout Error"} 
message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
height={90}
type={error.code}
fireClick = {resendRequest}
/>
:
<ErrorMessage title={"Something went wrong"} 
message={"We are unable to load this content, Pls click on the refresh button"}
height={90}
type={error.code}
fireClick = {resendRequest}
/>
}
</>
}
</div>
    </>
  )
}

export default Profile