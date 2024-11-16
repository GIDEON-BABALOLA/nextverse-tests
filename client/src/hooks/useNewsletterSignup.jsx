import { useState } from "react";
import { emailValidate,
     passwordValidate,
} from "../helpers/Validator";
import { axiosConfig } from "../api/axiosConfig";
import { useToastContext } from "./useToastContext";
export const useNewsletterSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(null)
    const { showToast } = useToastContext()
    const [data, setData] = useState([])
    const newsletterSignup = async (email, options, captchaValue) => {
        const trueEmail = emailValidate(email)
        if(!trueEmail){
            showToast("Error", "Please Enter A Valid Email", false)
            return;
               }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.post("/newsletter/subscribe-to-newsletter", {
    email : email,
    options : options,
    recaptchaToken : captchaValue
}
)
if(response && response.data){
    // dispatch({type : "LOGIN", payload : response.data})
    setData(response.data)
    console.log(response.data)
    setStatusCode(response.status)
    setError(null)
    setIsLoading(false)
}
        }
        
        catch(error){
            console.log(error.response.data.message)
setIsLoading(false)
  if(error.message == "Network Error"){
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
    return {newsletterSignup, isLoading, error, data, statusCode} 
}
