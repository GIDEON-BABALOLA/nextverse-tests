
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import ArrowKeyDetector from "../../hooks/useArrowKeys";
const NoteFooter = ({noteSettings, setNoteSettings}) => {
  const previousPage = () => {
    if(noteSettings["page"] == 1){
      return;
    }
setNoteSettings((prevState) => {
  const { page } = prevState
  return {...prevState, page : page - 1 }
})
  }
  const nextPage = () => {
    console.log(noteSettings["page"])
    console.log(noteSettings["page"] / 2)
    // if(noteSettings["page"]  === Math.ceil((noteSettings["page"] / 2))){
    //   return
    // }
    setNoteSettings((prevState) => {
      const { page } = prevState
      return {...prevState, page : page + 1 }
    })
  }
  return (
    <>
     <div
    className="note-footer-css"
    >
    <span 
    onClick={previousPage}
    style={{padding : "10px 12px", borderRadius : "50%", border : "1px solid black", cursor : "pointer"}}>
    <FaArrowLeft/>
    </span>
   <span
    onClick={nextPage}
    style={{padding : "10px 12px", borderRadius : "50%", border : "1px solid black", cursor : "pointer"}}>
   <FaArrowRight />
   </span>

    </div>
          <ArrowKeyDetector  backBtn={previousPage} nextBtn={nextPage}/> 
    </>
   
  )
}

export default NoteFooter