import Counter from "./Counter"
import CountUp from 'react-countup';
const Stats = () => {
  return (
    <>
               <div className="litenote-profile-stat">
            <span className="litenote-profile-stat-value"><Counter end={25}/></span>
            <span className="litenote-profile-stat-label">Stories</span>
          </div>
          <div className="litenote-profile-stat">
            <span className="litenote-profile-stat-value"><Counter end={100}/></span>
            <span className="litenote-profile-stat-label">Followers</span>
          </div>
          <div className="litenote-profile-stat">
            <span className="litenote-profile-stat-value"><Counter end={50}/></span>
            <span className="litenote-profile-stat-label">Following</span>
          </div>
    </>
  )
}

export default Stats