import Counter from "./Counter"
import { useAuthContext } from "../../hooks/useAuthContext";
import CountUp from 'react-countup';
const Stats = () => {
  const  { user } = useAuthContext()
  console.log(user)
  return (
    <>
               <div className="litenote-profile-stat">
            <span className="litenote-profile-stat-value"><Counter end={user["stories"].length}/></span>
            <span className="litenote-profile-stat-label" style={{color : "white"}}   >Stories</span>
          </div>
          <div className="litenote-profile-stat">
            <span className="litenote-profile-stat-value"><Counter end={user["followers"].length}/></span>
            <span className="litenote-profile-stat-label" style={{color : "white"}}   >Followers</span>
          </div>
          <div className="litenote-profile-stat">
            <span className="litenote-profile-stat-value"><Counter end={user["following"].length}/></span>
            <span className="litenote-profile-stat-label" style={{color : "white"}}   >Following</span>
          </div>
    </>
  )
}

export default Stats