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
import NoteTooltip from "../../Notes/NoteTooltip"
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
    const [noteEditorModal,setNoteEditorModal] = useState(false)
    const [notes, setNotes] = useState([
        {
        title : "Devops Engineering",
        time : "",
        date : "",
        author : ""
    },
    {
        title : "Devops Engineering",
        time : "",
        date : "",
        author : ""
    },
    {
        title : "Devops Engineering",
        time : "",
        date : "",
        author : ""
    },
    {
        title : "Devops Engineering",
        time : "",
        date : "",
        author : ""
    },
])
    const [noteContextMenu, setNoteContextMenu] = useState(false)
    const [currentTitle, setCurrentTitle] = useState("")
    const [attachmentLine, setAttachmentLine] = useState(0)
    const [colorType, setColorType] = useState("")
    const [noteSettings, setNoteSettings] = useState({
        lineHeight : 2.5,
        fontFamily : "Poppins",
        fontSize : 1.1,
        wordsPerPage : 12000,
        page : 1,
        textColor : "black",
        editable : true,
        highlightColor : "black"
      })
      const [tabSettings, setTabSettings] = useState({
        FontFamily :true,
        ColorOption : false,
        ColorOptionList : false,
        LineSizing : false,
        FontSize : false,
        FontFamilyOptions : false
      })
      const [settingsModal, setSettingsModal] = useState(false)
      const [savedSelection, setSavedSelection] = useState(null)
      
      const restoreSelection = () => {
        const selection = window.getSelection();
        selection.removeAllRanges();
        if (savedSelection) {
          selection.addRange(savedSelection);
        }
      };
      const formatHighlightedText = (command, value = null) => {
        if(command == "highlightcolor"){
          console.log("why")
          console.log(settingsModal)
          setColorType("Highlight Color")
          restoreSelection()
          return;
        }
        restoreSelection();
        document.execCommand(command, false, value);
        contextMenu.current.style.visibility = "hidden";
        if(command !== "backColor"){
          setSavedSelection(null)   
        }
     
        const selection = window.getSelection();
        selection.removeAllRanges();
      };
      const slideLine =(e) => {
        let tab;
               tab = e.target.id.split(" ").join("")
              if(tab == ""){
                tab = e.currentTarget.id.split(" ").join("")
              }
              const optionMapping = {}
              Object.entries(tabSettings).map(([key, value]) => {
                  optionMapping[key] = value
              })
              
      const selectedOption = optionMapping[tab];
    
              setTabSettings(prevState => ({
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
              const speakHighlightedText = () => {
                restoreSelection()
                     const utterance = new SpeechSynthesisUtterance(savedSelection.toString())
                     window.speechSynthesis.speak(utterance)
                 }
return <>
      <NoteTooltip
           noteSettings={noteSettings}
           setSettingsModal={setSettingsModal}
           settingsModal={settingsModal}
           savedSelection={savedSelection}
           formatHighlightedText={formatHighlightedText}
           slideLine={slideLine}
           noteEditorModal={noteEditorModal}
           speakHighlightedText={speakHighlightedText}
           
         />
    <section className="litenote-dashboard-notes-preview" 
    onClick={(e) => { closeContextMenu(e)}}
    >

    <SearchCircle/>
    <NoteEditor
    settingsModal={settingsModal}
    setSettingsModal={setSettingsModal}
    noteEditorModal={noteEditorModal}
    setNoteEditorModal={setNoteEditorModal}
    noteSettings={noteSettings}
    setNoteSettings={setNoteSettings}
    tabSettings={tabSettings}
    setTabSettings={setTabSettings}
    savedSelection={savedSelection}
    setSavedSelection={setSavedSelection}
    formatHighlightedText={formatHighlightedText}
    colorType={colorType}
    setColorType={setColorType}
    attachmentLine={attachmentLine}
    setAttachmentLine={setAttachmentLine}
    />
<div className="wrapper"
>
<li className="add-box" 
onClick={() => {
    setNoteEditorModal(true)
  }}
>
<div className="icon add-box"><FaPlus className="add-box"/></div>
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
    {
        !noteEditorModal &&
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
}
</>
}
export default NotesPreview