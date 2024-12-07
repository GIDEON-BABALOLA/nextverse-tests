import "../../styles/components/Reader/desktop-comment.css"
import CommentList from "./CommentList";
import EmojiPicker from 'emoji-picker-react';
import { RiEmojiStickerLine } from "react-icons/ri";
import { useThemeContext } from "../../hooks/useThemeContext";
 import { useRef, useState, useEffect } from "react"
 import { MdKeyboardArrowDown } from "react-icons/md";
 import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
const Comment = () => {
  const { colorMode }  = useThemeContext()
  const textAreaRef = useRef();
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [comment, setComment] = useState("")
  const pickerRef = useRef(null);

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
    console.log("Selected emoji:", emojiData.emoji);
setComment((message) => message + emojiData.emoji)
  };

  const scrollTextArea = (e) => {
const height  =   Math.max(parseInt(e.target.scrollHeight), parseInt(textAreaRef.current.style.height))
textAreaRef.current.style.height = `${height}px`

  }
  return (
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
    <section><button className="comment-submit-button">Reply</button></section>
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
    <div className="comments-title">
    <span>
    Comments <span className="comment-badge">30</span>
    </span>
<span>
<MdArrowDownward /><MdArrowUpward/>Most Recents<MdKeyboardArrowDown />
</span>
    </div>
    <CommentList />
   </section>
  )
}

export default Comment