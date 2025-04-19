import Avatar from "./Avatar"
import Bio from "./Bio"
import Stats from "./Stats"
import Share from "../common/Share"
import { FaEllipsisH, FaShareAlt } from "react-icons/fa";
import Toast from "../common/Toast";
import { FaBookmark } from "react-icons/fa";
import { useModalContext } from "../../hooks/useModalContext"
import { useProfileContext } from "../../hooks/useProfileContext"
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md"
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import CustomMenu from "../../components/common/CustomMenu"
import ProfileStories from "./ProfileStories"
import { useRef } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Report from "../common/Report"
import SpecialModal from "../common/SpecialModal"
import { useParams } from "react-router-dom"
import ErrorMessage from "../common/ErrorMessage"
import NoContent from "../common/NoContent"
import { MdReadMore } from "react-icons/md"
import { useGetUserProfile } from "../../hooks/useGetUserProfile"
import { useEffect, useState } from "react"
const Profile = () => {
  const { username } = useParams();
  const { dispatch, profile } = useProfileContext()
  const [openModal, setOpenModal] = useState(false)
  const { getUserProfile, data, isLoading, error, isFollowing } = useGetUserProfile();
  const { shareModal, shareRef, closeContextMenu, shareUrl,  setShareUrl, fireClick, contextMenu} = useModalContext()
  useEffect(() => {
console.log(decodeURIComponent(username))
    getUserProfile(decodeURIComponent(username));
  }, [username])
  const resendRequest = () => {
    getUserProfile(decodeURIComponent(username))
  }
  useEffect(() => {
  if(Object.keys(data).length > 1){
    console.log(data)
    dispatch({ type: "LOAD_PROFILE", payload:data });
  }
  }, [data, dispatch])
  const { width, height} = useWindowSize();
  const customMenu = useRef();
  const updateMenuPosition = (x, y) => {
    console.log(customMenu.current)
     const maxTopValue = height - customMenu.current.offsetHeight;
     const maxLeftValue = width - customMenu.current.offsetWidth;
     customMenu.current.style.left = `${Math.min(maxLeftValue, x)}px`;
     customMenu.current.style.top = `${Math.min(maxTopValue, y)}px`;
     customMenu.current.style.visibility = "visible"
   };
   const closeCustomMenu  = (e) => {
    if( e?.clientX < parseInt(customMenu.current?.style.left) || e?.clientX > parseInt(customMenu.current?.style.left) + customMenu.current?.offsetWidth )
    {
      console.log("Sushi dynasty")
      customMenu.current.style.visibility = "hidden";
    }else if(
      e?.clientY < parseInt(customMenu.current?.style.top) || e?.clientY > parseInt(customMenu.current?.style.top) + customMenu.current?.offsetHeight
    ){
      console.log("sushi dynasty")
      customMenu.current.style.visibility = "hidden";
    }
}
  const openShare = () => {
    const url = `${window.location.origin}/profile/${username}`;
    if(url){
   fireClick("", url, "")
   contextMenu.current.style.visibility = "hidden";
    }
    shareModal.current.showModal()
    shareModal.current.classList.add("slide-dow")
    customMenu.current.style.visibility = "hidden";
  }
const openReport = () => {
  setOpenModal(true)
  customMenu.current.style.visibility = "hidden";
}
  return (
    <>
    <Toast />
    <CustomMenu customMenu={customMenu} customData={[{icon : <FaRegShareSquare />, name : "Share Account", clickFunction : openShare}, {icon : <MdOutlineReportProblem />, name : "Report Account", clickFunction : openReport},]}/>
    <Share  share={shareRef} shareModal={shareModal} shareUrl={shareUrl} setShareUrl={setShareUrl}/>
<SpecialModal openModal={openModal} setOpenModal={setOpenModal} content={<Report setOpenModal={setOpenModal} />} height={400} width={400}/>
<div onClick={(e) => { closeCustomMenu(e); closeContextMenu(e)}}>
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

<span style={{color : "white", alignSelf : "flex-end", cursor : "pointer"}}>
  <FaEllipsisH size={20} onClick={(e) => updateMenuPosition(e.clientX, e.clientY)}/>
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