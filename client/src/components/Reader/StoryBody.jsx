import "../../styles/components/Reader/story-body.css"
import useImageLoad from "../../hooks/useImageLoaded"
import { useState, useEffect } from "react"
const StoryBody = () => {
  const [loading, setLoading] = useState(true)
  
  const { loaded, error } = useImageLoad("https://wallpapercave.com/wp/wp11326368.jpg");
  useEffect(() => {
    if (error) {
      console.log("failed to load images")
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  return (
    <div>
    <h2 style={{ textDecoration : "bolder", fontWeight : 700}}>
    The Impact Of Technology On The Workplace, How Technology Is Changing The Future Of Work</h2>
    {loading ?
     <div className="skeleton-image skeleton-image-story-images"></div>
     :
     <img src="https://wallpapercave.com/wp/wp11326368.jpg"
    className="story-body-images"

    ></img>
   
    
    }
    <p>
          The Impact Of Technology
    The third icon on the sidebar (after the bookmarks icon) appears to resemble a  or  icon. It is commonly used to represent a section where users can manage, view, or browse through a list of their notes or documents.
In the context of note-taking or blogging apps, this icon is typically used to access a or a list of written content that a user has
    </p>
    </div>
  )
}

export default StoryBody