import "../../styles/components/common/custom-menu.css"
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
const CustomMenu = ({ customMenu, customData, clickFunction }) => {

  return (
    <div className="custom-menu" ref={customMenu}>
      <ul className="menu">
        {customData.map((custom) => (
             <li className="item special-modal-client" key={custom.name} onClick={custom.clickFunction}>
             <span className="special-modal-client">{custom.icon}</span>
             <span className="special-modal-client">{custom.name}</span>
           </li>
        ))}
      </ul>
  </div>

  )
}

export default CustomMenu