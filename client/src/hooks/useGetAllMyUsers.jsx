import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetAllMyUsers = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [userCount, setUserCount] = useState(0)
    const [data, setData] = useState([])
    const getAllMyUsers = async (page, limit, fields) => {
        
        const parameters = {
            page : page,
            limit : limit,
            fields : fields
            
        }
        console.log(parameters);
        
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/user/get-all-my-users", {
    params : parameters,
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    setData(response.data.users)
    setUserCount(response.data.userCount)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
            setUserCount(0)
            setIsLoading(false)
            if(error.message == "canceled"){
                setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
                setError({message : "Our Service Is Currently Offline", code : error.code})
            }
            else{
            setData([])
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {getAllMyUsers, isLoading, error, data, statusCode, userCount} 
}
