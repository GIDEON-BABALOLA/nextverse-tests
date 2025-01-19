import Dots from "../../../styles/components/common/Icons/Dots"
import TextIcon from "../../../styles/components/common/Icons/TextIcon"
import { NoteCardMenu } from "./NoteCardMenu"
import { useEffect, useCallback } from "react"

import { useState } from "react"
const NoteCard = ({ id, title, time, date, author, setModalTitle, setModalContent, setOpenModal, noteContextMenu, setNoteContextMenu}) => {
   // Dependency ensures the effect updates when callback changes
      const triggerNoteDelete = () => {
        setModalTitle("Delete Note")
        setModalContent("Are you sure you want to delete this note")
        setOpenModal(true)
    }
  const showNoteSettings = () => {
    console.log(id)
    console.log("chai")
    if(!noteContextMenu){
setNoteContextMenu(!noteContextMenu)
    }
  }
  
  return (
    <>
    <div className="note-preview-card">
    <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
        <div className="note-preview-card-image-section">
<TextIcon size={40}/>
        </div>

        <div style={{display : "flex", flexDirection  :"column", gap : "20px", alignItems : "center"}}>
                    <Dots size={50} onClick={() => showNoteSettings()}/>
      <NoteCardMenu title={title} settings={noteContextMenu} triggerNoteDelete={triggerNoteDelete}
      setSettings={setNoteContextMenu}
      />
          
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