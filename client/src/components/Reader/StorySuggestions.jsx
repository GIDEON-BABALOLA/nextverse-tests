
import SuggestionCard from "./SuggestionCard"
import { useGetExploreStories } from "../../hooks/useGetExploreStories"
import { useEffect, useState } from "react"
const StorySuggestions = ({   userId, shareModal, fireClick, type, title}) => {
const [loadingState] = useState([{},{}])
const stories = useGetExploreStories();
useEffect(() => {
  if(type == "more"){
    stories.getExploreStories(1, 2, "all", userId);
  }else{
stories.getExploreStories(1, 2, "all")
  }

  }, [type, userId]);
  return (
    <>
<div  className="suggestion-container">
    
<h3 className="suggestion-title">
    {title}
    </h3>
    <div className="litenote-suggestion-stories" style={{flexDirection : "row"}}>
    {  
      
      stories.isLoading ? 
      <div
    className="suggest-more-for-me">
      {loadingState.map((story, index) => (
      <SuggestionCard
      isLoading={true}
       shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
    ))
      }

    </div>
      :
      
      <div
    className="suggest-more-for-me">
      {stories.data.map((story, index) => (
      <SuggestionCard
      isLoading={false}
       shareModal={shareModal} story={story} fireClick={fireClick} key={index}/>
    ))
      }

    </div>
    }
    </div>
    </div>

    </>
    

  )
}

export default StorySuggestions