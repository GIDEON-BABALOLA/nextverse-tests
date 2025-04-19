import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetSearchResults = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [storyCount, setStoryCount] = useState(0)
    const [data, setData] = useState([])
    const getSearchResults = async (search_query, page, limit) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get(`story/search-stories?search_query=${search_query}&page=${page}&limit=${limit}`, {
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
    return {getSearchResults, isLoading, error, data, statusCode, storyCount} 
}
