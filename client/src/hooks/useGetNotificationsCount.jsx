import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetNotificationsCount = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [notificationsCount, setNotificationsCount] = useState(0)
    const getNotificationsCount = async () => {
        console.log("how na")
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/notification/get-notifications-count", {
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    setNotificationsCount(response.data.notificationsCount)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
            setNotificationsCount(0)
            setIsLoading(false)
            if(error.message == "canceled"){
                setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
                setError({message : "Our Service Is Currently Offline", code : error.code})
            }
            else{
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {getNotificationsCount,
         isLoading,
         error,
         statusCode,
         notificationsCount,
        } 
}
