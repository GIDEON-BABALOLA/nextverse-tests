import "../../styles/components/Reader/story-body.css"
import { useRef } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
import { useState, useEffect } from "react"
import StoryAuthor from "./StoryAuthor"
const StoryBody = ({ content, title, picture,  pictures, avatar, author, userId, isFollowing, views, likes}) => {
  const [loading, setLoading] = useState(true)
  const { loaded, error } = useImageLoad(picture);
  useEffect(() => {
    if (error) {
  setLoading(true)
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  function renderStoryWithImages(content, pictures) {
    console.log(content)
    return content.replace(/\[Image (\d+)]/g, (_, index) => {
      const imgUrl = pictures[Number(index) - 1];
      return imgUrl
        ? `<img src="${imgUrl}" alt="Story Image ${index}" style="max-width:100%; margin:1em 0; border-radius:10px;" />`
        : `[Image ${index}]`;
    });
  }
  
  
  useEffect(() => {
    console.log(pictures)
    if (storyBodyRef.current) {
      const finalHTML = renderStoryWithImages(content, pictures); // make sure 'pictures' is accessible here
      storyBodyRef.current.innerHTML = finalHTML;
    }
  }, [content, pictures]);
  const storyBodyRef = useRef()
  return (
    <div className="story-now-container">
      <div className="story-now-container-left">
      <h2 style={{ textDecoration : "bolder", fontWeight : 700, marginBottom : "50px", justifySelf : "flex-start"}}>
    {title}
    
    </h2>
      </div>
{/* 
    {loading ?
     <div className="story-body-image-loader"></div>
     :
     <img src={picture}
    className="story-body-images"

    ></img>
   
    
    } */}
  
    <p className="story-reader-content"
     ref={storyBodyRef}
    >
      {content}
    </p>
    </div>
  )
}

export default StoryBody