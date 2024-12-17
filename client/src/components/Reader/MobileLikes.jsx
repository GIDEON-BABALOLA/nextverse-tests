import "../../styles/components/Reader/story-comment.css"
import { MdClose } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import Likes from "./Likes"
import { useState } from "react";
import { Drawer } from 'vaul';
export default function MobileLikes({ isOpen, onClose, likeModal, id
 }) {
  return (
    <Drawer.Root modal={true} open={isOpen} onOpenChange={onClose}>
<Drawer.Overlay className="drawer-overlay" />
<Drawer.Description className="drawer-description">Mobile Comment</Drawer.Description>
<Drawer.Content className="drawer-content" aria-describedby="comments-description">
  <div className="drawer-header" >
    <div className="drawer-spacing">
      <div aria-hidden className="drawer-header-divider" />
      <span style={{display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
      {/* <Drawer.Title className="drawer-title"></Drawer.Title> */}

      </span>

 <Likes likesDrawerOpen={isOpen} likeModal={likeModal} id={id} />
    </div>
  </div>

</Drawer.Content>
    </Drawer.Root>
  );
}