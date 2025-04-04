
import { FaPlus, FaMinus } from "react-icons/fa"
import colors from "../../../data/colors.json"
const StickyNotesControls = ({ createStickyNote, pageNumber,  nextPage, prevPage }) => {
  return (
    <div className="sticky-notes-color-controls">
    <div  className="sticky-notes-color-add-btn"
    onClick={() => { nextPage()}}
    >
          <FaPlus />
      </div>
          {colors.map((color, index) => (
          
            <div
            key={index}
          className="sticky-notes-color"
          style={{ backgroundColor: color.colorHeader }}
          onClick={ () => {createStickyNote(color)}}
      ></div>
      

          ))}
          <div  className="sticky-notes-color-add-btn">
          <b>{pageNumber}</b>
      </div>
                          <div  className="sticky-notes-color-add-btn"
                          onClick={() => { prevPage()}}
                          >
          <b><FaMinus /></b>
      </div>
          
      </div>
  )
}

export default StickyNotesControls