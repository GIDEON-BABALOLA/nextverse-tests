import { useState } from "react";
// import  useAuthContext  from "../context/AuthContext";
import { axiosConfig } from "../api/axiosConfig";
export const useLogoutAccount = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    const logoutAccount = async () => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/user/logout-user"
)
if(response && response.status){
    // dispatch({type : "LOGIN", payload : response.data})
    setData(response.statusText)
    setStatusCode(response.status)
    setError(null)
    setIsLoading(false)
}
        }
        
        catch(error){
            console.log(error)
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
    return {logoutAccount, isLoading, error, data, statusCode} 
}
