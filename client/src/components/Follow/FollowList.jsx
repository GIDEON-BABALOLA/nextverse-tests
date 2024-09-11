import favour from "../../assets/29.jpg"
import FollowCard from "./FollowCard"
const FollowList = () => {
    const dummyData = [
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : 'https://res.cloudinary.com/doctr0fct/image/upload/v1716408743/Avatars/b1hk7r5d0eopfo4lkosc.jpg'
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : 'https://res.cloudinary.com/doctr0fct/image/upload/v1716408765/Avatars/cakgeqd55ncpaszkbhzv.jpg'
            
        },
             {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : 'https://res.cloudinary.com/doctr0fct/image/upload/v1716408719/Avatars/d0a1lsvavgz33gdmviwr.png'
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : 'https://res.cloudinary.com/doctr0fct/image/upload/v1716408769/Avatars/ekwq2nt3cwstxftpravg.jpg'
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : 'https://res.cloudinary.com/doctr0fct/image/upload/v1716408721/Avatars/ewbrxopkc07aumowl1qh.jpg'
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : 'https://res.cloudinary.com/doctr0fct/image/upload/v1716408765/Avatars/ftohdhno5z8rptatc984.jpg'
            
        },
        {
            username : "Litenote Admin",
            bio : "Technical Writer",
            avatar : 'https://res.cloudinary.com/doctr0fct/image/upload/v1716408724/Avatars/fwzjgxv9nwqerukvkmfo.jpg',
            
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