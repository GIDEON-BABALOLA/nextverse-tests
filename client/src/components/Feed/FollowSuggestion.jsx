import { FaAngleDown } from "react-icons/fa"
import { Link } from "react-router-dom"
const FollowSuggestion = () => {
  return (
    <section>
    <h3><b>Who to follow</b></h3>
     <div className="feed-follow-suggestion">
         <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"} alt="Elon Jaman" />
         <div>
             <div><b>Elon Jaman</b></div>
             <div>Blogger Researcher Content Manager</div>
         </div>
         <button className="feed-follow-button">Follow</button>
     </div>
     <div className="feed-follow-suggestion">
         <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"} alt="Dogecoin" />
         <div>
             <div><b>Dogecoin</b></div>
             <div>Writer , Dogecoin Expert</div>
         </div>
         <button className="feed-follow-button">Follow</button>
     </div>
     <div className="feed-first"><Link
        style={{textDecoration : "none", color : "#7380EC", cursor : "pointer"}}
         to={"/follow-suggestions"}>Show more <FaAngleDown /></Link>
        </div>
    </section>
  )
}

export default FollowSuggestion