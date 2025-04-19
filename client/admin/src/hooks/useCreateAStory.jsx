import { useState } from "react";
// import  useAuthContext  from "../context/AuthContext";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useCreateAStory = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const createAStory = async (formData) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.post(`/story/create-a-story`,
   formData, 
    {
        signal : AbortSignal.timeout(60000) //times out after 1 minute
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
            console.log(error.code)
setIsLoading(false)
            if(error.message == "canceled"){
setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
                setError({message : "Our aervice Is Currently Offline", code : error.code})
            }
            else if(error.message == "Request failed with status code 404"){
                setError({message : "Not Found", code : error.code})
            }
            else{
            setData([])
            setIsLoading(false)
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {createAStory, isLoading, error, data, statusCode} 
}
