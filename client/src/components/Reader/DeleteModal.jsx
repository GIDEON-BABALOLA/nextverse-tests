import "../../styles/components/common/delete-modal.css"
import {  useRef } from "react"
import { useEffect, useState } from "react"
import LoadingSpinner from "../Loaders/LoadingSpinner"
import { useDeleteAStoryComment } from "../../hooks/useDeleteAStoryComment"
const DeleteModal = ({ deleteModal, setDeleteModal, title, content, width, height, dismiss, background, zIndex, storyId,
  comments,
 setComments,
 commentNumber,
 setCommentNumber

 }) => {
const { deleteAStoryComment, isLoading, error, data, statusCode } = useDeleteAStoryComment();
const [deleting, setDeleting] = useState(false)
  const myShareModal = useRef()
  const closeModal = () => {
   setDeleteModal(false)
  }  
  useEffect(() => {
    if( Object.keys(data).length > 0){
      setDeleteModal(!deleteModal)
      const newComments = comments.filter((comment) => comment._id.toString() !== deleteModal["comment"].toString())
      setComments(newComments)
      setCommentNumber(commentNumber - 1)
      setDeleting(false)
    }
      }, [data])
  const deleteAComment = () => {
setDeleting(true)
deleteAStoryComment(storyId, deleteModal["comment"])
  }
  useEffect(() => {

  }, [data])
  const closeDeleteModal  = (e) => {
    if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"
      || Object.values(e.target.classList).includes("delete-modal-client")
    ){
      return;
    }
          if( e.clientX < parseInt(myShareModal.current.getBoundingClientRect().left) || e.clientX > parseInt(myShareModal.current.getBoundingClientRect().left) + myShareModal.current.getBoundingClientRect().width)
            {
              setDeleteModal(false)
            }else if(
              e.clientY < parseInt(myShareModal.current.getBoundingClientRect().top) || e.clientY > parseInt(myShareModal.current.getBoundingClientRect().top) + myShareModal.current.getBoundingClientRect().height
            ){
              setDeleteModal(false)
            }
        
    
    }
useEffect(() => {
  document.addEventListener("click", (e) => {
    if(myShareModal.current){
      closeDeleteModal(e)
    }
  })
  return () =>{
    document.removeEventListener('click', (e) => {
      if(myShareModal.current){
        closeDeleteModal(e)
      }
    }
  )
  }
  }, [])
  const renderFollowButton = () => {
       if(Object.keys(data).length == 0 && !deleting){
        return(
          <button className="follow" onClick={() => deleteAComment()}>
            <span className="spinner-loader-container text">Delete</span>
          </button>
        )
      }
       if(deleting  && !error){
        return(
          <button className="follow">
     <LoadingSpinner />
        </button>
        )
      }
        if(!deleting &&  Object.keys(data).length > 0){
        return(
          <button className="follow" onClick={() => deleteAComment()}>
          <span className="spinner-loader-container text">Delete</span>
        </button>
        )
      }
         if(error){
        return(
          <button className="follow" onClick={() => deleteAComment()}>
          <span className="spinner-loader-container text">Delete</span>
        </button>    
        )
      }
    
  }
  return (
    <section className="litenote-delete-modal-for-comments" >
            <div 
            ref={myShareModal}
            className={`popup center ${deleteModal["modal"] == true ? "active" : ""}`} style={{height : `${height}px`, width : `${width}px`, zIndex : zIndex, backgroundColor : {background}}}>
     <div className="icon">
    
     </div>
     <div className="title">
        {title}
     </div>
     <div className="description">
     <div
    className="unfollow-modal"
     style={{display : "flex", flexDirection : "column", justifyContent :"space-between", gap : "20px", fontFamily : "Poppins"}}>
  <section style={{display : "flex", flexDirection : "column", justifyContent : "space-between", textAlign : "left"}}>
  <div style={{fontWeight : "1000"}}>
  </div>
  <div style={{textAlign : "left"}}>
  This comment will be permanently removed. Once deleted, it cannot be recovered. You can still view the rest of the story unless restricted by the story owner.
  </div>
    </section>
  <section style={{display : "flex", flexDirection : "column", justifyContent : "space-between", textAlign : "center", gap : "10px"}}>
{renderFollowButton()}
  <button className="unfollow-cancel-button" onClick={() => setDeleteModal(false)}>Cancel</button>
  </section>
    
    </div>
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

export default DeleteModal