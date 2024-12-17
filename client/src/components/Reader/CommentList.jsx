
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard"
import { MdKeyboardArrowDown } from "react-icons/md";
import { useGetStoryComments } from "../../hooks/useGetStoryComments";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { formatNumber } from "../../helpers/formatNumber";
import ErrorMessage from "../common/ErrorMessage";
const CommentList = ({
storyId,
openModal,
isOpen,
comments,
setComments,
setDeleteModal,
commentNumber,
setCommentNumber
}) => {
  const { getStoryComments, isLoading, error, data, statusCode, commentCount } = useGetStoryComments();
  const [loadingState, setLoadingState] = useState([{}, {}, {}, {}]);
  const [showMore, setShowMore] = useState(false)
  const [emptyData, setEmptyData] = useState(false)
  const [parameters, setParameters] = useState({
    page : 1,
    limit : 4
  })
  useEffect(() => {
  if(openModal || isOpen){
    setEmptyData(false)
      getStoryComments(parameters["page"], parameters["limit"], storyId)
   }
  }, [parameters.page, parameters.limit, openModal, storyId, parameters, isOpen])
  useEffect(() => {
    if (data) {
      setEmptyData(false)
      const skip = (parameters["page"]) * parameters["limit"];
      if (skip >= commentCount && commentCount > 0) {
  setShowMore(true)
      }
      setCommentNumber(commentCount)
    setComments((prev) => {
      // Ensure new comments are appended without duplicates
      const newComments = data.filter(
        (newComment) => !prev.some((prevComment) => prevComment._id === newComment._id)
      );
      return [...prev, ...newComments];
    });
    }
  }, [data, commentCount]);
  useEffect(() => {
    if(!isLoading){
      if(data.length == 0 && !error && parameters["page"] == 1 && commentNumber == 0){
        console.log("there is empty data")
        setEmptyData(true)
      }else{
        setEmptyData(false)
      }
      if(commentNumber == 0 ){
        setEmptyData(true)
      }
      if(comments.length == 0  && commentNumber > 0){
    //  setParameters((prev) => {
    //       const { page, limit} = prev;
    //       return {page :  parameters["page"] == 1  ? page + 1 : page - 1 , limit : limit}
    //     })
    setParameters((prev) => {
      const { page, limit } = prev;

      // Calculate the total pages based on the comment count
      const totalPages = Math.ceil(commentNumber / limit);

      // Ensure the page stays within valid bounds
      const newPage = Math.min(page, totalPages);

      return { page: newPage, limit };
    });
      }
    }
        }, [data, isLoading, commentNumber, comments])
const showMoreComments = () => {
  console.log("sushi")
  setParameters((prev) => {
    const { page, limit} = prev;
    return {page : page + 1, limit : limit}
  })
}
const resendRequest = () => {
  getStoryComments(parameters["page"], parameters["limit"], storyId)
}
  return (
    <>
 {!error && <section>
  <div className="comments-title">
    <span>
    Comments <span className="comment-badge">{formatNumber(commentNumber)}</span>
    </span>
<span>
<MdArrowDownward /><MdArrowUpward/>Most Recents<MdKeyboardArrowDown />
</span>
    </div>
   {
    emptyData ? <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center", gap : "5px",
    padding : "50px 0px"
    }}>
    <span>No Comments Yet</span>
    <span>Start the conversation—your voice matters!</span></div>
     :
     <>
     <div className="comment-list">
    

    <>
    {comments.map((comment, index) => (
    <CommentCard key={index} comment={comment} isLoading={false} setDeleteModal={setDeleteModal}/>
      ))}
    </>
    <>
    { isLoading && loadingState.map((comment, index) => (
    <CommentCard key={index} comment={comment} isLoading={true}/>
      ))}
    </>
    
    
        
    
    
        </div>
        {!showMore && <div style={{fontSize : "1.1rem"}} className="comment-show-more" onClick={() => { showMoreComments()}}>
        Show more<MdKeyboardArrowDown size={20} />
    </div>
   }
        </>
   }
    </section>
 }
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
    </>
  

  )
}

export default CommentList