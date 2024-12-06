import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetUserProfile = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const getUserProfile = async (username) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
            const response = await axiosConfig.get("/user/get-user-profile",
    {
        params: { username: username, },
        signal : AbortSignal.timeout(axiosProperties["timeout"]) //times out after 10 seconds
    }
            ); // Your API route
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
            console.log(error.message)
setIsLoading(false)
            if(error.message == "canceled"){
                setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
            
                setError({message : "Our Service Is Currently Offline", code : error.code})
            }
            else{
                console.log(error.response.data.message)
                console.log(error.code)
            setData([])
            setError({message : error.response.data.message, code : error.code})
            setError(error.response.data.message)
            setStatusCode(error.response.status)
        }
    }
    }
    return {getUserProfile, isLoading, error, data, statusCode} 
}
