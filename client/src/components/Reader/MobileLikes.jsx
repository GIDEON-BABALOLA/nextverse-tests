import "../../styles/components/Reader/story-comment.css"
import DeleteModal from "./DeleteModal";
import Likes from "./Likes"
import { useState } from "react";
import { Drawer } from 'vaul';
export default function MobileLikes({ isOpen, onClose
 }) {
  return (
    <Drawer.Root modal={true} open={isOpen} onOpenChange={onClose}>
<Drawer.Overlay className="drawer-overlay" />
<Drawer.Description className="drawer-description">Mobile Comment</Drawer.Description>
<Drawer.Content className="drawer-content" aria-describedby="comments-description">
  <div className="drawer-header" >
    <div className="drawer-spacing">
      <div aria-hidden className="drawer-header-divider" />
      <Drawer.Title className="drawer-title">Likes</Drawer.Title>
 <Likes />
    </div>
  </div>

</Drawer.Content>
    </Drawer.Root>
  );
}