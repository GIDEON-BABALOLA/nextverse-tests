import { useState } from "react";
import { axiosConfig } from "../api/axiosConfig";
export const useResendAccountVerification = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const resendAccountVerification = async (email) => {    
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.post("/admin/resend-admin-verification", {
    email : email
},
{
    signal : AbortSignal.timeout(100000) //times out after 10 seconds
}
)
if(response && response.data){
    setData(response.data)
    setStatusCode(response.status)
    setError(null)
    setIsLoading(false)
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
    return { resendAccountVerification, isLoading, error, data, statusCode} 
}
