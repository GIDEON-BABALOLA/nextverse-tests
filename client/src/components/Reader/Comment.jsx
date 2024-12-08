import "../../styles/components/Reader/comment.css"
import CommentList from "./CommentList";
import { useAuthContext } from "../../hooks/useAuthContext";
import EmojiPicker from 'emoji-picker-react';
import { RiEmojiStickerLine } from "react-icons/ri";
import { useThemeContext } from "../../hooks/useThemeContext";
import LoadingSpinner from "../Loaders/LoadingSpinner"
import { useCommentAStory } from "../../hooks/useCommentAStory";
import SpecialModal from "../common/SpecialModal";
 import { useRef, useState, useEffect } from "react"
 import { MdKeyboardArrowDown } from "react-icons/md";
 import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
const Comment = ({ id,
   openModal,
  isOpen,
  setDeleteModal,
 comments,
 setComments,
 commentNumber,
 setCommentNumber

}) => {
  const { user } = useAuthContext()
  const {commentAStory,  error : commentError, data} = useCommentAStory()
  const { colorMode }  = useThemeContext()
  const textAreaRef = useRef();
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const pickerRef = useRef(null);
const submitComment = () => {
  setLoading(true)
commentAStory(id, comment)
}
useEffect(() => {
  if( Object.keys(data).length > 0){
    setComment("")
    setCommentNumber(commentNumber + 1)
    setComments([
      {
        comment : data.comments[0].comment,
        commentBy :  {
          _id : data.comments[0].commentBy,
          username : user["username"],
          picture : user["picture"]
        },
        date : data.comments[0].date,
        _id : data.comments[0]._id
      }
      , ...comments])
    setLoading(false)
  }
    }, [data])
  // Toggle emoji picker visibility
  const togglePicker = () => setPickerVisible(!isPickerVisible);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setPickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onEmojiClick = (emojiData) => {
setComment((message) => message + emojiData.emoji)
  };

  const scrollTextArea = (e) => {
const height  =   Math.max(parseInt(e.target.scrollHeight), parseInt(textAreaRef.current.style.height))
textAreaRef.current.style.height = `${height}px`

  }
  const renderReplyButton = () => {
       if( Object.keys(data).length == 0 && !loading){
        return(
          <button className="comment-submit-button"
          onClick={() => submitComment()}
          >Reply</button> 
        )
      }
       if(loading  && !commentError){
        return(
          <button className="comment-submit-button"
                ><LoadingSpinner /></button> 
        )
      }
       if( !loading &&  Object.keys(data).length > 0 ){
        return(
          <button className="comment-submit-button"
          onClick={() => submitComment()}
                >Reply</button> 
        )
      }
         if(commentError){
        return(
          <button className="comment-submit-button"
          onClick={() => submitComment()}
          >Reply</button> 
        )
      }
    
  }
  return (
    <>
     <section className="desktop-comment">
    <div 
    className="comment-input-section" 
    ref={textAreaRef}
    onInput={scrollTextArea} 
    onBlur={scrollTextArea}
        style={{height : "120px"}}>


    <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    className="comment-input"
placeholder="Share Some thoughts...">
    </textarea>
    <div
    className="comment-input-section-footer"
    >
    <section>
    <span className="comment-editors">
<RiEmojiStickerLine 
size={20}
      onClick={() => togglePicker()}
    />
    </span>
</section>
    <section>{renderReplyButton()}
    </section>
    </div>
    </div>
    {isPickerVisible && (
    <div ref={pickerRef} className="emoji-picker-container">
    <EmojiPicker
    width={300}
    height={300}
    theme={colorMode == "dark-mode" ? "dark" : "light"}
    open={isPickerVisible}
    onEmojiClick={onEmojiClick}
    autoFocusSearch={false}
    />
    </div>

    )}
    <hr></hr>
    <CommentList 
    commentNumber={commentNumber}
    setCommentNumber={setCommentNumber}
    storyId={id} openModal={openModal} isOpen={isOpen} comments={comments} setComments={setComments} setDeleteModal={setDeleteModal}/>
   </section>
   
    </>
  
  )
}

export default Comment