import "../../styles/components/common/special-modal.css"
import {  useRef } from "react"
const SpecialModal = ({ openModal, setOpenModal, title, content, width, height, dismiss }) => {
  const myShareModal = useRef()
  const closeModal = () => {
   setOpenModal(false)
  }  
  return (
    <section className="litenote-special-modal" >
            <div 
            ref={myShareModal}
            className={`popup center ${openModal == true ? "active" : ""}`} style={{height : `${height}px`, width : `${width}px`}}>
     <div className="icon">
    
     </div>
     <div className="title">
        {title}
     </div>
     <div className="description">
     {content}
     </div>{ title !== "" &&
     <div className="dismiss-btn">
      { dismiss == true && <button id="dismiss-popup-btn" onClick={closeModal}>
          Dismiss
       </button> }
     </div>}
    </div>
    </section>
  )
}

export default SpecialModal