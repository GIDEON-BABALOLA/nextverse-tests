import "../../styles/components/common/special-modal.css"
import { useEffect, useRef } from "react"
const NoteModal = ({ openModal, setOpenModal, title, content, width, height, dismiss }) => {
  const myShareModal = useRef()
  const closeModal = () => {
   setOpenModal(false)
  }
  const closeContextMenu  = (e) => {
if(e.srcElement.tagName == "svg" || e.srcElement.tagName == "IMG"){
  return;
}
      if( e.clientX < parseInt(myShareModal.current.getBoundingClientRect().left) || e.clientX > parseInt(myShareModal.current.getBoundingClientRect().left) + myShareModal.current.getBoundingClientRect().width)
        {
          setOpenModal(false)
        }else if(
          e.clientY < parseInt(myShareModal.current.getBoundingClientRect().top) || e.clientY > parseInt(myShareModal.current.getBoundingClientRect().top) + myShareModal.current.getBoundingClientRect().height
        ){
          setOpenModal(false)
        }
    

}
  useEffect(() => {
    // Define the click handler

    // Attach the event listener to the document
    document.addEventListener('click', closeContextMenu);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
        document.removeEventListener('click', closeContextMenu);
    };
}, []); 

  
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

export default NoteModal