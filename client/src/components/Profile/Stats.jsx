import Counter from "./Counter"
import { useProfileContext } from "../../hooks/useProfileContext";
const Stats = ({ isLoading }) => {
  const  { profile } = useProfileContext()
  console.log(profile)
  return (
    <>
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
          <div className="litenote-profile-stat">
            <span className="litenote-profile-stat-value"><Counter end={profile["totalfollowers"]}/></span>
            <span className="litenote-profile-stat-label" style={{color : "white"}}   >Followers</span>
          </div>
          <div className="litenote-profile-stat">
            <span className="litenote-profile-stat-value"><Counter end={profile["totalfollowing"]}/></span>
            <span className="litenote-profile-stat-label" style={{color : "white"}}   >Following</span>
          </div>
    </>
    }
    </>
  )
}

export default Stats