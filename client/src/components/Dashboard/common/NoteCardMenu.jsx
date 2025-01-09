import Rename from "../../../styles/components/common/Icons/Rename"
import Download from "../../../styles/components/common/Icons/Download"
import ShareIcon from "../../../styles/components/common/Icons/ShareIcon"
import Delete from "../../../styles/components/common/Icons/Delete"
import { useEffect, useRef } from "react"
export const NoteCardMenu = ({ title, settings, triggerNoteDelete, setSettings}) => {
    const noteCardMenuRef = useRef();
      const closeSpecialModal  = (e) => {
        if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"
          || Object.values(e.target.classList).includes("special-modal-client")
        ){
          return;
        }
              if( e.clientX < parseInt(noteCardMenuRef.current.getBoundingClientRect().left) || e.clientX > parseInt(noteCardMenuRef.current.getBoundingClientRect().left) + noteCardMenuRef.current.getBoundingClientRect().width)
                {
                 setSettings(false)
                }else if(
                  e.clientY < parseInt(noteCardMenuRef.current.getBoundingClientRect().top) || e.clientY > parseInt(noteCardMenuRef.current.getBoundingClientRect().top) + noteCardMenuRef.current.getBoundingClientRect().height
                ){
                  setSettings(false)
                }
            
        
        }
    useEffect(() => {
      document.addEventListener("click", (e) => {
        if(noteCardMenuRef.current){
          closeSpecialModal(e)
        }
      })
      return () =>{
        document.removeEventListener('click', (e) => {
          if(noteCardMenuRef.current){
            closeSpecialModal(e)
          }
        }
      )
      }
      }, [])
  return (
    <div className="settings-menu">
    <ul className = "menu" style={{transform : settings ? "scale(1)" : "scale(0)"}}
    ref={noteCardMenuRef}
    >
<li style={{whiteSpace : "nowrap", fontWeight : "800", fontSize : "1.1rem"}}>
{title}
</li>
<li style={{whiteSpace : "nowrap"}}>
<span><Rename /></span>
<span>Rename</span>
</li>
<li>
<span><Download /></span>
<span>Download</span>
</li>
<li>
<span><ShareIcon /></span>
<span>Share</span>
</li>
<li onClick={triggerNoteDelete} className="special-modal-client">
<span><Delete /></span>
<span>Delete</span>
</li>
</ul>
    </div>
  )
}
