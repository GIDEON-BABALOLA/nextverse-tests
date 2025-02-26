
import "../../styles/components/common/delete-consent.css"
import Trash from "../../styles/components/common/Icons/Trash"
import LoadingSpinner from "../Loaders/LoadingSpinner"
import { useEffect,useRef } from "react"
const DeleteConsent = ({ openModal,
  setOpenModal,
  title,
  message,
  width,
  height,
  buttonText,
  deleteFunction,
  error,
  isLoading
}) => {
  console.log(isLoading)
  const myDeleteModal = useRef()
  const closeModal = () => {
    setOpenModal(false)
   }
   const closeDeleteModal  = (e) => {
console.log(e.target.classList)
    if(e.target.tagName == "svg" || e.target.tagName == "IMG" || e.target.tagName == "path"
      || Object.values(e.target.classList).includes("special-modal-client")
    ){
      return;
    }
          if( e.clientX < parseInt(myDeleteModal.current?.getBoundingClientRect().left) || e.clientX > parseInt(myDeleteModal.current?.getBoundingClientRect().left) + myDeleteModal.current?.getBoundingClientRect().width)
            {
              setOpenModal(false)
            }else if(
              e.clientY < parseInt(myDeleteModal.current?.getBoundingClientRect().top) || e.clientY > parseInt(myDeleteModal.current?.getBoundingClientRect().top) + myDeleteModal.current?.getBoundingClientRect().height
            ){
              setOpenModal(false)
            }
        
    
    }
    useEffect(() => {
      document.addEventListener("click", (e) => {
    closeDeleteModal(e)
      })
      return () =>{
        document.removeEventListener('click', (e) => {
        closeDeleteModal(e)
        }
      )
      }
      }, [])
 
  return (
    <section className="litenote-delete-modal" >
    <div className={`popup center  ${openModal == true ? "active" : ""}`} style={{height : `${height}px`, width : `${width}px`}}  ref={myDeleteModal}>
<section
style={{
  display : "flex",
  flexDirection : "column",
  gap : "20px",
  marginLeft : "20px",
  fontFamily : "Urbanist"
}}
>
<div style={{alignSelf : "flex-start"}}>
  <Trash  size={50}/>
</div>
<section style={{display : "flex", flexDirection : "column", gap :"5px"}}>
<div style={{alignSelf : "flex-start", fontSize : "1.9rem", 
fontFamily : "Urbanist", color : "black"}}>
  {title}
</div>
  <div style={{fontSize : "1.2rem", alignSelf : "flex-start", 
  fontFamily : "Urbanist", color : "#777777"}}>
    
    {message}
  </div>
  </section>
<div style={{alignSelf : "flex-end", display : "flex", flexDirection : "row", alignItems : "center",
gap : "10px", fontFamily : "Urbanist"}}>
  <span style={{fontWeight : "800", color :"#777777", fontFamily : "Urbanist", 
  cursor : "pointer", fontSize : "1.2rem",
  }} onClick={closeModal}>Cancel, I cant</span>
  <button style={{fontFamily : "Urbanist", fontWeight : "800"}}
  onClick={() => { deleteFunction()}}
  >
  { isLoading ? <span style={{ padding : "0px 20px"}}>
  <LoadingSpinner width={15} />
  </span> : `${buttonText}`
 }
    </button>
</div>
</section>
</div>
</section>
  )
}

export default DeleteConsent