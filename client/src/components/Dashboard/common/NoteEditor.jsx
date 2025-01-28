import NoteModal from "../../Notes/NoteModal"
import NoteSettings from "../../Notes/NoteSettings"
import { useModalContext } from "../../../hooks/useModalContext"
import { useRef } from "react"
import { useState } from "react"
const NoteEditor = () => {
  const { contextMenu, fireClick } =useModalContext();
    const [openModal, setOpenModal] = useState(false)
    const [attachmentLine, setAttachmentLine] = useState(0)
    const [savedSelection, setSavedSelection] = useState(null)
    const noteContent  = useRef()
      let content = "Gideon Babalola Is A Very Good Software Engineer, Gideon Babalola Is A Very Good Software Engineer, Gideon Babalola Is A Very Good Software Engineer, Gideon Babalola Is A Very Good Software Engineer, Gideon Babalola Is A Very Good Software Engineer"
    const [colorType, setColorType] = useState("")
    const [tabSettings, setTabSettings] = useState({
      FontFamily :true,
      ColorOption : false,
      ColorOptionList : false,
      LineSizing : false,
      FontSize : false,
      FontFamilyOptions : false
    })
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
      const noteModal = useRef()
      const closeNoteModal  = (e) => {
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
        const restoreSelection = () => {
          const selection = window.getSelection();
          selection.removeAllRanges();
          if (savedSelection) {
            selection.addRange(savedSelection);
          }
        };
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
        const formatHighlightedText = (command, value = null) => {
          if(command == "highlightcolor"){
            setColorType("Highlight Color")
            restoreSelection()
            setOpenModal(!openModal)
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
  return (
   <>
   <section onClick={closeNoteModal}>
   <div style={{border : "none", outline : "none",
         fontFamily : noteSettings["fontFamily"],
         fontSize : noteSettings["fontSize"] + "rem",
         color : noteSettings["textColor"], 
            userSelect: noteSettings["editable"] ? "text" : "none",
        }}
        onMouseUp={saveSelection}
        spellCheck="false"
        suppressContentEditableWarning={true}
        contentEditable={noteSettings["editable"]}
        ref={noteContent}
        >
         {/* {content}  */}
        </div>
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
           </section>
   </>
  )
}

export default NoteEditor