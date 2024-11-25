import { FaBoxOpen } from "react-icons/fa"
import "../../../styles/components/common/no-content.css"
const NoContent = () => {
  return (
    <div style={{display :"flex", flexDirection : "column", 
        alignItems : "center", justifyContent : "center"}}
        className="no-content-section"
        >
        <FaBoxOpen size={90}/>
        <h3> No Content</h3>
        </div>
  )
}

export default NoContent