import { FaBold, FaFillDrip ,FaItalic, FaUnderline } from "react-icons/fa"
import { MdInsertComment } from "react-icons/md"
import { useModalContext } from "../../hooks/useModalContext"
import { useToastContext } from "../../hooks/useToastContext"
import { useEffect, useRef } from "react"
const NoteTooltip = ({ savedSelection,
   setSavedSelection,
  noteSettings,
  openModal,
  setOpenModal
}) => {
  const { contextMenu, setContextMenu, } = useModalContext()
  const { showToast } = useToastContext()
  // Function to restore the saved selection
  const restoreSelection = () => {
    const selection = window.getSelection();
    selection.removeAllRanges();
    if (savedSelection) {
      selection.addRange(savedSelection);
    }
  };
const handleChangeHighlightColor = () => {
  setOpenModal(!openModal)
  formatHighlightedText("backColor", "yellow")
}
  // Format the highlighted text with execCommand
  const formatHighlightedText = (command, value = null) => {
    restoreSelection(); // Restore selection before formatting
    if(noteSettings["editable"] == false){
      showToast("Error", "Pls Switch To Editor Mode To Edit Content", false)
      return;
    }
    document.execCommand(command, false, value);
      contextMenu.current.style.visibility = "hidden";      
    // Clear saved selection after applying formatting if needed
    setSavedSelection(null)
    const selection = window.getSelection();
    selection.removeAllRanges();
  };

  // const formatHighlightedText = (e, params, value = null) => {
  //   e.preventDefault()
  //   document.execCommand(params, false, value)
  // }
  const tooltipRef = useRef()
  // const triangle = useRef()
  // const rectangle = useRef()
  useEffect(() => {
      setContextMenu(tooltipRef)
  }, [setContextMenu])
  return (
    <>
    <div className="note-tooltip-css" 
  
    ref={tooltipRef}
    >
    <span>
    <FaBold 
             onClick={() =>{formatHighlightedText("bold")}}
    />
    </span>
    <span>
    <FaItalic onClick={() => {formatHighlightedText("italic")}}/>
    </span>
    <span>
    <FaUnderline onClick={() => {formatHighlightedText("underline")}} />        
        </span>
        <span>
    <FaFillDrip onClick={() => handleChangeHighlightColor()  } />      
        </span>


 
<span
onClick={() => {
  contextMenu.current.style.visibility = "hidden";
}}
 style={{
borderRadius : "50%",
 position : "absolute", left : "140px",
bottom : "30px",
padding : "12px 5px",
lineHeight : "3px",
color : "#050A52",
cursor : "pointer",
background : "white",
boxShadow : "#0000001A 0px 2px 5px 0px"
}}>
<span style={ { border : "2px solid #050A52",
padding : "1px 5px",
lineHeight : "2px",
fontSize : "0.8rem",
color : "#050A52",
fontWeight : "500",
 borderRadius : "50%"}}>
    x
</span>
    </span>
    </div>

    </>
  )
}
export default NoteTooltip