import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetAUser = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)

    const [data, setData] = useState([])
    const getAUser = async (userId, fields) => {
        const parameters = {
            fields : fields
        }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get(`/user/get-a-user/${userId}`, {
    params : parameters,
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
    return {getAUser, isLoading, error, data, statusCode} 
}
