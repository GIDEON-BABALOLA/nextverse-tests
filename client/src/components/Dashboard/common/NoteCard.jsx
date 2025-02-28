import Dots from "../../../styles/components/common/Icons/Dots"
import TextIcon from "../../../styles/components/common/Icons/TextIcon"
import { getMonthName } from "../../../helpers/getMonthName";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { limitWord } from "../../../helpers/limitWords"
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
  fireClick,
  size
}) => {
  const noteCardRef = useRef();
   // Dependency ensures the effect updates when callback changes
      const triggerNoteDelete = () => {
        setModalTitle("Delete Note")
        setModalContent("Are you sure you want to delete this note")
        setOpenModal(true)
    }
const showNoteSettings = (e) => {
console.log(id)
console.log(new Date(time).toLocaleString().split(",")[1].split(':').slice(0, 2).join(':'))
console.log(new Date(time).toLocaleString().split(",")[1].trim().split(':').slice(0, 2).join(':') + " " + new Date(time).toLocaleString().split(" ")[2].toLocaleLowerCase())

  const shortTitle =  limitWord(title, 10)
  setCurrentTitle(shortTitle)
  fireClick(e, "", id)
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
          
<span style={{fontSize: "1.3rem"}}>{size}</span>
        </div>
    </div>
    <div style={{display : "flex", flexDirection : "column",justifyContent : "space-between", gap : "5px"}}>
        <span className="note-preview-card-title">{limitWord(title, 6)}</span>
        <span className="note-preview-card-second-title">
          {new Date(time).toLocaleString().split(",")[1].trim().split(':').slice(0, 2).join(':')  + new Date(time).toLocaleString().split(" ")[2].toLocaleLowerCase()}
          ,{" "}
       { parseInt(date.split("-")[1])} { getMonthName(parseInt(date.split("-")[1]))[0].toUpperCase() + getMonthName(parseInt(date.split("-")[1])).slice(1)}</span>
        <span className="note-preview-card-third-title" >By: {author}</span>
    </div>
</div>
</>

  )
}

export default NoteCard