
import "../../../styles/components/Dashboard/sticky-notes.css"
import { FaRegTrashAlt, FaPlus } from "react-icons/fa"
import { MdFormatShapes, MdOutlineRectangle } from "react-icons/md"
import { FaRegTrashCan } from "react-icons/fa6";
import StickyNotesCard from "./StickyNotesCard";
import Spinner from "../../Loaders/Spinner";
import SearchCircle from "./SearchCircle"
import useWindowSize from "../../../hooks/useWindowSize"
import { useState } from "react"
import SpecialModal from "../../common/SpecialModal"
import colors from "../../../assets/colors.json"
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useRef } from "react";
import { createRef } from "react";
import StickyNotesControls from "./StickyNotesControls";
const StickyNotes = () => {
  const saving = true
  const { width } = useWindowSize()
  const [blinkCursor, setBlinkCursor] = useState(true)
  const [openModal, setOpenModal]  = useState(false)
  const [modalTitle, setModalTitle] =  useState("")
  const stickyNoteContainerRef = useRef()
  const stickyNotesRefs = useRef([])
  const [modalContent, setModalContent] =  useState("")
  const  [stickyNotes, setStickyNotes] = useState([
   {
        id: 1,
        body:"Welcome To Sticky Notes",
        colors: JSON.stringify({
            id: "color-purple",
            colorHeader: "#FED0FD",
            colorBody: "#FEE5FD",
            colorText: "#18181A",
        }),
    }, 



    
    // {
    //     id: 2,
    //     body: "God is the most high",
    //     colors: JSON.stringify({
    //         id: "color-blue",
    //         colorHeader: "#9BD1DE",
    //         colorBody: "#A6DCE9",
    //         colorText: "#18181A",
    //     }),
    // },
//     {
//         id: 3,
//         body: "God is good",
//         colors: JSON.stringify({
//             id: "color-yellow",
//             colorHeader: "#FFEFBE",
//             colorBody: "#FFF5DF",
//             colorText: "#18181A",
//         }),
//     },
//     {
//       id: 4,
//       body: "God is good",
//       colors: JSON.stringify({
//           id: "color-yellow",
//           colorHeader: "#FFEFBE",
//           colorBody: "#FFF5DF",
//           colorText: "#18181A",
//       }),
//   },
//   {
//     id: 5,
//     body: "God is good",
//     colors: JSON.stringify({
//         id: "color-yellow",
//         colorHeader: "#FFEFBE",
//         colorBody: "#FFF5DF",
//         colorText: "#18181A",
//     }),
    
// },
// {
//   id: 6,
//   body: "God is good",
//   colors: JSON.stringify({
//       id: "color-yellow",
//       colorHeader: "#FFEFBE",
//       colorBody: "#FFF5DF",
//       colorText: "#18181A",
//   }),
  
// },
// {
//   id: 7,
//   body: "God is good",
//   colors: JSON.stringify({
//       id: "color-yellow",
//       colorHeader: "#FFEFBE",
//       colorBody: "#FFF5DF",
//       colorText: "#18181A",
//   }),
// }

  ])
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
console.log(stickyNoteContainerRef.current.getBoundingClientRect(), window.innerHeight,
  stickyNoteContainerRef.current,
  stickyNoteContainerRef.current.offsetHeight
)
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
  console.log("King")
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
  console.log(window.innerWidth - finalRect.width, finalRect.left)
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
  const currentRect = currentNoteRef. getBoundingClientRect()
  return stickyNotes.some((note) => {
    if(note.id == id) return false;
    const otherNoteRef =  stickyNotesRefs.current[note.id].current
    const otherRect = otherNoteRef.getBoundingClientRect();
    const overlap = !(
      currentRect.right < otherRect.left ||
      currentRect.left > otherRect.right ||
      currentRect.bottom < otherRect.top ||
      currentRect.top > otherRect.bottom
    )
    return overlap
  })
} 
const updateNotePosition = (id, newPosition) =>{ 
const updatedNotes = stickyNotes.map((note) => note.id === id 
?
{...note, position : newPosition}
: note)
setStickyNotes(updatedNotes)
localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes))
}
useEffect(() => {

const savedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || []
const updatedNotes = stickyNotes.map((note) => {
    const savedNote = savedNotes.find((n) => n.id == note.id);
    if(savedNote){
        return {...note, position : savedNote.position}
    }else{
        const position = determineNewPosition()
        return {...note, position}
    }

})
setStickyNotes(updatedNotes)
localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes))
}, [stickyNotes.length])
  return (
    <section className="litenote-dashboard-sticky-notes-preview" 
     ref={stickyNoteContainerRef}
     style={{position : "relative"}}
    >
    <SpecialModal openModal={openModal} setOpenModal={setOpenModal} title={modalTitle} content={modalContent} width={450} />
      <SearchCircle clickMe={searchForStickyNotes}/> 
        <StickyNotesControls />
        <div style={{marginTop : "50px"}} 
        
       
        
        >
        {
            stickyNotes.map((content, index) => (
          <StickyNotesCard 
          ref={
            stickyNotesRefs.current[content.id] ?
            stickyNotesRefs.current[content.id] :
            (stickyNotesRefs.current[content.id] = createRef())
            
            }
          content={content}
           initialPosition={content.position}
            key={content.id}
            onTouchStart={(e) => handleDragStart(content, e)}
            onMouseDown={(e) => handleDragStart(content, e)} />
            ))
        }            
        </div>

    </section>
  )
}

export default StickyNotes