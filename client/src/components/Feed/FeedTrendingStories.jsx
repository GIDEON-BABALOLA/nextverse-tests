
import { FaAngleDown } from "react-icons/fa"
import TrendingCard from "./TrendingCard"
import { useEffect } from "react"
import { FaBoxOpen } from "react-icons/fa"
import { useGetPopularStories } from "../../hooks/useGetPopularStories"
import { MdCloudOff, MdOutlineRefresh,  MdOutlineTimerOff } from "react-icons/md"
import { BiWifiOff } from "react-icons/bi"
import { useState } from "react"
const FeedTrendingStories = () => {
    const { getPopularStories, isLoading, error, data} = useGetPopularStories()
    const [loadingData, setLoadingData] = useState([{}, {}])
    const [emptyData, setEmptyData] = useState(false)
    useEffect(() => {
        setEmptyData(false)
        getPopularStories("all", 4)
    }, [])
    useEffect(() => {
if(data.length > 0){
  setEmptyData(false)
}
    }, [data])
    useEffect(() => {
if(!isLoading){
  if(data.length == 0 && !error){
    setEmptyData(true)
  }
}
    }, [data, isLoading, error])
    const [numberOfTrendingStories, setNumberOfTrendingStories] = useState(2)
const showMore = () => {
    setNumberOfTrendingStories(4)
}
const showLess = () => {
    setNumberOfTrendingStories(2)
}
const resendRequest = () => {
setEmptyData(false)
  getPopularStories("all", 4)
}
  return (
    <>
    { emptyData && !isLoading ? 
    <>
    <div 
    style={{display :"flex", flexDirection : "column", 
        alignItems : "center", justifyContent : "center", padding : "40px 0px"}}
        className="no-content-section"
        >
        <FaBoxOpen size={90}/>
        <h6>No Trending Stories</h6>
        <div><button className="offline-button"
 onClick={() => resendRequest()}
 ><MdOutlineRefresh size={20}/> Refresh</button></div>
        </div>
    </>

        
    :
    <div>
    { !error && <section>
    <div style={{marginTop  : "30px"}}>
        <h3><b>Trending Stories</b></h3>
  
          { !isLoading && data.slice(0, numberOfTrendingStories).map((content, index) => (
<TrendingCard key={index} trending={content} isLoading={isLoading}/>
        ))}
        {  isLoading && loadingData.map((content, index) => (
<TrendingCard key={index} trending={content} isLoading={true}/>
        ))}
            </div>
            <div className="feed-trendy-story-image"></div>
           { !isLoading && <span>
            { numberOfTrendingStories == 2  ? <div className="feed-first" onClick={showMore}>Show more <FaAngleDown /></div>
             : <div className="feed-first" onClick={showLess}>Show Less <FaAngleDown /></div>}
            </span>
           }

    </section>
  }
  { 

error && 
<section style={{display :"flex", flexDirection  :"column", justifyContent : "space-around", paddingTop : "30px"}}>
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

</section>
}
    </div>
    }
    </>
  
  )
}

export default FeedTrendingStories