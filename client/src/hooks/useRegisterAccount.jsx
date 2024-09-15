import { useState } from "react";
import { emailValidate,
     passwordValidate,
    mobileValidate,
    usernameValidate
} from "../helpers/Validator";
// import  useAuthContext  from "../context/AuthContext";
import { axiosConfig } from "../api/axiosConfig";
import { useToastContext } from "./useToastContext";
export const useRegisterAccount = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const { showToast } = useToastContext()
    const [data, setData] = useState([])
    // const { dispatch } = useAuthContext()
    const registerAccount = async (email, password, mobile, username) => {
        console.log(username)
        const trueEmail = emailValidate(email)
        const truePassword = passwordValidate(password)
        const trueMobile = mobileValidate(mobile)
        const correctUsername = usernameValidate(username)
        if(!trueEmail){
            showToast("Error", "Please Enter A Valid Email")
            return;
               }
        if(truePassword !== true){
            showToast("Error", truePassword)
            return;
        }
        if(!trueMobile){
            showToast("Error", "Please Enter A Valid Phone Number")
            return;
        }
        if(!correctUsername){
      showToast("Error", "Username Can Only Contain Alphanumerics, Hyphens And Underscores")
      return;
        }
    

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
        
        catch(error){
setIsLoading(false)
            if(error.message == "canceled"){
setError("Your Request Has Timed Out")
            }
            else if(error.message == "Network Error"){
                setError("Our Service Is Currently Offline")
                console.log("Ekek")

            }
            else{
            setData([])
            setIsLoading(false)
            setError(error.response.data.error)
            setStatusCode(error.response.status)
        }
    }
    }
    return { registerAccount, isLoading, error, data, statusCode} 
}
