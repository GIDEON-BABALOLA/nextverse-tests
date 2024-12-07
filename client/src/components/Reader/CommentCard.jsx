
import CommentAvatar from "./CommentAvatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
const CommentCard = ({ comment, isLoading }) => {
  return (
    <> 
    {
      isLoading ?
      <div className="comment-card-container">
        <section  className="comment-card-container-first-section">
        <CommentAvatar
image={""}
alt="Author"
className="comment-profile-image" 
/>
        </section>
        <section className="comment-card-container-second-section">
            <div className="comment-card-container-second-section-title">
            <div className="comment-loader comment-loader-username">
           
            </div>
            <div style={{color : "#777777"}} className="comment-loader comment-loader-time">
           
            </div>
          </div>
            <div className="comment-card-container-second-section-body" style={{display : "flex", flexDirection : "column", justifyContent :"space-between", gap : "5px"}}>
            <div className="comment-loader comment-loader-first-line-comment">
           
           </div>
           <div style={{color : "#777777"}} className="comment-loader  comment-loader-first-line-comment">
          
           </div>
            </div>
            </section>
    </div>  
       :
       <div className="comment-card-container">
        <section  className="comment-card-container-first-section">
        <CommentAvatar
image={comment.commentBy["picture"]}
alt="Author"
className="feed-profile-images-trending" 
/>
        </section>
        <section className="comment-card-container-second-section">
            <div className="comment-card-container-second-section-title">
            <span>
            {comment.commentBy["username"]}
            </span>
            <span style={{color : "#777777"}}>
            {formatDistanceToNow(comment.date)}
            </span>
          </div>
            <div className="comment-card-container-second-section-body">
            {comment["comment"]}</div>
            </section>
    </div>
    }
    
  
    </>

  )
}

export default CommentCard