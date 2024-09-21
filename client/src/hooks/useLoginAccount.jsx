import { useState } from "react";
import { emailValidate,
     passwordValidate,
} from "../helpers/Validator";
// import  useAuthContext  from "../context/AuthContext";
import { axiosConfig } from "../api/axiosConfig";
import { useToastContext } from "./useToastContext";
export const useLoginAccount = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const { showToast } = useToastContext()
    const [data, setData] = useState([])
    const loginAccount = async (email, password) => {
        const trueEmail = emailValidate(email)
        const truePassword = passwordValidate(password)
        if(!trueEmail){
            showToast("Error", "Please Enter A Valid Email", false)
            return;
               }
        if(truePassword !== true){
            showToast("Error", truePassword, false)
            return;
        }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.post("/user/login-user", {
    email : email,
    password : password,
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
        
        catch(error){
            console.log(error.response.data.message)
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
    return {loginAccount, isLoading, error, data, statusCode} 
}
