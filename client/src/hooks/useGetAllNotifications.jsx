import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetAllNotifications = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const getAllNotifications = async (page, limit, category) => {
        const parameters = {
            page : page,
            limit : limit,
            category : category
        }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/notification/get-all-notifications", {
    params : parameters,
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    console.log(response.data)
    setData(response.data.notifications)
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
            setData([])
            setIsLoading(false)
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {
        getAllNotifications,
         isLoading,
         error,
         data,
         statusCode,
        } 
}
