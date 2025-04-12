import "../../styles/components/Reader/story-body.css"
import { useRef } from "react"
import useImageLoad from "../../hooks/useImageLoaded"
import  useArrayOfImagesLoad from "../../hooks/useArrayOfImagesLoaded"
import { useState, useEffect } from "react"
import StoryAuthor from "./StoryAuthor"
import { useMemo } from "react"
const StoryBody = ({ content, title, picture,  pictures, avatar, author, userId, isFollowing, views, likes}) => {
  const [ imageStates, setImageStates] = useState({})
  const [urlOfPicturesInArray, setUrlOfPicturesInArray] = useState([])
  const imageStatus =  useArrayOfImagesLoad(urlOfPicturesInArray);
  const setImageStatesFunction = (url, loaded, error) => {
    setImageStates((prevState) => ({
      ...prevState,
      [url]: { loaded: loaded, error: error },
    }));
  }
  useEffect(() => {
    if (!imageStatus) return;
    pictures.forEach((pic) => {
      imageStatus.forEach(({ url, loaded, error }) => {
        console.log(url); // This won't log infinitely now
        if (pic.url === url) {
          if (loaded) setImageStatesFunction(url, true, false);
          if (error) setImageStatesFunction(url, false, true);
        }
      });
    });
  }, [pictures, imageStatus]); // <-- Add imageStatus here
  useEffect(() => {
    if (pictures.length) {
      const urls = pictures.map((pic) => pic.url);
      setUrlOfPicturesInArray(urls);
      setImageStates(
        urls.reduce((acc, url) => {
          acc[url] = { loaded: false, error: false };
          return acc;
        }, {})
      );
    }
  }, [pictures]);
  
  useEffect(() => {
  }, [imageStates])
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
  function decodeHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.documentElement.textContent;
  }
  function replaceImageWithLoadingState(content, loading) {
    const regex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g;
  return content.replace(regex, (_, picture) => {
    if (!imageStates || !imageStates[decodeHTML(picture)]) {
      console.log(decodeHTML(picture))
      return  `<div class="story-body-image-loader"></div>` 
    }
    const { loaded } = imageStates[decodeHTML(picture)];    
    return !loaded ? 
      `<div class="story-body-image-loader"></div>` 
      : 
      `<img src="${picture}" class="story-body-images" />`;
  })
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
      // storyBodyRef.current.innerHTML = finalHTML;
      storyBodyRef.current.innerHTML =  finalContent
    }
  }, [content, pictures, imageStates]);
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