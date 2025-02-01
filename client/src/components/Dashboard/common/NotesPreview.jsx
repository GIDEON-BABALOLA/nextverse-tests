import { FaPlus, FaEdit,  FaReadme } from "react-icons/fa" 
import { FaEllipsis } from "react-icons/fa6"
import { MdDelete, MdSend } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import "../../../styles/components/Dashboard/notes-preview-page.css"
import NoteEditor from "./NoteEditor"
import SpecialModal from "../../common/SpecialModal"
import NoteCard from "./NoteCard"
import SearchCircle from "./SearchCircle"
import { useState, useRef } from "react"
import { FaEllipsisV } from "react-icons/fa"
import Dots from "../../../styles/components/common/Icons/Dots"
import Rename from "../../../styles/components/common/Icons/Rename"
import Download from "../../../styles/components/common/Icons/Download"
import ShareIcon from "../../../styles/components/common/Icons/ShareIcon"
import Delete from "../../../styles/components/common/Icons/Delete"
import { useModalContext } from "../../../hooks/useModalContext"
import useWindowSize from "../../../hooks/useWindowSize"
import ContextMenu from "../../common/ContextMenu"
const NotesPreview = () => {
    const {
        contextMenu,
         shareModal,
     fireClick,
     setContextMenu,
     closeContextMenu
    } = useModalContext()
    const [openModal, setOpenModal] = useState(false)
    const [notes, setNotes] = useState([])
    const { width } = useWindowSize();
    const [noteContextMenu, setNoteContextMenu] = useState(false)
    const [currentTitle, setCurrentTitle] = useState("")

return <>
    <section className="litenote-dashboard-notes-preview" 
    onClick={(e) => { closeContextMenu(e)}}
    >

    <SearchCircle/>
    <SpecialModal openModal={openModal} setOpenModal={setOpenModal}
    width={width < 768 ? width : 700}
    height={500}
    content={<NoteEditor setControlModal={setOpenModal} />}
    />
    
    <div className="user-notes-search-wrapper">

<div className="field">
   <input type="text" placeholder="Search Sticky Notes"/>
   <label htmlFor="click" className="btn-2">Search</label>
</div>
</div>
<div className="wrapper">

<li className="add-box" onClick={() => {
  setOpenModal(true)
}}>
<div className="icon"><FaPlus /></div>
<p>Add new note</p>
</li>
{notes.map((content,index) => (
    <NoteCard key={index}
     title={content.title}
    time={content.time}
    date={content.date}
    id={content.id}
    noteContextMenu={noteContextMenu}
    setNoteContextMenu={setNoteContextMenu}
    author={content.author}
    setOpenModal={setOpenModal}
    setCurrentTitle={setCurrentTitle}
    fireClick={!openModal && fireClick}
    />
))}
</div>
    </section>
    <ContextMenu
  state={"feed"}
  stories={notes}
  contextMenu={contextMenu}
  title={currentTitle}
  shareModal={shareModal}
             setContextMenu={setContextMenu}
             contextMenuData={[
             {id : 1, icon : <Rename />
             , label : "Update", type : "default"},
             {id : 2, icon : <Download />
             , label : "Download", type : "default"},
             {id : 3, icon : <Delete />
              , label : "Delete", type : "default"}
]} />
</>
}
export default NotesPreview