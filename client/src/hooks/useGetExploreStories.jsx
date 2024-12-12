import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetExploreStories = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [storyCount, setStoryCount] = useState(0)
    const [data, setData] = useState([])
    const getExploreStories = async (page, limit, category, userId) => {
        const parameters = {
            page : page,
            limit : limit,
            category : category,
            userId : userId,
           fields : "author estimatedReadingTime avatar category totalViews totalLikes picture title"
            
        }
        if(category == "all"){
delete parameters.category
        }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/story/get-all-stories", {
    params : parameters,
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    setData(response.data.stories)
    setStoryCount(response.data.count)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
            setStoryCount(0)
setIsLoading(false)
            if(error.message == "canceled"){
                setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
                setError({message : "Our Service Is Currently Offline", code : error.code})
            }
            else{
            setData([])
            setIsLoading(false)
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {getExploreStories, isLoading, error, data, statusCode, storyCount} 
}
