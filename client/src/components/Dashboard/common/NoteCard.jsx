import Dots from "../../../styles/components/common/Icons/Dots"
import Rename from "../../../styles/components/common/Icons/Rename"
import Download from "../../../styles/components/common/Icons/Download"
import ShareIcon from "../../../styles/components/common/Icons/ShareIcon"
import Delete from "../../../styles/components/common/Icons/Delete"
import { useEffect } from "react"

import { useState } from "react"
const NoteCard = ({ title, time, date, author, setModalTitle, setModalContent, setOpenModal}) => {
  useEffect(() => {
    const handleClick = (event) => {
      event.stopPropagation(); // Prevents bubbling
      console.log("david");
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
   // Dependency ensures the effect updates when callback changes
      const [settings, setSettings] = useState(false)
      const triggerNoteDelete = () => {
        setModalTitle("Delete Note")
        setModalContent("Are you sure you want to delete this note")
        setOpenModal(true)
    }
  const showNoteSettings = () => {
    console.log("chai")
setSettings(!settings)
  }
  return (
    <>
    <div className="note-preview-card">
    <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
        <div className="note-preview-card-image-section">
        <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1736434289/Assets/images/thumbnail-2_vlt7jd.svg"></img>
        </div>

        <div style={{display : "flex", flexDirection  :"column", gap : "25px", alignItems : "center"}}>
          <div className="settings-menu">
          <Dots size={50} onClick={() => showNoteSettings()}/>
          <ul className = "menu" style={{transform : settings ? "scale(1)" : "scale(0)"}}>
    <li style={{whiteSpace : "nowrap", fontWeight : "800", fontSize : "0.9rem"}}>
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
          
<span style={{fontSize: "1.3rem"}}>125 KB</span>
        </div>
    </div>
    <div style={{display : "flex", flexDirection : "column",justifyContent : "space-between", gap : "5px"}}>
        <span className="note-preview-card-title">{title}</span>
        <span className="note-preview-card-second-title">{time}, {date}</span>
        <span className="note-preview-card-third-title" >By: {author}</span>
    </div>
</div>
</>

  )
}

export default NoteCard