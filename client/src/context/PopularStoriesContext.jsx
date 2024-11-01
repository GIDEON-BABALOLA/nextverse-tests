import {
    createContext,
    useState,
    useRef,
    useEffect,
    } from "react"
    export const PopularStoriesContext = createContext()
    export const PopularStoriesContextProvider = ({children}) => {
        const [popularStories, setPopularStories] = useState([])
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