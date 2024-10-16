import "../../styles/components/common/special-modal.css"
import { forwardRef } from "react"
const NoteModal = forwardRef(({ openModal, setOpenModal, title, content, width, height, dismiss, ...props }, ref) => {
  const closeModal = () => {
   setOpenModal(false)
  }


  
  return (
    <section className="litenote-special-modal" >
            <div 
            {...props}
            ref={ref}
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
})
NoteModal.displayName = "NoteModal";
export default NoteModal