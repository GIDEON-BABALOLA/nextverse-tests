import "../../styles/components/Reader/story-comment.css"
import Comment from "./Comment";
import { Drawer } from 'vaul';
export default function MobileComment({ isOpen, onClose }) {
  return (
    <Drawer.Root modal={true} open={isOpen} onOpenChange={onClose}>
<Drawer.Overlay className="drawer-overlay" />
<Drawer.Content className="drawer-content">
  <div className="drawer-header">
    <div className="drawer-spacing">
      <div aria-hidden className="drawer-header-divider" />
      <Drawer.Title className="drawer-title">Comments</Drawer.Title>
    <Comment />
    </div>
  </div>
</Drawer.Content>


    </Drawer.Root>
  );
}