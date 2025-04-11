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
  function replaceImagePlaceholders(container, pictures) {
    const spans = container.querySelectorAll("span");
    spans.forEach(span => {
      const match = span.innerText.match(/\[Image ([^\]]+)]/);
      if (match) {
        const imageName = match[1];
        const imageObj = pictures.find(pic => pic.name === imageName);
        if (imageObj) {
          const img = document.createElement("img");
          img.src = imageObj.url;
          img.alt = imageObj.name;
          img.style.maxWidth = "100%";
          img.style.margin = "1em 0";
          img.style.borderRadius = "10px";
          span.replaceWith(img);
        }
      }
    });
  }
  function replaceImageWithLoadingState(content, loading) {
    const regex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g;
    
  return content.replace(regex, (_, picture) => {
console.log(picture)
    return loading ? 
      `<div class="story-body-image-loader"></div>` 
      : 
      `<img src="${picture}" class="story-body-images" />`;
  });
  }
  function renderStoryWithImages(content, pictures) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content
    replaceImagePlaceholders(tempDiv, pictures);
    return tempDiv.innerHTML;
  }
  
  
  
  useEffect(() => {
    if (storyBodyRef.current) {
     const realContent =   renderStoryWithImages(content, pictures); // make sure 'pictures' is accessible here
     const finalContent = replaceImageWithLoadingState(realContent, false)
     console.log(finalContent)
      // storyBodyRef.current.innerHTML = finalHTML;
      storyBodyRef.current.innerHTML =  finalContent
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
    style={{marginTop : "0px"}}
     ref={storyBodyRef}
    >
      {content}
    </p>
    </div>
  )
}

export default StoryBody