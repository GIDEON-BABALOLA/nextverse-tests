import { useState, useEffect } from "react";
const useInternetMode = () => {
    const [internetMode, setInternetMode] = useState({
        online : /*navigator.onLine*/ undefined,
        offline : /*!navigator.onLine*/ undefined
    })
    useEffect(() => {
  const handleOnline = () => {
    console.log("I am online")
    setInternetMode({
        online : true,
        offline : false
    })
  }
  const handleOffline = () => {
    console.log("I am offline")
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