import { FaAngleDown, FaBoxOpen } from "react-icons/fa"
import { Link } from "react-router-dom"
import FollowSuggestionCard from "./FollowSuggestionCard"
import { useEffect, useState } from "react"
import { useFollowSuggestion } from "../../hooks/useFollowSuggestions"
import { MdCloudOff, MdOutlineRefresh,  MdOutlineTimerOff } from "react-icons/md"
import { BiWifiOff } from "react-icons/bi"
const FollowSuggestion = () => {
    const { getUsersToFollow, isLoading, error, data} = useFollowSuggestion();
    const [followData, setFollowData] = useState([])
    const [emptyData, setEmptyData] = useState(false)
    const [loadingState, setLoadingState] = useState([{}, {}, {}])
    useEffect(() => {
        setLoadingState([{}, {}, {}])
        setEmptyData(false)
getUsersToFollow(1, 3)
    }, [])
    useEffect(() => {
        if(data.length > 0){
            setEmptyData(false)
            setFollowData(data)
        }
    }, [data])
    useEffect(() => {
        if(!isLoading){
            if(data.length == 0 && !error){
              setEmptyData(true)
            }
          }
    }, [data, isLoading, error])
    const resendRequest = () => {
        setEmptyData(false)
        getUsersToFollow(1, 3)
    }
  return (
    <>
    { emptyData  ? 
        <div 
    style={{display :"flex", flexDirection : "column", 
        alignItems : "center", justifyContent : "center", padding : "40px 0px"}}
        className="no-content-section"
        >
        <FaBoxOpen size={90}/>
        <h6>No User To Follow</h6>
        <div><button className="offline-button"
 onClick={() => resendRequest()}
 ><MdOutlineRefresh size={20}/> Refresh</button></div>
        </div>
    : 

    <section>
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
    <>
    {
        error?.code == "ERR_NETWORK" ?
        <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
        <BiWifiOff size={40} />
        <span>Check Your Internet Connection</span>
        <div><button className="offline-button"
onClick={() => resendRequest()}
><MdOutlineRefresh size={20}/> Refresh</button></div>
    </div> : 
    error?.code == "ERR_CANCELED"
    ?
    <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
        <MdOutlineTimerOff size={40} />
        <span>The Request Timed Out</span>
        <div><button className="offline-button"
onClick={() => resendRequest()}
><MdOutlineRefresh size={20}/> Refresh</button></div>
    </div> 
    :
    <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
        <MdCloudOff size={40} />
        <span>Something Went Wrong</span>
        <div><button className="offline-button"
onClick={() => resendRequest()}
><MdOutlineRefresh size={20}/> Refresh</button></div>
    </div> 
    }
 
    </>
}
    </section>
    }
    </>
   
  )
}

export default FollowSuggestion