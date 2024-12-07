
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard"
import { MdKeyboardArrowDown } from "react-icons/md";
import { useGetStoryComments } from "../../hooks/useGetStoryComments";
const CommentList = ({ storyId, openModal }) => {
  console.log(storyId, openModal)
  const { getStoryComments, isLoading, error, data, statusCode, commentCount } = useGetStoryComments();
  const [loadingState, setLoadingState] = useState([{}, {}, {}, {}]);
  const [comments, setComments] = useState([])
  const [parameters, setParameters] = useState({
    page : 1,
    limit : 4
  })
  useEffect(() => {
  if(openModal){
    console.log("open now")
      getStoryComments(parameters["page"], parameters["limit"], storyId)
   }
  }, [parameters.page, parameters.limit, openModal])
  useEffect(() => {
console.log(data)
setComments(data)
  }, [data])
  return (
    <>
  <section>
    <div className="comment-list">
    
{ isLoading ? <>
{loadingState.map((comment, index) => (
<CommentCard key={index} comment={comment} isLoading={true}/>
  ))}
</>
:
<>
{comments.map((comment, index) => (
<CommentCard key={index} comment={comment} isLoading={false}/>
  ))}
</>
}

    


    </div>
    <div style={{fontSize : "1.1rem"}} className="comment-show-more">
        Show more<MdKeyboardArrowDown size={20}/>
    </div>
    </section>
    </>
  

  )
}

export default CommentList