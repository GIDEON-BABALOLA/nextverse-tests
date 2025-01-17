import "../../../styles/components/Dashboard/sticky-notes.css"
import StickyNotesCard from "./StickyNotesCard";
import SearchCircle from "./SearchCircle"
import { useState } from "react"
import SpecialModal from "../../common/SpecialModal"
import { useEffect, useRef } from "react";
import { createRef } from "react";
import StickyNotesControls from "./StickyNotesControls";
const StickyNotes = ({ stickyNotesCount, setStickyNotesCount}) => {
  const [openModal, setOpenModal]  = useState(false)
  const [modalTitle, setModalTitle] =  useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [limit, setLimit] = useState(6)
  const stickyNoteContainerRef = useRef()
  const stickyNotesRefs = useRef([])
  const [modalContent, setModalContent] =  useState("")
  const [stickyNotes, setStickyNotes] = useState([])
  const [displayStickyNotes, setDisplayStickyNotes] = useState([])
   useEffect(() => {
const stickyNotesToBeDisplayed = stickyNotes.slice(0 + (pageNumber -1) * limit,
limit + (pageNumber -1) * limit
);
setDisplayStickyNotes(stickyNotesToBeDisplayed)
   }, [pageNumber, limit, stickyNotes])
   useEffect(() => {
console.log(displayStickyNotes)
   }, [displayStickyNotes])
   const getPaginatedStickyNotes = () => {
    return stickyNotes.slice((pageNumber - 1) * limit, pageNumber * limit);
  };
  const searchForStickyNotes = () => {
    setModalTitle("Search Your Sticky Notes")
    setModalContent(<div className="user-sticky-search-wrapper">

      <div className="field">
         <input type="text" placeholder="Search Sticky Notes"/>
         <label htmlFor="click" className="btn-2" onClick={() => {setOpenModal(false)}}>Search</label>
      </div>
      </div>)
setOpenModal(true)
  }
  
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
    stickyNoteRef.style.top = `${startPos.y}px`
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
  return stickyNotes.some((note) => {
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
const updateNotePosition = (id, newPosition) =>{ 
  console.log("sushi")
const updatedNotes = stickyNotes.map((note) => note.id === id 
?
{...note, position : newPosition}
: note)
setStickyNotes(updatedNotes)
localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes))
}
const createStickyNote = (color) => {
  const oldStickyNotes = [...stickyNotes]
  const newID =  oldStickyNotes.length ? oldStickyNotes[oldStickyNotes.length - 1].id + 1 : 1;
  const position = determineNewPosition()
  const newStickyNote = {
  id : newID,
  body:"📌Write Here",
  colors: JSON.stringify(color),
  position : position
  

  }
  if( stickyNotesCount < 100){
  const newStickyNotes = [...oldStickyNotes, newStickyNote]
setStickyNotes(newStickyNotes)
localStorage.setItem("stickyNotes", JSON.stringify(newStickyNotes))
setStickyNotesCount(newStickyNotes.length)
  }

}
const saveStickyNote = (id, body) => {
  const updatedNotes = stickyNotes.map((note) => note.id === id 
?
{...note, body : body}
: note)
setStickyNotes(updatedNotes)
localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes))

}
useEffect(() => {
  const savedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || []
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
      setStickyNotes([initialNote])    
  } else{
    setStickyNotesCount(savedNotes.length)
    setStickyNotes(savedNotes)
  }
}, [setStickyNotesCount])
  return (
    <section className="litenote-dashboard-sticky-notes-preview" 
     ref={stickyNoteContainerRef}
     style={{position : "relative"}}
    >
    <SpecialModal openModal={openModal} setOpenModal={setOpenModal} title={modalTitle} content={modalContent} width={450} />
      <SearchCircle clickMe={searchForStickyNotes}/> 
        <StickyNotesControls  createStickyNote={createStickyNote}
pageNumber={pageNumber}
setPageNumber={setPageNumber}
stickyNotesCount={stickyNotesCount}
        />
        <div style={{marginTop : "50px"}} 
        
       
        
        >
           {

          stickyNotes.map((content, index) => (
          <StickyNotesCard 
          key={index}
          id={content.id}
          ref={
            stickyNotesRefs.current[content.id] ?
            stickyNotesRefs.current[content.id] :
            (stickyNotesRefs.current[content.id] = createRef())
            
            }
          content={content}
          saveStickyNote={saveStickyNote}
          setStickyNotes={setStickyNotes}
          setStickyNotesCount={setStickyNotesCount}
           initialPosition={content.position}
            onTouchStart={(e) => handleDragStart(content, e)}
            onMouseDown={(e) => handleDragStart(content, e)} />
            ))
        }            
        </div>

    </section>
  )
}

export default StickyNotes