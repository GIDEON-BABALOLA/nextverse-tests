import { useState } from "react";
// import  useAuthContext  from "../context/AuthContext";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useUploadProfileImage = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const uploadProfileImage = async (data) => {
        console.log(data)
        setIsLoading(true) 
        try{
            setError(null)
const response = await axiosConfig.post(`/user/upload-user-picture`,
data,
    {
        signal : AbortSignal.timeout(axiosProperties["timeout"]) //times out after 10 seconds
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
                setError({message : "Our Service Is Currently Offline", code : error.code})
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
    return {uploadProfileImage, isLoading, error, data, statusCode} 
}
