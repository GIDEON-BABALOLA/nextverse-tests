import { useState } from "react"
import { FaFonticonsFi, FaFont, FaPalette, FaGripLines } from "react-icons/fa"
import LineSizing from "./NoteSettings/LineSizing";
import ColorOption from "./NoteSettings/ColorOption";
import FontSize from "./NoteSettings/FontSize";
import FontFamily from "./NoteSettings/FontFamily";
import FontFamilyOptions from "./NoteSettings/FontFamilyOptions";
import ColorOptionList from "./NoteSettings/ColorOptionList";
const NoteSettings = ({ 
  noteSettings,
  setNoteSettings,
  formatHighlightedText,
  savedSelection,
  tabSettings,
  setTabSettings,
  attachmentLine,
  setAttachmentLine,
  slideLine,
  colorType,
  setColorType,
  openModal,
  restoreSelection
}) => {

        
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






    { tabSettings["FontFamilyOptions"] && <FontFamilyOptions slideLine={slideLine} setNoteSettings={setNoteSettings}
      noteSettings={noteSettings}
    />
    }
    { tabSettings["FontFamily"] && <FontFamily slideLine={slideLine}/>
    }
   {  tabSettings["ColorOption"] && <ColorOption slideLine={slideLine} setColorType={setColorType}/>
   }
   { tabSettings["ColorOptionList"] && <ColorOptionList
   colorType={colorType}
   savedSelection={savedSelection}
    slideLine={slideLine} setNoteSettings={setNoteSettings}
    formatHighlightedText={formatHighlightedText}
      noteSettings={noteSettings}
      openModal={openModal}
    />
    }
   { tabSettings["FontSize"] &&  <FontSize  noteSettings={noteSettings} setNoteSettings={setNoteSettings}/>
 }
  { tabSettings["LineSizing"] && <LineSizing noteSettings={noteSettings} setNoteSettings={setNoteSettings}/>
  }
    </>
  )
}

export default NoteSettings