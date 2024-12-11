
import SuggestionCard from "./SuggestionCard"
import { useGetSuggestedStories } from "../../hooks/useGetSuggestedStories"
import ErrorMessage from "../common/ErrorMessage"
import { useEffect, useState } from "react"
import { FaRegSadTear } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
const StorySuggestions = ({   userId, shareModal, fireClick, type, title, storyId}) => {
const [loadingState] = useState([{},{}])
const [emptyData, setEmptyData] = useState(false)
const stories = useGetSuggestedStories();
useEffect(() => {
  setEmptyData(false)
  if(type == "more"){
    stories.getSuggestedStories(1, 2, "all", userId, storyId, "more");
  }else{
stories.getSuggestedStories(1, 2, "all", userId, storyId, "others")
  }

  }, [type, userId, storyId]);
  useEffect(() => {
if(stories.data.length > 0){
  setEmptyData(false)
}
  }, [stories.data])
  useEffect(() => {
    if(!stories.isLoading){
      if(stories.data.length == 0 && !stories.error){
        setEmptyData(true)
      }
    }
        }, [stories.data, stories.isLoading, stories.error])
  const resendRequest = () => {
    if(type == "more"){
      stories.getSuggestedStories(1, 2, "all", userId, storyId, "more");
    }else{
  stories.getSuggestedStories(1, 2, "all", userId, storyId, "others")
    }
  }
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
      emptyData ? 
       <div style={{display : "flex", flexDirection : "column", justifyContent  : "center", alignItems : "center", gap : "30px"}}>
       <FaRegSadTear size={50}/>
       { type == "more" ? <h4>It looks like this is the only story by this author for now. Check back later for more</h4>
     : <h4>It seems we dont have any more stories to recommend right now. Check back later for fresh content!</h4>
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
    {stories.error && <div className="litenote-suggestion-stories">


{ stories.error?.code == "ERR_NETWORK" ? 
  <ErrorMessage title={"Check Your Internet Connection"} 
message={"We are unable to load this content, check your connection"}
height={40}
type={stories.error.code}
fireClick = {resendRequest}
/>
:
stories.errorr?.code == "ERR_CANCELED"

?
<ErrorMessage title={"Timeout Error"} 
message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
height={40}
type={stories.error.code}
fireClick = {resendRequest}
/>
:
<ErrorMessage title={"Something went wrong"} 
message={"We are unable to load this content,Pls click on the refresh button"}
height={40}
type={stories.error.code}
fireClick = {resendRequest}
/>
}
</div>
}
    </>
    

  )
}

export default StorySuggestions