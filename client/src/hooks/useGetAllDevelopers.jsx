import { useState } from "react";
import { axiosConfig } from "../api/axiosConfig";
export const useGetAllDevelopers = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const getAllDevelopers = async (page, limit) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/developer/get-all-developers", {
    params : {
        page : page,
        limit : limit
    }
})
if(response && response.data){
    setData(response.data)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 10)
    
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
            setData([])
            setIsLoading(false)
            setError(error.response.data.message)
            setStatusCode(error.response.status)
        }
    }
    }
    return {getAllDevelopers, isLoading, error, data, statusCode} 
}
