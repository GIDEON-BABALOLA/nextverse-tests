import { FaBold, FaFillDrip, FaMicrophone, FaItalic, FaUnderline } from "react-icons/fa"
import { useModalContext } from "../../hooks/useModalContext"
import eyedropper from "../../assets/eyedropper.svg"
import { useEffect, useRef } from "react"
const NoteTooltip = ({
  noteSettings,
  openModal,
  setOpenModal,
  formatHighlightedText,
  savedSelection,
  slideLine,
  speakHighlightedText
}) => {
  const { contextMenu, setContextMenu, } = useModalContext()
// const handleChangeHighlightColor = () => {
//   setOpenModal(!openModal)
//   formatHighlightedText("backColor", "yellow")
// }
  const tooltipRef = useRef()
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
    <span >
    <img
    width={"90%"}
     src={eyedropper}  id="Color Option List" onClick={(e) => {formatHighlightedText("highlightcolor"); slideLine(e)}} />      
        </span>
    <span>
    <FaItalic onClick={() => {formatHighlightedText("italic")}}/>
    </span>
    <span>
    <FaUnderline onClick={() => {formatHighlightedText("underline")}} />        
        </span>
        <span>
    <FaMicrophone onClick={() => speakHighlightedText()}  />        
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