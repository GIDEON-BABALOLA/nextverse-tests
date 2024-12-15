import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetAStory = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [isFollowing, setIsFollowing] = useState(null)
    const [isLiked, setIsLiked] = useState(null)
    const [isBookmarked, setIsBookmarked] = useState(null)
    const [data, setData] = useState([])
    const getAStory = async (id) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get(`/story/get-a-story/${id}`, {
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    setData(response.data.story)
    setIsFollowing(response.data.isFollowing)
    setIsLiked(response.data.isLiked)
    setIsBookmarked(response.data.isBookmarked)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
setIsLoading(false)
setIsFollowing(null)
setIsLiked(null)
setIsBookmarked(null)
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
    return {getAStory, isLoading, error, data, statusCode, isFollowing, isLiked} 
}
