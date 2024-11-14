import { useState } from "react";
import { axiosConfig } from "../api/axiosConfig";
export const useGetExploreStories = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [storyCount, setStoryCount] = useState(0)
    const [data, setData] = useState([])
    const getExploreStories = async (page, limit, category) => {
        const parameters = {
            page : page,
            limit : limit,
            category : category
        }
        if(category == "all"){
delete parameters.category
        }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/story/get-all-stories", {
    params : parameters
})
if(response && response.data){
    console.log(response.data)
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
setError("Your Request Has Timed Out")
            }
            else if(error.message == "Network Error"){
                setError("Our Service Is Currently Offline")
            }
            else{
            setData([])
            setIsLoading(false)
            setError(error.response.data.message)
            setStatusCode(error.response.status)
        }
    }
    }
    return {getExploreStories, isLoading, error, data, statusCode, storyCount} 
}
