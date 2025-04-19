
import "../../../styles/components/Dashboard/recent-updates.css"
const RecentUpdates = () => {
    const recentUpdates = [
        {
photo : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507548/Avatars/j2qjukxg92ezd4oerzqz_j0bjmo.jpg",
name : "Mike Junior",
update : "I love This site so much would love an app version though"
        },
        {
photo : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg",           
name : "Joy Bliss",
update : "So many Interesting stories i dont even know where to start from😍" 
        },
        {
photo : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507571/Avatars/yq7olsu4djjzlv643nsm_fkw9nr.jpg",            
name : "Adenike Damilola",
update : "I would really appreciate if i can sell my books on this Platform "
        },
        {
photo : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg",            
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