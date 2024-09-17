import { createContext, useReducer, useEffect} from "react"
export const AuthContext = createContext()
export const authReducer = (state, action) => {
    switch(action.type){
        case "LOGIN" :
            return { user : action.payload}
        case "LOGOUT" :
            return { user : null}
        case "LOADUSER":
            return { user : action.payload}
        default :
        return state
    }
}
export const AuthContextProvider = ({ children }) => {
const  [ state, dispatch] = useReducer(authReducer, {
    user : null
})
console.log("AuthContext state", state)
return (
    <AuthContext.Provider value = {{
        ...state, dispatch
    }}>
        { children }
    </AuthContext.Provider>
)
}