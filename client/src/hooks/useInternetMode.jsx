import { useState, useEffect } from "react";
import axios from "axios"
const useInternetMode = () => {
    const [internetMode, setInternetMode] = useState({
        online : /*navigator.onLine*/ undefined,
        offline : /*!navigator.onLine*/ undefined
    })

    useEffect(() => {
      const checkInternetAccess = async (maxRetries = 2) => {
        let attempt = 1;
        while (attempt <= maxRetries) {
          try {
            const response = await axios.head("https://jsonplaceholder.typicode.com/todos/1",
              {
                signal : AbortSignal.timeout(2000)
            }
            );
            if (response.status >= 200 && response.status < 300) {
              return true;
            }
          } catch (error) {
            attempt++;
          }
        }
        return false;
      };
  const handleOnline = async () => {
    const isOnline = await checkInternetAccess()
    if(isOnline){
      setInternetMode({
        online : true,
        offline : false
    }) 
    }
  }
  const handleOffline = async () => {
    const isOffline = await checkInternetAccess()
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

