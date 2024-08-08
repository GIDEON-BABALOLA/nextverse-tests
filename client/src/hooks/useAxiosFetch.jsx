import { useState, useEffect } from "react";
import axios from "axios"
const useAxiosFetch = (dataUrl) => {
const [data, setData] = useState([])
const [fetchError, setFetchError] = useState(null)
const [isLoading, setIsLoading] = useState(false)
useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async (url) => {
        setIsLoading(true)
        try{
const response = await axios.get(url, {
    signal : controller.signal
});
if(isMounted){
    setData(response.data)
    setFetchError(null)
}
        }catch(err){
if(isMounted){
    setFetchError(err.message)
    setData([])
}
        }finally{
            //we are using a timeout here so tha we can see the loading message
            isMounted &&  
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }
    fetchData(dataUrl)
    return () => {isMounted = false;  controller.abort()}
}, [dataUrl])
return { data, fetchError, isLoading}
}
export default useAxiosFetch

//hooks are like utility functions that you can pull into different projects and use them again and againi