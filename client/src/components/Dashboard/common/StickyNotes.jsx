
import "../../../styles/components/Dashboard/sticky-notes.css"
import { FaRegTrashAlt, FaPlus } from "react-icons/fa"
import SearchCircle from "./SearchCircle"
import useWindowSize from "../../../hooks/useWindowSize"
import { useState } from "react"
import SpecialModal from "../../common/SpecialModal"
const StickyNotes = () => {
  const { width } = useWindowSize()
  const [blinkCursor, setBlinkCursor] = useState(true)
  const [openModal, setOpenModal]  = useState(false)
  const [modalTitle, setModalTitle] =  useState("")
  const [modalContent, setModalContent] =  useState("")
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
  const stickyNotes = [
    {
content : "This is my first sticky note",
date : "April 11, 2023"
    },
    {
      content : "This is my first sticky note",
date : "Aprril 11 2023"
    },
    {
content : "This is my first sticky note",
date : "April 11 2023"
    },
    {
      content : "This is my first sticky note",
      date : "April 11 2023"
          },
          {
            content : "This is my first sticky note",
            date : "April 11 2023"
                },
                {
                  content : "This is my first sticky note",
                  date : "April 11 2023"
                      },
                      {
                        content : "This is my first sticky note",
                        date : "April 11 2023"
                            },
                            {
                              content : "This is my first sticky note",
                              date : "April 11 2023"
                                  }
  ]
  return (
    <section className="litenote-dashboard-sticky-notes-preview">
    <SpecialModal openModal={openModal} setOpenModal={setOpenModal} title={modalTitle} content={modalContent} width={450} />
      <SearchCircle clickMe={searchForStickyNotes}/> 
      {/* { width < 768 && <div className="user-sticky-search-wrapper">

<div className="field">
   <input type="text" placeholder="Search Sticky Notes"/>
   <label htmlFor="click" className="btn-2">Search</label>
</div>
</div>
      } */}
    <div className="sticky-wrapper">
    <div className="sticky-container">
      <div className="sticky-outer">
        <div className="sticky">
          <svg width="0" height="0">
            <defs>
              <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                <path
                      d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                      strokeLinejoin="round"
                      strokeLinecap="square"
                      />  
              </clipPath>
            </defs>
          </svg>
      
          <div className="sticky-content"
          onKeyDown={() => setBlinkCursor(false)}
          onClick={() => setBlinkCursor(false)}
           contentEditable = "true" autoFocus style={{outline : "none"}}>
    write here { blinkCursor  && <span className="blinking-cursor">|</span>}
         <FaPlus 
size={10}
          style={{position : "absolute", bottom : "10px", right : "10px", cursor : "pointer"}}
         />
       
       
          </div>
          
        </div>
      </div>
    </div>
    {
      
      stickyNotes.map((content, index) => (
        <div className="sticky-container" key={index}>
      <div className="sticky-outer">
        <div className="sticky">
          <svg width="0" height="0">
            <defs>
              <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                <path
                      d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                      strokeLinejoin="round"
                      strokeLinecap="square"
                      />  
              </clipPath>
            </defs>
          </svg>
          
          <div className="sticky-content" contentEditable = "true">
         {content.content}
         <FaRegTrashAlt 
size={10}
          style={{position : "absolute", bottom : "10px", right : "10px", cursor : "pointer"}}
         />
       
       
          </div>
          
        </div>
      </div>
    </div>

      ))
    }
    </div>
    </section>
  )
}

export default StickyNotes