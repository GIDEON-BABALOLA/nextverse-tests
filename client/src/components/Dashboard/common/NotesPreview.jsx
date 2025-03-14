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
import Update from "../../../styles/components/common/Icons/Update"
import NoteTooltip from "../../Notes/NoteTooltip"
import Details from "../../../styles/components/common/Icons/Details"
import ShareIcon from "../../../styles/components/common/Icons/ShareIcon"
import Delete from "../../../styles/components/common/Icons/Delete"
import { useDeleteANote } from "../../../hooks/useDeleteANote"
import { useRemoveANote } from "../../../hooks/useRemoveANote"
import { useModalContext } from "../../../hooks/useModalContext"
import { useGetMyNotes } from "../../../hooks/useGetMyNotes"
import { MdRemoveCircleOutline } from "react-icons/md"
import { useToastContext } from "../../../hooks/useToastContext"
import { useThemeContext } from "../../../hooks/useThemeContext"
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
    const { colorMode } = useThemeContext();
    const { showToast } = useToastContext()
    const { data, getMyNotes, noteCount }= useGetMyNotes();
    const deleteNote = useDeleteANote()
    const removeNote = useRemoveANote()
    const [openModal, setOpenModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [noteShareModal, setNoteShareModal] = useState(false)
    const [noteEditorModal,setNoteEditorModal] = useState(false)
    const [notes, setNotes] = useState([])
    const [noteContextMenu, setNoteContextMenu] = useState(false)
    const [noteContent, setNoteContent] = useState("Golang software enginner")
    const [deleteConsentText,  setDeleteConsentText] = useState({
      title : "",
      message : "",
      buttonText : ""
    })
    const [currentTitle, setCurrentTitle] = useState("")
    const initialNoteDetails = {
      title : "",
      time : "",
      date : "",
      sharedWith : 0,
      shared : false
    }
  const initialNoteSettings = {
    lineHeight : 2.5,
    fontFamily : "Poppins",
    fontSize : 1.1,
    wordsPerPage : 12000,
    page : 1,
    textColor : colorMode == "dark-mode"  ? "white" : "black",
    editable : true,
    highlightColor : "black"
  }
    const [currentNoteDetails, setCurrentNoteDetails] = useState(initialNoteDetails)
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
    const [noteSettings, setNoteSettings] = useState(initialNoteSettings)
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
        if(noteSettings["editable"]){
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
      }
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
             
                  contextMenu.current.style.visibility = "hidden";
          if(currentNoteDetails.shared){
            removeNote.removeANote(currentStoryId)
          }
          else{
            deleteNote.deleteANote(currentStoryId)
          }
               
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
                            setDeleteModal(true)
                            showToast("Error", deleteNote.error.message, false)
                          }
                              }, [deleteNote.data, deleteNote.error])
                              useEffect(() => {
                                if(Object.keys(removeNote.data).length > 0){
                                  const newNotesAfterRemoval = [...notes].filter((note) => note._id !== currentStoryId)
                                  setNotes(newNotesAfterRemoval)
                                  setNotesCount((prev) => {
                                    return prev - 1
                                  })
                                  setDeleteModal(false)
                                  showToast("Success", removeNote.data.message, true)
                                }
                                    if(removeNote.error){
                                      setDeleteModal(true)
                                      showToast("Error", removeNote.error.message, false)
                                    }
                                        }, [removeNote.data, removeNote.error])
        useEffect(() => {
getMyNotes()
        }, [])
        useEffect(() => {
          if(deleteModal){
            switch (currentNoteDetails.shared) {
              case true:
                setDeleteConsentText({
                  title : "Are you sure you want to Remove Note?",
                  message : "This action will remove this shared note from your dashboard. You will no longer have access to it, but the original owner and other recipients will still be able to view it.",
                  buttonText : "Remove Note"
                })
                break;
              case false : 
              setDeleteConsentText({
                title : "Are you sure you want to delete?",
                message : "This action will permanently delete your note. This cannot be undone, Also users you've shared this note to will not longer have access to the note",
                buttonText : "Delete Note"
              })
                break;
            
              default:
                break;
            }
          }
        }, [deleteModal, currentNoteDetails.shared])
        useEffect(() => {
if(noteShareModal){
  contextMenu.current.style.visibility = "hidden";
}
        }, [noteShareModal, noteEditorModal])
        useEffect(() => {
if(noteEditorModal && currentNoteDetails.shared){

  setNoteSettings((prev) => {
    return {...prev, editable  : false}
  })
}
else{
 setNoteSettings({...initialNoteSettings, editable : true})
}
        }, [noteEditorModal, currentNoteDetails.shared])
return <>
<Toast />
<SpecialModal height={400} width={400} 
borderRadius={"30px"}
content={<NoteShare 
currentNoteDetails={currentNoteDetails}
setNoteShareModal={setNoteShareModal}
noteShareModal={noteShareModal}
notes={notes}
setNotes={setNotes}
/>} 
openModal={noteShareModal}
setOpenModal={setNoteShareModal}
/>
<DeleteConsent openModal={deleteModal} setOpenModal={setDeleteModal}
                title={deleteConsentText.title}
                message={deleteConsentText.message}
                buttonText ={deleteConsentText.buttonText}
                deleteFunction={deleteANote}
                error={deleteNote.error}
                isLoading={currentNoteDetails.shared ? removeNote.isLoading : deleteNote.isLoading}
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
    notes={notes}
    setNotes={setNotes}
    settingsModal={settingsModal}
    currentNoteDetails={currentNoteDetails}
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
    noteContent={noteContent}
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
 setCurrentNoteDetails(initialNoteDetails)
    setNoteEditorModal(true)
  }}
>
<div className="icon add-box"><FaPlus className="add-box"/></div>
<p>Add new note</p>
</li>
{notes.map((content,index) => (
    <NoteCard key={index}
    title={content.title}
    sharedWith={content.sharedWith}
    time={content.updatedAt.toLocaleString()}
    date={new Date(content.updatedAt).toISOString().split("T")[0]}
    id={content._id}
    userId={content.userId}
    noteContextMenu={noteContextMenu}
    setNoteContextMenu={setNoteContextMenu}
    author={content.author}
    setOpenModal={setOpenModal}
    openModal={openModal}
    setCurrentTitle={setCurrentTitle}
    setCurrentNoteDetails={setCurrentNoteDetails}
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
  setCustomUpdateModal={setNoteEditorModal}
             setContextMenu={setContextMenu}
             contextMenuData= {currentNoteDetails.shared ? [
              {id : 1, icon : <Details />
                , label : "View", type : "default"},
                {id : 2, icon : <ShareIcon />
                , label : "Share", type : "default"},
                {id : 3,
                 icon : <Delete 
                 className="special-modal-client"
                 onClick={() => setDeleteModal(true)}/>
                 ,label : currentNoteDetails.shared ? "Remove" : "Delete", type : "default"
               }

             ] :  [
             {id : 1, icon : <Update />
             , label : "Update", type : "default"},
             {id : 2, icon : <ShareIcon />
             , label : "Share", type : "default"},
             {id : 3,
              icon : <Delete 
              className="special-modal-client"
              onClick={() => setDeleteModal(true)}/>
              ,label : currentNoteDetails.shared ? "Remove" : "Delete", type : "default"
            }
]
} />
}
</>
}
export default NotesPreview