import { FaPlus, FaEdit,  FaReadme } from "react-icons/fa" 
import { FaEllipsis } from "react-icons/fa6"
import { MdDelete, MdSend } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import "../../../styles/components/Dashboard/notes-preview-page.css"
import NoteEditor from "./NoteEditor"
import SpecialModal from "../../common/SpecialModal"
import NoteShare from "./NoteShare"
import NoteCard from "./NoteCard"
import SearchCircle from "./SearchCircle"
import { useState, useRef, useEffect } from "react"
import { FaEllipsisV } from "react-icons/fa"
import Dots from "../../../styles/components/common/Icons/Dots"
import NoteSettings from "../../Notes/NoteSettings"
import Rename from "../../../styles/components/common/Icons/Rename"
import NoteTooltip from "../../Notes/NoteTooltip"
import Download from "../../../styles/components/common/Icons/Download"
import ShareIcon from "../../../styles/components/common/Icons/ShareIcon"
import Delete from "../../../styles/components/common/Icons/Delete"
import { useDeleteANote } from "../../../hooks/useDeleteANote"
import { useModalContext } from "../../../hooks/useModalContext"
import { useGetMyNotes } from "../../../hooks/useGetMyNotes"
import { useToastContext } from "../../../hooks/useToastContext"
import ContextMenu from "../../common/ContextMenu"
import Toast from "../../../components/common/Toast"
import DeleteConsent from "../../common/DeleteConsent"
const NotesPreview = ({ setCounts, setNotesCount }) => {
    const {
        contextMenu,
         shareModal,
     fireClick,
     setContextMenu,
     currentStoryId,
     closeContextMenu
    } = useModalContext()
    const { showToast } = useToastContext()
    const { data, getMyNotes, noteCount }= useGetMyNotes();
    const deleteNote = useDeleteANote()
    const [openModal, setOpenModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [noteShareModal, setNoteShareModal] = useState(false)
    const [noteEditorModal,setNoteEditorModal] = useState(false)
    const [notes, setNotes] = useState([])
    const [noteContextMenu, setNoteContextMenu] = useState(false)
    const [currentTitle, setCurrentTitle] = useState("")
    const [currentNoteDetails, setCurrentNoteDetails] = useState({
      title : "",
      time : "",
      date : ""
    })
    const [attachmentLine, setAttachmentLine] = useState(0)
    const [colorType, setColorType] = useState("")
    useEffect(() => {     
setNotesCount(noteCount)
        }, [noteCount])
    useEffect(() => {
      console.log(data)
      const newData = [...data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
setNotes(newData)
    }, [data])
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
          setColorType("Highlight Color")
          restoreSelection()
          contextMenu.current.style.visibility = "hidden";
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
      useEffect(() => {
   console.log(currentStoryId)
      }, [currentStoryId])
      
      const slideLine =(e) => {
        console.log(e)
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
                 const deleteANote = () => {
               console.log(contextMenu.current)
                  contextMenu.current.style.visibility = "hidden";
                  console.log(currentStoryId)
                  deleteNote.deleteANote(currentStoryId)
                        }
                        useEffect(() => {
                      if(Object.keys(deleteNote.data).length > 0){
                        const newNotesAfterDeletion = [...notes].filter((note) => note._id !== currentStoryId)
                        setNotes(newNotesAfterDeletion)
                        setNotesCount((prev) => {
                          return prev - 1
                        })
                        setDeleteModal(false)
                        showToast("Success", deleteNote.data.message, true)
                      }
                          if(deleteNote.error){
                            setDeleteModal(false)
                            showToast("Error", deleteNote.error.message, false)
                          }
                              }, [deleteNote.data, deleteNote.error])
        useEffect(() => {
getMyNotes()
        }, [])
        useEffect(() => {
console.log(deleteModal)
        }, [deleteModal])
return <>
<Toast />
<SpecialModal height={400} width={400} content={<NoteShare 
currentNoteDetails={currentNoteDetails}
/>} openModal={noteShareModal}
setOpenModal={setNoteShareModal}
/>
<DeleteConsent openModal={deleteModal} setOpenModal={setDeleteModal}
                title={"Are you sure you want to delete?"}
                message={"This action will permanently delete your note. This cannot be undone"}
                buttonText ={"Delete Note"}
                deleteFunction={deleteANote}
                error={deleteNote.error}
                isLoading={deleteNote.isLoading}
                />
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
    setNotes={setNotes}
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
    setNotesCount={setNotesCount}
    />
     <NoteSettings
           tabSettings={tabSettings}
           setTabSettings={setTabSettings}
           setNoteSettings={setNoteSettings}
           noteSettings={noteSettings}
           savedSelection={savedSelection}
           formatHighlightedText={formatHighlightedText}
           attachmentLine={attachmentLine}
           setAttachmentLine={setAttachmentLine}
           slideLine={slideLine}
           colorType={colorType}
           setColorType={setColorType}
           settingsModal={settingsModal}
           setSettingsModal={setSettingsModal}
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
    time={content.updatedAt.toLocaleString()}
    date={new Date(content.updatedAt).toISOString().split("T")[0]}
    id={content._id}
    noteContextMenu={noteContextMenu}
    setNoteContextMenu={setNoteContextMenu}
    author={content.author}
    setOpenModal={setOpenModal}
    setCurrentTitle={setCurrentTitle}
    setCurrentNoteDetails={setCurrentNoteDetails}
    fireClick={!openModal && fireClick}
    size={content.size}
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
  setDeleteModal={setDeleteModal}
  setCustomShareModal={setNoteShareModal}
             setContextMenu={setContextMenu}
             contextMenuData={[
             {id : 1, icon : <Rename />
             , label : "Update", type : "default"},
             {id : 2, icon : <ShareIcon />
             , label : "Share", type : "default"},
             {id : 3, icon : <Delete 
              className="special-modal-client"
              onClick={() => setDeleteModal(true)}/>
              , label : "Delete", type : "default"}
]} />
}
</>
}
export default NotesPreview