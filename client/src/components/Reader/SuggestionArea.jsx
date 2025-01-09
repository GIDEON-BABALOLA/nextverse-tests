import StorySuggestions from './StorySuggestions'
import { useEffect, useState } from 'react'
import { useGetSuggestedStories } from '../../hooks/useGetSuggestedStories'
const SuggestionArea = (userId, shareModal, fireClick, storyId) => {
    const [loadingState] = useState([{},{}])
const [emptyData, setEmptyData] = useState(false)
const [moreStories, setMoreStories] = useState([]);
const [otherStories, setOtherStories] = useState([])
const morefromStories = useGetSuggestedStories();
const suggestedStories = useGetSuggestedStories();
useEffect(() => {
    morefromStories.getSuggestedStories(1, 2, "all", userId, storyId, "more");
    suggestedStories.getSuggestedStories(1, 2, "all", userId, storyId, "others")

  }, [ userId, storyId]);
  useEffect(() => {
if(suggestedStories.data.length > 0){
  setMoreStories(suggestedStories.data)
  setEmptyData(false)
}
if(moreStories.data.length > 0){
setOtherStories(moreStories.data)
setEmptyData(false)
}
  }, [suggestedStories.data, moreStories.data])
  useEffect(() => {
    if(!suggestedStories.isLoading){
      if(suggestedStories.data.length == 0 && !suggestedStories.error){
        setEmptyData(true)
      }
    }
        }, [suggestedStories.data, suggestedStories.isLoading, suggestedStories.error])
  const resendRequest = () => {
    if(type == "more"){
      suggestedStories.getSuggestedStories(1, 2, "all", userId, storyId, "more");
    }else{
      suggestedStories.getSuggestedStories(1, 2, "all", userId, storyId, "others")
    }
  }
  return (
  <>
           <StorySuggestions
    userId={userId}
    shareModal={shareModal}
    fireClick={fireClick}
    type={"more"}
    storyId={storyId}

     />
  
           <StorySuggestions
    userId={userId}
    shareModal={shareModal}
    fireClick={fireClick}
    title={"Suggested From Litenote"}
    type={"others"}
    storyId={storyId}

     />
  </>
  )
}

export default SuggestionArea