import { useEffect, useRef } from "react"
import "../../styles/components/common/special-modal.css"
import LanguageSelect from "./LanguageSelect"
const SpecialModal = ({ openModal, setOpenModal }) => {
  console.log(openModal)
  const closeModal = () => {
   setOpenModal(false)
  }

  
  return (
    <section className="litenote-special-modal">
            <div className={`popup center ${openModal == true ? "active" : ""}`}>
     <div className="icon">
    
     </div>
     <div className="title">
        Language Select
     </div>
     <div className="description">
     <LanguageSelect />
     </div>
     <div className="dismiss-btn">
       <button id="dismiss-popup-btn" onClick={closeModal}>
          Dismiss
       </button>
     </div>
    </div>
    </section>
  )
}

export default SpecialModal