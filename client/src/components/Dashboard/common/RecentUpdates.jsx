
import "../../../styles/components/Dashboard/recent-updates.css"
import { useEffect, useState } from "react";
import CommonAvatar from "../../../components/common/CommonAvatar"
import NoContent from "../../common/NoContent"
import ErrorMessage from "../../common/ErrorMessage"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useGetAllNotifications } from "../../../hooks/useGetAllNotifications"
import useNavigateStory from "../../../hooks/useNavigateStory";
import useNavigateProfile from "../../../hooks/useNavigateProfile"
const RecentUpdates = () => {
    const [loadingState, setLoadingState] = useState([{}, {}, {}, {}])
    const [emptyData, setEmptyData] = useState(false)
    const {
        getAllNotifications,
         isLoading,
         error,
         data,
        } = useGetAllNotifications();
        useEffect(() => {
            getAllNotifications(1, 4, "story");
        }, [])
        useEffect(() => {
            if(data.length > 0) {
                setEmptyData(false)
            }
            else{
                setEmptyData(true)
            }
        }, [data])
  const resendRequest = () => {
    getAllNotifications(1, 4, "story");
  }
  return (
    <div className="litenote-dashboard-recent-updates">
    <h2 className="litenote-dashboard-h-two">Recent Updates</h2>
    <div className="litenote-dashboard-updates">
    {error && <>

{ error?.code == "ERR_NETWORK" ? 
  <ErrorMessage title={"Check Your Internet Connection"} 
message={"We are unable to load this content, check your connection"}
height={50}
type={error.code}
fireClick = {resendRequest}
/>
:
error?.code == "ERR_CANCELED"

?
<ErrorMessage title={"Timeout Error"} 
message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
height={50}
type={error.code}
fireClick = {resendRequest}
/>
:
<ErrorMessage title={"Something went wrong"} 
message={"We are unable to load this content, Pls click on the refresh button"}
height={50}
type={error.code}
fireClick = {resendRequest}
/>
}
</>
}
        {!error &&
        
            <>
           {
            isLoading ? 
            <>
            {loadingState.map((content, index) => (
                <div className="litenote-dashboard-update" key={index} style={{padding : "10px 0px"}}>
                    <div className="litenote-dashboard-profile-photo" >
  <CommonAvatar
  style={{height : "40px", width: "40px"}}
  image={""}
  className="litenote-dashboard-profile-photo"
  />
                    </div>
                    <div className="litenote-dashboard-message" style={{display : "flex", flexDirection : "column", justifyContent : "space-between", gap : "5px"}}>
                        <div className="recent-stories-loader" style={{width : "100%", height  :"10px"}}></div>
                        <div className="recent-stories-loader" style={{width : "100%", height  :"10px"}}></div>
                        <div className="recent-stories-loader" style={{width : "40px", height  :"10px"}}></div>
                    </div>
                    </div>
            ))} 
            </>
            :
            <>
            {
                emptyData ? 
                <NoContent message={`There are no recent updates`}
                fireClick={
                 () => {
     
                 
     resendRequest()
                 }}
         />
                :
                <>

             {data.map((content, index) => (
        <div className="litenote-dashboard-update" key={index}>
            <div className="litenote-dashboard-profile-photo">
            <CommonAvatar
  style={{height : "40px", width: "40px"}}
  image={content.actor.picture}
  className="litenote-dashboard-profile-photo"
  />
            </div>
            <div className="litenote-dashboard-message">
                <div><b>{content.message.replace("your story.", "the story")}</b> with the title {content.referenceId.title}</div>
                <small className="litenote-dashboard-text-muted">
                    {formatDistanceToNow(content.createdAt)}
                    </small>
            </div>
            </div>
    ))}   
    </>
}
            </>
}
            </>
        }
    </div>
  </div>
  )
}

export default RecentUpdates