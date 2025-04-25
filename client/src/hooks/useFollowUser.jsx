import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useFollowUser= () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const followUser = async (email) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
            const response = await axiosConfig.post("/user/follow-user", {
                email : email,
            },
            {
                signal : AbortSignal.timeout(axiosProperties["timeout"])
            }
            )
if(response && response.data){
    setData(response.data)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
            console.log(error.response)
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
    return {followUser, isLoading, error, data, statusCode} 
}
