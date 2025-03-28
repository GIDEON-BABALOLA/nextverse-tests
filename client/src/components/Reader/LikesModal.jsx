import "../../styles/components/common/special-modal.css"
import {  useRef } from "react"
import { useEffect } from "react"
const Likes = ({ likeModal, setLikeModal, title, content, width, height, dismiss, background, zIndex }) => {

  const myShareModal = useRef()
  const closeModal = () => {
   setLikeModal(false)
  }  
  const closeSpecialModal  = (e) => {
    if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"
      || Object.values(e.target.classList).includes("special-modal-client")
    ){
      return;
    }
          if( e.clientX < parseInt(myShareModal.current.getBoundingClientRect().left) || e.clientX > parseInt(myShareModal.current.getBoundingClientRect().left) + myShareModal.current.getBoundingClientRect().width)
            {
              setLikeModal(false)
            }else if(
              e.clientY < parseInt(myShareModal.current.getBoundingClientRect().top) || e.clientY > parseInt(myShareModal.current.getBoundingClientRect().top) + myShareModal.current.getBoundingClientRect().height
            ){
              setLikeModal(false)
            }
        
    
    }
useEffect(() => {
  document.addEventListener("click", (e) => {
    if(myShareModal.current){
      closeSpecialModal(e)
    }
  })
  return () =>{
    document.removeEventListener('click', (e) => {
      if(myShareModal.current){
        closeSpecialModal(e)
      }
    }
  )
  }
  }, [])
  return (
    <section className="litenote-special-modal" >
            <div 
            ref={myShareModal}
            className={`popup center ${likeModal == true ? "active" : ""}`} style={{height : `${height}px`, width : `${width}px`, zIndex : zIndex, backgroundColor : {background}}}>
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

export default Likes