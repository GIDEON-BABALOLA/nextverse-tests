import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetAllAvatars = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const getAllAvatars = async (number) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get(`/general/get-all-avatars/${parseInt(number)}`,
    {
        signal : AbortSignal.timeout(axiosProperties["timeout"]) //times out after 10 seconds
    }
)
if(response && response.data){
    setData(response.data.avatars)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        catch(error){
            console.log("error")
setData([])
setIsLoading(false)
            if(error.message == "canceled"){
setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
                setError({message : "Our Service Is Currently Offline", code : error.code})
            }
            else if(error.message == "Request failed with status code 404"){
                setError({message : "Not Found", code : error.code})
            }
            else{
            setIsLoading(false)
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {getAllAvatars,  isLoading, error, data, statusCode} 
}
