import { FaAngleLeft, FaShare, FaSearch, FaRegEdit, FaUserEdit } from "react-icons/fa"
import "../../styles/components/Note/note.css"
import { MdSettings } from "react-icons/md"
import { useToastContext } from "../../hooks/useToastContext"
import NoteSettings from "./NoteSettings"
const NoteHeader = ({setOpenModal, openModal, setNoteSettings, noteSettings}) => {
  const { showToast } = useToastContext()
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
            <MdSettings size={20} onClick={() => {
              setOpenModal(!openModal)
            }}/>
            <FaShare size={20}/>
            <FaRegEdit size={20} onClick={() => {
                  if(noteSettings["editable"] == false){
      showToast("Success", "Enabled Editor Mode", true)
    }else{
      showToast("Success", "Disabled Editor Mode", true)
    }
                  setNoteSettings((prevState) => {
                    const { editable } = prevState
      return {...prevState, editable : !editable}
    });
 
            }}/>

        </div>
    </section>
  )
}

export default NoteHeader