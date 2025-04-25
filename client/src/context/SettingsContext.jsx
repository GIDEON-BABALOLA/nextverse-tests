import {
createContext,
useState,
useEffect,
useCallback,
} from "react"
import { useToastContext } from "../hooks/useToastContext";
import { useThemeContext } from "../hooks/useThemeContext";
export const SettingsContext = createContext()
export const SettingsContextProvider = ({ children }) => {
  const { showToast } = useToastContext()
  const { dispatch } = useThemeContext()
  const [lastChangedBox, setLastChangedBox] = useState(null);
  const initialCheckBox = {
    push : false,
    email : false,
    sms : false,
    theme : false,
    twoFactor : false,
    cookies : true,
    adsPreferences: false,
    inAppNotifications: true
  }
    const [checkbox, setCheckBox] = useState(initialCheckBox)
      const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);
      useEffect(() => {
        const savedSettings = localStorage.getItem('checkboxSettings');
        if (savedSettings) {
          setCheckBox(JSON.parse(savedSettings)); // Set checkbox settings from localStorage
        }
        setIsLocalStorageLoaded(true); 
        // Mark that localStorage has been loaded
      }, []);
      const handleChange = (checked, id) => {
        setCheckBox((prev) => {
          const updatedCheckbox = { ...prev, [id]: checked };
          // Save updated settings to localStorage
          localStorage.setItem('checkboxSettings', JSON.stringify(updatedCheckbox));
          return updatedCheckbox
        })
        setLastChangedBox(id)
      };
      const changeThemeMode = useCallback((id) => {
        switch (id) {
          case "dark-mode":
            dispatch({type : "dark-mode", payload : "dark-mode"})
            break;
            case "light-mode":
            dispatch({type : "light-mode", payload : "light-mode"})
              break;
          
        
          default:
            break;
        }
      }, [dispatch])
      useEffect(() => {
        switch (lastChangedBox) {
          case "push":
            if(checkbox.push){
              showToast("Success", "This feature is still in development", true)
            }
            break;
          case "email":
                 if(checkbox.email){
                  showToast("Success", "This feature is still in development", true)
            }
            break;
          case "sms":
            if(checkbox.sms){
              showToast("Success", "This feature is still in development", true)
            }
            break;
          case "theme":
            changeThemeMode(checkbox.theme ? "dark-mode" : "light-mode")
            break;
          case "twoFactor":
            break;
          case "inAppNotifications":
            break;
          case "cookies":
            checkbox.cookies ? showToast("Success", "Successfully enabled Third-Party cookies", true) :
            showToast("Success", "Successfully disabled Third-Party cookies", true)
            break;
          case "adsPreferences":
            break;
        }
      }, [checkbox, lastChangedBox, showToast, changeThemeMode, isLocalStorageLoaded])
    return (
        <SettingsContext.Provider
        value={{
        checkbox,
        handleChange
        }}
        >
            {children}
        </SettingsContext.Provider>
    )
}