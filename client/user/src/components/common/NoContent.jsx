import { FaBoxOpen } from "react-icons/fa"
import "../../styles/components/common/no-content.css"
import { MdOutlineRefresh } from "react-icons/md"
const NoContent = ({message, fireClick}) => {
  return (
    <div 
    style={{display :"flex", flexDirection : "column", 
        alignItems : "center", justifyContent : "center", padding : "40px 0px"}}
        className="no-content-section"
        >
        <FaBoxOpen size={200}/>
        <h3>{message}</h3>
        <div><button className="offline-button"
 onClick={() => fireClick()}
 ><MdOutlineRefresh size={20}/> Refresh</button></div>
        </div>
  )
}

export default NoContent