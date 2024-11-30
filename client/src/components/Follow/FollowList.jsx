import ErrorMessage from "../common/ErrorMessage"
import FollowCard from "./FollowCard"
import { useEffect, useState, useRef } from "react"
import { useFollowSuggestion } from "../../hooks/useFollowSuggestions"
import { generateRandomPage } from "../../helpers/generateRandomPage"
import { isVisibleInViewport } from "../../helpers/isVisibleInViewPort"
import useWindowSize from "../../hooks/useWindowSize"
import NoContent from "../common/NoContent"
const FollowList = () => {
  const lastItemRef = useRef();
  const loadingRef = useRef();
  const { width } = useWindowSize();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [loadingState, setLoadingState] = useState([{}, {}, {}, {}, {}, {}])
    const [emptyData, setEmptyData] = useState(false)
    const [usersToFollow, setUsersToFollow] = useState([])
    const [lastScrollY, setLastScrollY] = useState(0);
    const {getUsersToFollow, isLoading, error, data, userCount} = useFollowSuggestion();
    useEffect(() => {
      setEmptyData(false)
      const skip = (page - 1) * limit;
      if (skip >= userCount && userCount > 0) {
        const randomPage = generateRandomPage(page)
        setPage(randomPage);
        return;
      }
getUsersToFollow(page, limit)
    }, [page, limit])
    useEffect(() => {
     if(width < 767){
      setLimit(6)
      setLoadingState([{}, {}, {}, {}, {}, {}])
     }
     else if(width < 1200){
      setLimit(10)
      setLoadingState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
     }
     else{
      setLimit(6)
      setLoadingState([{}, {}, {}, {}, {}, {}])
     }
    }, [width])
    
    useEffect(() => {
      if(data.length > 0){
        setEmptyData(false)
        const newUsers = data.map((user) => {
          return {...user, loading : false}
        })
      setUsersToFollow((prev) => {
        return [...prev, ...newUsers]
      })
      }
      
      }, [data])
      useEffect(() => {
        if(!isLoading){
          if(data.length == 0 && !error){
            setEmptyData(true)
          }
        }
            }, [data, isLoading])
            //Setting up intersection observer
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isLoading) {
              setPage((prevPage) => prevPage + 1);
            observer.unobserve(entry.target); // Pause observer to prevent duplicate triggers
          }
        },
        { threshold: 0.1 } // Adjust threshold as needed
      );
    
      if (lastItemRef.current && !isLoading) {
        observer.observe(lastItemRef.current);
      }
    
      return () => {
        if (lastItemRef.current) {
          observer.unobserve(lastItemRef.current);
        }
      };
    }, [lastItemRef, isLoading, data]);
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if(isLoading){
          if (currentScrollY > lastScrollY && isVisibleInViewport(loadingRef.current, 0.8)) {
            window.scrollTo(0, lastScrollY); // Reset the scroll position to the last known position
          } else {
            // Update the last scroll position if scrolling up
            setLastScrollY(currentScrollY);
          }
        }
    
      };
    
      // Add the scroll event listener
      window.addEventListener("scroll", handleScroll);
    
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollY, isLoading]);
    const resendRequest = () => {
      getUsersToFollow(1, 6) 
    }  
  return (
    <>
    {
    !error &&
    <section>
        {emptyData  ? 
      <div style={{ height : "100vh"}}>
<NoContent
message={"There is nobody to follow"}
 />
</div>
    :
    <section>
    <div className="followers-list">
    {usersToFollow.map((content, index) => (
<FollowCard key={index} content={content}
isLoading={false}
/>
    ))}
    { isLoading && usersToFollow.length !== 0 &&

loadingState.map((content, index) => (
    <FollowCard
    ref={loadingRef}
    isLoading={true}
     content={content}  key={index}/>
  ))


}
        </div>
        <div ref={lastItemRef}>
        </div>
        {
usersToFollow.length === 0 && 
<div>
<div style={{
display : "flex",
flexDirection : "row",
padding : "200px 0px",
justifyContent : "space-around",
alignItems : "space-around",

height : "100vh"}}>
<span className="still-no-stories-loader"></span>
</div>


</div> 

}

    </section>
    }
    </section>
    }
{error && <>

{ error?.code == "ERR_NETWORK" ? 
  <ErrorMessage title={"Check Your Internet Connection"} 
message={"We are unable to load this content, check your connection"}
height={80}
type={error.code}
fireClick = {resendRequest}
/>
:
error?.code == "ERR_CANCELED"

?
<ErrorMessage title={"Timeout Error"} 
message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
height={80}
type={error.code}
fireClick = {resendRequest}
/>
:
<ErrorMessage title={"Something went wrong"} 
message={"We are unable to load this content, Pls click on the refresh button"}
height={80}
type={error.code}
fireClick = {resendRequest}
/>
}
</>
}
    </>
  )
}

export default FollowList