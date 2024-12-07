
import FeedAvatar from "../Feed/FeedAvatar"
const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card-container">
        <section  className="comment-card-container-first-section">
        <FeedAvatar
image={comment["avatar"]}
alt="Author"
className="feed-profile-images-trending" 
/>
        </section>
        <section className="comment-card-container-second-section">
            <div className="comment-card-container-second-section-title">
            <span>
            {comment["username"]}
            </span>
            <span style={{color : "#777777"}}>
            {comment["time"]}
            </span>
          </div>
            <div className="comment-card-container-second-section-body">
            {comment["comment"]}</div>
            </section>
    </div>
  )
}

export default CommentCard