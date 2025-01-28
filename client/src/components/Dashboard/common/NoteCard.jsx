import Dots from "../../../styles/components/common/Icons/Dots"
import TextIcon from "../../../styles/components/common/Icons/TextIcon"
import { useRef } from "react"
const NoteCard = ({ id,
   title,
  time,
  date,
  author,
  setModalTitle,
  setModalContent,
  setOpenModal,
  setCurrentTitle,
  fireClick
}) => {
  const noteCardRef = useRef();
   // Dependency ensures the effect updates when callback changes
      const triggerNoteDelete = () => {
        setModalTitle("Delete Note")
        setModalContent("Are you sure you want to delete this note")
        setOpenModal(true)
    }
const showNoteSettings = (e) => {
  setCurrentTitle(noteCardRef.current.querySelector(".note-preview-card-title").innerText)
  fireClick(e, "")
}

  
  return (
    <>
    <div className="note-preview-card" ref={noteCardRef}>
    <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
        <div className="note-preview-card-image-section">
<TextIcon size={40}/>
        </div>

        <div style={{display : "flex", flexDirection  :"column", gap : "20px", alignItems : "center"}}>
                    <Dots size={50} onClick={(e) => {
                    showNoteSettings(e)
                    }}/>
          
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