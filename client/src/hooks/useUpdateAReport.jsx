import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useUpdateAReport = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState({})
    const updateAReport = async (id, status, username, category) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.put(`/report/update-a-report/${id}`,
    {
       status : status,
       username : username,
       category : category
    }, 
    {
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
    return {updateAReport, isLoading, error, data, statusCode} 
}
