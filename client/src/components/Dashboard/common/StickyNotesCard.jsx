
import { FaRegTrashAlt} from "react-icons/fa"
import Spinner from "../../Loaders/Spinner"
import { forwardRef, useRef, useEffect, useState } from "react"
const StickyNotesCard = forwardRef(({ content, id, initialPosition,
    saveStickyNote,
    setStickyNotes,
    setStickyNotesCount,
    ...props }, ref) => {
    const colors = JSON.parse(content.colors)
    const textAreaRef = useRef(null)
    function autoGrow(textAreaRef) {
        const { current } = textAreaRef;
    
        current.style.height = "auto"; // Reset the height 
        current.style.height = textAreaRef.current.scrollHeight + "px"; // Set the new height
    }
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
autoGrow(textAreaRef)
    }, [])
    const startSaving = (id, body) => {
        setIsLoading(true)
        saveStickyNote(id, body)
        setIsLoading(false)
    }
    const deleteStickyNote = () => {
        const savedNotes = JSON.parse(localStorage.getItem("stickyNotes"))
        const updatedNotes = savedNotes.filter((note) => note.id !== id)
        setStickyNotesCount(updatedNotes)
        setStickyNotes(updatedNotes)
        localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes))
    }
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
            cursor : "pointer"
        }}
    >
        <FaRegTrashAlt  
        onClick={() => { deleteStickyNote()}}

        />

        {isLoading && (
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
            onKeyUp={(e) => {
                startSaving(content.id, e.target.value)
              
            }}
            onInput={() => {
                autoGrow(textAreaRef);
        
            }}
        
          
            style={{ color: colors.colorText, }}
            defaultValue={`${content.body}`}
          
        >
                     </textarea>
    </div>
</div>
  )
})
StickyNotesCard.displayName = "StickyNotesCard";

export default StickyNotesCard