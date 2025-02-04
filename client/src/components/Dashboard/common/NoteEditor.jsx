import NoteSettings from "../../Notes/NoteSettings"
import { useModalContext } from "../../../hooks/useModalContext"
import useWindowSize from "../../../hooks/useWindowSize"
import { useThemeContext } from "../../../hooks/useThemeContext"
import sanitizeHtml from "sanitize-html";
import { MdSettings, MdClose } from "react-icons/md"
import { useRef } from "react"
import { useState, useEffect } from "react"
import { useCreateANote } from "../../../hooks/useCreateANote";
import { useToastContext } from "../../../hooks/useToastContext";
import LoadingSpinner from "../../Loaders/LoadingSpinner";
const NoteEditor = ({
  noteEditorModal,
  setNoteEditorModal,
  noteSettings,
  setNoteSettings,
  tabSettings,
  setTabSettings,
  savedSelection,
  setSavedSelection,
  formatHighlightedText,
  slideLine,
  attachmentLine,
  setAttachmentLine,
  colorType,
  setColorType,
  settingsModal,
  setSettingsModal
  
}) => {
  const [noteContent, setNoteContent] = useState("")
  const  { showToast } = useToastContext();
  const { createANote, isLoading, data , error}  = useCreateANote()
  const [noteTitle, setNoteTitle] = useState("")
  const closeNoteEditorModal  = (e) => {
    console.log( Object.values(e.target.classList))
    if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"

      || Object.values(e.target.classList).includes("special-modal-client")
      || Object.values(e.target.classList).includes("add-box")
    ){
      Object.values(e.target.classList).includes("special-modal-client")
      return;
    }
          if( e.clientX < parseInt(myNoteEditorModal.current.getBoundingClientRect().left) || e.clientX > parseInt(myNoteEditorModal.current.getBoundingClientRect().left) + myNoteEditorModal.current.getBoundingClientRect().width)
            {
              setNoteEditorModal(false)
            }else if(
              e.clientY < parseInt(myNoteEditorModal.current.getBoundingClientRect().top) || e.clientY > parseInt(myNoteEditorModal.current.getBoundingClientRect().top) + myNoteEditorModal.current.getBoundingClientRect().height
            ){
              setNoteEditorModal(false)
            }
        
    
    }
useEffect(() => {
  document.addEventListener("click", (e) => {
    if(myNoteEditorModal.current){
      closeNoteEditorModal(e)
    }
``
  })
  return () =>{
    document.removeEventListener('click', (e) => {
      if(myNoteEditorModal.current){
        closeNoteEditorModal(e)
      }
    }
  )
  }
  }, [])
  const {  fireClick } =useModalContext();
  const myNoteEditorModal = useRef();
  const { width } = useWindowSize();
  const { colorMode} = useThemeContext()
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
    const noteRef  = useRef()
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
  
                const submitNote = () => {
const cleanHtml = sanitizeHtml(noteContent, {
                    allowedTags: ["b", "i", "em", "strong", "p", "ul", "li", "a"], // Allow only safe tags
                    allowedAttributes: { "a": ["href"] }, // Allow only safe attributes
  });
  if(noteTitle.length == 0 || !cleanHtml ){
    showToast("Error", "Please Enter The Content Of Your Note", false)
    return;
  }
createANote(noteTitle, cleanHtml)
                }
  const handleInput = () => {
    console.log(noteRef.current.innerHTML)
    if (noteRef.current) {
      setNoteContent(noteRef.current.innerHTML); // Use innerHTML if you want rich text
      setNoteTitle(noteRef.current.innerText.split("\n")[0] || "New Note")
    }
  }
                const handlePlaceholder = () => {
                  const editor = noteRef.current;
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
                
                useEffect(() => {
                  if(error){
              showToast("Error", error.message, false)
              setNoteEditorModal(true)
                  }
                }, [error, showToast])
                useEffect(() => {
                  if(data.length !== 0){
                    showToast("Success", "Created A New Note Successfully", true)
                    setNoteEditorModal(false)
                  }
                }, [data, showToast])
  return (
   <>
       <section className="litenote-special-modal" >
            <div 
            ref={myNoteEditorModal}
            className={`popup center ${noteEditorModal == true ? "active" : ""}`} style={{height : `${500}px`, width : `${width < 768 ? width : 700}px`}}>
     <div className="icon">
    
     </div>
     <div className="description">




     <section>
      <div>
            <div style={{display : "flex", flexDirection : "row", justifyContent : "flex-end", alignItems : "center", gap : "10px"}}>
                <button onClick={() => { submitNote()}} className="note-editor-save-button">
                  {
                    isLoading ? 
                    <LoadingSpinner />
                    :
                    "Save"
                  }

 
                </button>
                <MdSettings 
                style={{cursor : "pointer"}}
                size={20} onClick={() => {
                  setSettingsModal(!settingsModal)
                }}/>
                 <MdClose
                style={{cursor : "pointer"}}
                size={20} onClick={() => {
                setNoteEditorModal(false)
                }}/>
    
            </div>
      </div>
      <div>

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
        onInput={handleInput}
        className="note-editor empty"
        data-placeholder="Write your notes here..."
        suppressContentEditableWarning={true}
        contentEditable={noteSettings["editable"]}
        ref={noteRef}
        >
        </div>
        
      </div>
           </section>
     </div>
    </div>
    </section>
   </>
  )
}

export default NoteEditor