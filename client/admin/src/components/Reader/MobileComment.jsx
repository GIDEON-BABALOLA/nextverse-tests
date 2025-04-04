import "../../styles/components/Reader/story-comment.css"
import DeleteModal from "./DeleteModal";
import Comment from "./Comment";
import { useState } from "react";
import { Drawer } from 'vaul';
export default function MobileComment({ isOpen, onClose, openModal, id,
  comments,
  setComments,
  commentNumber,
  setCommentNumber
 }) {
  const [deleteModal, setDeleteModal] = useState({
    comment : "",
    modal : false
  })
  return (
    <Drawer.Root modal={true} open={isOpen} onOpenChange={onClose}>
<Drawer.Overlay className="drawer-overlay" />
<Drawer.Description className="drawer-description">Mobile Comment</Drawer.Description>
<Drawer.Content className="drawer-content" aria-describedby="comments-description">
  <div className="drawer-header" >
    <div className="drawer-spacing">
      <div aria-hidden className="drawer-header-divider" />
      <Drawer.Title className="drawer-title">Comments</Drawer.Title>
    <Comment 
openModal={openModal}
isOpen={isOpen} 
id={id}
setDeleteModal={setDeleteModal} 
comments={comments}
commentNumber={commentNumber}
setComments={setComments}
setCommentNumber={setCommentNumber}

    />
    </div>
  </div>
  <DeleteModal 
    comments={comments}
 setComments={setComments}
 commentNumber={commentNumber}
 setCommentNumber={setCommentNumber}
   deleteModal={deleteModal} setDeleteModal={setDeleteModal} 
 zIndex={5000}
 storyId={id}

 />

</Drawer.Content>
    </Drawer.Root>
  );
}