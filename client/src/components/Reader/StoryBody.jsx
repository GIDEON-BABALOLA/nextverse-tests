import "../../styles/components/Reader/story-body.css"
import useImageLoad from "../../hooks/useImageLoaded"

import { useState, useEffect } from "react"
import StoryAuthor from "./StoryAuthor"
const StoryBody = () => {
  const [loading, setLoading] = useState(true)
  
  const { loaded, error } = useImageLoad("https://wallpapercave.com/wp/wp11326368.jpg");
  useEffect(() => {
    if (error) {
  setLoading(true)
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  return (
    <div className="read-story-body">
    <StoryAuthor />
    <h2 style={{ textDecoration : "bolder", fontWeight : 700, marginBottom : "50px"}}>
    The Impact Of Technology On The Workplace, How Technology Is Changing The Future Of Work,
    
    </h2>
    {loading ?
     <div className="story-body-image-loader">&nbsp;</div>
     :
     <img src="https://wallpapercave.com/wp/wp11326368.jpg"
    className="story-body-images"

    ></img>
   
    
    }
    <p className="story-reader-content">
          The Impact Of Technology
    The third icon on the sidebar (after the bookmarks icon) appears to resemble a  or  icon. It is commonly used to represent a section where users can manage, view, or browse through a list of their notes or documents.
In the context of note-taking or blogging apps, this icon is typically used to access a or a list of written content that a user has
The Impact Of Technology
    The third icon on the sidebar (after the bookmarks icon) appears to resemble a  or  icon. It is commonly used to represent a section where users can manage, view, or browse through a list of their notes or documents.
In the context of note-taking or blogging apps, this icon is typically used to access a or a list of written content that a user has
The Impact Of Technology
    The third icon on the sidebar (after the bookmarks icon) appears to resemble a  or  icon. It is commonly used to represent a section where users can manage, view, or browse through a list of their notes or documents.
In the context of note-taking or blogging apps, this icon is typically used to access a or a list of written content that a user has
The Impact Of Technology
    The third icon on the sidebar (after the bookmarks icon) appears to resemble a  or  icon. It is commonly used to represent a section where users can manage, view, or browse through a list of their notes or documents.
In the context of note-taking or blogging apps, this icon is typically used to access a or a list of written content that a user has
The Impact Of Technology
    The third icon on the sidebar (after the bookmarks icon) appears to resemble a  or  icon. It is commonly used to represent a section where users can manage, view, or browse through a list of their notes or documents.
In the context of note-taking or blogging apps, this icon is typically used to access a or a list of written content that a user has
The Impact Of Technology
    The third icon on the sidebar (after the bookmarks icon) appears to resemble a  or  icon. It is commonly used to represent a section where users can manage, view, or browse through a list of their notes or documents.
In the context of note-taking or blogging apps, this icon is typically used to access a or a list of written content that a user has
    </p>
    </div>
  )
}

export default StoryBody