import NoteHeader from "../components/Notes/NoteHeader"
import NotePage from "../components/Notes/NotePage"
import NoteFooter from "../components/Notes/NoteFooter"
import NoteTooltip from "../components/Notes/NoteTooltip"
import SpecialModal from "../components/common/SpecialModal"
import NoteSettings from "../components/Notes/NoteSettings"
import Toast from "../components/common/Toast"
import "../styles/components/Note/note.css"
import { useModalContext } from "../hooks/useModalContext"
import { useToastContext } from "../hooks/useToastContext"
import { useState } from "react"
const NoteReaderPage = () => {
  const { fireClick } = useModalContext()
  const [openModal, setOpenModal] = useState(false)
  const [savedSelection, setSavedSelection] = useState(null)
  const { showToast } = useToastContext()
  const { contextMenu } = useModalContext()
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
  const formatHighlightedText = (command, value = null) => {
    if(command == "highlightcolor"){
      setColorType("Highlight Color")
      contextMenu.current.style.visibility = "hidden";  
      restoreSelection()
      setOpenModal(!openModal)
      console.log("happy")
      return;
    }
    console.log("shakabula")
    console.log(command)
    restoreSelection(); // Restore selection before formatting
    console.log(command)
    if(noteSettings["editable"] == false){
      showToast("Error", "Pls Switch To Editor Mode To Edit Content", false)
      return;
    }
    document.execCommand(command, false, value);
    console.log(command)
      contextMenu.current.style.visibility = "hidden";
    // setSavedSelection(null)
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
  console.log(selectedOption)
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
  return (
    <section className="note-page-css-container-total">
    <Toast />
    <NoteTooltip savedSelection={savedSelection}
      setSavedSelection={setSavedSelection}
      noteSettings={noteSettings}
      openModal={openModal}
      setOpenModal={setOpenModal}
      formatHighlightedText={formatHighlightedText}
      slideLine={slideLine}
    />
        <NoteHeader setOpenModal={setOpenModal} openModal={openModal}
         noteSettings={noteSettings}
         setNoteSettings={setNoteSettings}/>
        <SpecialModal openModal={openModal} setOpenModal={setOpenModal}
        width={450}
        height={300}
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
          
           />
          }
        />
        <NoteFooter noteSettings={noteSettings} setNoteSettings={setNoteSettings}/>
        <NotePage 
        saveSelection={saveSelection}
        savedSelection={savedSelection}
        setSavedSelection={setSavedSelection}
        noteSettings={noteSettings}
        />
    
    </section>
  )
}

export default NoteReaderPage