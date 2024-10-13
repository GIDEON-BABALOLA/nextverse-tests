
import { FaCheck } from "react-icons/fa"
import colors from "../../../assets/colors.json"
import { FaAngleLeft } from "react-icons/fa"
import { useState } from "react"
const ColorOptionList = ({colorType, setNoteSettings, savedSelection, slideLine, formatHighlightedText }) => {
  const [markerPosition, setMarkerPosition] = useState(13)
  const highlightColor = (color) => {
    console.log(color)
     formatHighlightedText("backColor", color)
     console.log(savedSelection)
  }
  const handleChosenColor = (e, color) => {
    setMarkerPosition(e.target.offsetLeft + 13)
switch (colorType) {
  case "Highlight Color":
    highlightColor(color)
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
        onClick={(e) => handleChosenColor(e, color.colorHeader)}
        style={{ backgroundColor: color.colorHeader,
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