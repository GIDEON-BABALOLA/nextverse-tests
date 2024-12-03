import "../../styles/components/Reader/story-body.css"
import useImageLoad from "../../hooks/useImageLoaded"
import { useState, useEffect } from "react"
import StoryAuthor from "./StoryAuthor"
const StoryBody = ({ content, title, picture, avatar, author}) => {
  const [loading, setLoading] = useState(true)
  console.log(picture)
  const { loaded, error } = useImageLoad(picture);
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
    <StoryAuthor author={author} avatar={avatar}/>
    <h2 style={{ textDecoration : "bolder", fontWeight : 700, marginBottom : "50px"}}>
    {title}
    
    </h2>
    {loading ?
     <div className="story-body-image-loader">&nbsp;</div>
     :
     <img src={picture}
    className="story-body-images"

    ></img>
   
    
    }
    <p className="story-reader-content">
      {content}
    </p>
    </div>
  )
}

export default StoryBody