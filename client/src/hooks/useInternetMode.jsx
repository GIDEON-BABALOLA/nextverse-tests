import { useState, useEffect } from "react";
import axios from "axios"
const useInternetMode = () => {
    const [internetMode, setInternetMode] = useState({
        online : /*navigator.onLine*/ undefined,
        offline : /*!navigator.onLine*/ undefined
    })

    useEffect(() => {
    const checkInternetAccess = async  () => {
      let internetAccess;
      try{
const response = await axios.head("https://jsonplaceholder.typicode.com/todos/1")
if (response.status >= 200 && response.status < 300) {
internetAccess = true
}
      }catch(error){
internetAccess = false
      }
      return internetAccess
    }
  const handleOnline = async () => {
    const isOnline = await checkInternetAccess(1)
    if(isOnline){
      setInternetMode({
        online : true,
        offline : false
    }) 
    }
  }
  const handleOffline = async () => {
    const isOffline = await checkInternetAccess(1)
    if(!isOffline){
      setInternetMode({
        online : false,
        offline : true
    })
    }
 
  }
  window.addEventListener("online", handleOnline)
  window.addEventListener("offline", handleOffline)

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  }
    }, [])
    return internetMode
}
export default useInternetMode