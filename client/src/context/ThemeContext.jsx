import { createContext, useReducer, useEffect, useState} from "react"
import { setCookie, getCookie } from "../helpers/CookiesConfiguration"
export const ThemeContext = createContext()
export const themeReducer = (state, action) => {
switch(action.type){
    case "dark-mode" : 
        document.cookie = "color-mode=light-mode;expires=Thu, 01 Jan 1970 00:00:00 UTC;"; //Function To Delete Light Mode Cookie
        setCookie("color-mode", "dark-mode", 1);
        document.body.classList.add('dark-theme-variables');
        return {
            colorMode : action.payload
        }
    case "light-mode" : 
    document.cookie = "color-mode=dark-mode; expires=Thu, 01 Jan 1970 00:00:00 UTC;" //Function To Delete Dark Mode Cookie
    setCookie("color-mode", "light-mode", 1);
    document.body.classList.remove('dark-theme-variables');
       return {
        colorMode : action.payload
       }
    default : 
    break;
}
}

export const ThemeContextProvider = ({ children }) => {
    const  [ state, dispatch] = useReducer(themeReducer, {
        colorMode : getCookie("color-mode")
    })
    console.log("ThemeContext", state)
    return (
        <ThemeContext.Provider value = {{
            ...state, dispatch
        }}>
            { children }
        </ThemeContext.Provider>
    )
    }