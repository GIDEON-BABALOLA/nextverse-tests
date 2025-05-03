import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetGlobalMetrics = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const getGlobalMetrics = async () => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/story/get-global-metrics", {
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    console.log(response.data);
    
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
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return { getGlobalMetrics, isLoading, error,  statusCode, data } 
}
