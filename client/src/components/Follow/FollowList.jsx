import favour from "../../assets/29.jpg"
import FollowCard from "./FollowCard"
const FollowList = () => {
    const dummyData = [
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : favour
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : favour
            
        },
             {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : favour
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : favour
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : favour
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : favour
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : favour
            
        }
    ]
  return (
    <div className="followers-list">
    {dummyData.map((content, index) => (
<FollowCard key={index} content={content}/>
    ))}
        </div>
  )
}

export default FollowList