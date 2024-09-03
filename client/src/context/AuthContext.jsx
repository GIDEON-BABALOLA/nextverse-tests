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
// const getUser = async () => {
//     dispatch({type : "LOADUSER", payload : {}})           
//     try{
// const response = await workout.get("/user/get-user")
// if(response && response.data){
// return response.data
// }
// }
// catch(err){
// return null
//     }
// }
//Try to check if there is cookies in the browser first of all to know whether we should make this request
// useEffect(()=>{
// async function load(){
//     dispatch({type : "LOADUSER", payload : await getUser()})      
// }
//  load()
// }, []) 
console.log("AuthContext state", state)
return (
    <AuthContext.Provider value = {{
        ...state, dispatch
    }}>
        { children }
    </AuthContext.Provider>
)
}