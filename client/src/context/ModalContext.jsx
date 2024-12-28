import {
createContext,
useState,
useRef,
useEffect,
} from "react"
import useWindowSize from "../hooks/useWindowSize";
export const ModalContext = createContext()
export const ModalContextProvider = ({children}) => {
    const [shareModal, setShareModal] = useState();
    const [contextMenu, setContextMenu] = useState();
    const [shareUrl, setShareUrl] = useState(undefined)
    const shareRef = useRef();
    const { width, height} = useWindowSize();
    const fireClick = (e, storyUrl) => {
      setShareUrl(storyUrl)
        updateMenuPosition(e.clientX, e.clientY);
        contextMenu.current.style.visibility = "visible";
      };
    const updateMenuPosition = (x, y) => {
        const maxTopValue = height - contextMenu.current.offsetHeight;
        const maxLeftValue = width - contextMenu.current.offsetWidth;
        contextMenu.current.style.left = `${Math.min(maxLeftValue, x)}px`;
        contextMenu.current.style.top = `${Math.min(maxTopValue, y)}px`;
      };
    const closeContextMenu  = (e) => {
        if( e?.clientX < parseInt(contextMenu.current?.style.left) || e?.clientX > parseInt(contextMenu.current?.style.left) + contextMenu.current?.offsetWidth )
        {
          contextMenu.current.style.visibility = "hidden";
        }else if(
          e?.clientY < parseInt(contextMenu.current?.style.top) || e?.clientY > parseInt(contextMenu.current?.style.top) + contextMenu.current?.offsetHeight
        ){
          contextMenu.current.style.visibility = "hidden";
        }
    }
    useEffect(() => {
      if (contextMenu) {
        window.addEventListener('scroll', () => {
          if(contextMenu.current){
          contextMenu.current.style.visibility = "hidden";
          }
        });
      }
  
      return () => {
        if (contextMenu) {
          window.removeEventListener('scroll', () => {
            if(contextMenu.current){
            contextMenu.current.style.visibility = "hidden";
            }
            
          });
        }
      };
    }, [contextMenu]);
      useEffect(() => {
        setShareModal(shareRef);
      }, []);
    return (
        <>
        <ModalContext.Provider
        value={{
        contextMenu,
        shareModal,
        shareRef,
        shareUrl,
        setShareUrl,
        fireClick,
        setContextMenu,
        closeContextMenu
        }}
        >
        {children}
</ModalContext.Provider>
        </>
    )
}