import favour from "../../assets/29.jpg"
import "../../styles/components/Reader/story-author.css"
const StoryAuthor = () => {
  return (
    <div className="story-follow-suggestion">
    <div style={{display : "flex", flexDirection : "row", alignItems : "center"}}>
    <img src={favour} alt="Elon Jaman" />
    <div style={{display : "flex", flexDirection : "column"}}>
        <span><b>Elon Jaman</b></span>
        <span>Blogger Researcher</span>
        <span>Content Manager</span>
    </div>
    </div>
    <button className="story-follow-button">
    <b>
      Follow
    </b>
    </button>
</div>
  )
}

export default StoryAuthor