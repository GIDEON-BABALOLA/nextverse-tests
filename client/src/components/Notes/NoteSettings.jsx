import { FaFonticonsFi, FaFont, FaPalette, FaGripLines } from "react-icons/fa"
import LineSizing from "./NoteSettings/LineSizing";
import ColorOption from "./NoteSettings/ColorOption";
import FontSize from "./NoteSettings/FontSize";
import FontFamily from "./NoteSettings/FontFamily";
import FontFamilyOptions from "./NoteSettings/FontFamilyOptions";
import ColorOptionList from "./NoteSettings/ColorOptionList";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect, useState, useRef } from "react";
const NoteSettings = ({ 
  settingsModal,
  setSettingsModal,
  noteSettings,
  setNoteSettings,
  formatHighlightedText,
  savedSelection,
  tabSettings,
  attachmentLine,
  slideLine,
  colorType,
  setColorType,
  props
}) => {
  useEffect(() => {
console.log(settingsModal)
  }, [settingsModal])
const { width } = useWindowSize();
const mySettingsModal = useRef();
  const closeSettingsModal  = (e) => {
    if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"
      || Object.values(e.target.classList).includes("special-modal-client")
    ){
      return;
    }
          if( e.clientX < parseInt(mySettingsModal.current.getBoundingClientRect().left) || e.clientX > parseInt(mySettingsModal.current.getBoundingClientRect().left) + mySettingsModal.current.getBoundingClientRect().width)
            {
              console.log("sush")
              setSettingsModal(false)
            }else if(
              e.clientY < parseInt(mySettingsModal.current.getBoundingClientRect().top) || e.clientY > parseInt(mySettingsModal.current.getBoundingClientRect().top) + mySettingsModal.current.getBoundingClientRect().height
            ){
              console.log("now")
              setSettingsModal(false)
            }
        
    
    }
useEffect(() => {
  document.addEventListener("click", (e) => {
    if(mySettingsModal.current){
      closeSettingsModal(e)
    }
  })
  return () =>{
    document.removeEventListener('click', (e) => {
      if(mySettingsModal.current){
        closeSettingsModal(e)
      }
    }
  )
  }
  }, [])
  return (
    
    <>

   <section className="litenote-special-modal" >
            <div 
            {...props}
            ref={mySettingsModal}
            className={`popup center ${settingsModal == true ? "active" : ""}`} style={{height : `${300}px`, width : `${width< 768 ? width  :450}px`}}>
     <div className="icon">
    
     </div>
     <div className="title">
     </div>
     <div className="description">
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
      settingsModal={settingsModal}
    />
    }
   { tabSettings["FontSize"] &&  <FontSize  noteSettings={noteSettings} setNoteSettings={setNoteSettings}/>
 }
  { tabSettings["LineSizing"] && <LineSizing noteSettings={noteSettings} setNoteSettings={setNoteSettings}/>
  }
      </>
     </div>
    </div>
    </section>

    </>
  )
}

export default NoteSettings