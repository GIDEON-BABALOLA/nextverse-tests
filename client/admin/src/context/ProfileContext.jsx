import { createContext, useReducer} from "react"
export const ProfileContext = createContext()
export const profileReducer = (state, action) => {
    switch (action.type) {
      case "LOAD_PROFILE":
        return {  profile: action.payload };
      case "INCREASE_FOLLOWERS":
        console.log("Increasing followers...");
        return {
          profile: {
            ...state.profile,
            totalfollowers: (state.profile.totalfollowers || 0) + 1,
          },
        };
      case "DECREASE_FOLLOWERS":
        console.log("Decreasing followers...");
        return {
          profile: {
            ...state.profile,
            totalfollowers: (state.profile.totalfollowers || 0) - 1,
          },
        };
      default:
        return state;
    }
  };
export const ProfileContextProvider = ({ children }) => {
const  [ state, dispatch] = useReducer(profileReducer, {
    profile : {},
})  
return (
    <ProfileContext.Provider value = {{
        ...state, dispatch
    }}>
        { children }
    </ProfileContext.Provider>
)
}