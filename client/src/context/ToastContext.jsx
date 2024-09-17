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
    const [mode, setMode] = useState()
    const showToast = (title, content, state) => {
      if(Object.values(toastRef.current.classList).includes("active")){
        return;
      }
    toastRef.current.classList.add("active")
    state ? setMode(true) : setMode(false)
    toastRef.current.children[0].children[1].children[0].innerText = title;
    toastRef.current.children[0].children[1].children[1].innerText = content
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
            closeToast,
            mode
        }}
        >
            {children}
        </ToastContext.Provider>
    )
}