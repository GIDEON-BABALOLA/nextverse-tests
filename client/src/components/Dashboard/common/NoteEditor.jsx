import NoteModal from "../../Notes/NoteModal"
import NoteSettings from "../../Notes/NoteSettings"
import { useModalContext } from "../../../hooks/useModalContext"
import NoteTooltip from "../../Notes/NoteTooltip"
import useWindowSize from "../../../hooks/useWindowSize"
import { useThemeContext } from "../../../hooks/useThemeContext"
import { MdSettings, MdClose } from "react-icons/md"
import { useRef } from "react"
import { useState, useEffect } from "react"
const NoteEditor = ({ setControlModal}) => {
  const { contextMenu, fireClick } =useModalContext();
  const { width } = useWindowSize();
  const { colorMode} = useThemeContext()
    const [openModal, setOpenModal] = useState(false)
    const [attachmentLine, setAttachmentLine] = useState(0)
    const [savedSelection, setSavedSelection] = useState(null)
    useEffect(() => {
      console.log(colorMode)
if(colorMode == "dark-mode"){
  setNoteSettings((prev) => {
    return {...prev, textColor : "white"}
  })
}
else{
  setNoteSettings((prev) => {
    return {...prev, textColor : "black"}
  })
}
    }, [colorMode])
    const noteContent  = useRef()
      let content = "The Art and Science of Dredging: Unlocking the Depths of WaterwaysIntroductionDredging is an essential activity in the world of water management, navigation, and environmental conservation. At its core, dredging is the process of removing sediments and debris from the bottom of bodies of water such as rivers, lakes, harbors, and seafloors. This technique, though often invisible to the public eye, plays a crucial role in maintaining the health and functionality of our aquatic systems and facilitating the safe and efficient movement of ships and goods. The practice of dredging has evolved over centuries, and today it encompasses a wide array of techniques, technologies, and applications.In this article, we will explore the multifaceted world of dredging, delving into its history, processes, technologies, environmental impacts, and future developmentsThe Art and Science of Dredging: Unlocking the Depths of WaterwaysIntroductionDredging is an essential activity in the world of water management, navigation, and environmental conservation. At its core, dredging is the process of removing sediments and debris from the bottom of bodies of water such as rivers, lakes, harbors, and seafloors. This technique, though often invisible to the public eye, plays a crucial role in maintaining the health and functionality of our aquatic systems and facilitating the safe and efficient movement of ships and goods. The practice of dredging has evolved over centuries, and today it encompasses a wide array of techniques, technologies, and applications.In this article, we will explore the multifaceted world of dredging, delving into its history, processes, technologies, environmental impacts, and future developments."
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
      editable : true,
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
        const speakHighlightedText = () => {
          restoreSelection()
               const utterance = new SpeechSynthesisUtterance(savedSelection.toString())
               window.speechSynthesis.speak(utterance)
           }
        const saveSelection = (e) => {
          if(noteSettings["editable"] == false){
            return;
          }
          const selection = window.getSelection();
          if(selection.toString()){
            fireClick(e, "", "")
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
                const submitNote = () => {

                }
                const handlePlaceholder = () => {
                  const editor = noteContent.current;
                  if (editor.innerText.trim().length === 0) {
                    console.log("Editor is empty");
                    editor.setAttribute("data-placeholder", "Write your notes here...");
                    editor.classList.add("empty"); // Add "empty" class
                  } else {
                    console.log("Editor has content");
                    editor.removeAttribute("data-placeholder");
                    editor.classList.remove("empty"); // Remove "empty" class
                  }
                };
                
                
  return (
   <>
   <section onClick={closeNoteModal}>
      <div>
            <div style={{display : "flex", flexDirection : "row", justifyContent : "flex-end", alignItems : "center", gap : "10px"}}>
                <button onClick={() => { submitNote()}} className="note-editor-save-button">
                    Save
                </button>
                <MdSettings 
                style={{cursor : "pointer"}}
                size={20} onClick={() => {
                  setOpenModal(!openModal)
                }}/>
                 <MdClose
                style={{cursor : "pointer"}}
                size={20} onClick={() => {
                  setControlModal(false)
                }}/>
    
            </div>
      </div>
      <div>
      <NoteTooltip
           noteSettings={noteSettings}
           openModal={openModal}
           setOpenModal={setOpenModal}
           savedSelection={savedSelection}
           formatHighlightedText={formatHighlightedText}
           slideLine={slideLine}
           speakHighlightedText={speakHighlightedText}
         />
      <NoteModal openModal={openModal} setOpenModal={setOpenModal}
        width={width< 768 ? width  :450}
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
      <div style={{border : "none", outline : "none",
         fontFamily : noteSettings["fontFamily"],
         fontSize : noteSettings["fontSize"] + "rem",
         color : noteSettings["textColor"], 
          lineHeight : noteSettings["lineHeight"] + "rem",
         textAlign : "justify",
        //  cursor : "pointer",
            userSelect: noteSettings["editable"] ? "text" : "none",
        }}
        onMouseUp={saveSelection}
        onKeyUp={handlePlaceholder}
        spellCheck="false"
        className="note-editor empty"
        data-placeholder="Write your notes here..."
        suppressContentEditableWarning={true}
        contentEditable={noteSettings["editable"]}
        ref={noteContent}
        >
         {/* {content}  */}
        </div>
        
      </div>
           </section>
   </>
  )
}

export default NoteEditor