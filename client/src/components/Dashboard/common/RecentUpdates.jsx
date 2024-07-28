
import "../../../styles/components/Dashboard/recent-updates.css"
import profile from "../../../assets/profile.jpg"
import avatar_hat from "../../../assets/avatar_hat.png"
import lastimage from "../../../assets/29.jpg"
import avatar3 from "../../../assets/avatar3.png"
const RecentUpdates = () => {
    const recentUpdates = [
        {
photo : profile,
name : "Mike Junior",
update : "I love This site so much would love an app version though"
        },
        {
photo : avatar3,           
name : "Joy Bliss",
update : "So many Interesting stories i dont even know where to start from😍" 
        },
        {
photo : avatar_hat,            
name : "Adenike Damilola",
update : "I would really appreciate if i can sell my books on this Platform "
        },
        {
photo : lastimage,            
name : "Adigun Favour",
update : " I would really appreciate if i can sell my books on this Platfor"
        }
    ]
  return (
    <div className="litenote-dashboard-recent-updates">
    <h2 className="litenote-dashboard-h-two">Recent Updates</h2>
    <div className="litenote-dashboard-updates">
    {recentUpdates.map((content, index) => (
        <div className="litenote-dashboard-update" key={index}>
            <div className="litenote-dashboard-profile-photo">
                <img  className="litenote-dashboard-profile-photo" src={content.photo} alt="people image" />
            </div>
            <div className="litenote-dashboard-message">
                <div><b>{content.name}</b>{content.update}</div>
                <small className="litenote-dashboard-text-muted">2 minutes ago</small>
            </div>
            </div>
    ))}
    </div>
  </div>
  )
}

export default RecentUpdates