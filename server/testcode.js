
import TextIcon from "../../../styles/components/common/Icons/TextIcon"
import LoadingSpinner from "../../Loaders/LoadingSpinner"
import { useModalContext } from "../../../hooks/useModalContext"
import { useToastContext } from "../../../hooks/useToastContext"
import { useEffect, useState } from  "react"
import { useShareANote } from "../../../hooks/useShareANote"
const NoteShare = ({currentNoteDetails, setNoteShareModal, notes, setNotes}) => {
  const { showToast } = useToastContext()
  const [email, setEmail] = useState("")
  const { shareANote, isLoading, error, data }   = useShareANote();
  const { currentStoryId, contextMenu } = useModalContext();
  const shareTheNote = () => {
    if(!email){
      showToast("Error", "Pls enter an email", false)
      return;
    }
shareANote(currentStoryId, email)
  }
  useEffect(() => {
if(Object.keys(data).length > 0){
showToast("Success", "Your note has now been shared successfully", true)
const notesAfterSharing = [...notes].map((note) => {
  return note._id == currentStoryId ? {...note, sharedWith : note.sharedWith + 1} : note
});
setNotes(notesAfterSharing)
setNoteShareModal(false)
setEmail("")

}
  }, [data, showToast])
  useEffect(() => {
    if(error){
showToast("Error", error.message, false)
    }
  }, [error, showToast])
  return (
    <>
        <div style={{color : "#333F4E", fontWeight : "700"}}>Share</div>
    <section style={{ display : "flex", flexDirection  :"column", justifyContent : "space-between", gap : "15px"}}>
    <div className="note-share-modal-card" style={{backgroundColor : "#F8F9FB", display : "flex", flexDirection : "row",
      border : "1px solid black"
    }}>
    <div className="note-share-card-image-section">
<TextIcon size={40}/>
        </div>
<div style={{display : "flex", flexDirection : "column", alignItems : "flex-start"}}>
  <span style={{textAlign : "justify", fontStyle : "bold", fontSize : "1.07rem", fontWeight : "400", fontFamily : "Poppins"}}>
    <b>{currentNoteDetails.title}</b>
    </span>
<span style={{color :"rgba(163, 178, 199, .9)", fontSize : "1rem"}}>{currentNoteDetails.time}, {currentNoteDetails.date}</span>
</div>
    </div>
    <div>

      <span style={{display : "flex", fontWeight : "600", color : "#333F4E"}}>Share file with other users</span>
    </div>
    <div style={{display : "flex"}}>
      <input
      onChange={(e) => { setEmail(e.target.value) }}
      placeholder="Enter email address" className="note-share-modal-card-input" value={email}></input>
    </div>
    <div style={{display : "flex", flexDirection : "row", marginTop : "5px", justifyContent : "space-between", width : "100%"}}>
      <span style={{color : "#333F4E", fontWeight : "700"}}>Shared with</span>
      <span style={{ fontWeight : "700", color : "#A3B2C7"}}>{currentNoteDetails.sharedWith} Users</span>
    </div>
    <div style={{display : "flex", width : "100%", justifyContent : "space-between"}}>
<button className="note-share-modal-card-button-cancel"
onClick={() => {
   setNoteShareModal(false)
}}
>
  Cancel
</button>
<button className="note-share-modal-card-button-share" onClick={() => shareTheNote()}>
{
                    isLoading ? 
                    <LoadingSpinner />
                    :
                    "Share"
                  }
</button>
    </div>
    </section>
    </>

  )
}

export default NoteShare