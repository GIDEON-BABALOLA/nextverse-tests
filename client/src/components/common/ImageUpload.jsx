
import { MdCloudUpload } from "react-icons/md"
import { useState } from "react"
import CloudinaryIcon from "../../styles/components/common/Icons/CloudinaryIcon"
import "../../styles/components/common/image-upload.css"
import { FaGoogleDrive } from "react-icons/fa"
import LoadingSpinner from "../Loaders/LoadingSpinner"

const ImageUpload = ({ onUpload, isLoading, setOpenModal}) => {
    const [attachmentLine, setAttachmentLine] = useState(0)
    const slideLine =(e, index) => {
        setAttachmentLine(e.target.offsetLeft - 20)
        const allAttachments = document.querySelectorAll(".attach-picture-main")
        allAttachments.forEach((content) => content.classList.remove("active"))
        allAttachments[index].classList.add("active")
        }
  return (
    <>
    <section className="attach-picture-options">
      <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257539/Assets/images/hdd_fpfs8i.svg"} width="15%"/>
      <span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 0) } > Local Device</span>
      </div>
      <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257535/Assets/images/google-drive_o6oi9s.svg"} width="15%"/><span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 1) }  > Google Drive</span></div>
      <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257531/Assets/images/camera_z43upm.svg"} width="15%"/><span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 2) } > Take Photo</span></div>
      <div ><img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257533/Assets/images/dropbox_v5sl8k.svg"} width="15%"/><span style={{fontSize : "0.9rem"}} onClick={(e) => slideLine(e, 3) } > DropBox</span></div>
      <div
      onClick={slideLine}
       className="slideline" style={{left : attachmentLine + "px"}}></div>
      {/* <div>Picture To Text</div> */}
    </section>
    <section className="attach-picture-main active" >
    <span><MdCloudUpload size={80} color="#0071FF" /></span>
    <span><b>Drag and drop or Click button to upload image.</b></span>
    <span>Image Size Must Be Less Than <b>2MB</b></span>
    </section>
    <section className="attach-picture-main">
      Upload Pictures from your google drive
      <button className="connect-to-services-button"> <FaGoogleDrive color="white"/>Connect to Google Drive</button>
    </section>
    <section className="attach-picture-main">
      snap a picture
    </section>
    <section   className="attach-picture-main">
      Upload Pictures from your dropbox
      <button className="connect-to-services-button"> <FaGoogleDrive color="white"/>Connect to DropBox</button>
    </section>
    <input onChange={onUpload} type="file" id="file-input"
            style={{display: "none", cursor : "pointer"}}
            accept="image/*"
            ></input>
    <button className="attach-picture-button special-modal-client" onClick={() => {
      document.getElementById("file-input").click()
      setOpenModal(true)
    
      }}>
        { isLoading ? <LoadingSpinner /> : "Select Image"}
      </button>
    <div style={{display : "flex", flexDirection :"row", alignItems : "center", justifyContent : "center"}}>
    <span style={{fontSize : "10px"}}>Powered By</span> <CloudinaryIcon size={55}/>
    </div>
    </>
  )
}

export default ImageUpload