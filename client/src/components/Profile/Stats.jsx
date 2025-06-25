import Counter from "./Counter"
import { useProfileContext } from "../../hooks/useProfileContext";
import FollowersCard from "./FollowersCard";
import FollowingCard from "./FollowingCard";
import SpecialModal from "../common/SpecialModal";
import { useEffect, useState } from "react";
const Stats = ({ isLoading }) => {
  const [openModal, setOpenModal] = useState({
    followersModal: false,
    followingModal: false
  })
  const  { profile } = useProfileContext()
  return (
    <>
    <SpecialModal 
    openModal={openModal.followersModal || openModal.followingModal}
    setOpenModal={setOpenModal}
    content={
      openModal.followersModal ? (
<FollowersCard openModal={openModal.followersModal}/>
      ) : openModal.followingModal ? (
<FollowingCard openModal={openModal.followingModal}/>
      )
      : null
    }
    />
    { isLoading ?
    <div style={{display : "flex", flexDirection :"row", justifyContent : "space-between", width : "100%", gap : "4px"}} className="stats-profile-loader">
    <div className="litenote-profile-stat" style={{display : "flex", flexDirection : "column", gap : "6px", marginTop : "10px"}}>
            <div className="profile-loader profile-loader-stats"></div>
            <div className="profile-loader profile-loader-stats"></div>
          </div>
          <div className="litenote-profile-stat"  style={{display : "flex", flexDirection : "column", gap : "6px", marginTop : "10px"}}>
          <div className="profile-loader profile-loader-stats"></div>
          <div className="profile-loader profile-loader-stats"></div>
          </div>
          <div className="litenote-profile-stat"  style={{display : "flex", flexDirection : "column", gap : "6px", marginTop : "10px"}}>
          <div className="profile-loader profile-loader-stats"></div>
          <div className="profile-loader profile-loader-stats"></div>
          </div>
    </div>
    :
    <>
    <div className="litenote-profile-stat">
            <span className="litenote-profile-stat-value"><Counter end={profile["totalStories"]}/></span>
            <span className="litenote-profile-stat-label" style={{color : "white"}}   >Stories</span>
          </div>
          <div className="litenote-profile-stat special-modal-client"
           style={{cursor: "pointer"}}
           onClick={() => setOpenModal({
            followersModal: true,
            followingModal: false
          })}
          >
            <span className="litenote-profile-stat-value"><Counter end={profile["totalfollowers"]}/></span>
            <span className="litenote-profile-stat-label" style={{color : "white"}}   >Followers</span>
          </div>
          <div className="litenote-profile-stat special-modal-client"
            style={{cursor: "pointer"}}
            onClick={() => setOpenModal({
            followersModal: false,
            followingModal: true
          })}
          >
            <span className="litenote-profile-stat-value"><Counter end={profile["totalfollowing"]}/></span>
            <span className="litenote-profile-stat-label" style={{color : "white"}}   >Following</span>
          </div>
    </>
    }
    </>
  )
}

export default Stats