import "../../styles/components/Reader/story-comment.css"
import Comment from "./Comment";
import { Drawer } from 'vaul';
export default function MobileComment({ isOpen, onClose, openModal,id }) {
  return (
    <Drawer.Root modal={true} open={isOpen} onOpenChange={onClose}>
<Drawer.Overlay className="drawer-overlay" />
<Drawer.Description className="drawer-description">Mobile Comment</Drawer.Description>
<Drawer.Content className="drawer-content" aria-describedby="comments-description">
  <div className="drawer-header" >
    <div className="drawer-spacing">
      <div aria-hidden className="drawer-header-divider" />
      <Drawer.Title className="drawer-title">Comments</Drawer.Title>
    <Comment openModal={openModal} isOpen={isOpen} id={id} />
    </div>
  </div>
</Drawer.Content>


    </Drawer.Root>
  );
}