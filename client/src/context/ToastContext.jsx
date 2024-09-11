import {
createContext,
useState,
useEffect,
useRef
} from "react"
export const ToastContext = createContext()
export const ToastContextProvider = ({ children }) => {
    const toastRef = useRef()
    const toastProgress = useRef()
    const showToast = () => {
    toastRef.current.classList.add("active")
    toastProgress.current.classList.add("active")
    setTimeout(() => {
      toastRef.current.classList.remove("active")
    }, 5000);
    setTimeout(() => {
      toastProgress.current.classList.remove("active")
    }, 5500);
      }
    const closeToast = () => {
        
            toastRef.current.classList.remove("active")
            setTimeout(() => {
              toastProgress.current.classList.remove("active")
            }, 5500);
    }
    return (
        <ToastContext.Provider
        value={{
            toastRef,
            toastProgress,
            showToast,
            closeToast
        }}
        >
            {children}
        </ToastContext.Provider>
    )
}