import "../../styles/components/Reader/story-comment.css"
import SpecialModal from "../common/SpecialModal";
import Comment from "./Comment";
import { useState } from "react";
import { Drawer } from 'vaul';
export default function MobileComment({ isOpen, onClose, openModal, id }) {
  const previewDeleteCommentHtml = () => {
        
    return (
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
  <button className="follow">
            <span className="spinner-loader-container text">Delete</span>
          </button>
  <button className="unfollow-cancel-button" onClick={() => setDeleteModal(false)}>Cancel</button>
  </section>
    
    </div>)
  }
  const [deleteModal, setDeleteModal] = useState(false)
  return (
    <Drawer.Root modal={true} open={isOpen} onOpenChange={onClose}>
<Drawer.Overlay className="drawer-overlay" />
<Drawer.Description className="drawer-description">Mobile Comment</Drawer.Description>
<Drawer.Content className="drawer-content" aria-describedby="comments-description">
  <div className="drawer-header" >
    <div className="drawer-spacing">
      <div aria-hidden className="drawer-header-divider" />
      <Drawer.Title className="drawer-title">Comments</Drawer.Title>
    <Comment openModal={openModal} isOpen={isOpen} id={id} setDeleteModal={setDeleteModal} />
    </div>
  </div>
  <SpecialModal  openModal={deleteModal} setDeleteModal={setDeleteModal} 
content={previewDeleteCommentHtml()}
 zIndex={5000}/>

</Drawer.Content>
    </Drawer.Root>
  );
}