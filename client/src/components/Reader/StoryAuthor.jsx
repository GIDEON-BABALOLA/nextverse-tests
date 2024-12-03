import useImageLoad from "../../hooks/useImageLoaded"
import "../../styles/components/Reader/story-author.css"
import { useState, useEffect } from "react"
const StoryAuthor = ({ author, avatar}) => {
  const [loading, setLoading] = useState(true)
  const { loaded, error } = useImageLoad(avatar);
  useEffect(() => {
    if (error) {
  setLoading(true)
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  const followAUser = () => {

  }
  return (
    <div className="story-follow-suggestion">
    <div style={{display : "flex", flexDirection : "row", alignItems : "center"}}>
   { loading ? <div className="story-display-avatar-loader"></div> : <img src={avatar} alt={author} />}
    <div style={{display : "flex", flexDirection : "column"}}>
        <span><b>{author}</b></span>
        <span>Blogger Researcher</span>
        <span>Content Manager</span>
    </div>
    </div>
    <button className="story-follow-button" onClick={followAUser}>
    <b>
      Follow
    </b>
    </button>
</div>
  )
}

export default StoryAuthor