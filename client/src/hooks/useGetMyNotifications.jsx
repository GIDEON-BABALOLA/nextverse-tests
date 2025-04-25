import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetMyNotifications = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [notificationCount, setNotificationCount] = useState({
        profile : 0,
        story : 0
    })
    const [currentNotificationCount, setCurrentNotificationCount] = useState(0)
    const [data, setData] = useState([])
    const getMyNotifications = async (page, limit, category) => {
        const parameters = {
            page : page,
            limit : limit,
            category : category
        }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/notification/get-my-notifications", {
    params : parameters,
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    setData(response.data.notifications)
    console.log(response.data.notifications)
    setNotificationCount({
        profile : response.data.profileNotificationCount,
        story : response.data.storyNotificationCount
    })
    setCurrentNotificationCount(response.data.currentNotificationCount)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
            setNotificationCount({
                profile : 0,
                story : 0 
            })
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
    return {getMyNotifications,
         isLoading,
         error,
         data,
         statusCode,
         notificationCount,
         currentNotificationCount
        } 
}
