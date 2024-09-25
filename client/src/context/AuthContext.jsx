import { createContext, useReducer, useEffect} from "react"
import { axiosConfig } from "../api/axiosConfig"
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
useEffect(() => {
    // Function to check if user is logged in
    const fetchUser = async () => {
      try {
        const response = await axiosConfig.get("/user/get-current-user"); // Your API route
        const userData = response.data;
        dispatch({ type: "LOGIN", payload: userData }); // Dispatch login action with user data
      } catch (error) {
        dispatch({ type: "LOGOUT" }); // Dispatch logout action if no user
      }
    };

    fetchUser();
  }, []); 
  
  // Runs once on component mount
console.log("AuthContext state", state)
return (
    <AuthContext.Provider value = {{
        ...state, dispatch
    }}>
        { children }
    </AuthContext.Provider>
)
}