import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetLiveSearchSuggestions = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [stories, setStories] = useState([])
    const [users, setUsers] = useState([])
    const getLiveSearchSuggestions = async (search_query, limit) => {
        console.log(search_query, limit)
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get(`story/live-search-suggestions?search_query=${search_query}&limit=${limit}`, {
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    setStories(response.data.stories)
    console.log(response.data.stories)
    setUsers(response.data.users)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
}
        }
        catch(error){
            setIsLoading(false)
            if(error.message == "canceled"){
                setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
                setError({message : "Our Service Is Currently Offline", code : error.code})
            }
            else{
            setStories([])
            setIsLoading(false)
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {getLiveSearchSuggestions, isLoading, error, stories, users, statusCode} 
}
