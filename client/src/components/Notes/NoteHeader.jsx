import { FaAngleLeft, FaShare, FaSearch } from "react-icons/fa"
import "../../styles/components/Note/note.css"
import { MdSettings } from "react-icons/md"
const NoteHeader = () => {
    let title = "Software Development"
  return (
    <section className="note-header-css">
        <FaAngleLeft size={25}/>
        <span>
        <b>
        <h3>
        <b>
        {title}
        </b>
        </h3>
        </b>
        </span>
        <div className="note-header-icons">
            <button>
                Save
            </button>
            <MdSettings size={20}/>
            <FaShare size={20}/>
            <FaSearch size={20}/>

        </div>
    </section>
  )
}

export default NoteHeader