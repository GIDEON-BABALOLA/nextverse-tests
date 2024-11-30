import { FaBoxOpen } from "react-icons/fa"
import "../../styles/components/common/no-content.css"
const NoContent = ({message}) => {
  return (
    <div 
    style={{display :"flex", flexDirection : "column", 
        alignItems : "center", justifyContent : "center", padding : "40px 0px"}}
        className="no-content-section"
        >
        <FaBoxOpen size={200}/>
        <h3>{message}</h3>
        </div>
  )
}

export default NoContent