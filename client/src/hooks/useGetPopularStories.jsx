import { useState } from "react";
// import  useAuthContext  from "../context/AuthContext";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetPopularStories = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const getPopularStories = async (category, number, userId) => {
        console.log(userId)
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get(`/story/get-popular-stories/${category}/${parseInt(number)}`, 
{
    params : { userId : userId},
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
    return {getPopularStories, isLoading, error, data, statusCode} 
}
