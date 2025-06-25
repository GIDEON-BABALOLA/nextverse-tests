import Counter from "./Counter"
import { useProfileContext } from "../../hooks/useProfileContext";
import { useGetUserFollowers } from "../../hooks/useGetUserFollowers";
import { useGetUserFollowing } from "../../hooks/useGetUserFollowing";
import SpecialModal from "../common/SpecialModal";
import { useEffect, useState } from "react";
const Stats = ({ isLoading }) => {
  const { getUserFollowing, isLoading: followingLoading, error: followingError, data: followingData,  followingCount } = useGetUserFollowing()
  const { getUserFollowers, isLoading: followersLoading, error: followersError, data: followersData, followersCount } = useGetUserFollowers()
  const [openModal, setOpenModal] = useState({
    followersModal: false,
    followingModal: false
  })
  const  { profile } = useProfileContext()
 useEffect(() => {
if(openModal.followersModal){
getUserFollowers(1, 3, profile._id)
}
if(openModal.followingModal){
getUserFollowing(1, 3, profile._id)
}
 }, [openModal])
useEffect(() => {

}, [followersData, followingData])
  const previewFollowingModal = () => {

  }
  const previewFollowersModal = () => {

  }
  return (
    <>
    <SpecialModal openModal={openModal.followersModal} setOpenModal={setOpenModal}  content={previewFollowersModal()} />
    <SpecialModal openModal={openModal.followingModal} setOpenModal={setOpenModal}  content={previewFollowingModal()} />
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