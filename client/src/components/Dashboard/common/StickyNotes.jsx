import "../../../styles/components/Dashboard/sticky-notes.css"
import StickyNotesCard from "./StickyNotesCard";
import SearchCircle from "./SearchCircle"
import { useState } from "react"
import SpecialModal from "../../common/SpecialModal"
import { useEffect, useRef } from "react";
import { createRef } from "react";
import StickyNotesControls from "./StickyNotesControls";
import useIndexedDB from "../../../hooks/useIndexedDB";
import useWindowSize from "../../../hooks/useWindowSize";
import  { addStickyNote, getStickyNote, getAllStickyNotes, updateStickyNote, deleteStickyNote} from "../../../helpers/handleStickyNotes"
import GeneralToast from "../GeneralToast";
const StickyNotes = ({ stickyNotesCount, setStickyNotesCount}) => {
  const db = useIndexedDB("stickyNotes")
  const { width } = useWindowSize();
  const [pageNumber, setPageNumber] = useState(1)
  const [limit, setLimit] = useState(6)
  const stickyNoteContainerRef = useRef()
  const stickyNotesRefs = useRef([])
  const [stickyNotes, setStickyNotes] = useState([])
  const [generalToast, setGeneralToast] = useState(false)
  const [storage, setStorage] = useState([])
  const [toastInformation, setToastInformation] = useState({
    buttonText : "",
    message : "",
    generalFunction : ""
  })
  useEffect(() => {
    if(width < 767){
     setLimit(4)
   }
   else{
     setLimit(6)     
   }
   }, [width])
  useEffect(() => {
    if(db){
     getAllStickyNotes(db, "stickyNotes", (savedNotes) => {
      if(savedNotes.length == 0){
        setStickyNotesCount(1)
          const welcomeNote = {
              id: 1,
              body:"📌Welcome To Sticky Notes",
              colors: JSON.stringify({
                   id: "color-purple",
                  colorHeader: "#FED0FD",
                  colorBody: "#FEE5FD",
                  colorText: "#18181A",
              }),
          }
          const position = determineNewPosition()
          const initialNote =  {...welcomeNote, position}
          addStickyNote(db, initialNote, "stickyNotes")
          setStickyNotes([initialNote])
          setStorage([initialNote])    
      } else{
        const stickyNotesToBeDisplayed = savedNotes.slice(0 + (pageNumber -1) * limit,
  limit + (pageNumber -1) * limit
  );

        setStickyNotesCount(savedNotes.length)
        setStickyNotes(stickyNotesToBeDisplayed)
        setStorage(savedNotes)
      }
    })
    }
  }, [setStickyNotesCount, db, pageNumber, limit])
const determineNewPosition = () => {
const maxX = window.innerWidth - 240;
const maxY = window.innerHeight - 240
return {
    x:Math.floor(Math.random() * maxX), //Generate a number between 0 and maxX
    y:Math.floor(Math.random() * maxY), //Generate a number between 0 and maxY

}
}
const handleDragStart = (note, e) => {
  const { id } = note;
const stickyNoteRef = stickyNotesRefs.current[id].current
const rect = stickyNoteRef.getBoundingClientRect()
const offsetX = e.clientX - rect.left;
const offsetY = e.clientY - rect.top;
const startPos = note.position
const handleTouchMove = (e) => {
  const newX = e.targetTouches[0].clientX
  const newY = e.targetTouches[0].clientY
  stickyNoteRef.style.left = `${newX}px`
  stickyNoteRef.style.top = `${newY}px`


}
const handleMouseMove = (e) => {
  const newX = e.clientX - offsetX
  const newY = e.clientY - offsetY
    stickyNoteRef.style.left = `${newX}px`
    stickyNoteRef.style.top = `${newY}px`
}
const handleMouseUp = () => {
  document.removeEventListener("mousemove", handleMouseMove)
  document.removeEventListener("mouseup", handleMouseUp)
  document.removeEventListener("touchmove", handleTouchMove)
document.removeEventListener("touchend", handleMouseUp)
  const finalRect = stickyNoteRef.getBoundingClientRect()
  const newPosition = {x: finalRect.left, y: finalRect.top};
  //check for overlapping
  if(checkForOverlap(id)){
   stickyNoteRef.style.left = `${startPos.x}px`
    stickyNoteRef.style.top = `${startPos.y}pxf`
  }
  else if(window.innerWidth - (finalRect.width + finalRect.left) > window.innerWidth - finalRect.width
|| window.innerWidth - finalRect.width < finalRect.left
|| window.innerHeight - (finalRect.height + finalRect.top) > window.innerHeight - finalRect.height
|| window.innerHeight - finalRect.height < finalRect.top
){
   stickyNoteRef.style.left = `${startPos.x}px`
    stickyNoteRef.style.top = `${startPos.y}px`
  }
  else{
updateNotePosition(id, newPosition)
  }
}
document.addEventListener("mousemove", handleMouseMove)
document.addEventListener("mouseup", handleMouseUp)
document.addEventListener("touchmove", handleTouchMove)
document.addEventListener("touchend", handleMouseUp)
} 
const checkForOverlap = (id) => {
  const currentNoteRef = stickyNotesRefs.current[id].current
  const currentRect = currentNoteRef.getBoundingClientRect()
  return [...stickyNotes].some((note) => {
    if(note.id == id) return false;
    const otherNoteRef =  stickyNotesRefs.current[note.id].current
    const otherRect = otherNoteRef?.getBoundingClientRect();
    const overlap = !(
      currentRect?.right < otherRect?.left ||
      currentRect?.left > otherRect?.right ||
      currentRect?.bottom < otherRect?.top ||
      currentRect?.top > otherRect?.bottom
    )
    return overlap
  })
} 
const createStickyNote = (color) => {
  const oldStickyNotes = [...storage]
  if(stickyNotes.length == limit){
    setGeneralToast(true)
    setToastInformation({
      buttonText : "Next Page",
      message : `You can only create ${limit} sticky notes per page`,
      generalFunction : () => {
     pageNumber == 10 ? nextPage() :   generalFunction();
      }
    })
    return;
  }
  const newID =  oldStickyNotes.length ? oldStickyNotes.slice("-1")[0].id + 1 : 1;
  const position = determineNewPosition()
  const newStickyNote = {
  id : newID,
  body:"📌Write Here",
  colors: JSON.stringify(color),
  position : position
  

  }
const newStickyNotes = [...stickyNotes, newStickyNote]
addStickyNote(db, newStickyNote, "stickyNotes")
setStickyNotes(newStickyNotes)
setStorage([...oldStickyNotes, newStickyNote])
setStickyNotesCount((prev) => {
  return prev + 1
})
  }
const updateNotePosition = (id, newPosition) =>{ 
const updatedNotes = [...stickyNotes].map((note) => note.id === id 
?
{...note, position : newPosition}
: note)
const updatedNote = [...stickyNotes].find((note) => note.id === id)
setStickyNotes(updatedNotes)
updateStickyNote(db, id, {...updatedNote, position : newPosition}, "stickyNotes")
}
const saveStickyNote = (id, body) => {
  const updatedNotes = [...stickyNotes].map((note) => note.id === id 
?
{...note, body : body}
: note)
const updatedNote = [...stickyNotes].find((note) => note.id === id)
setStickyNotes(updatedNotes)
updateStickyNote(db, id, {...updatedNote, body : body}, "stickyNotes")

}
const deleteMyStickyNote = (id) => {
  const updatedNotes = [...stickyNotes].filter((note) => note.id !== id)
  const updatedStorageNotes = [...storage].filter((note) => note.id !== id)
  setStickyNotesCount((prev) => {
    return prev - 1
  })
  setStickyNotes(updatedNotes)
  setStorage(updatedStorageNotes)
  deleteStickyNote(db, id, "stickyNotes")
}
const generalFunction = () => {
  if( pageNumber < 10){
    setPageNumber((prev) => {
      return prev + 1
    })
   }
}
const nextPage = () => {
  if(stickyNotes.length == limit && pageNumber == 10){
    setTimeout(() => {
      setGeneralToast(true)
      setToastInformation({
        buttonText : "Prev Page",
        message : "You Only Have Ten Pages For Sticky Notes",
        generalFunction : 
        () => {
      prevPage();
        }
      })      
    }, 100);

    return;
  }
  if(stickyNotes.length !== limit){
    setGeneralToast(true)
    setToastInformation({
      buttonText : "Ok",
      message : "You Have To Create Six Sticky Notes To Move To The Next Page",
      generalFunction : 
      () => {
      setGeneralToast(false)
      }
    })
    return;
  }
  if( pageNumber < 10){
   setPageNumber((prev) => {
     return prev + 1
   })
  }else{
    setGeneralToast(true)
    setToastInformation({
      buttonText : "Prev Page",
      message : "You Only Have Ten Pages For Sticky Notes",
      generalFunction : 
      () => {
    prevPage();
      }
    })
  }
   }
   const prevPage = () => {
     if(pageNumber == 1){
       return;
     }
     setPageNumber((prev) => {
      return prev - 1
    })
    }
    
  return (
    <>
    <GeneralToast generalToast={generalToast} setGeneralToast={setGeneralToast}
        buttonText={toastInformation.buttonText}
        generalFunction={toastInformation.generalFunction}
        message={toastInformation.message}
    />
    <section className="litenote-dashboard-sticky-notes-preview" 
     ref={stickyNoteContainerRef}
     style={{position : "relative"}}
    >
      {/* <SearchCircle clickMe={searchForStickyNotes}/>  */}
        <StickyNotesControls  createStickyNote={createStickyNote}
pageNumber={pageNumber}
stickyNotesCount={stickyNotesCount}
nextPage={nextPage}
prevPage={prevPage}
        />
        <div style={{marginTop : "50px"}} 
        
       
        
        >
           {

          stickyNotes.map((content, index) => (
          <StickyNotesCard 
          key={content.id}
          id={content.id}
          ref={
            stickyNotesRefs.current[content.id] ?
            stickyNotesRefs.current[content.id] :
            (stickyNotesRefs.current[content.id] = createRef())
            
            }
          content={content}
          saveStickyNote={saveStickyNote}
          deleteMyStickyNote={deleteMyStickyNote}
           initialPosition={content.position}
            onTouchStart={(e) => handleDragStart(content, e)}
            onMouseDown={(e) => handleDragStart(content, e)} />
            ))
        }            
        </div>

    </section>
    </>
  )
}

export default StickyNotes