import { createContext, useState, useRef, useEffect, useContext } from "react";

// Create the Context
const AppContext = createContext();

// Create a Provider component
export const AppProvider = ({ children }) => {
  const [shareModal, setShareModal] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const shareRef = useRef();
  const contextMenuRef = useRef();
  const { width, height } = useWindowSize(); // assuming this is already in your code

  const fireClick = (e) => {
    updateMenuPosition(e.clientX, e.clientY);
    contextMenuRef.current.style.visibility = "visible";
  };

  const updateMenuPosition = (x, y) => {
    const maxTopValue = height - contextMenuRef.current.offsetHeight;
    const maxLeftValue = width - contextMenuRef.current.offsetWidth;
    contextMenuRef.current.style.left = `${Math.min(maxLeftValue, x)}px`;
    contextMenuRef.current.style.top = `${Math.min(maxTopValue, y)}px`;
  };

  useEffect(() => {
    setShareModal(shareRef);
  }, []);

  return (
    <AppContext.Provider
      value={{
        shareModal,
        setShareModal,
        shareRef,
        contextMenuRef,
        fireClick,
        setContextMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
