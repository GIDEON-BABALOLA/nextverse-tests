import { useState } from "react";
import { axiosConfig } from "../api/axiosConfig";
export const useGetUserProfile = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const getUserProfile = async () => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
            const response = await axiosConfig.get("/user/get-user-profile"); // Your API route
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
setError("Your Request Has Timed Out")
            }
            else if(error.message == "Network Error"){
                setError("Our Service Is Currently Offline")
            }
            else{
                console.log("mad error")
            setData([])
            setError(error.response.data.message)
            setStatusCode(error.response.status)
        }
    }
    }
    return {getUserProfile, isLoading, error, data, statusCode} 
}
