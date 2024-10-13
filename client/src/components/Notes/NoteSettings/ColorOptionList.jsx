
import { FaCheck } from "react-icons/fa"
import colors from "../../../assets/colors.json"
import { useState } from "react"
const ColorOptionList = ({colorType, setNoteSettings }) => {
  const [markerPosition, setMarkerPosition] = useState(13)
  const handleChosenColor = (e, color) => {
    setMarkerPosition(e.target.offsetLeft + 13)
switch (colorType) {
  case "Highlight Color":
    
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
   style={{display : "flex", flexDirection : "column", alignItems : "center", marginTop : "5%"}}>
    <div
     style={{ display : "flex", alignSelf : "left",}}
    
    >
  {colorType}

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