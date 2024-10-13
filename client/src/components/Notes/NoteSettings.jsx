import { useState } from "react"
import { FaFonticonsFi, FaFont, FaPalette, FaGripLines, FaCheck, FaAngleRight, FaArrowLeft  } from "react-icons/fa"
import LineSizing from "./NoteSettings/LineSizing";
import ColorOption from "./NoteSettings/ColorOption";
import FontSize from "./NoteSettings/FontSize";
import FontFamily from "./NoteSettings/FontFamily";
import FontFamilyOptions from "./NoteSettings/FontFamilyOptions";
import ColorOptionList from "./NoteSettings/ColorOptionList";
const NoteSettings = ({ noteSettings, setNoteSettings}) => {
    const [attachmentLine, setAttachmentLine] = useState(0)
    const [currentSetting, setCurrentSetting] = useState({
      FontFamily :true,
      ColorOption : false,
      ColorOptionList : false,
      LineSizing : false,
      FontSize : false,
      FontFamilyOptions : false
    })
    const [colorType, setColorType] = useState("")
    const slideLine =(e) => {

  let tab;
  // if(e.target.offsetLeft - 20 == 113){

  // }
       
         tab = e.target.id.split(" ").join("")
        if(tab == ""){
          tab = e.currentTarget.id.split(" ").join("")
        }
        const optionMapping = {}
        Object.entries(currentSetting).map(([key, value]) => {
            optionMapping[key] = value
        })
const selectedOption = optionMapping[tab];
console.log(selectedOption)
        setCurrentSetting(prevState => ({
      ...Object.keys(prevState)
            .filter(key => key !== selectedOption) // Reset all others
            .reduce((acc, key) => ({ ...acc, [key]: false }), {}),
            [tab]: true
         }))
         if(tab == "ColorOptionList"){
          setAttachmentLine(113)
          return;
        }
        setAttachmentLine(e.target.offsetLeft - 20)
        }
        
        //inter, poppins, montserrat, roboto, lato
  return (
    
    <>
    <section className="settings-options">
<div>
<FaFonticonsFi /> <span
id="Font Family"
 style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e) } >Font Family</span>
</div>
<div>
<FaPalette /> <span 
id="Color Option"
style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e) } >Color Option</span>
</div>
<div>
<FaFont /> <span 
id="Font Size"
style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e) } >Font Size</span>
</div>
<div>
<FaGripLines /> <span
id="Line Sizing"
 style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e) } >Line Sizing</span>
</div>

  <div
  onClick={slideLine}
   className="slideline" style={{left : attachmentLine + "px"}}></div>
    </section>






    { currentSetting["FontFamilyOptions"] && <FontFamilyOptions slideLine={slideLine} setNoteSettings={setNoteSettings}
      noteSettings={noteSettings}
    />
    }
    { currentSetting["FontFamily"] && <FontFamily slideLine={slideLine}/>
    }
   {  currentSetting["ColorOption"] && <ColorOption slideLine={slideLine} setColorType={setColorType}/>
   }
   { currentSetting["ColorOptionList"] && <ColorOptionList
   colorType={colorType}
    slideLine={slideLine} setNoteSettings={setNoteSettings}
      noteSettings={noteSettings}
    />
    }
   { currentSetting["FontSize"] &&  <FontSize  noteSettings={noteSettings} setNoteSettings={setNoteSettings}/>
 }
  { currentSetting["LineSizing"] && <LineSizing noteSettings={noteSettings} setNoteSettings={setNoteSettings}/>
  }
    </>
  )
}

export default NoteSettings