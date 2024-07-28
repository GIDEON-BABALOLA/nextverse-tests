import "../../styles/components/common/context.css"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useWindowSize from "../../hooks/useWindowSize"
const ContextMenu = ({ contextMenuData, setContextMenu, shareModal, contextMenu, state}) => {
    const navigate = useNavigate()
    const context = useRef()
    const triangle = useRef()
    const rectangle = useRef()
    useEffect(() => {
        setContextMenu(context)
    }, [setContextMenu])
    const showColor = (e) => {
        console.log("dope")
 
        if(e.target.innerText == "Dashboard"){
   triangle.current.style.backgroundColor = "var(--context-link-hover)"
rectangle.current.style.backgroundColor = "var(--context-link-hover)"
        }
    
    }
    const closeColor = () => {
           triangle.current.style.backgroundColor = "var(--context-background)"
rectangle.current.style.backgroundColor = "var(--context-background)"
  }
    const openShare = (e) => {

        switch (e.target.innerText) {
            case "Share":
                     shareModal.current.showModal()
                     shareModal.current.classList.add("slide-dow")
                break;
            case "Close Options" : 
            contextMenu.current.style.visibility = "hidden"
            break;
                case "Bookmark":
                
                break;
                case "Home":
                    navigate("/")
                    
                break;
                case "Settings":
                    navigate("/dashboard/settings")
                    
                break;
                case "Dashboard":
                navigate("/dashboard/analytics")
                break;
                case "Close":
                    console.log("dave")
                    console.log( contextMenu.current.style.visibility )
                    contextMenu.current.style.visibility = "hidden"
                    console.log("why")
                break;
        
            default:
                break;
        }
    }
  return (
    <>    

        <ul className="litenote-context" 
        style={{
    width:"200px",
    margin: 0,
    paddingLeft: 0,
    position: "fixed",
    fontSize:"18px",
    visibility: "hidden",
    marginTop : state == "header" ? "3%" : "0",
    fontFamily: "Poppins, sans-serif", // Corrected line
}}
        ref={context}>
        {state == "header" &&
        <>

         </>
        }
        {
            contextMenuData.map(((item, id) => (
                <li className="litenote-context-link" key={id} onClick={openShare}
                 data-name={item.label} onMouseOver={showColor} onMouseLeave={closeColor}>
                    {item.icon}<span className="litenote-context-label">{item.label}</span>
                </li>
            
            )))
        }
</ul></>
  )
}

export default ContextMenu