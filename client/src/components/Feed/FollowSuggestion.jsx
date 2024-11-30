import { FaAngleDown } from "react-icons/fa"
import { Link } from "react-router-dom"
import FollowSuggestionCard from "./FollowSuggestionCard"
import { useEffect, useState } from "react"
import { useFollowSuggestion } from "../../hooks/useFollowSuggestions"
const FollowSuggestion = () => {
    const { getUsersToFollow, isLoading, error, data, statusCode, storyCount } = useFollowSuggestion();
    const [followData, setFollowData] = useState([])
    const [loadingState, setLoadingState] = useState([{}, {}, {}])
    useEffect(() => {
getUsersToFollow(1, 3)
    }, [])
    useEffect(() => {
        if(data.length > 0){
            setFollowData(data)
        }
    }, [data])
    
  return (
    <>
    {isLoading ? 
        <section>
        <h3><b>Who to follow</b></h3>
        {
        loadingState.map((user, index) => (
            <FollowSuggestionCard isLoading={true} key={index} user={user}/>
        ))
    }
        </section>

    :
        <section>
    <h3><b>Who to follow</b></h3>
    {
        followData.map((user, index) => (
            <FollowSuggestionCard isLoading={isLoading} key={index} user={user}/>
        ))
    }


     <div className="feed-first"><Link
        style={{textDecoration : "none", color : "#7380EC", cursor : "pointer"}}
         to={"/follow-suggestions"}>Show more <FaAngleDown /></Link>
        </div>
    </section>
    }
    </>
   
  )
}

export default FollowSuggestion