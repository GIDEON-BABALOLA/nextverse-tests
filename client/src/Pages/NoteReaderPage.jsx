import NoteHeader from "../components/Notes/NoteHeader"
import NotePage from "../components/Notes/NotePage"
import NoteFooter from "../components/Notes/NoteFooter"
import NoteTooltip from "../components/Notes/NoteTooltip"
import NoteModal from "../components/Notes/NoteModal"
import NoteSettings from "../components/Notes/NoteSettings"
import Toast from "../components/common/Toast"
import "../styles/components/Note/note.css"
import { useModalContext } from "../hooks/useModalContext"
import { useToastContext } from "../hooks/useToastContext"
import { useState, useRef } from "react"
const NoteReaderPage = () => {
  const { fireClick } = useModalContext()
  const [openModal, setOpenModal] = useState(false)
  const [savedSelection, setSavedSelection] = useState(null)
  const { showToast } = useToastContext()
  const { contextMenu } = useModalContext()
  const noteModal = useRef()
  const closeNoteModal  = (e) => {
    console.log(openModal)
    console.log(e.target)
    if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"){
      return;
    }
          if( e.clientX < parseInt(noteModal.current.getBoundingClientRect().left) || e.clientX > parseInt(noteModal.current.getBoundingClientRect().left) + noteModal.current.getBoundingClientRect().width)
            {
              setOpenModal(false)
            }else if(
              e.clientY < parseInt(noteModal.current.getBoundingClientRect().top) || e.clientY > parseInt(noteModal.current.getBoundingClientRect().top) + noteModal.current.getBoundingClientRect().height
            ){
              setOpenModal(false)
            }
        
    
    }
  const [noteSettings, setNoteSettings] = useState({
    lineHeight : 2.5,
    fontFamily : "Poppins",
    fontSize : 1.1,
    wordsPerPage : 12000,
    page : 1,
    textColor : "black",
    editable : false,
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
  const [attachmentLine, setAttachmentLine] = useState(0)
  const [colorType, setColorType] = useState("")
  const noteContent  = useRef()
  const saveSelection = (e) => {
    if(noteSettings["editable"] == false){
      return;
    }
    const selection = window.getSelection();
    if(selection.toString()){
      fireClick(e)
    }
    if (selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0))
    }
  };
  const restoreSelection = () => {
    const selection = window.getSelection();
    selection.removeAllRanges();
    if (savedSelection) {
      selection.addRange(savedSelection);
    }
  };
  const speakHighlightedText = () => {
 restoreSelection()
      const utterance = new SpeechSynthesisUtterance(savedSelection.toString())
      window.speechSynthesis.speak(utterance)
  }
  const formatHighlightedText = (command, value = null) => {
    if(noteSettings["editable"] == false){ 
      showToast("Error", "Pls Switch To Editor Mode To Edit Content", false)
      return;
    }
    if(command == "highlightcolor"){
      setColorType("Highlight Color")
      restoreSelection()
      setOpenModal(!openModal)
      return;
    }
    restoreSelection();
    document.execCommand(command, false, value);
    console.log("I am also here")
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
          const submitNote = () => {
console.log(noteContent.current)
          }
  return (
    <section className="note-page-css-container-total" onClick={closeNoteModal}>
    <Toast />
    <NoteTooltip
      noteSettings={noteSettings}
      openModal={openModal}
      setOpenModal={setOpenModal}
      savedSelection={savedSelection}
      formatHighlightedText={formatHighlightedText}
      slideLine={slideLine}
      speakHighlightedText={speakHighlightedText}
    />
        <NoteHeader setOpenModal={setOpenModal} openModal={openModal}
         noteSettings={noteSettings}
         setNoteSettings={setNoteSettings}
submitNote={submitNote}

         />
        <NoteModal openModal={openModal} setOpenModal={setOpenModal}
        width={450}
        height={300}
        ref={noteModal}
          content={<NoteSettings
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
          openModal={openModal}
          
           />
          }
        />
        <NoteFooter noteSettings={noteSettings} setNoteSettings={setNoteSettings}/>
        <NotePage 
        saveSelection={saveSelection}
        savedSelection={savedSelection}
        setSavedSelection={setSavedSelection}
        noteSettings={noteSettings}
        noteContent={noteContent}
        />
    
    </section>
  )
}

export default NoteReaderPage