import { useState, useEffect } from "react";
const useInternetMode = () => {
    const [internetMode, setInternetMode] = useState({
        online : /*navigator.onLine*/ undefined,
        offline : /*!navigator.onLine*/ undefined
    })
    useEffect(() => {
  const handleOnline = () => {
    setInternetMode({
        online : true,
        offline : false
    })
  }
  const handleOffline = () => {
    setInternetMode({
        online : false,
        offline : true
    })
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