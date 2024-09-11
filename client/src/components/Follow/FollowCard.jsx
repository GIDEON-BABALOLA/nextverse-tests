const FollowCard = ({ content }) => {
  return (
    <div className="follower-item">
                <img src={content.avatar} alt="User Avatar" className="follower-avatar" />
                <div className="follower-info">
                    <div className="follower-name">{content.username}</div>
                    <div className="follower-username">{content.bio}</div>
                </div>
                <button className="follow-button">Follow</button>
            </div>
  )
}

export default FollowCard