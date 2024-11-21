import StorySidebar from "./StorySidebar"
import StoryAuthor from "./StoryAuthor"
import "../../styles/components/Reader/story-display.css"
import StoryBody from "./StoryBody"
import StorySuggestions from "./StorySuggestions"
const StoryDisplay = () => {
  return (
 <section>
    <StorySidebar />
    <div className="story-display-main">
      <StoryBody />
    </div>
    <StorySuggestions />  
   
 </section>
  )
}

export default StoryDisplay