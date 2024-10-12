import NoteHeader from "../components/Notes/NoteHeader"
import NotePage from "../components/Notes/NotePage"
import NoteFooter from "../components/Notes/NoteFooter"
import NoteTooltip from "../components/Notes/NoteTooltip"
import SpecialModal from "../components/common/SpecialModal"
import NoteSettings from "../components/Notes/NoteSettings"
import Toast from "../components/common/Toast"
import "../styles/components/Note/note.css"
import { useModalContext } from "../hooks/useModalContext"
import { useState } from "react"
const NoteReaderPage = () => {
  const { fireClick } = useModalContext()
  const [openModal, setOpenModal] = useState(false)
  const [savedSelection, setSavedSelection] = useState(null)
  const [noteSettings, setNoteSettings] = useState({
    lineHeight : 2.5,
    fontFamily : "Poppins",
    fontSize : 1.1,
    wordsPerPage : 12000,
    page : 1,
    color : "black",
    editable : false,
  })
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
  return (
    <section className="note-page-css-container-total">
    <Toast />
    <NoteTooltip savedSelection={savedSelection}
      setSavedSelection={setSavedSelection}
      noteSettings={noteSettings}
      openModal={openModal}
      setOpenModal={setOpenModal}
    />
        <NoteHeader setOpenModal={setOpenModal} openModal={openModal}
         noteSettings={noteSettings}
         setNoteSettings={setNoteSettings}/>
        <SpecialModal openModal={openModal} setOpenModal={setOpenModal}
        width={450}
        height={300}
          content={<NoteSettings
          setNoteSettings={setNoteSettings}
           noteSettings={noteSettings} />
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