import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useFollowSuggestion = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [userCount, setUserCount] = useState(0)
    const [currentCount, setCurrentCount] = useState(0)
    const [data, setData] = useState([])
    const getUsersToFollow = async (page, limit) => {
        const parameters = {
            page : page,
            limit : limit
        }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/user/get-all-users", {
    params : parameters,
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    setData(response.data.users)
    setUserCount(response.data.count)
    console.log(response.data.currentCount)
    setCurrentCount(response.data.currentCount)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
            setUserCount(0)
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
    return {getUsersToFollow, isLoading, error, data, statusCode, userCount, currentCount} 
}
