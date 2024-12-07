
import CommentCard from "./CommentCard"
import { MdKeyboardArrowDown } from "react-icons/md";
const CommentList = () => {
    const dummyData = [
        {
            "username" : "Gideon_Babalola",
            "avatar" : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507561/Avatars/sxvw9lcgcpk956xmg16d_dwlfud.jpg",
            "time" : "14 minutes ago",
            "comment" : "very nice story, this is very amazing,pls continue to keep this up, I am very proud of this initiative, thank you all so much"
        },
        {
            "username" : "Gideon_Babalola",
            "avatar" : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507571/Avatars/yq7olsu4djjzlv643nsm_fkw9nr.jpg",
            "time" : "14 minutes ago",
            "comment" : "very nice story, this is very amazing,pls continue to keep this up, I am very proud of this initiative, thank you all so much"
        },
        {
            "username" : "Gideon_Babalola",
            "avatar" : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507546/Avatars/i5fs4w9lukc3zdcqmiam_fnlvfi.jpg",
            "time" : "14 minutes ago",
            "comment" : "very nice story, this is very amazing,pls continue to keep this up, I am very proud of this initiative, thank you all so much"
        },
    ]
  return (
    <>
  <section>
    <div className="comment-list">
  {dummyData.map((comment, index) => (
<CommentCard key={index} comment={comment}/>
  ))}
    </div>
    <div style={{fontSize : "1.1rem"}} className="comment-show-more">
        Show more<MdKeyboardArrowDown size={20}/>
    </div>
    </section>
    </>
  

  )
}

export default CommentList