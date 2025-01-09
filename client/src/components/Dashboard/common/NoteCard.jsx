import Dots from "../../../styles/components/common/Icons/Dots"
import { FaEdit } from "react-icons/fa"
import { MdSend } from "react-icons/md"
import { FaReadme } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { FaEllipsisV } from "react-icons/fa"
const NoteCard = ({ title, time, date, author}) => {
  const triggerNoteDelete = () => {

  }
  return (
    <>
    <div className="note-preview-card">
    <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
        <div className="note-preview-card-image-section">
        <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1736424240/Assets/images/thumbnail_gjn1x4.svg"></img>
        </div>

        <div style={{display : "flex", flexDirection  :"column", gap : "25px"}} className="settings">
        <ul className = "menu">
    <li style={{whiteSpace : "nowrap"}}><FaReadme size={20} /> Read More</li>
    <li><FaEdit size={20} />Edit</li>
    <li><MdSend size={20} />Transfer</li>
    <li onClick={triggerNoteDelete}><MdDelete size={20}/>Delete</li>
    </ul>
          <Dots />
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