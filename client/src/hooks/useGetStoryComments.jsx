import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetStoryComments = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [commentCount, setCommentCount] = useState(0)
    const [data, setData] = useState([])
    const getStoryComments = async (page, limit,storyId) => {
        const parameters = {
            page : page,
            limit : limit,
        }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get(`/story/get-story-comments/${storyId}`, {
    params : parameters,
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    setData(response.data.comments)
    setCommentCount(response.data.count)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
            setCommentCount(0)
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
    return {getStoryComments, isLoading, error, data, statusCode, commentCount} 
}
