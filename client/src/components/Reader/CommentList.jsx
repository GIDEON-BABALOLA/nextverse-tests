
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard"
import { MdKeyboardArrowDown } from "react-icons/md";
import { useGetStoryComments } from "../../hooks/useGetStoryComments";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import SpecialModal from "../../components/common/SpecialModal"
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
  const [parameters, setParameters] = useState({
    page : 1,
    limit : 4
  })
  useEffect(() => {
  if(openModal || isOpen){
    console.log("I have already started opening")
      getStoryComments(parameters["page"], parameters["limit"], storyId)
   }
  }, [parameters.page, parameters.limit, openModal, storyId, parameters, isOpen])
  useEffect(() => {
    if (data) {
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
const showMoreComments = () => {
  console.log("sushi")
  setParameters((prev) => {
    const { page, limit} = prev;
    return {page : page + 1, limit : limit}
  })
}
  return (
    <>
  <section>
  <div className="comments-title">
    <span>
    Comments <span className="comment-badge">{commentNumber}</span>
    </span>
<span>
<MdArrowDownward /><MdArrowUpward/>Most Recents<MdKeyboardArrowDown />
</span>
    </div>
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
    </section>
    </>
  

  )
}

export default CommentList