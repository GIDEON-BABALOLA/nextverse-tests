import { useState } from "react";
import { axiosConfig, axiosProperties } from "../api/axiosConfig";
export const useGetUserFollowers = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [statusCode, setStatusCode] = useState(null)
    const [followersCount, setFollowersCount] = useState(0)
    const [data, setData] = useState([])
    const getUserFollowers = async (page, limit, userId) => {
        const parameters = {
            page : page,
            limit : limit,
            userId: userId
        }
        setIsLoading(true) //starting the request
        try{
            setError(null)
const response = await axiosConfig.get("/user/get-user-followers", {
    params : parameters,
    signal : AbortSignal.timeout(axiosProperties["timeout"])
}
)
if(response && response.data){
    setData(response.data.followers)
    setFollowersCount(response.data.count)
    setStatusCode(response.status)
    setError(null)
    setTimeout(() => {
        setIsLoading(false)
    }, 100)
    
}
        }
        
        catch(error){
            setFollowersCount(0)
setIsLoading(false)
            if(error.message == "canceled"){
                setError({message : "Your Request Has Timed Out", code : error.code})
            }
            else if(error.message == "Network Error"){
                setError({message : "Our Service Is Currently Offline", code : error.code})
            }
            else{
            setData([])
            console.log(error)
            setIsLoading(false)
            setError({message : error.response.data.message, code : error.code})
            setStatusCode(error.response.status)
        }
    }
    }
    return {getUserFollowers, isLoading, error, data, statusCode, followersCount} 
}
