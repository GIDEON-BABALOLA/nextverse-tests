import { FaAngleDown } from "react-icons/fa"
import { Link } from "react-router-dom"
import FollowSuggestionCard from "./FollowSuggestionCard"
import { useEffect, useState } from "react"
import { useFollowSuggestion } from "../../hooks/useFollowSuggestions"
import { MdCloudOff, MdOutlineRefresh } from "react-icons/md"
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
    const resendRequest = () => {
        getUsersToFollow(1, 3)
    }
  return (
    <>
    { !error && <div>

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
    </div>}
 
    { 

        error && 
        <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
            <MdCloudOff size={40} />
            <div><button className="offline-button"
 onClick={() => resendRequest()}
 ><MdOutlineRefresh size={20}/> Refresh</button></div>
        </div>
    }
    </>
   
  )
}

export default FollowSuggestion