import {
    createContext,
    useState,
    } from "react"
    export const PopularStoriesContext = createContext()
    export const PopularStoriesContextProvider = ({children}) => {
        const [popularStories, setPopularStories] = useState([{}, {}, {}])
        return (
            <>
            <PopularStoriesContext.Provider
            value={{
           popularStories,
           setPopularStories
            }}
            >
            {children}
    </PopularStoriesContext.Provider>
            </>
        )
    }