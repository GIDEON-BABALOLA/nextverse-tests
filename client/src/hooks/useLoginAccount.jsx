import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { axiosConfig } from "../api/axiosConfig";
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const login = async(email, password) => {
        // setIsLoading(true) //starting the request
        // setError(null)
        try{
            setIsLoading(true) //starting the request
            setError(null)
const response = await axiosConfig.post("/user/login", {
    email : email,
    password : password
})
if(response && response.data){
    console.log(response.data)
    dispatch({type : "LOGIN", payload : response.data})
    setIsLoading(false)
    // localStorage.setItem("user", JSON.stringify(response.data))
}
        }
        catch(err){
            setIsLoading(false)
            setError(err.response.data.error)
        }
    }
    return { login, isLoading, error}
}
