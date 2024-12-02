import { createContext, useReducer, useEffect} from "react"
export const StickyNotesContext = createContext()
export const stickyNotesReducer = (state, action) => {
    switch(action.type){
        case "CREATE_NOTE" :
            return { stickyNotes : action.payload}
        case "UPDATE_NOTE" :
            return { stickyNotes : action.payload}
        case "DELETE_NOTE":
            return { stickyNotes : action.payload}
        default :
        return state
    }
}
export const StickyNotesContextProvider = ({ children }) => {
const  [ state, dispatch] = useReducer(stickyNotesReducer, {
    stickyNotes : JSON.parse(localStorage.getItem("stickyNotes")) || []
})
return (
    <StickyNotesContext.Provider value = {{
        ...state, dispatch
    }}>
        { children }
    </StickyNotesContext.Provider>
)
}