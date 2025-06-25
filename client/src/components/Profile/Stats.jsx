import Counter from "./Counter"
import { useProfileContext } from "../../hooks/useProfileContext";
import Followers from "./Followers";
import Following from "./Following";
import useWindowSize from "../../hooks/useWindowSize"
import SpecialModal from "../common/SpecialModal";
import { useEffect, useState } from "react";
const Stats = ({ isLoading }) => {
  const { width } = useWindowSize()
  const [openModal, setOpenModal] = useState({
    followersModal: false,
    followingModal: false
  })
  const  { profile } = useProfileContext()
  return (
    <>
    <SpecialModal 
    width={ width < 768 ? 350 : 500}
    height={width < 768 ? 500 : 400}
    openModal={openModal.followersModal || openModal.followingModal}
    setOpenModal={setOpenModal}
    content={
      openModal.followersModal ? (
<Followers openModal={openModal.followersModal} setOpenModal={setOpenModal}/>
      ) : openModal.followingModal ? (
<Following openModal={openModal.followingModal} setOpenModal={setOpenModal}/>
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
          <div className="litenote-profile-stat"
           style={{cursor: "pointer"}}
          >
            <span className="litenote-profile-stat-value special-modal-client"
            onClick={() => setOpenModal({
            followersModal: true,
            followingModal: false
          })}
            >
            <Counter end={profile["totalfollowers"]}/>
            </span>
            <span className="litenote-profile-stat-label special-modal-client"
            onClick={() => setOpenModal({
            followersModal: true,
            followingModal: false
          })}
            style={{color : "white"}}>Followers</span>
          </div>
          <div className="litenote-profile-stat"
            style={{cursor: "pointer"}}
          >
            <span className="litenote-profile-stat-value special-modal-client"
            onClick={() => setOpenModal({
            followersModal: false,
            followingModal: true
          })}
            ><Counter end={profile["totalfollowing"]}/></span>
            <span className="litenote-profile-stat-label special-modal-client" style={{color : "white"}}  
            onClick={() => setOpenModal({
            followersModal: false,
            followingModal: true
          })}
            >Following</span>
          </div>
    </>
    }
    </>
  )
}

export default Stats