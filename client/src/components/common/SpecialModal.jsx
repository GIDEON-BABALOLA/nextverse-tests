import "../../styles/components/common/special-modal.css"
const SpecialModal = ({ openModal, setOpenModal, title, content, width, height }) => {
  const closeModal = () => {
   setOpenModal(false)
  }

  
  return (
    <section className="litenote-special-modal">
            <div className={`popup center ${openModal == true ? "active" : ""}`} style={{height : `${height}px`, width : `${width}px`}}>
     <div className="icon">
    
     </div>
     <div className="title">
        {title}
     </div>
     <div className="description">
     {content}
     </div>{ title !== "" &&
     <div className="dismiss-btn">
       <button id="dismiss-popup-btn" onClick={closeModal}>
          Dismiss
       </button>
     </div>}
    </div>
    </section>
  )
}

export default SpecialModal