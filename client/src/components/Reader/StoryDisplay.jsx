import StorySidebar from "./StorySidebar"
import StoryAuthor from "./StoryAuthor"
import "../../styles/components/Reader/story-display.css"
import StoryBody from "./StoryBody"
const StoryDisplay = () => {
  return (
 <section>
    <StorySidebar />
    <div className="story-display-main">
      <StoryAuthor />
      <StoryBody />
    </div>
 </section>
  )
}

export default StoryDisplay