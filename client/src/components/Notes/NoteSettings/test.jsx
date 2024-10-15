
import { FaCheck } from "react-icons/fa"
import colors from "../../../assets/noteEditorColors.json"
import { FaAngleLeft } from "react-icons/fa"
import { useState } from "react"
const ColorOptionList = ({colorType, setNoteSettings, savedSelection, slideLine, formatHighlightedText }) => {
  const [markerPosition, setMarkerPosition] = useState(13)
  const [ready, setReady] = useState(false)
  const highlightColor = (e, color) => {
    setMarkerPosition(e.target.offsetLeft + 13)
  if(savedSelection.commonAncestorContainer.previousSibling){
if(ready == true){
     savedSelection.commonAncestorContainer.previousSibling.style.backgroundColor = color
     setTimeout(() => {
      setReady(false)
    }, 1000); 
}
  }
  if(ready == false){
    formatHighlightedText("backColor", color)
  }
   setTimeout(() => {
      setReady(true)
    }, 1000); 
  }
  const handleChosenColor = (e, color) => {
switch (colorType) {
  case "Highlight Color":
    highlightColor(e, color)
    break;
    case "Text Color":
    setNoteSettings((prevState) => {
      return {
        ...prevState,
        textColor : color
      }
    })
    break;
}
  }
  return (
   <section 
    className="settings-main"
   style={{display : "flex", flexDirection : "column", alignItems : "center", marginTop : "5%", 
   justifyContent : "space-between", gap : "5px"
   }}>
    <div
     style={{ display : "flex", width : "100%", flexDirection : "row", alignItems : "center", justifyContent : "space-between"}}
    
    >
    <FaAngleLeft style={{cursor : "pointer"}} id="Color Option" onClick={(e) => slideLine(e) }/>
    <span style={{ justifySelf : "center", width : "100%", fontFamily : "Montserrat", fontStyle  : "bold"}}>
  {colorType}
  </span>

  </div>
  <div
    className="settings-color-section"
    style={{marginTop : "2%"}}
    >
                  {colors.map((color, index) => (
          <>
          <div
          key={index}
        className="sticky-notes-color"
        onClick={(e) => handleChosenColor(e, color.value)}
        style={{ backgroundColor: color.value,
        border : "3px solid #e5e5e5", cursor : "pointer"
         }}
    ></div>

    <FaCheck color="white" size={20}
    
     style={{position : "absolute", left : markerPosition + "px"}}/>
</>

        ))}
        </div>
   </section>
  )
}

export default ColorOptionList