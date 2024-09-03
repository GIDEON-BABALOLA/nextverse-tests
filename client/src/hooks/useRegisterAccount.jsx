import { useState } from "react";
// import  useAuthContext  from "../context/AuthContext";
import { axiosConfig } from "../api/axiosConfig";
export const useRegisterAccount = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const [data, setData] = useState([])
    // const { dispatch } = useAuthContext()
    const registerAccount = async (email, password, mobile, username) => {
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.post("/user/register", {
    email : email,
    password : password,
    username : username,
    mobile : mobile,
},
{
    signal : AbortSignal.timeout(10000) //times out after 10 seconds
}
)
if(response && response.data){
    // dispatch({type : "LOGIN", payload : response.data})
    setData(response.data)
    setStatusCode(response.status)
    setError(null)
    setIsLoading(false)
}
        }
        
        catch(err){
            if(axiosConfig.isCancel){
console.log("timeout error: ", err)
setError("Your Request Has Timed Out")
            }else{
                console.log("Dkdk")
            setData([])
            setIsLoading(false)
            setError(err.response.data.error)
            setStatusCode(err.response.status)
        }
    }
    }
    return { registerAccount, isLoading, error, data, statusCode} 
}
