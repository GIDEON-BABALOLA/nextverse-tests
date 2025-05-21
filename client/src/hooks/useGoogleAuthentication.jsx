import { useState } from "react";
import { axiosConfig } from "../api/axiosConfig";
export const useGoogleAuthentication = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const googleAuthentication = async (credential, context) => {
        console.log(credential)
        setIsLoading(true) //starting the request
        try{
setError(null)
const response = await axiosConfig.post("/third-party-auth/google-authentication", {
 credential : credential,
 context: context
},
{
    signal : AbortSignal.timeout(60000) //times out after 10 seconds
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
            else if(error.message == "Your Request Has Timed out"){
                setError("Your Request Has Timed Out")
            }
            else{
            setData([])
            setIsLoading(false)
            setError(error.response.data.message)
            setStatusCode(error.response.status)
        }
    }
    }
    return {googleAuthentication, isLoading, error, data, statusCode} 
}
