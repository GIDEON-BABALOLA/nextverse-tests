
import { FaRegTrashAlt} from "react-icons/fa"
import Spinner from "../../Loaders/Spinner"
import { forwardRef, useRef } from "react"
const StickyNotesCard = forwardRef(({ content, initialPosition, ...props }, ref) => {
    const colors = JSON.parse(content.colors)
    const textAreaRef = useRef(null)
    function autoGrow(textAreaRef) {
        const { current } = textAreaRef;
    
        current.style.height = "auto"; // Reset the height 
        current.style.height = textAreaRef.current.scrollHeight + "px"; // Set the new height
    }
    const saving = true
  return (
    <div
    ref={ref}
    className="card"
    style={{
        left: `${initialPosition?.x}px`,
        top: `${initialPosition?.y}px`,
        backgroundColor: colors.colorBody,
        
    }}
    {...props}
>
    <div
        className="card-header"
        style={{
            backgroundColor: colors.colorHeader,
        }}
    >
        <FaRegTrashAlt  />

        {saving && (
            <div className="">
                <Spinner color={colors.colorText} />
                <span style={{ color: colors.colorText }}>
                    Saving...
                </span>
            </div>
        )}
    </div>
    <div className="card-body">
        <textarea
            ref={textAreaRef}
            onFocus={() => {
                
            
            }}
            onInput={() => {
                autoGrow(textAreaRef);
            }}
          
            style={{ color: colors.colorText }}
            defaultValue={`📌 ${content.body}`}
          
        >
                     </textarea>
    </div>
</div>
  )
})
StickyNotesCard.displayName = "StickyNotesCard";

export default StickyNotesCard